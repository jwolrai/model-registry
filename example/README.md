
## Folder Structure

```
myapp/
├─ app.js
├─ modelRegistry.js        # The loader
├─ modelsHub.js            # Optional wrapper to prevent cyclic issues
├─ modules/
│   ├─ users/
│   │   ├─ controllers/
│   │   │   userController.js
│   │   ├─ models/
│   │   │   userModel.js
│   │   └─ routes/
│   │       userRoutes.js
│   └─ posts/
│       ├─ controllers/
│       │   postController.js
│       ├─ models/
│       │   postModel.js
│       └─ routes/
│           postRoutes.js
```

---

## Installation

```bash
npm install express
```

Ensure your project follows the **modules/MVC layout** above.

---

## Usage

### Initialize model registry at app startup

```js
const express = require("express");
const app = express();
const modelRegistry = require("./modelRegistry");

app.use(express.json());

// Initialize all models
modelRegistry.init();

```

---

### Accessing Models in Controllers/Models

```js
const models = require("../../models"); // wrapper or registry

// Example: get a model
const userModel = models.getModel("users", "userModel");

// Use model methods
const allUsers = userModel.getAll();
```

---

## API

### `modelRegistry.init()`

* Initializes and loads all models from the `modules` folder.
* Must be called **before using models**.

### `modelRegistry.getModels()`

* Returns all loaded models as an object:

```js
{
  users: { userModel: {...} },
  posts: { postModel: {...} }
}
```

### `modelRegistry.getModel(moduleName, modelName)`

* Returns a specific model:

```js
const userModel = modelRegistry.getModel("users", "userModel");
```

---

## Notes

* Each module should have its own `models/` folder.
* Models can be accessed by other modules via `modelRegistry` to maintain **loose coupling**.
* Avoid directly importing other module models inside a model to prevent cyclic dependencies.

---

## Example URLs (for localhost)

**Users Module:**

* List all users: `GET http://localhost:3000/users/`
* Get user by ID: `GET http://localhost:3000/users/1`
* Create user: `POST http://localhost:3000/users/`

  ```json
  { "name": "Charlie" }
  ```
* Get posts for a user (if route exists): `GET http://localhost:3000/users/1/posts`

**Posts Module:**

* List all posts: `GET http://localhost:3000/posts/`
* Create post: `POST http://localhost:3000/posts/`

  ```json
  { "userId": 1, "title": "New Post" }
  ```

---

