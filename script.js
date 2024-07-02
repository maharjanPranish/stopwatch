// before recording new time check if it is already in the recorded time


const h = document.querySelector('#hour');
const m = document.querySelector('#minute');
const s = document.querySelector('#second');
const c = document.querySelector("#counter");

const startStopBtn = document.querySelector("#startStop");
const recordBtn = document.querySelector("#record");
const resetBtn = document.querySelector("#reset");

const timeRecords = document.querySelector("#timeRecords");
const viewRecord = document.querySelector("#viewRecord");
const recordingPane = document.querySelector("#recordings");


var countTime = 0;
var sec = 0;
var min = 0;
var hrs = 0;
var state = "Start";


startStopBtn.addEventListener('click', timerbutton);
resetBtn.addEventListener('click', function () {
    countTime = 0;
    sec = 0;
    min = 0;
    hrs = 0;
    display();
    state = "Start";
    startStopBtn.textContent = state;
    timeRecords.innerHTML="";
});
recordBtn.addEventListener("click", function(){
    if(hrs!=0||min!=0||sec!=0||countTime!=0){
        const newRecord = document.createElement("div");
        newRecord.textContent= formatTime(hrs) + ":" + formatTime(min) + ":" + formatTime(sec) + "." + formatTime(countTime);
        timeRecords.appendChild(newRecord);
    }
});
viewRecord.addEventListener('click', function(){
    recordingPane.style.visibility = "visible";
    recordingPane.style.width = (document.querySelector("main").offsetWidth + 20) + "px";
    window.addEventListener("mouseup",exitRecordingPane);
});



//Start Stop Functions
function timerbutton() {
    state = (state === "Start" ? "Stop" : "Start");
    startStopBtn.textContent = state;
    timer();
}

//function to keep timer rumming
function timer() {
    if (state === "Stop") {
        increaseTime();
        display();
        setTimeout(timer, 10);
    }
}

function increaseTime() {
    countTime++;
    if (countTime == 100) {
        sec++;
        countTime = 0;
    }

    //minute detector
    if (sec == 60) {
        min++;
        sec = 0;
    }

    //hour detector
    if (min == 60) {
        hrs++;
        min = 0;
    }
}

//display timer time
function display() {
    c.textContent = formatTime(countTime);
    s.textContent = formatTime(sec);
    m.textContent = formatTime(min);
    h.textContent = formatTime(hrs);
}

//for  showing two digits in output time
function formatTime(value) {
    return (value < 10) ? "0" + value : value;
}
  
//close recordpane
function exitRecordingPane(event){
    if(event.target != recordingPane && event.target.parentNode != recordingPane){
        recordingPane.style.visibility = 'hidden';
        window.removeEventListener("mouseup", exitRecordingPane);
    }
}