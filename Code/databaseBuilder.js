// data storage config
var databases = [
    InitDatabase("dbTopLevel", "", "dbMidLevel"),
    InitDatabase("dbMidLevel", "ParentId", "dbIndicators"),
    InitDatabase("dbIndicators", "ParentId", "")
];

var currentDatabase;

function loadData(){
    return new Promise(function (resolve){
        storeCsvAsDb("Data/toplevel.csv", getDbByName("dbTopLevel"))
        .then(function (){       
        storeCsvAsDb("Data/midlevel.csv", getDbByName("dbMidLevel"))})
        .then(function (){
        storeCsvAsDb("Data/indicators.csv", getDbByName("dbIndicators"))})
        .then(function () { resolve(); });  
    });
}

function InitDatabase(name, parentIdName, childDbName){
    return {
        name:name,
        db:TAFFY(),
        headers:[],
        colWidth:0,
        orderBy:"",
        orderDesc:true,
        filter:"",
        parentId:"",
        parentIdName:parentIdName,
        childDbName:childDbName
    }
}