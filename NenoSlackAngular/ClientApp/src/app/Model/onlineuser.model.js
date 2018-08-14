"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OnlineUser = /** @class */ (function () {
    function OnlineUser(userId, userName, connectionIds, img, countUnread, IsOnline) {
        if (userId === void 0) { userId = 0; }
        if (userName === void 0) { userName = ''; }
        if (connectionIds === void 0) { connectionIds = []; }
        if (img === void 0) { img = ''; }
        if (countUnread === void 0) { countUnread = 0; }
        if (IsOnline === void 0) { IsOnline = false; }
        this.userId = userId;
        this.userName = userName;
        this.connectionIds = connectionIds;
        this.img = img;
        this.countUnread = countUnread;
        this.IsOnline = IsOnline;
    }
    return OnlineUser;
}());
exports.OnlineUser = OnlineUser;
//# sourceMappingURL=onlineuser.model.js.map