"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHubConfig = void 0;
var events_1 = require("events");
var SignalR = __importStar(require("@microsoft/signalr"));
var HubEvents_1 = require("./HubEvents");
exports.defaultHubConfig = {
    autoReconnect: true,
    requiresAuthentication: false,
    listeners: {},
};
var Hub = /** @class */ (function (_super) {
    __extends(Hub, _super);
    function Hub(vue, urlBase, name, options, log) {
        if (options === void 0) { options = exports.defaultHubConfig; }
        var _this = _super.call(this) || this;
        _this.socket = null;
        _this.listening = [];
        _this.initialized = false;
        _this.paused = false;
        _this.connected = false;
        _this.vue = vue;
        _this.log = log;
        _this.name = name;
        _this.urlBase = urlBase;
        _this.options = Object.assign({}, exports.defaultHubConfig, options);
        if (!_this.options.requiresAuthentication)
            _this.init();
        _this.on(HubEvents_1.HUB_STARTED, function () {
            log.log("Event: " + HubEvents_1.HUB_STARTED);
            _this.connected = true;
        });
        _this.on(HubEvents_1.HUB_STOPPED, function () {
            log.log("Event: " + HubEvents_1.HUB_STOPPED);
            _this.connected = false;
        });
        return _this;
    }
    Hub.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.listeners)
                            return [2 /*return*/];
                        if (!this.socket) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stop()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.socket = this.buildSocket();
                        this.initialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Hub.prototype.buildSocket = function () {
        var _this = this;
        var builder = new SignalR.HubConnectionBuilder().withUrl(this.urlBase + "/" + this.name);
        this.options.autoReconnect && builder.withAutomaticReconnect();
        var connection = builder.build();
        var methods = Object.keys(this.options.listeners);
        methods.forEach(function (listener) {
            if (_this.listening.includes(listener))
                return;
            _this.once(HubEvents_1.HUB_STARTED, function () {
                var _a;
                _this.listening.push(listener);
                (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.on(listener, function () {
                    var _a;
                    var data = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        data[_i] = arguments[_i];
                    }
                    (_a = _this.options.listeners[listener]).call.apply(_a, __spreadArrays([_this.vue], data));
                });
            });
        });
        return connection;
    };
    Hub.prototype.start = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.start())];
                    case 2:
                        _b.sent();
                        this.emit(HubEvents_1.HUB_STARTED);
                        return [2 /*return*/];
                }
            });
        });
    };
    Hub.prototype.send = function (methodName) {
        var _a;
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log.log({ type: 'send', methodName: methodName, args: args });
        if (this.socket) {
            (_a = this.socket).send.apply(_a, __spreadArrays([methodName], args));
            return;
        }
        this.once(HubEvents_1.HUB_STARTED, function () { var _a; return (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.send.apply(_a, __spreadArrays([methodName], args)); });
    };
    Hub.prototype.invoke = function (methodName) {
        var _a;
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.log.log({ type: 'invoke', methodName: methodName, args: args });
        if (this.socket) {
            return (_a = this.socket).invoke.apply(_a, __spreadArrays([methodName], args));
        }
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.once(HubEvents_1.HUB_STARTED, function () { var _a; return resolve((_a = _this.socket) === null || _a === void 0 ? void 0 : _a.invoke.apply(_a, __spreadArrays([methodName], args))); })];
            });
        }); });
    };
    Hub.prototype.stop = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.stop())];
                    case 1:
                        _b.sent();
                        this.socket = null;
                        this.listening = [];
                        this.emit(HubEvents_1.HUB_STOPPED);
                        return [2 /*return*/];
                }
            });
        });
    };
    Hub.prototype.authenticate = function () { };
    return Hub;
}(events_1.EventEmitter));
exports.default = Hub;
//# sourceMappingURL=Hub.js.map