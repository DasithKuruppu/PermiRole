var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{Name:'dasith',age:5},{Name:'SB',age:1}]);
});
router.get('/wow', function(req, res, next) {
  res.send({user:'list'});
});
module.exports = router;
