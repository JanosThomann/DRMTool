// data storage config
var database = InitDatabase();

function InitDatabase(){
    return {
        data:TAFFY(),
        headers:[],
        colWidth:0,
        orderBy:"",
        orderDesc:true,
        filter:""
    }
}

var currentDatabase;

function loadData(){
    InitDatabase();
    console.log('loading db...')
    return new Promise(function (resolve){
        resolve(storeIndicatorsAsDatabase(database));
    });
};

function storeIndicatorsAsDatabase(database){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/Data/indicators.xlsx', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e) {
            if (this.status == 200) {
                var arr = new Array();
                var data = new Uint8Array(xhr.response);
                for (var i = 0; i != data.length; ++i) {
                    arr[i] = String.fromCharCode(data[i]);
                }
                var bstr = arr.join("");
                var workbook = XLSX.read(bstr, {type: "binary"});
                var rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["indicators"]);
                database.headers = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["indicators"], {header:1})[0];
                for (var i = 1; i < rows.length; i++) {
                    var element = rows[i];   
                    database.data.insert(element);                   
                }
            };
            resolve(database);
        }
        xhr.send();
    });
}
