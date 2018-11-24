// data storage config
var databases = [
    InitDatabase("dbTopLevel"),
    InitDatabase("dbMidLevel"),
    InitDatabase("dbIndicators")
];

function loadData(){
    return new Promise((resolve) => {
        storeCsvAsDb("Data/toplevel.csv", getDbByName("dbTopLevel")).then(() =>        
        storeCsvAsDb("Data/midlevel.csv", getDbByName("dbMidLevel"))).then(() =>
        storeCsvAsDb("Data/indicators.csv", getDbByName("dbIndicators")))
        .then(() => { 
            resolve(); });  
    });
}

function InitDatabase(name){
    return {
        name:name,
        db:TAFFY(),
        displayDb:TAFFY(),
        headers:[],
        colWidth:0,
        orderBy:"",
        orderDesc:true,
        filter:""
    }
}

function storeCsvAsDb(path, db){    
    return new Promise((success, error) => {
      try {
          $.ajax({url:path,dataType:"text",
            success:function(data)
                {
                    mapCsvToDataStructure(data, db)
                    .then(() => success(db));}
            });            
      } catch (ex) {
          error(ex);
        }
  });
}

function mapCsvToDataStructure(data, base){
    return new Promise((resolve, reject) => {
        try {
            var rows = data.split(/\r?\n|\r/);
            var headers = rows[0].split(";");

            base.colWidth = Math.floor(12 / countNonIdHeaders(headers));

            base.headers = headers;

            for (i = 1; i < rows.length; i++) {
                var insertString = "{";
                var items = rows[i].split(";");

                for (j = 0; j < items.length; j++) { 
                    insertString += '"' + headers[j] + '"' + ":" + '"' + items[j] + '"';
                    if(j < items.length - 1) insertString += ",";
                }   
                insertString += "}";
                base.db.insert(insertString);
            };       
            // we only use display db from now on  
            // in order to work from memory
            base.displayDb = base.db;     
            resolve(base);                      
        } catch (error) {
            reject(error);
        }
    });
}


       