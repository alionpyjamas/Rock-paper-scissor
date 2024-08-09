let score = JSON.parse(localStorage.getItem('score'));
if (score === null) { score = { wins: 0, loses: 0, ties: 0 }; }


// jab mein wo document cmd line 74 idar use karta to wo score card constantly page pe rehta par jab mein idr se hata deta to wo initially nhi rehta lekin koi ek option chunne ke baad constantly rehta hai. AISA kyu?

//let score = {wins:0, loses:0, ties:0}
//console.log(score);x

let result = ''
function playgame(playermove) {
    if (playermove === 'scissors') {
        if (npc === 'rock') { result = 'you lose loser!' }
        else if (npc === 'paper') { result = 'damn! you win' }
        else if (npc === 'scissors') { result = 'its a tie' }
    }

    else if (playermove === 'paper') {

        if (npc === 'rock') { result = 'damn! you win' }
        else if (npc === 'paper') { result = 'its a tie' }
        else if (npc === 'scissors') { result = 'you lose loser!' }
    }

    else if (playermove === 'rock') {

        if (npc === 'rock') { result = 'its a tie' }
        else if (npc === 'paper') { result = 'you lose loser!' }
        else if (npc === 'scissors') { result = 'damn! you win' }
    }

    if (result === 'damn! you win') { score.wins = score.wins + 1 }
    else if (result === 'you lose loser!') { score.loses += 1; }
    else if (result === 'its a tie') { score.ties += 1; }

    document.querySelector('.result').innerHTML = `wins: ${score.wins} loses: ${score.loses} ties: ${score.ties}`;

    document.querySelector('.score').innerHTML = `${result}`

    document.querySelector('.moves').innerHTML =
        `You <img src= "./images/${playermove}.png" class='move'> <img src="./images/${npc}.png" class='move'> computer`



    localStorage.setItem('score', JSON.stringify(score))


    //alert(`you chose ${playermove}.Computer chose ${npc},${result}.
    //wins: ${score.wins} loses: ${score.loses} ties: ${score.ties}`);
}
let npc = '';
function npcmove() {
    let rand = Math.random();
    if (rand >= 0 && rand < 1 / 3) { npc = 'rock'; }
    else if (rand >= 1 / 3 && rand < 2 / 3) { npc = 'paper'; }
    else if (rand >= 2 / 3 && rand < 1) { npc = 'scissors'; }
}

let autoplaying = false

function autoplay() {

    intervalId = setInterval(() => {
        let luck = Math.random();

        if (luck >= 0 && luck < 1 / 3) {
            playgame("rock");
            npcmove()
        }

        else if (luck >= 1 / 3 && luck < 2 / 3) {
            playgame("paper");
            npcmove()
        }

        else if (luck >= 2 / 3 && luck < 1) {
            playgame("scissors");
            npcmove()
        }


    }
        , 500
    );

}






// onclick ko addeventlistener se exchange karna better hota

document.querySelector('.rock-button').addEventListener(
    'click',
    () => {
        playgame('rock');
        npcmove()
    })


document.querySelector('.paper-button').addEventListener(
    'click',
    () => {
        playgame('paper');
        npcmove()
    })


document.querySelector('.scissors-button').addEventListener(
    'click',
    () => {
        playgame('scissors');
        npcmove()
    })


document.body.addEventListener('keydown',
    (event) => {
        if (event.key === 'r') {
            playgame('rock');
            npcmove()
        }

        else if (event.key === 'p') {
            playgame('paper');
            npcmove()
        }

        else if (event.key === 's') {
            playgame('scissors');
            npcmove()
        }
    });

//document.querySelector('.rock-button').addEventListener('click', ()=>{npcmove()})


document.body.addEventListener('keydown',
    (event) => {
        if (event.key === 'a') {
            autoplayingtext()
        }
    }

);

let tagElem = document.querySelector('.Auto')
tagElem.addEventListener("click",
    autoplayingtext
)

function autoplayingtext() {
    if (autoplaying == false) {

        autoplaying = true;
        tagElem.innerHTML = 'Stop play';
        autoplay()
    }

    else {

        autoplaying = false;
        tagElem.innerHTML = 'Auto play';
        clearInterval(intervalId)

    }
}


function reset() {

    score = { wins: 0, loses: 0, ties: 0 }
    localStorage.removeItem('score');
    document.querySelector('.result').innerHTML = ` wins:${score.wins}, loses:${score.loses}, ties:${score.ties}`
        ;
}


/*document.querySelector('.button').addEventListener('click',
()=>{
        reset()
})*/


document.body.addEventListener('keydown',
    (event) => {
        if (event.key === "Backspace") {
            reset()
        }


    })

document.querySelector('.button').addEventListener('click',
    () => {
        document.querySelector('.lastline').innerHTML =
            `Are you sure u want to reset the score? 
  <button class="Yes">Yes</button>
  <button class="No">No</button>
  
 `;
        document.querySelector('.Yes').addEventListener('click',
            () => {
                reset();
                document.querySelector('.lastline').innerHTML = ''
            })

        document.querySelector('.No').addEventListener('click',
            () => {
                document.querySelector('.lastline').innerHTML = ''
            })

    })

