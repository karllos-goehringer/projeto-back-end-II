module.exports = function(app){
    app.get('/noticias', function(req,res){
        app.app.controllers.principais_noticias.principais_noticias(app,req,res);
    });

app.get('/noticia', function(req, res) {
      const id_noticia = req.query.id_noticia;
    app.app.controllers.noticia.noticia(app, req, res, id_noticia);
});

    app.get('/principaisnoticias', function(req,res){
        app.app.controllers.principais_noticias.principais_noticias(app,req,res);
    });
}