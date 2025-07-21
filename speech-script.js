var currInput = 0

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


  const boardPositions = [
    "a1","a2","a3","a4","a5","a6","a7","a8","b1","b2","b3","b4","b5","b6","b7","b8","c1","c2","c3","c4","c5","c6","c7","c8","d1","d2","d3","d4","d5","d6","d7","d8","e1","e2","e3","e4","e5","e6","e7","e8","f1","f2","f3","f4","f5","f6","f7","f8","g1","g2","g3","g4","g5","g6","g7","g8","h1","h2","h3","h4","h5","h6","h7","h8","repeat", "repeat", "repeat", "repeat", "2", "3", "4" /* … */,
  ];
  const grammar = `#JSGF V1.0; grammar boardPositions; public <boardPositions> = ${boardPositions.join(
    " | ",
  )};`;


const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);


recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const hints = document.querySelector(".hints");


document.body.ontouchstart = () => {
  currInput = 0
  recognition.start();
  console.log("Ready to receive a chess command.");
  document.getElementById("debug").innerText+="Screen was clicked"
  document.getElementById("debug").innerHTML+='<br>'
};

function start(){
  currInput = 0
  recognition.start();
  console.log("Ready to receive a chess command.");
  document.getElementById("debug").innerText+="Screen was clicked"
  document.getElementById("debug").innerHTML+='<br>'
}

function loginUser(){
  this.auth.login();
}

recognition.onresult = (event) => {
    document.getElementById("debug").innerText+="received some input"
    var move = event.results[currInput][0].transcript;
    move = move.toLowerCase().replace(".","").trim()

    if (move == "repeat"){ //TODO change this to check if move contains 'repeat', since it may also sometimes have a number after
      getNthLastMove();
    }
    else{
      diagnostic.textContent = `Result received: ${move}.`;
      localStorage.setItem('move', move)
      makeMove(move)
      console.log(`Confidence: ${event.results[currInput][0].confidence}`);
    }
    currInput += 1
     document.getElementById("debug").innerHTML+='<br>'
  };


  recognition.onspeechend = async () => {
    // recognition.stop();
    // await new Promise(r => setTimeout(r, 100))
    // recognition.start();
  };




  recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't recognize that command.";
  };


  recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  };


