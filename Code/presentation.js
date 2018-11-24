function presentDatabase(base){
    var html = "";
    html += presentHeader(base);        	
    html += presentRows(base);		    
    return html;
}

function presentHeader(base){
    var headerHtml = "<div class='row navigation-headers'>";
    base.headers.forEach(function (item) {	
        if(item.toLowerCase().indexOf("id") == -1)
        headerHtml += 
        "<div class='navigation-header col-" + base.colWidth + "'" + 
        "onclick=orderData(" + 
        wrapQuotes(base.name) + "," + 
        wrapQuotes(item) + ")>" + item + 
        "</div>"; 
    });
    headerHtml +="</div>"	
    return headerHtml;
}

function presentRows(base){
    var rowTemplate = "<div class='row navigation-row'>";
    base.headers.forEach(function (header) {
        if(!header.IsIdHeader()) {
            rowTemplate += "<div class='col-" + base.colWidth + "'>{" + header + "}</div>";
        }
    });
    rowTemplate += "</div>";
    var orderDirection = base.orderDesc ? " desc" : " asec";

    if(base.orderBy != ""){  
        base.displayDb.sort(base.orderBy + orderDirection)
    }    
    return base.displayDb().supplant(rowTemplate);
}

function orderData(dbName, columnName){
    var base = getDbByName(dbName);

    if(base.orderBy === columnName){
        console.log("flipping from desc = ", base.orderDesc, "to", !base.orderDesc);
        base.orderDesc = !base.orderDesc;
    }
    else{
        base.orderBy=columnName;
    }

    $("#body").html(presentDatabase(base));
}