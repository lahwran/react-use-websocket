"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var socket_io_1 = require("./socket-io");
var attach_listener_1 = require("./attach-listener");
var constants_1 = require("./constants");
var create_or_join_1 = require("./create-or-join");
var ReadyStateEnum;
(function (ReadyStateEnum) {
    ReadyStateEnum[ReadyStateEnum["Connecting"] = 0] = "Connecting";
    ReadyStateEnum[ReadyStateEnum["Open"] = 1] = "Open";
    ReadyStateEnum[ReadyStateEnum["Closing"] = 2] = "Closing";
    ReadyStateEnum[ReadyStateEnum["Closed"] = 3] = "Closed";
})(ReadyStateEnum = exports.ReadyStateEnum || (exports.ReadyStateEnum = {}));
exports.useWebSocket = function (url, options) {
    if (options === void 0) { options = constants_1.DEFAULT_OPTIONS; }
    var _a = react_1.useState(null), lastMessage = _a[0], setLastMessage = _a[1];
    var _b = react_1.useState({}), readyState = _b[0], setReadyState = _b[1];
    var webSocketRef = react_1.useRef(null);
    var retryCount = react_1.useRef(0);
    var staticOptionsCheck = react_1.useRef(null);
    var convertedUrl = react_1.useMemo(function () {
        if (options.fromSocketIO) {
            return socket_io_1.parseSocketIOUrl(url);
        }
        return url;
    }, [url]);
    var sendMessage = react_1.useCallback(function (message) {
        webSocketRef.current && webSocketRef.current.send(message);
    }, []);
    var start = react_1.useCallback(function () {
        create_or_join_1.createOrJoinSocket(webSocketRef, convertedUrl, setReadyState, options);
        return attach_listener_1.attachListeners(webSocketRef.current, convertedUrl, {
            setLastMessage: setLastMessage,
            setReadyState: setReadyState,
        }, options, start, retryCount);
    }, [webSocketRef, convertedUrl, setReadyState]);
    react_1.useEffect(start, [convertedUrl]);
    react_1.useEffect(function () {
        if (staticOptionsCheck.current)
            throw new Error('The options object you pass must be static');
        staticOptionsCheck.current = true;
    }, [options]);
    var readyStateFromUrl = readyState[convertedUrl] !== undefined ? readyState[convertedUrl] : constants_1.READY_STATE_CONNECTING;
    return [sendMessage, lastMessage, readyStateFromUrl, start];
};
//# sourceMappingURL=use-websocket.js.map