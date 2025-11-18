module.exports.form_add_noticia = function(app,req,res){
    if(req.session.autorizado){
        res.render("admin/form_add_noticia",{validacao:{}, noticia:{},flagAdmin: req.session.autorizado});
    }else{
        var erro=[];
        erro.push({
            msg: 'Usuário precisa fazer login!'
        })
        res.render("admin/form_login",{validacao: erro, flagAdmin: req.session.autorizado})
    }
}
module.exports.form_login = function(app,req,res){
    res.render("admin/form_login",{validacao:{},flagAdmin: req.session.autorizado})
}
module.exports.noticias_salvar = function(app,req,res){
    var noticia = req.body;
    req.assert('titulo','Titulo é obrigatório').notEmpty();
    req.assert('resumo','Resumo é obrigatório').notEmpty();
    req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor','Autor é obrigatório').notEmpty();
    req.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format:'YYYY-MM-DD'});
    req.assert('texto','Notícia é obrigatório').notEmpty();
    var erros = req.validationErrors();
    if(erros){
        res.render("admin/form_add_noticia",{validacao:erros, noticia:noticia});
        return;
    }
    var connection = app.config.dbconnection();
    var salvarNoticiaModel = new app.app.models.mancheteModels(connection);
    salvarNoticiaModel.salvarNoticia(noticia,connection,function(error,result){
        res.redirect('/principais-noticias');
    });
}
module.exports.login_autenticar = function(app, req, res) {
    var camposDeUsuario = req.body;
    req.assert('usuario','Usuário é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatório').notEmpty();
    var erros = req.validationErrors();
    if(erros){
        res.render("admin/form_login", { validacao: erros, flagAdmin: req.session.autorizado});
        return;
    }

    var connection = app.config.dbconnection();
    var autenticacao = new app.app.models.mancheteModels(connection);

autenticacao.getLogin(camposDeUsuario, function(error, result) {

    if (error) {
        console.log("Erro SQL:", error);
        return res.status(500).send("Erro no servidor.");
    }
    if (!result || result.length === 0) {
        const erro = [{ msg: 'Usuário ou senha incorretos!' }];
        return res.render("admin/form_login", { validacao: erro, flagAdmin: false });
    }
    req.session.user = result[0];
    req.session.autorizado = true;
    return res.redirect("/");
});
module.exports.sair = function(app,req,res){
    req.session.destroy(function(erro){
        res.redirect('/');
    })
}
}
