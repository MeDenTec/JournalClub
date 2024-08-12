function sendMessage() {
    const inputElement = document.getElementById('chat-input');
    const message = inputElement.value;
    if (message.trim() === '') {
        return;
    }
    
    
    addMessageToUI('user', message);
    inputElement.value = '';
    
    typingLoader()    
    const payload = { "message": message };
    
    fetch('https://journalclub-fad4adfta2f8b2hj.northeurope-01.azurewebsites.net/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data['choices'][0]['message']['content'])
        if (data && data['choices'][0]['message']['content']) {
            document.querySelector('.loader_message').remove();
            addMessageToUI('bot', marked.parse(data['choices'][0]['message']['content']));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToUI('bot', 'Sorry, something went wrong.');
    });
}

function addMessageToUI(sender, message) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    
    const messageContent = document.createElement('p');
    messageContent.innerHTML = message;
    messageElement.appendChild(messageContent);
    // create a button that says speech and when clicked, it will call the synthesizeSpeech function
    if (sender === 'bot') {
        // create image element and use mic.png

        const speechButton = document.createElement('button');
        speechButton.style.display = 'flex';
        speechButton.style.width = '100%';
        speechButton.style.backgroundColor = 'transparent';
        speechButton.style.border = 'none';
        speechButton.style.cursor = 'pointer';
        speechButton.style.justifyContent = 'left';

        const mic = document.createElement('img');
        mic.src = '../static/images/mic.png';
        mic.width = 25;
        mic.height = 25;
        speechButton.appendChild(mic);

        const mediaPlayerDiv = document.createElement('div');
        mediaPlayerDiv.id = 'mediaPlayer';
        mediaPlayerDiv.style.display = 'none';
        
        // Create the audio element
        const audioElement = document.createElement('audio');
        audioElement.id = 'audioPlayer';
        audioElement.controls = true;
        audioElement.style.webkit       
        // Append the audio element to the div
        mediaPlayerDiv.appendChild(audioElement);
        
        
        messageElement.appendChild(speechButton);
        messageElement.appendChild(mediaPlayerDiv);

        speechButton.addEventListener('click', function() {
            var speech_message = message;
            // remove html tags from message including #39; which is the code for apostrophe
            speech_message = speech_message.replace(/&#39;/g, "'")
            speech_message = speech_message.replace(/<[^>]*>?/gm, '');
            speech_message = speech_message.replace(/\[(doc\d+)\]/g, '');
            synthesizeSpeech(speech_message, audioElement);
            speechButton.style.display = 'none';
            mediaPlayerDiv.style.display = 'block'; 
        });
        messageElement.appendChild(speechButton);
    } 
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}
// press enter to send message
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


function typingLoader() {
    // create a three dot loader
    // add it to the chat body
    const chatBody = document.getElementById('chat-body');
    const loader = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    span1.classList.add('dot');
    span2.classList.add('dot');
    span3.classList.add('dot');
    loader.appendChild(span1);
    loader.appendChild(span2);
    loader.appendChild(span3);
    loader.classList.add('loader');

    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', "bot",'loader_message');
    messageElement.style.backgroundColor = '#f1f1f1';

    messageElement.appendChild(loader);
    chatBody.appendChild(messageElement);

}
