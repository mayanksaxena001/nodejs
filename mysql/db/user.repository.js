import { user } from '../models/models';
export default class UserRepository {
    constructor() { }

    update(data, id) {
        return user.find({ where: { id: id } }).then(u => u.update(data));
    };
    remove(id) {
        return user.delete({ where: { id: id } });
    };
    getById(id) {
        return user.find({ where: { id: id } });
    };
    getAll() {
        return user.find();
    };
    create(data) {
        return user.create(data);
    };
    findByUserName(username) {
        return user.findOne({
            where: {
                username: username
            }
        })
    }
    
}