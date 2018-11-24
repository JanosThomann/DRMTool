// data storage config
var databases = [
    InitDatabase("dbTopLevel"),
    InitDatabase("dbMidLevel"),
    InitDatabase("dbIndicators")
];

var currentDatabase;

function loadData(){
    return new Promise(function (resolve){
        storeCsvAsDb("Data/toplevel.csv", getDbByName("dbTopLevel")).then(function (){       
        storeCsvAsDb("Data/midlevel.csv", getDbByName("dbMidLevel"))}).then(function (){
        storeCsvAsDb("Data/indicators.csv", getDbByName("dbIndicators"))})
        .then(() => { resolve(); });  
    });
}

function InitDatabase(name){
    return {
        name:name,
        db:TAFFY(),
        headers:[],
        colWidth:0,
        orderBy:"",
        orderDesc:true,
        filter:""
    }
}