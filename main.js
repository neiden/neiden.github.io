const lichessAPI = "https://lichess.org/api/";

//const token = process.env.lichessToken;

const getHeaders = {
    'Authorization': 'Bearer ' + 'lip_26XegLZ2idldpX2O0Suu'
};

const postHeaders = {
    Authorization: 'Bearer ' + 'lip_26XegLZ2idldpX2O0Suu',
    'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
};

var gameID = ""
const regExp = new RegExp("/https:\/\/lichess.org\/(.*)\/.*/gm")
// fetch(lichessAPI + 'account', {headers: getHeaders})
//     .then(res => res.json())
//     .then(response => {
//         console.log(response)
//     })
async function init(){
    const response = await fetch(lichessAPI + 'account', {headers: getHeaders})
    const data = await response.json()
    console.log(data)
    if (data.playing != ""){
        gameID = data.playing.match("https:\/\/lichess.org\/(.*)\/.*")[1]
        console.log("Currently playing this game: " + gameID)
    }
    else{
        console.log("Not currently in a game")
    }
}

init()

//https://lichess.org/api/challenge/ai
async function startGame(){
    console.log("start game")
    const rawResponse = await fetch(lichessAPI + 'challenge/ai', {
        method: 'POST',
        body: JSON.stringify({
            level: 1,
            "days": 1,
            "color": "random",
            "variant":"standard"
        }),
        headers: postHeaders,
    })

    const response = await rawResponse.json()
    console.log(response)
    gameID = response.id
    console.log(gameID)
}

async function makeMove(){

    var move = formatMoveUCI();
    const rawResponse = await fetch(lichessAPI + `board/game/${gameID}/move/${move}`, {
        method: 'POST',
        headers: postHeaders,
    })

    const response = await rawResponse.json()
    console.log(response)
}

function formatMoveUCI(){
    var move = localStorage.getItem("move")
    move = move.replace(/\s+/g, '').replace(/\./g,'')
    move = move.toLowerCase()
    console.log("UCI formatted move: " + move)
    return move
}

//https://lichess.org/api/stream/event
async function streamCurrentGame(){
    const response = await fetch(lichessAPI + `board/game/stream/${gameID}` , {headers:getHeaders})
    
    const data = await response.json()
    console.log(data)
    gameID = data.id
    console.log(gameID)
}

async function getNthLastMove(){
    const response = await fetch(lichessAPI + `board/game/stream/${gameID}` , {headers:getHeaders})
    const data = await response.json()

    var move = data.state.moves.split(" ").at(-1)
    console.log("Last move made: " + move)
    sayPhrase(move)
}