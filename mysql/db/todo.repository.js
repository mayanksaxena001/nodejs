import { todo } from '../models/models';
export default class TodoRepository {
    constructor() { }
    update(data, id) {
        return todo.find({ where: { id: id } }).then(t => t.update(data));
    };
    remove(id) {
        return todo.destroy({ where: { id: id } });
    };
    getById(id) {
        return todo.find({ where: { id: id } });
    };
    getAll() {
        return todo.find();
    };
    create(data) {
        if (!data.last_date) {
            data.last_date = new Date().now;
        }
        return todo.create(data);
    };
    getAllTodosForUser(id) {
        if (!id) {
            return null;
        }
        return todo.findAll({
            where: {
                user_id: id
            }
        })
    }

    findTodoByUserIdAndID(user_id, todo_id) {
        if (user_id && todo_id) {
            return todo.find({
                where: {
                    id: todo_id,
                    user_id: user_id
                }
            });
        }
    }
}