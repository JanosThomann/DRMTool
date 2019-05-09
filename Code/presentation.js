function presentDatabase(base){
    var html = "";
    html += presentHeader();        	
    html += presentRows(base);		
    $('#indicatorList').html(html);
}

function presentDetail(indicatorCode){

    loadData().then(function() {
        var html = "";
        console.log(indicatorCode)
        var indicator = database.data().filter({"Code":indicatorCode}).first();
        Object.keys(indicator).forEach(function(attr) {
            if(attr.substring(0, 1) !== "_"){
                html += detailPropertyTemplate(attr, indicator[attr]);
            }
        });  
        $("#detail").html(html);   
    });      
}

function presentHeader(){
    var stair = getStair();
    if(stair){
        $("#listHeader").html("indicators for stair " + wrapQuotes(stair));
    }
    else{
        $("#listHeader").html("full indicator list");
    }   
    return headerTemplate();
}

function getOrderEvent(columnname){
    return "onclick=orderData(" + wrapQuotes(columnname) + ")";
}

function presentRows(base){
    
    var orderDirection = base.orderDesc ? " logicaldesc" : " logical";

    if(base.orderBy != ""){  
        base.data.sort(base.orderBy + orderDirection)
    }   

    var query = base.data(function () {        
        // //filtering search bar
        if((this.Code.toLowerCase().indexOf(base.filter.toLowerCase()) != -1 || this.Indicator.toLowerCase().indexOf(base.filter.toLowerCase()) != -1) && 
        (this._RiskStair === getStair() || !getStair())) {
            return true;
        }
        else{
            return false;
        }
    });
    if(query.count()==0) return noRecordsTemplate();
    return query.supplant(rowTemplate());
}

function getDetail(id){
    window.location = 'detail.html?code=' + id;
}