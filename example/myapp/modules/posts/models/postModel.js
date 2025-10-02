const posts = [
  { id: 1, userId: 1, title: "Hello World" },
  { id: 2, userId: 2, title: "My First Post" }
];

function getAll() { return posts; }
function getByUser(userId) { return posts.filter(p => p.userId === userId); }
function create(userId, title) {
  const newPost = { id: posts.length + 1, userId, title };
  posts.push(newPost);
  return newPost;
}

module.exports = { getAll, getByUser, create };