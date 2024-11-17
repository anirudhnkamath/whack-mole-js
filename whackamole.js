const holes = document.querySelectorAll('.box');
const startBtn = document.querySelector('.start-game-button');
const endBtn = document.querySelector('.end-game-button');
const startBtnContainer = document.querySelector('.start-game');
const endBtnContainer = document.querySelector('.end-game');
const pointValue = document.querySelector('.points-value');
const audios = ["img/whack.mp3","img/whack2.mp3","img/whack3.mp3"]
const settingsBtn = document.querySelector('.settings-icon');
const settingsContainer = document.querySelector('.settings-container');
const difficultySaveBtn = document.querySelector('.difficulty-save-button');
const performance = document.querySelector('.performance');
const scoreValue = document.querySelector('.score');
const totChances = document.querySelector('.total-chances');
const resultsContainer = document.querySelector('.results-container');
const resultsClose = document.querySelector('.results-close');
const counterContainer = document.querySelector('.counter');

let difficultyTime = 1000;
let score = 0;
let chances = 0;

function runGame(){
    let i = Math.floor(Math.random() * 9);

    //hiding current mole
    let currentMole = document.querySelector('.mole');
    if(currentMole!=null){
        currentMole.remove();
    }
    
    //creating new and appending
    let mole = document.createElement('img');
    mole.classList.add('mole');
    mole.setAttribute('src','img/mole.png');
    holes[i].appendChild(mole);


    //when clicking mole
    mole.addEventListener('click',()=>{
        let bangSound = new Audio(audios[Math.floor(Math.random() * 3)]);
        bangSound.play();
        mole.setAttribute('src','img/molecry.png');
        pointValue.innerText = Number(pointValue.innerText) + 1;
        score += 1;
    })

    chances += 1;
}


endBtn.addEventListener('click',()=>{
    clearInterval(timer);
    let mole = document.querySelector('.mole');
    mole.remove();  //removes all moles

    endBtnContainer.classList.add('hidden');
    startBtnContainer.classList.remove('hidden');

    pointValue.innerText = '0';

    scoreValue.innerText = String(score);
    totChances.innerText = String(chances);

    resultsContainer.classList.remove('hidden');
    let ratio = score/chances;
    if(ratio == 1){
        performance.innerText = "Perfect";
    }
    else if(ratio > 2/3){
        performance.innerText = "Good";
    }
    else if(ratio > 1/3){
        performance.innerText = "Average";
    }
    else{
        performance.innerText = "Bad";
    }

    score = 0
    chances = 0
})

resultsClose.addEventListener('click',()=>{
    resultsContainer.classList.add('hidden');
})


let timer = null;
startBtn.addEventListener('click', () => {

    startBtnContainer.classList.add('hidden');
    endBtnContainer.classList.remove('hidden');

    counterContainer.innerText = "3";
    let countdown = new Audio("img/countdown.mp3");
    countdown.play();
    setTimeout(() => {
        counterContainer.innerText = "2";
        setTimeout(() => {
            counterContainer.innerText = "1";
            setTimeout(() => {
                counterContainer.innerText = "";
                timer = window.setInterval(()=>runGame(),difficultyTime);
            }, 1000)
        }, 1000);
    }, 1000);
});

settingsBtn.addEventListener('click',()=>{

    settingsBtn.style.animation = 'animation: keeprotating 1s ease-in-out forwards';

    if(settingsContainer.classList.contains('isinside')){
        settingsContainer.style.transform = 'translateX(0%)';
        settingsContainer.classList.remove('isinside');
    }

    else{
        settingsContainer.style.transform = 'translateX(-150%)';
        settingsContainer.classList.add('isinside');
    }
})

difficultySaveBtn.addEventListener('click',()=>{
    settingsContainer.classList.add('isinside');
    settingsContainer.style.transform = 'translateX(-150%)';
    console.log(settingsContainer.classList)
    let diffVal = document.querySelector('.difficulty-form input[name="difficulty"]:checked').value;
    if(diffVal == 'easy'){
        difficultyTime = 1500;
    }
    else if(diffVal == 'medium'){
        difficultyTime = 800;
    }
    else if(diffVal == 'hard'){
        difficultyTime = 600;
    }
})