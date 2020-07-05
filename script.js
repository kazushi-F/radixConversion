var or = 0;
var count;
var countTrue;
var before;
var after;
var level;
var timeCount;
var timer1;
function start(){
    let countTime = parseInt(document.getElementById("time").value);
    count = 0;
    countTrue = 0;
    before = document.getElementById("before").value;
    after = parseInt(document.getElementById("after").value);
    level = parseInt(document.getElementById("level").value);
    timeCount = countTime * 60;
    document.getElementById("timeCount").innerText = "残り時間：　" + countTime + "分0秒";
    timeCount--;
    timer1 = setInterval("countdown()", 1000);
    question();
    if(after == 2){
        document.getElementById("answer").maxLength = level;
    }else if(after == 16){
        document.getElementById("answer").maxLength = Math.floor((level - 1) / 4) + 1;
    }
    document.getElementById("queButton").disabled = true;
    document.getElementById("countAll").style.display = "none";
    document.getElementById("countTrue").style.display = "none";
    document.getElementById("countPar").style.display = "none";
}
function countdown(){
    let sec = timeCount % 60;
    let min = (timeCount - sec) / 60;
    document.getElementById("timeCount").innerText = "残り時間：　" + min + "分" + sec + "秒";
    if(timeCount == 0){
        clearInterval(timer1);
        let par = Math.round((countTrue / count) * 1000) / 10;
        document.getElementById("test").style.display = "none";
        document.getElementById("answerPar").style.display = "none";
        document.getElementById("countAll").style.display = "block";
        document.getElementById("countTrue").style.display = "block";
        document.getElementById("countPar").style.display = "block";
        document.getElementById("judge").style.display = "none";
        document.getElementById("countAll").innerText = "回答数：　" + count;
        document.getElementById("countTrue").innerText = "正解数：　" + countTrue;
        document.getElementById("countPar").innerText = "正解率：　" + par + "％";
        document.getElementById("queButton").disabled = false;
    }
    timeCount--;
}
function answer(){
    count++;
    or = 1;
    let answer = String(document.getElementById("answer").value).toLowerCase();
    let trueAns = document.getElementById("judge").innerText;
    let judge = "";
    while(answer.length < trueAns.length){
        answer = "0" + answer;
    }
    if(answer == trueAns){
        judge = "正解〇";
        countTrue++;
    }else{
        judge = "不正解☓　（正答）" + trueAns;
    }
    document.getElementById("judge").innerText = judge;
    document.getElementById("judge").style.display = "block";
}
function question(){
    or = 0;
    let test = "";
    let trueAns = "";
    if(before == 2){
        test = create2();
    }else if(before == 10){
        test = create10();
    }else{
        test = create16();
    }
    document.getElementById("test").innerText = "問題　" + test;
    document.getElementById("test").style.display = "block";
    document.getElementById("answer").value = "";
    document.getElementById("answerPar").style.display = "block";
    if(after == 2){
        if(before == 16){
            trueAns = parseInt(test, 16).toString(2);
        }else{
            trueAns = test.toString(2);
        }
        while(trueAns.length != level){
            trueAns = "0" + trueAns;
        }
    }else if(after == 10){
        trueAns = String(parseInt(test, before));
    }else{
        if(before == 2){
            trueAns = parseInt(test, 2).toString(16);
        }else{
            trueAns = test.toString(16);
        }
        while(trueAns.length != (Math.floor((level - 1) / 4) + 1)){
            trueAns = "0" + trueAns;
        }
    }
    document.getElementById("judge").innerText = trueAns;
    document.getElementById("judge").style.display = "none";
}
function create2(){
    let num = "";
    for(let i = 0; i < level; i++){
        num = num + Math.floor(Math.random() * 2);
    }
    return num;
}
function create10(){
    let max = Math.pow(2, level);
    let num = "";
    num = Math.floor(Math.random() * max);
    return num;
}
function create16(){
    let digit = Math.floor((level - 1) / 4) + 1;
    let num = "";
    num = create10().toString(16);
    while(num != digit){
        num = "0" + num;
    }
    return num;
}
function keydownEnter(){
    if(window.event.keyCode == 13){
        if(or){
            or = 0;
            question();
        }else{
            or = 1;
            document.getElementById("ansButton").click();
        }
    }
}
