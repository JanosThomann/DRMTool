
function orderData(dbName, columnName){
    var base = getDbByName(dbName);

    if  (base.orderBy === columnName) {base.orderDesc = !base.orderDesc;}
    else{base.orderBy=columnName;}

    $("#data").html(presentDatabase(base));
}

function filterData(filter){

    databases.forEach(function (db) {
        db.filter = filter;
    });
    $("#data").html(presentDatabase(currentDatabase));
}