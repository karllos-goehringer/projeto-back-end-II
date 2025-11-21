module.exports = function(connection) {
    this.getLogin = function(camposDeUsuario, callback) {
        const sql = "SELECT usuario FROM usuarios WHERE usuario = ? AND senha = ?";
        connection.query(sql, [camposDeUsuario.usuario, camposDeUsuario.senha], callback);
    };
    this.getNoticias = (connection,callback) =>{
        connection.query('SELECT id,titulo,texto,data_noticia,texto,img FROM manchetes',callback)
    };
    this.salvarNoticia = function(noticia,connection,callback){
        connection.query('INSERT INTO MANCHETES SET ?',noticia, callback)
    }
    this.getNoticia = function(id_noticia, connection, callback){
        connection.query('SELECT * FROM MANCHETES WHERE ID = ?', [id_noticia], callback);
}
    this.getTodasAsNoticias = function(connection,callback){
        connection.query('SELECT * FROM MANCHETES ORDER BY data_noticia DESC',callback)
    }
    this.getHome = function(connection,callback){
        connection.query('SELECT * FROM MANCHETES ORDER BY ID DESC LIMIT 5',callback)
    }

    return this;
}
