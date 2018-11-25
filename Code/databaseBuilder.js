// data storage config
var databases = [
    InitDatabase("dbTopLevel", "", "dbMidLevel"),
    InitDatabase("dbMidLevel", "TOPID", "dbIndicators"),
    InitDatabase("dbIndicators", "MIDID", "")
];

var currentDatabase;

function loadData(){
    return new Promise(function (resolve){
        storeCsvAsDb("Data/toplevel.csv", getDbByName("dbTopLevel")).then(function (){       
        storeCsvAsDb("Data/midlevel.csv", getDbByName("dbMidLevel"))}).then(function (){
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

function setChildQueryForDb(base, parentId){
    if(parentId == "") base.childQuery = "";
    
    var parentIdName = base.parentIdName;
    // if the parent id is empty (top tier) we have to set Id
    parentIdName = parentIdName == "" ? "ID" : parentIdName;
    console.log(parentIdName, parentId)
    
    var queryString = "{" + parentIdName +":{likenocase:" + parentId + "}}";
    console.log(queryString)
    //base.childQuery = JSON.parse(queryString);
    base.childQuery = queryString;
}