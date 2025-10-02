var express = require('express');
var router = express.Router();
var users = require("../modules/users/routes/userRoutes");
var posts = require("../modules/posts/routes/postRoutes");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/users', users);

router.use('/posts', posts);
module.exports = router;
