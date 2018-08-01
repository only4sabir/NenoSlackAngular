// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message, senderId) => {
    console.log(user);
    console.log(message);
    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = msg;//user + " says " + msg;
    addMessage(senderId, msg);
    //const li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);
});

//console.log('satar');
//connection.start().catch(err => console.error(err.toString()));

connection.start().then(res => {
    connection.invoke("ConnectUser", UserId, UserName, Img).catch(err => console.error(err.toString()));
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
    const user = "";// document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    if (message != '') {
        connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
        event.preventDefault();
    }
}
function addMessage(senderId, message) {
    //message = $(".message-input input").val();
    //if ($.trim(message) == '') {
    //    return false;
    //}
    var msgStatus = 'replies';
    if ($("#txtConnectionId").val() == senderId) {
        msgStatus = 'sent';
    }
    console.log(senderId);
    $('<li class="' + msgStatus + '"><img src="/images/user/sabir.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('#messageInput').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};