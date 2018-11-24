function PresentDatabase(base){
    var html = "";
    html += PresentHeader(base);        	
    html += PresentRows(base);		    
    return html;
}

function PresentHeader(base){
    var headerHtml = "<div class='row navigation-header'>";
    base.headers.forEach(function (item) {	
        if(item.toLowerCase().indexOf("id") == -1)
        headerHtml +="<div class='col-" + base.colWidth + "'>" + item + "</div>"; 
    });
    headerHtml +="</div>"	
    return headerHtml;
}

function PresentRows(base){
    var supplantRows = "<div class='row navigation-row'>";
    base.headers.forEach(function (header) {
        if(!header.IsIdHeader()) {
            supplantRows += "<div class='col-" + base.colWidth + "'>{" + header + "}</div>";
        }
    });
    supplantRows += "</div>"; 
    return base.db().supplant(supplantRows);
}