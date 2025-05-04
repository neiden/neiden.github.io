const synth = window.speechSynthesis;


function sayPhrase(inputPhrase){
    const phrase = new SpeechSynthesisUtterance(inputPhrase)
    var voiceOptions = synth.getVoices();
    phrase.voice = voiceOptions[0] // 0 for edge, 5 for chrome
    phrase.pitch = 1
    phrase.rate = 1
    console.log("saying: " + inputPhrase)
    synth.speak(phrase)
}