module.exports = function(app){
app.get('/add',function(req,res){
     res.render('admin/form_add_noticia',{validacao:{}, noticia:{}, flagAdmin: req.session.autorizado });
})

app.post('/noticias/salvar', function(req, res) {
 app.app.controllers.admin.noticias_salvar(app,req,res);
})
app.get('/sair',function(req,res){
     app.app.controllers.admin.sair(app,req,res);
})
}
