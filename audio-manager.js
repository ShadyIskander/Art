(function() {
    let audio = new Audio('dance.mp3'); 
    let audioTime = localStorage.getItem('audioTime');
    let audioPlaying = localStorage.getItem('audioPlaying') === 'true';

    if (audioTime && audioPlaying) {
        audio.currentTime = parseFloat(audioTime);
        audio.addEventListener('canplaythrough', function() {
            audio.play();
        });
        audio.load();
    }

   
    audio.addEventListener('ended', function() {
        localStorage.removeItem('audioTime');
        localStorage.removeItem('audioPlaying');

        
        let nextAudio = new Audio('good.mp3');

       
        nextAudio.play();

        
        nextAudio.addEventListener('ended', function() {
            localStorage.removeItem('audioTime');
            localStorage.removeItem('audioPlaying');
        });

        window.addEventListener('beforeunload', function() {
            localStorage.setItem('audioTime', nextAudio.currentTime);
            localStorage.setItem('audioPlaying', nextAudio.paused ? 'false' : 'true');
        });
    });

    window.addEventListener('beforeunload', function() {
        localStorage.setItem('audioTime', audio.currentTime);
        localStorage.setItem('audioPlaying', audio.paused ? 'false' : 'true');
    });

    window.getGlobalAudio = function(){
        return audio;
    }
})();