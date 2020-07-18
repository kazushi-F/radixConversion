var enterMove = 0;
var trueAnswer = "";
var answerCount;
var trueCount;
var before;
var after;
var level;
var countTime;
var timer;

function start(){
    document.getElementById("startButton").disabled = true;
    document.getElementById("allCount").style.display = "none";
    document.getElementById("trueCount").style.display = "none";
    document.getElementById("percent").style.display = "none";
    document.getElementById("countTime").style.display = "block";
    answerCount = 0;
    trueCount = 0;
    before = parseInt(document.getElementById("before").value);
    after = parseInt(document.getElementById("after").value);
    level = parseInt(document.getElementById("level").value);
    countTime = parseInt(document.getElementById("time").value);
    document.getElementById("countTime").innerText = "残り時間：　" + countTime + "分0秒";
    countTime = countTime * 60;
    countTime--;
    timer = setInterval("countdown()", 1000);
    if(after == 2){
        document.getElementById("answer").maxLength = level;
    }else if(after == 16){
        document.getElementById("answer").maxLength = Math.floor((level - 1) / 4) + 1;
    }
    question();
}

function countdown(){
    let minute = Math.floor(countTime / 60);
    let second = countTime % 60;
    document.getElementById("countTime").innerText = "残り時間：　" + minute + "分" + second + "秒";
    if(countTime == 0){
        clearInterval(timer);
        let percent = Math.round((trueCount / answerCount) * 1000) / 10;
        document.getElementById("question").style.display = "none";
        document.getElementById("answerPar").style.display = "none";
        document.getElementById("judge").style.display = "none";
        document.getElementById("allCount").style.display = "block";
        document.getElementById("trueCount").style.display = "block";
        document.getElementById("percent").style.display = "block";
        document.getElementById("allCount").innerText = "回答数：　" + answerCount;
        document.getElementById("trueCount").innerText = "正解数：　" + trueCount;
        document.getElementById("percent").innerText = "正解率：　" + percent + "％";
        document.getElementById("startButton").disabled = false;
    }
    countTime--;
}

function question(){
    enterMove = 0;
    let question = "";
    if(before == 2){
        question = create2();
    }else if(before == 10){
        question = create10();
    }else{
        question = create16();
    }
    document.getElementById("question").style.display = "block";
    document.getElementById("answerPar").style.display = "block";
    document.getElementById("question").innerText = "問題　" + question;
    document.getElementById("answer").value = "";
    if(after == 2){
        if(before == 16){
            trueAnswer = parseInt(question, 16).toString(2);
        }else{
            trueAnswer = question.toString(2);
        }
        while(trueAnswer.length != level){
            trueAnswer = "0" + trueAnswer;
        }
    }else if(after == 10){
        trueAnswer = String(parseInt(question, before));
    }else{
        if(before == 2){
            trueAnswer = parseInt(question, 2).toString(16);
        }else{
            trueAnswer = question.toString(16);
        }
        while(trueAnswer.length != (Math.floor((level - 1) / 4) + 1)){
            trueAnswer = "0" + trueAnswer;
        }
    }
    document.getElementById("judge").innerText = trueAnswer;
    document.getElementById("judge").style.display = "none";
}

function create2(){
    let question = "";
    for(let i = 0; i < level; i++){
        question = question + Math.floor(Math.random() * 2);
    }
    return question;
}

function create10(){
    let max = Math.pow(2, level);
    let question = "";
    question = Math.floor(Math.random() * max);
    return question;
}

function create16(){
    let digit = Math.floor((level - 1) / 4) + 1;
    let question = "";
    question = create10().toString(16);
    while(question.length != digit){
        question = "0" + question;
    }
    return question;
}

function answer(){
    enterMove = 1;
    answerCount++;
    let answer = String(document.getElementById("answer").value).toLowerCase();
    let judge = "";
    while(answer.length < trueAnswer.length){
        answer = "0" + answer;
    }
    if(answer == trueAnswer){
        judge = "正解〇";
        trueCount++;
    }else{
        judge = "不正解☓　（正答）" + trueAnswer;
    }
    document.getElementById("judge").innerText = judge;
    document.getElementById("judge").style.display = "block";
}

function keydownEnter(){
    if(window.event.keyCode == 13){
        if(enterMove){
            enterMove = 0;
            question();
        }else{
            enterMove = 1;
            document.getElementById("answerButton").click();
        }
    }
}
