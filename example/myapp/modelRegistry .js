const fs = require('fs');
const path = require('path');

const modelRegistry = (() => {
  const rootPath = process.cwd();
  const modulesFolderName = 'modules';
  const modelsFolderName = 'models';
  const modulesFolderPath = path.join(rootPath, modulesFolderName);
  const models = {};

  function getFolderContents(contentPath, type = 'all') {
    if (!fs.existsSync(contentPath)) {
      throw new Error(`Path not found: ${contentPath}`);
    }
    const entries = fs.readdirSync(contentPath, { withFileTypes: true });
    switch (type) {
      case 'folder':
        return entries.filter(e => e.isDirectory()).map(e => path.join(contentPath, e.name));
      case 'file':
        return entries.filter(e => e.isFile() && path.extname(e.name) === '.js').map(e => path.join(contentPath, e.name));
      default:
        return entries.map(e => path.join(contentPath, e.name));
    }
  }

  return {
    init() {
      if (Object.keys(models).length > 0) {
        throw new Error('ModelRegistry is already initialized.');
      }

      const modelAccess = {
        getModel: (moduleName) => {
          if (!models[moduleName]) {
            throw new Error(`Module "${moduleName}" not found.`);
          }
          return models[moduleName];
        },
        getModels: () => models
      };

      const moduleFolders = getFolderContents(modulesFolderPath, 'folder');
      for (const modulePath of moduleFolders) {
        const moduleName = path.basename(modulePath);
        const modelFolderPath = path.join(modulePath, modelsFolderName);
        if (!fs.existsSync(modelFolderPath)) {
          throw new Error(`Module "${moduleName}" does not contain a "${modelsFolderName}" folder.`);
        }

        const modelFiles = getFolderContents(modelFolderPath, 'file');
        models[moduleName] = {};
        for (const modelFilePath of modelFiles) {
          try {
            const modelName = path.basename(modelFilePath, path.extname(modelFilePath));
            const modelFactory = require(modelFilePath);
            models[moduleName][modelName] = modelFactory(modelAccess);
          } catch (err) {
            throw new Error(`Failed to load model "${path.basename(modelFilePath)}" in module "${moduleName}": ${err.message}`);
          }
        }
      }

    },

    getModels() {
      return models;
    },

    getModel(moduleName) {
      if (!models[moduleName]) {
        throw new Error(`Module "${moduleName}" not found.`);
      }
      return models[moduleName];
    }
  };
})();

module.exports = modelRegistry;