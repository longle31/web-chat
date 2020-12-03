// Make connection
var socket = io();

var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value,
    });
    message.value = '';
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
})

message.addEventListener('keyup', (e)=>{
  
    if(e.keyCode === 13){
        e.preventDefault();

        btn.click();
    }
})

socket.on('chat', data =>{
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' +data.handle +':</strong> '+data.message+'</p>';
    
});

socket.on('typing', data =>{
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>'
})