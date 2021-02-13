const server = require('../server/serverHandle.js');
const {playerDataPath} = require('../config.json');
const fs = require('fs');
const ex = require('./exampleFile');

module.exports = {

    editFile: function(part, newValue, steamId, type, bReturn) {editFile(part, newValue, steamId, type, bReturn)},
    editPlayerData: function(discordId, valueToEdit, newValue, bReturn, type) {editPlayerData(discordId, valueToEdit, newValue, bReturn, type)},
    addClient: function(steamId, discordId) {addClient( steamId, discordId)},
    removeClient: function(discordId) {removeClient(discordId)}
}
function removeClient(discordId){
    fs.readFile('./clientData.json', (err, data) => {
        if(err) return console.error(err);
        var newJson = JSON.parse(data);
        delete newJson[discordId];
        fs.writeFile('./clientData.json', (err) => {});
    });
}
function addClient( steamId, discordId){
    var newObj = {
        "steamId": steamId,
        "souls": 100000,
        "boneBox": 1,
        "bIsSetUp": false,
        "currentDinos": 1
    }
    fs.readFile('./clientData.json', (err, data) => {
        var newJson = JSON.parse(data);
        newJson[discordId] = newObj;
        fs.writeFile('./clientData.json', JSON.stringify(newJson, null, 4),(err) => {});
    });
}
    /**
 * Edits the file on the server. Requires steamid
 * @param {Part of the file to edit. See exampleFile.js for what to put here} part 
 * @param {The new value of the index. If type is present if changes the value} newValue 
 * @param {steamId of the user. Is required} steamId 
 * @param {Type of math you want to chagne the value by. Ex: +} type 
 * @param {If you want to return the value.} bReturn 
 */
function editFile(part, newValue, steamId, type, bReturn){
    //Checks steam id, gets server files, read from that file, change value and save the file, upload it then delete it.
    if(!steamId) return console.log("must have a steam id!");
    server.getFiles(playerDataPath + steamId);
    fs.readFile('./tempFiles/' + steamId, (err, data) => {
        if(err) return console.error(err);
        var jsonPlayerData = JSON.parse(data);
        if(type){
            switch(type){
                case '*':
                return jsonPlayerData[part] *= newValue;
                case '+':
                return jsonPlayerData[part] += newValue;
                case '-':
                return jsonPlayerData[part] -= newValue;
                case '/':
                return jsonPlayerData[part] /= newValue;
                case '!':
                return jsonPlayerData[part] = !jsonPlayerData[part];
                default:
                return jsonPlayerData[part] = newValue
            }
        } else{
            sonPlayerData[part] = newValue;
        }
        fs.writeFile('./tempFiles/' + steamId, JSON.stringify(jsonPlayerData, null, 4), (err) => {});
        server.uploadFiles(playerDataPath+steamId, `./tempFiles/${steamId}`);
        fs.unlink(`./tempFiles/${steamId}`);
    }); 
}
/**
 * Edits the player data in the clientData.json
 * @returns {New value of the index}
 * @param {The id of the discord user} discordId 
 * @param {Value to edit in the clientData} valueToEdit 
 * @param {new value of data. If null returns value of the index of valueToEdit} newValue 
 * @param {If you want to return the value. If set to true and valueToEdit != null if returns the new value} bReturn 
 * @param {Type of data to change to, things like -, * ect.. if type is null it sets it to the valueToEdit} type
 */
function editPlayerData(discordId, valueToEdit, newValue, bReturn, type){
    fs.readFile(`./clientData.json`, (err, data) => {
        if(err) return console.error(err);

        var playerData = JSON.parse(data);

        if(bReturn){
            if(typeof newValue == 'undefined' || !newValue){
                return playerData[discordId][valueToEdit]
            } else{
                if(type){
                    switch(type){
                        case '*':
                        return playerData[discordId][valueToEdit] *= newValue;
                        case '+':
                        return playerData[discordId][valueToEdit] += newValue;
                        case '-':
                        return playerData[discordId][valueToEdit] -= newValue;
                        case '/':
                        return playerData[discordId][valueToEdit] /= newValue;
                        default:
                        return playerData[discordId][valueToEdit] = newValue;
                    }
                } else{
                    return playerData[discordId][valueToEdit] = type;
                }
            }

        } else{
            if(type){
                switch(type){
                    case '*':
                    playerData[discordId][valueToEdit] *= newValue;
                    case '+':
                    playerData[discordId][valueToEdit] += newValue;
                    case '-':
                    playerData[discordId][valueToEdit] -= newValue;
                    case '/':
                    playerData[discordId][valueToEdit] /= newValue;
                }
            } else{
                playerData[discordId][valueToEdit] = type;
            }
        }
    });
}