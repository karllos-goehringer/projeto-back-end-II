const app = require("./config/server")
//const rotaHome = require('./app/routes/home')(app)
//const rotaNoticias = require('./app/routes/noticias')(app)
//const rotaAddNoticias = require('./app/routes/add_noticias')(app)
//const rotaPolitica = require('./app/routes/politica')(app)
//const rotaTecnologia = require('./app/routes/tecnologia')(app)
//const rotaEsporte = require('./app/routes/esporte')(app)

app.listen(3000,function(){
    console.log('Rodando.')
})

