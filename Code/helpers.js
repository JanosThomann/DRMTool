function CountNonIdHeaders(headers){
    var count= 0;
    headers.forEach(header => {
        if(!header.IsIdHeader()) count++;
    });
    return count;
}
