String.prototype.IsIdHeader = function () {
    return this.toLowerCase().indexOf("id") != -1;
};

String.prototype.IsMetaHeader = function () {
    return this.toLowerCase().indexOf("_") != -1;
};