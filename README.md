# Model Registry for Node.js HMVC

A **modular HMVC model loader** for Node.js/Express applications.
Automatically loads models from modules, supports multiple models per module, and creates loose coupling between models, allowing controllers and models to access each other.

---

## Features

* Dynamically loads all models from the `modules` folder.
* Supports multiple modules, each with its own MVC structure.
* Provides a central registry to access models: `getModel(moduleName)`.
* Can be used in combination with HMVC-style modular routing.

---