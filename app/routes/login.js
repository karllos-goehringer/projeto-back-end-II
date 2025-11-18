module.exports = function(app){
    app.post('/autenticar', function(req,res){
        app.app.controllers.admin.login_autenticar(app,req,res);
    })
    app.get('/login',function(req,res){
        app.app.controllers.admin.form_login(app,req,res);
    })
}
