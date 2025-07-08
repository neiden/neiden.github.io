const lichessAPI = "https://lichess.org/api/";

const nothingImportant = atob("bGlwX25yMUE2M3FRdXV2Y0ZONFlObWVv")

//const token = process.env.lichessToken;
const getHeaders = {
    'Authorization': 'Bearer ' + nothingImportant
};

const postHeaders = {
    Authorization: 'Bearer ' + nothingImportant,
    'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
};

var gameID = ""
const regExp = new RegExp("/https:\/\/lichess.org\/(.*)\/.*/gm")

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

async function login(){
    const response = await fetch(`https://lichess.org/oauth?response_type=code&redirect_uri=https://neiden.github.io&client_id=blindchess.com&code_challenge_method=s256&code_challenge=12345679&scope=board:play`)

    const data = await response.json()
    console.log(data);

}