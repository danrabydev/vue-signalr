"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.log = function () { };
            this.dir = function () { };
            this.table = function () { };
        }
    }
    Log.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.enabled && console.log.apply(console, args);
    };
    Log.prototype.dir = function (obj, options) {
        this.enabled && console.dir(obj, options);
    };
    Log.prototype.table = function (obj) {
        this.enabled && console.table(obj);
    };
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=Log.js.map