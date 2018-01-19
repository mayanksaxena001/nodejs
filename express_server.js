var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var routes = require("./routes/router");
var login = require("./routes/login");
var router = express.Router();
app.use(router);
router.get("/",function (req, res, callback){
    res.sendFile(__dirname+"/index.html");
});
router.use("/api",routes.default_req);
router.param("id",routes.validation_req);
router.get("/api/", routes.get_req);
router.get("/api/:id", routes.get_by_id_req);
router.post("/api/todos", routes.post_req);
router.put("/api/todos/:id", routes.put_req);
router.delete("/api/todos/:id", routes.del_req);
router.use("/login",login.default_req);
app.route('/login')
    .get(login.get_req)
    .post(login.post_req);
app.use(function (err, req, res, next) {
    if (err) {
        console.error(err.stack);
  res.send(err);
}
else{
next();
}
})
var server = app.listen(8081,  ()=> {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});