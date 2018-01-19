var _todo=require('../object/Todo');
var _repo=require('../db/repository');
var todo = new _todo.Todo();
var repo = new _repo.Mongodb();
module.exports.default_req=(req, res, callback)=>{
 console.log('default gateway | api : ',req.method,req.url);
callback();
}
module.exports.validation_req=(req, res, callback,id)=>{
     console.log('Doing id validations on ' + id);
    req.id = id;
callback();
}
module.exports.get_req =(req, res)=> {
    //res.json({"message" : "get request"});
    try{
        var methodReturn = repo.getAll();
        methodReturn.exec(function (err, doc) {
            if (err) throw err;
            res.status(200).send(doc);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
module.exports.get_by_id_req =(req, res)=> {
    //res.json({"message" : "get request"});
    try {
        var methodReturn = repo.getById(req.id);
        methodReturn.exec(function (err, doc) {
            if (err) throw err;
            if (doc == null) {
                res.status(404).send('No Document Found');
            } else {
            res.status(200).send(doc);
            }
        });   
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}
module.exports.post_req = (req, res) =>{
    try {
        repo.post(req.body);
            res.status(200).send("Added Successfully ");       
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}
module.exports.put_req=(req, res)=>{
    try {
        var methodReturn = repo.update(req.body,req.id);
        methodReturn.exec(function (err, doc) {
            if (err) throw err;
            res.status(200).send("Success");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}
module.exports.del_req=(req, res)=>{
    //res.json({"message" : "del request"});
    try {
        var methodReturn = repo.delete(req.id);
        methodReturn.exec(function (err, doc) {
            if (err) throw err;
            res.status(200).send("Success");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}
//var toJson = function(obj) {
//    return JSON.stringify(obj);
//}


