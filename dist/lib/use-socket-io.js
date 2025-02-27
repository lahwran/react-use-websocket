"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var use_websocket_1 = require("./use-websocket");
var constants_1 = require("./constants");
var emptyEvent = {
    type: 'empty',
    payload: null,
};
var getSocketData = function (event) {
    if (!event || !event.data) {
        return emptyEvent;
    }
    var match = event.data.match(/\[.*]/);
    if (!match) {
        return emptyEvent;
    }
    var data = JSON.parse(match);
    if (!Array.isArray(data) || !data[1]) {
        return emptyEvent;
    }
    return {
        type: data[0],
        payload: data[1],
    };
};
exports.useSocketIO = function (url, options) {
    if (options === void 0) { options = constants_1.DEFAULT_OPTIONS; }
    var optionsWithSocketIO = react_1.useMemo(function () { return (__assign({}, options, { fromSocketIO: true })); }, []);
    var _a = use_websocket_1.useWebSocket(url, optionsWithSocketIO), sendMessage = _a[0], lastMessage = _a[1], readyStateFromUrl = _a[2];
    return [
        sendMessage,
        react_1.useMemo(function () { return getSocketData(lastMessage); }, [lastMessage]),
        readyStateFromUrl,
    ];
};
//# sourceMappingURL=use-socket-io.js.map