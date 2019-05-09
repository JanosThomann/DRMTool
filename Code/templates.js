function rowTemplate(){

    return  "<div class='row navigation-row' onclick='getDetail(" + wrapQuotes('{Code}') + ")'>" +
                "<div class='col-2'style='border-right: 5px solid {_color}; font-size:20px; font-weight: 600;'> {Code}" + 
                    "<div style='display:inline;' data-balloon='standard indicator' data-balloon-pos='down'>" +
                        "<i class='fa fa-exclamation indicatorHint tinyIcon isStandardIndicator-{_isStandardIndicator}'></i>" + 
                    "</div>" + 
                "</div>" + 
                "<div class='col-10 indicator-card hvr-fade'>" +
                    "<b>{Indicator}</b>" +
                    "<br><hr>{Description}" +
                "</div>" +       
            "</div>";
        }
     
function noRecordsTemplate(){
    return "<center>" + 
                "<p  class='text'>sorry, no indicators match your search!</p>" +
                "<hr style='width:600px;'>" +
                "<button  type='button' class='btn btn-outline-secondary ' onclick='clearFilters()'>clear filter</button>" +
            "</center>";
}
        
function headerTemplate(){
    return "<div class='row navigation-headers'>" + 
                "<div " + getOrderEvent('Code') + " class='navigation-header col-2'>Code</div>" +
                "<div " + getOrderEvent('Indicator') + " class='navigation-header col-10'>Indicator</div>" +
            "</div>";
}   

function detailPropertyTemplate(attr, val){
    return "<div class='row detailRow'>" + 
           "<div class='col-3 detailAttribute'>" + attr + "</div>" +
           "<div class='col-9 detailValue'>" + val + "</div>" +
            "</div>";
}