export default class LogoutController {
    constructor() { }

    logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    }
}