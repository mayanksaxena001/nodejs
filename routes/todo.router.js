import TodoController from '../controllers/todo.controller';
import LoginController from '../controllers/login.controller';
let todo = new TodoController();
let login = new LoginController();
import express from 'express';
export const router = express.Router();
// default gateways
router.use("/", login.isLoggedIn, todo.default_req);
// validation of id
router.param("id", todo.validation_req);

//routing 
router.route('/todo')
    .get(todo.get_req)
    .post(todo.post_req);
router.route('/todo/:id')
    .get(todo.get_by_id_req)
    .put(todo.put_req)
    .delete(todo.del_req);