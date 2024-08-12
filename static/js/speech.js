function synthesizeSpeech(text,audioPlayer) {
    if (!text) {
        alert('Please enter text to synthesize.');
        return;
    }
    const subscriptionKey = 'SPEECH_SERVICE_KEY';
    const serviceRegion = 'SPEECH_RESOURCE_REGION'; // e.g., 'westus'


        // Azure Speech SDK configuration
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

        // Using Speech SDK to generate speech without automatic playback
        const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, null);

        synthesizer.speakTextAsync(
        text,
        result => {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                console.log(result.audioData)
                // Convert the audio data to Blob and set it as the audio source
                const audioBlob = new Blob([new Uint8Array(result.audioData)], { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioUrl;
                console.log(audioPlayer.src);
                // Initialize Plyr player and play the audio
                const player = new Plyr(audioPlayer);

                player.play(); // Start playing the audio
                console.log(player)
            } else {
                console.error("Speech synthesis failed: ", result.errorDetails);
            }
            synthesizer.close();
        },
        error => {
            console.error(error);
            synthesizer.close();
        }
    );
}