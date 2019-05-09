function orderData(columnName){
    if  (database.orderBy === columnName) {database.orderDesc = !database.orderDesc;}
    else{database.orderBy=columnName;}

    $("#indicatorList").html(presentDatabase(database));
}

function filterData(filter){

    database.filter = filter;
    presentDatabase(database);
}

function clearFilters(){
    $("#filter").val('');
    database.filter = "";
    presentDatabase(database);
}

function navigateUp() { 
    presentDatabase(database);
}