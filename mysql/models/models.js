import Promise from 'bluebird';
import { Todo } from './todo.model';
import { User } from './user.model';
import sequelize from '../../config/database.seq.config';

const user = new User(sequelize).user;
const todo = new Todo(sequelize).todo;

todo.belongsTo(user,{foreignKey: 'user_id', targetKey: 'id',onDelete:'CASCADE'});
// user.hasMany(todo,{foreignKey: 'user_id',sourceKey: 'id',onDelete:'CASCADE'});
sequelize.sync({ force: false });
export { todo, user };