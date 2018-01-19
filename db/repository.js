// Retrieve
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
//db.dropDatabase();
var todoSchema = new Schema(
    {
        index: {type:Number, default:0},
        description: { type: String, required: true, max: 150 },
        createdDate: { type: Date, default: Date.now },
        lastDate: { type: Date, default: Date.now },
        owner: { type: String, required: true }
    }
    );
var counterSchema = new Schema({
    id: { type:String, required:true}, 
    seq:{type:Number,default:0}
});
mongoose.connect('mongodb://localhost:27017/todoDb', function (err, db) {
    if (err)
        console.log(err);
    else {
        console.log("Connected to MongoDB");
    }
}
);
//Export model
var Todo = mongoose.model('Todo', todoSchema,"Sample_Todo");

var Counter = mongoose.model('Counter', counterSchema, 'Counters');

//remove all the documents on start
db.collections.Sample_Todo.remove({}, callback);
db.collections.Counters.remove({}, callback);
db.collections.Counters.insert(
    {
        id: 'index',
        seq: 0
    }
    );

todoSchema.post('save', function (doc) {
    console.log('this fired after a document was saved ',doc);
});

//todoSchema.pre('save', function (next) {
//    var doc = this;
//    Counter.findByIdAndUpdate(
//        {_id:'index'},
//        { $inc: { seq: 1 } },
//        function (error,counter) {
//            if (error) return next(error);
//            doc.index = counter.seq;
//            next();
//        });
//});
module.exports.Mongodb = function () {
this.update=function(todo,id){
    //mongoDbObj.todo_items.update({index:id},todo,{w:1},callback);
        return Todo.findOneAndUpdate({ index: id },todo,{new:true},callback);
};
this.delete = function (id) {
    //mongoDbObj.todo_items.remove({index:id},todo,{w:1},callback); 
    return Todo.remove({ index: id }, callback);
};
this.getById = function (id) {
    //return mongoDbObj.todo_items.find({index:id}).toArray(callback);
    return Todo.findOne({ index: id }, callback);     
};
this.getAll = function () {
    //return mongoDbObj.todo_items.find().toArray(callback);
     return Todo.find(callback);
};
this.post = function (todo) {
    //mongoDbObj.todo_items.insert(todo,{w:1},callback);
    var _todo = new Todo(todo);
    var value = getNextIndexIdFromCounter();
    value.exec(function (err, doc) {
        if (err) throw err;
    _todo.index = doc.seq;
    _todo.save(callback);
    });
};
}
var callback = function (err, doc) {
    if (err) {
        console.error(error);
        throw err;
    }
        console.log(doc);
}

var getNextIndexIdFromCounter = function () {
     return Counter.findOne(
        { 'id':'index'} ,
        //{ $inc: { seq: 1 } },
        //{ new: true },
        function (err, doc) {
            doc.seq=doc.seq+1;
            doc.save();
        });
}
