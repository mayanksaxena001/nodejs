// Retrieve
import Todo from '../model/Todo';

export const  update=(todo, id)=> {
    return Todo.findOneAndUpdate({ _id: id }, todo, { new: true }).exec();
};
export const  remove=(id)=> {
    return Todo.remove({ _id: id }, callback);
};
export const  getById=(id)=>{
    return Todo.findOne({ _id: id }, callback);
};
export const  getAll=()=>{
    return Todo.find(callback);
};
export const  create=(todo)=> {
    const _todo = new Todo(todo);
    return _todo.save(callback);
};
function callback(err, doc) {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log("Inside callback");
}