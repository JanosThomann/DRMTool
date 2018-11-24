function countNonIdHeaders(headers){
    var count= 0;
    headers.forEach(function (header) {
        if(!header.IsIdHeader()) count++;
    });
    return count;
}

function getDbByName(name) {   
    return findObjectByKey(databases, 'name', name);
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