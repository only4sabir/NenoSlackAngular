"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatDetail = /** @class */ (function () {
    function chatDetail(chatId, fromUserId, toUserId, createdOn, message, csscls, IsRead, img) {
        if (chatId === void 0) { chatId = 0; }
        if (fromUserId === void 0) { fromUserId = 0; }
        if (toUserId === void 0) { toUserId = 0; }
        if (createdOn === void 0) { createdOn = new Date(); }
        if (message === void 0) { message = ''; }
        if (csscls === void 0) { csscls = ''; }
        if (IsRead === void 0) { IsRead = true; }
        if (img === void 0) { img = ''; }
        this.chatId = chatId;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.createdOn = createdOn;
        this.message = message;
        this.csscls = csscls;
        this.IsRead = IsRead;
        this.img = img;
    }
    return chatDetail;
}());
exports.chatDetail = chatDetail;
//# sourceMappingURL=chatdetail.model.js.map