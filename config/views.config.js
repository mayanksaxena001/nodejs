import exphbs from 'exphbs'; 
export default (app) => {
    //For Handlebars
    app.set('views', __dirname + '/../views')
    app.engine('html', exphbs);
    app.set('view engine', '.html');
};