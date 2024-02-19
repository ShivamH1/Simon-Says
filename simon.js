let gameseq = [];
let userseq = [];

let btns = ["red","yellow","green","purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if (started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
})

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let idx = Math.floor(Math.random() * 3);
    let randColor = btns[idx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(idx);
    // console.log(randColor);
    // console.log(randbtn);
    gameseq.push(randColor);
    console.log("Game Seq:",gameseq);
    gameflash(randbtn);
}

function checkans(idx){
    if (userseq[idx] == gameseq[idx]){
        if (userseq.length == gameseq.length){
            if (level > highestScore) {
                highestScore = level;
            }
            setTimeout(levelUp,500);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Highest Score: <b>${highestScore}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log("User Seq:",userseq);
    checkans(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
