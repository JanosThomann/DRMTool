function countNonIdHeaders(headers){
    var count= 0;
    headers.forEach(function (header) {
        if(!header.IsIdHeader()) count++;
    });
    return count;
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function wrapQuotes(string){
    return '"' + string + '"';
}

function getStair(){
    return getUrlParameter('stair');
}

function getOutcome(){
    return getUrlParameter('outcome');
}
function getIndicatorCode(){
    return getUrlParameter('code');
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};