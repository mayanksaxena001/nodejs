module.exports.default_req=(req, res, callback)=>{
 console.log('default gateway | login : ',req.method,req.url);
callback();
}

module.exports.get_req =(req, res, callback)=> {
 //res.json({"message" : "get request"});
res.send('Login Hello ' + req.name + '!');
}
module.exports.post_req=(req, res, callback)=>{
 res.json({"message" : "post request"});
}