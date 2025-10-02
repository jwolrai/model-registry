const fs = require("fs");
const path = require("path");

const modelRegistry  = (() => {
  const rootPath = process.cwd();
  const modulesFolderName = "modules";
  const modelsFolderName = "models";

  const modulesFolderPath = path.join(rootPath, modulesFolderName);
  const models = {};

  /**
   * Utility: Get folder contents by type
   */
  function getFolderContents(contentPath, type = "all") {
    if (!fs.existsSync(contentPath)) {
      throw new Error(`Path not found: ${contentPath}`);
    }

    const entries = fs.readdirSync(contentPath, { withFileTypes: true });

    switch (type) {
      case "folder":
        return entries.filter(e => e.isDirectory()).map(e => path.join(contentPath, e.name));
      case "file":
        return entries.filter(e => e.isFile() && path.extname(e.name) === ".js").map(e => path.join(contentPath, e.name));
      case "all":
      default:
        return entries.map(e => path.join(contentPath, e.name));
    }
  }

  return {
    /**
     * Initialize and load all models from modules folder
     */
    init() {
      if (Object.keys(models).length > 0) {
        throw new Error("ModelHub is already initialized.");
      }

      const moduleFolders = getFolderContents(modulesFolderPath, "folder");

      for (const modulePath of moduleFolders) {
        const moduleName = path.basename(modulePath);
        const modelFolderPath = path.join(modulePath, modelsFolderName);

        if (!fs.existsSync(modelFolderPath)) {
          throw new Error(`Module "${moduleName}" does not contain a "${modelsFolderName}" folder.`);
        }

        const modelFiles = getFolderContents(modelFolderPath, "file");

        models[moduleName] = {}; // create container for each module’s models

        for (const modelFilePath of modelFiles) {
          try {
            const modelName = path.basename(modelFilePath, path.extname(modelFilePath));
            models[moduleName][modelName] = require(modelFilePath);
          } catch (err) {
            throw new Error(
              `Failed to load model "${path.basename(modelFilePath)}" in module "${moduleName}": ${err.message}`
            );
          }
        }
      }
    },

    /**
     * Get all loaded models
     */
    getModels() {
      return models;
    },

    /**
     * Get all model of specific module
     */
    getModel(moduleName) {
      if (!models[moduleName]) {
        throw new Error(`Module "${moduleName}" not found in model registry.`);
      }
      return models[moduleName];
    }
  };
})();

module.exports = modelRegistry ;
