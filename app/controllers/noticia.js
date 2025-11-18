module.exports.noticia = function(app, req, res, id_noticia){
    const connection = app.config.dbconnection();
    var noticiaModel = new app.app.models.mancheteModels(connection);
    noticiaModel.getNoticia(id_noticia, connection, function(error, result){
        if(error){
            console.log(error);
            res.status(500).send("Erro ao buscar notícia");
            return;
        }
        res.render('noticias/noticia', { JNoticias: result,flagAdmin: req.session.autorizado });
    });
}