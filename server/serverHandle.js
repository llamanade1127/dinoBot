const client = require('ftp');
const fs = require('fs');
module.exports = {
    
    startServer: function (host, user, password, port) {connect(host, user, password, port)},
    uploadFiles: function (file, path) {uploadFiles(file, path)},
    close: function() {closeServer()},
    getFiles: function(path) {getFiles(path)}
    
}
ftpClient = new client();

ftpClient.on('ready', () => {
    //getFiles(`/TheIsle/Saved/PlayerData/76561198069606575.json`, '76561198069606575' )
    console.log('Server online!');
});
function uploadFiles(filepath, localFile) {
    ftpClient.put(localFile, filepath, (err) => {
        if(err) console.log(err);
    });
}

function connect(host, user, password, port){
    ftpClient.connect( {
        'host': host,
        'user': user,
        'password': password,
        'port': port
    });
}

function closeServer(){
    ftpClient.close();
}

function getFiles(path, steamId){
    console.log('Fetching files!');
    ftpClient.get(path, (err, stream) => {
        if(err) console.log(err);
        fs.writeFile(`./client/tempFiles/${steamId}.json`, '', (err) => {if(err) console.log(err); return;});
        stream.pipe(fs.createWriteStream(`./client/tempFiles/${steamId}.json`));
        return;
    });
}