const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// function getAll() { return users; }
// function getById(id) { return users.find(u => u.id === id) || null; }
// function create(name) {
//   const newUser = { id: users.length + 1, name };
//   users.push(newUser);
//   return newUser;
// }

// module.exports = { getAll, getById, create };

module.exports = (modelRegistry) => {
  // Define the model as a plain JavaScript object
  return {
    getAll() { return users;  },
    getById(id) { return users.find(u => u.id === id) || null; },
    create(name) {
      const newUser = { id: users.length + 1, name };
      users.push(newUser);
      return newUser;
    }
  };

  return Model1;
};