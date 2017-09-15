"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findObject(source, obj, findAll, findAllResults) {
    var result, index, key, root;
    if (findAll && !findAllResults) {
        findAllResults = [];
        root = true;
    }
    if (Array.isArray(source)) {
        for (index in source) {
            result = findObject(source[index], obj, findAll, findAllResults);
            if (result && !findAll) {
                return result;
            }
        }
        return root && findAllResults && findAllResults.length
            ? findAllResults
            : undefined;
    }
    if (typeof source !== 'object') {
        return;
    }
    if (source && Object.keys(obj).every(function (key) {
        var val = obj[key];
        return source.hasOwnProperty(key) && (val === Object || val === source[key]); // if Object is the value, find all by key
    })) {
        if (findAll && findAllResults) {
            findAllResults.push(source);
        }
        else {
            return source;
        }
    }
    else {
        for (key in source) {
            result = findObject(source[key], obj, findAll, findAllResults);
            if (result) {
                if (!findAll) {
                    return result;
                }
            }
        }
    }
    return findAll && root ? findAllResults : undefined;
}
function findFirst(dataSource, obj) {
    return findObject(dataSource, obj);
}
exports.findFirst = findFirst;
function findAll(dataSource, obj) {
    return findObject(dataSource, obj, true);
}
exports.findAll = findAll;
//# sourceMappingURL=find-object.js.map