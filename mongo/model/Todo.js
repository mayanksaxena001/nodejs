import mongoose from 'mongoose';
import Promise from 'bluebird';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const todoSchema = new mongoose.Schema(
    {
        // index: {type:Number, default:0},
        description: {
            type: String,
            required: true,
            max: 150
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        lastDate: {
            type: Date,
            default: Date.now
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: String,
            required: true
        }
    }
);


// todoSchema.post('save', function (doc) {
//     console.log('this fired after a document was saved ', doc);
// });
todoSchema.plugin(AutoIncrement, {inc_field: 'id'});
todoSchema.pre('save', function (next) {
    console.log('this fired before a document was saved ');
    next();
});
mongoose.Promise=Promise;
//Export model
export default mongoose.model('Todo', todoSchema, 'Todo');