function storeCsvAsDb(path, db){    
    return new Promise(function (resolve, reject) {
      try {
          $.ajax({url:path,dataType:"text",
            success:function(data)
                {
                    mapCsvToDataStructure(data, db)
                    .then(function () {resolve(db)});}
            });            
      } catch (ex) {
            reject(ex);
        }
  });
}

function mapCsvToDataStructure(data, base){
    return new Promise(function (resolve, reject) {
        try {
            var rows = data.split(/\r?\n|\r/);
            var headers = rows[0].split(";");

            base.colWidth = Math.floor(12 / countNonIdHeaders(headers));

            base.headers = headers;

            for (i = 1; i < rows.length; i++) {
                var insertString = "{";
                var filterString = '"FILTER":"';
                var items = rows[i].split(";");

                for (j = 0; j < items.length; j++) { 
                    insertString += '"' + headers[j] + '"' + ":" + '"' + items[j] + '",';
                    filterString += items[j];
                }   

                insertString += filterString + '"}';
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


       