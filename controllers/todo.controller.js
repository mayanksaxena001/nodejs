import TodoRepository from '../mysql/db/todo.repository';
const repo = new TodoRepository();
export default class TodoController {
    constructor() { }

    default_req(req, res, callback) {
        console.log('default gateway | api : ', req.method, req.url);
        callback();
    }
    validation_req(req, res, callback, id) {
        console.log('Doing id validations on ' + id);
        req.id = id;
        callback();
    }

    get_req(req, res) {
        repo.getAll().then((todos) => { res.status(200).json(todos); })
            .catch((err) => { res.status(422).send(err); });
    }
    get_by_id_req(req, res) {
        const id = req.id;
        repo.getById(id).then((todo) => { res.redirect('back') })
            .catch(() => { res.sendStatus(422); });;
    }
    post_req(req, res) {
        const todo = req.body;
        todo.user_id=req.user.id;
        repo.create(todo).then(() => { res.redirect('back'); })
            .catch((err) => { res.status(422).send(err); });
    }
    put_req(req, res) {
        const todo = req.body;
        const id = req.id;
        repo.update(todo, id).then(() => { res.sendStatus(200); })
            .catch(() => { res.sendStatus(422); });;
    }
    del_req(req, res) {
        const id = req.id;
        repo.remove(id).then(() => { res.redirect('back'); })
            .catch(() => { res.sendStatus(422); });;
    }

    getAllTodosForUser(user) {
        if (!user) {
            return null;
        }
        return repo.getAllTodosForUser(user.id);
    }

}
