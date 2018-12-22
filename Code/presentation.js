function presentDatabase(base){
    currentDatabase = base;
    var html = "";
    html += presentHeader(base);        	
    html += presentRows(base);		
    $('#data').html(html);
    console.log(html);
}

function presentHeader(base){
    var headerHtml = "<div class='row navigation-headers'>";
    base.headers.forEach(function (item) {	
    var css = "class='navigation-header col-" + base.colWidth + "' ";
    if(item.toLowerCase().indexOf("id") == -1)
        {headerHtml += 
            "<div " + css + getOrderEvent(base, item) + ">" + 
                item +
            "</div>";}});
    return headerHtml +="</div>";
}

function getOrderEvent(base, item){
    return "onclick=orderData(" + 
    wrapQuotes(base.name) + "," + 
    wrapQuotes(item) + ")";
}

function presentRows(base){

    var rowTemplate = 
    "<div class='row navigation-row' " + 
    "onclick='getChildren(" + wrapQuotes(base.name) + ", {ID})'>";

    base.headers.forEach(function (header) {
        if(!header.IsIdHeader()) {
            rowTemplate += "<div class='col-" + base.colWidth + "'>{" + header + "}</div>";
        }
    });
    rowTemplate += "</div>";
    var orderDirection = base.orderDesc ? " logicaldesc" : " logical";

    if(base.orderBy != ""){  
        base.db.sort(base.orderBy + orderDirection)
    }   

    var query = base.db(function () {
        
        //filtering search bar
        if(this.FILTER.toLowerCase()
        .indexOf(base.filter.toLowerCase()) == -1) 
        return false;

        //filtering parent ID
        var parentId = this[base.parentIdName];
        console.log(this, parentId, base.parentId)
        if(parentId && parentId != base.parentId) return false;        
        return true;
    });
    if(query.count()==0) return getNoRecordsInfo();

    return query.supplant(rowTemplate);

}

function getNoRecordsInfo(){
    return "<center>" + 
        "<p  class='text'>sorry, no data!</p>" +
        "<hr style='width:600px;'>" +
        "<button  type='button' class='btn btn-outline-secondary ' onclick='clearFilters()'>clear all filters</button>" +
        "<button  type='button' class='btn btn-outline-secondary ' onclick='navigateUp()'>navigate up</button>" +
    "</center>";
}

function getChildren(baseName, parentId){
    var base = getDbByName(baseName);
    if(base.childDbName == "") return;
    var childBase = getDbByName(base.childDbName);
    childBase.parentId = parentId;
    presentDatabase(childBase);
}