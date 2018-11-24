// data storage config
var dbTopLevel = {
    db:TAFFY(),
    headers:[],
    colWidth:2
};

var dbMidLevel = {
    db:TAFFY(),
    headers:[],
    colWidth:2
};

var dbIndicators = {
    db:TAFFY(),
    headers:[],    
    colWidth:2
};

function loadData(){
    return new Promise((resolve) => {
        storeCsvAsDb("Data/toplevel.csv", dbTopLevel).then(() =>
        storeCsvAsDb("Data/midlevel.csv", dbMidLevel).then(() =>
        storeCsvAsDb("Data/indicators.csv", dbIndicators)))
        .then(() => { resolve(); });  
    });
}

function storeCsvAsDb(path, db){    
    return new Promise((success, error) => {
      try {
          $.ajax({url:path,dataType:"text",
            success:function(data)
                {mapCsvToDataStructure(data, db).then(() => success(db));}
            });            
      } catch (ex) {
        error();
      }
  });
}

function mapCsvToDataStructure(data, base){
    return new Promise((resolve, reject) => {
        try {
            var rows = data.split(/\r?\n|\r/);
            var headers = rows[0].split(";");

            base.colWidth = Math.floor(12 / CountNonIdHeaders(headers));

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
            resolve(base);                      
        } catch (error) {
            reject(error);
        }
    });
}


       