function beforeSelect(){
    //変換前の基数が選択されたら変換後基数の選択肢から変換前基数と同じ基数を削除する処理
}
function afterSelect(){
    //変換後の基数が選択されたら変換前基数の選択肢から変換後基数と同じ基数を削除する処理
}
function start(){
    let before = document.getElementById("before").value;
    let after = parseInt(document.getElementById("after").value);
    let level = parseInt(document.getElementById("level").value);
    let test = "";
    let trueAns = "";
    if(before == 2){
        test = create2(level);
    }else if(before == 10){
        test = create10(level);
    }else{
        test = create16(level);
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
        while(trueAns.length != Math.pow(2, (level + 1))){
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
        while(trueAns.length != Math.pow(2, (level - 1))){
            trueAns = "0" + trueAns;
        }
    }
    document.getElementById("judge").innerText = trueAns;
    document.getElementById("judge").style.display = "none";
}
function answer(){
    let answer = String(document.getElementById("answer").value);
    let trueAns = document.getElementById("judge").innerText;
    let judge = "";
    while(answer.length != trueAns.length){
        answer = "0" + answer;
    }
    if(answer == trueAns){
        judge = "正解〇";
    }else{
        judge = "不正解　（正答）" + trueAns;
    }
    document.getElementById("judge").innerText = judge;
    document.getElementById("judge").style.display = "block";
}
function create2(level){
    let digit = Math.pow(2, (level + 1));
    let num = "";
    for(let i = 0; i < digit; i++){
        num = num + Math.floor(Math.random() * 2);
    }
    return num;
}
function create10(level){
    let max = Math.pow(16, Math.pow(2, (level - 1)));
    let num = "";
    num = Math.floor(Math.random() * max);
    return num;
}
function create16(level){
    let digit = Math.pow(2, (level - 1));
    let num = "";
    for(let i = 0; i < digit; i++){
        num = num + Math.floor(Math.random() * 16).toString(16);
    }
    return num;
}