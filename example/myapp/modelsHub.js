const modelRegistry = require("./modelRegistry ");

const modelHub = {
  getModel: (moduleName) => {
    if (Object.keys(modelRegistry.getModels()).length === 0) {
      throw new Error('ModelRegistry not initialized. Call init() first.');
    }
    return modelRegistry.getModel(moduleName);
  },
  getModels: () => {
    if (Object.keys(modelRegistry.getModels()).length === 0) {
      throw new Error('ModelRegistry not initialized. Call init() first.');
    }
    return modelRegistry.getModels();
  }
};

module.exports = modelHub;