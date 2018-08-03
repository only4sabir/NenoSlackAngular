﻿// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:
var UserId = $("#SenderUserId").val();
var UserName = $("#SenderUserName").val();//'sabir';
var Img = $("#SenderImg").val();//'sabir.jpg';
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (UserId, message, lstOnlineUserId) => {

    if (lstOnlineUserId != undefined && lstOnlineUserId != null) {
        lstOnlineUserId = lstOnlineUserId.replace(/#/g, ',#');
        lstOnlineUserId = "#liReceiverUserId" + lstOnlineUserId;
        ///alert(lstOnlineUserId);
        $(lstOnlineUserId).addClass('online');
    }
    else {
        console.log(UserId);
        console.log(message);
        const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const encodedMsg = msg;//user + " says " + msg;
        addMessage(UserId, msg);
    }

    //UserId = $("#SenderUserId").val();

    //const li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);
});
$(document).ready(function () {
    setTimeout(function () {
        UserId = $("#SenderUserId").val();
        UserName = $("#SenderUserName").val();//'sabir';
        Img = $("#SenderImg").val();//'sabir.jpg';
        connection.invoke("ConnectUser", UserId, UserName, Img).catch(err => console.error(err.toString()));
    }, 500);
});

//console.log('satar');
//connection.start().catch(err => console.error(err.toString()));

connection.start().then(res => {
    //connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
}).catch(err => console.error(err.toString()));
//console.log('end');

//document.getElementById("sendButton").addEventListener("click", event => {
//    const user = "";// document.getElementById("userInput").value;
//    const message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
//    event.preventDefault();
//});
//document.getElementById("sendp").addEventListener("click", event => {
//    debugger;
//    const user = "";//document.getElementById("userInput").value;
//    const message = document.getElementById("messageInput").value;
//    const messagep = document.getElementById("messagep").value;
//    connection.invoke("Send", user, message, messagep).catch(err => console.error(err.toString()));
//    event.preventDefault();
//});
function sendMessage() {

    UserId = $("#SenderUserId").val();
    var ReceiverUserId = $("#ReceiverUserId").val();
    //const user = "";// document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    if (message != '') {
        connection.invoke("SendMessage", UserId, message, ReceiverUserId).catch(err => console.error(err.toString()));
        event.preventDefault();
    }
}
function addMessage(UserId, message) {
    //message = $(".message-input input").val();
    //if ($.trim(message) == '') {
    //    return false;
    //}
    var msgStatus = 'replies';
    if ($("#SenderUserId").val() == UserId) {
        msgStatus = 'sent';
    }
    //console.log(senderId);
    $('<li class="' + msgStatus + '"><img src="/images/user/sabir.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('#messageInput').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};