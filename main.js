//Selectors

const myShape = document.querySelector(".shape");
const gameSpace = document.querySelector(".gamespace");
const rules = document.querySelector(".rules");
const information = document.querySelector(".info");
const reactionTime = document.querySelector(".reactiontime");
const bestReaction = document.querySelector(".bestreaction");
const userTime = document.querySelector(".totaltime");
const stopButton = document.querySelector(".stopbtn");
const startButton = document.querySelector(".startbtn");
const closeButton = document.querySelector(".closebtn");
const timePerWeek = document.querySelector(".timeperweek");

// Functions

// Function Generate Random hex Color

function GenerateColor() {
  let colorstring = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += colorstring.charAt(Math.floor(Math.random() * 15));
  }
  if (color == "#faebd7") {
    GenerateColor();
  } else {
    return color;
  }
}

//Function  Styling Shape And Save Start Time

let timeStart;
function DisplayMyShape() {
  let widthValue = Math.random() * 100 + 50;
  let heightValue = Math.random() * 100 + 50;
  let topValue = Math.random() * (gameSpace.clientHeight - heightValue);
  let leftValue = Math.random() * (gameSpace.clientWidth - widthValue);
  let radiusValue = Math.random() > 0.5 ? "5px" : "50%";

  timeStart = Date.now();
  myShape.style.display = "block";

  myShape.style.width = `${widthValue}px`;
  myShape.style.height = `${heightValue}px`;
  myShape.style.top = `${topValue}px`;
  myShape.style.left = `${leftValue}px`;
  myShape.style.borderRadius = radiusValue;
  myShape.style.backgroundColor = GenerateColor();
}

// Function Show Shape infinity Times after random Time

function Show() {
  rules.style.display = "none";
  startButton.style.display = "none";
  information.innerText = `Wait for the shape...`;

  window.setTimeout(DisplayMyShape, Math.random() * 2000);
}

//  Function Calcuate Reaction Time ,Best Time And Total Time per Session

let totalTime = 0;
let time;
let bestTime = Infinity;
function OnClickShape() {
  myShape.style.display = "none";
  time = (Date.now() - timeStart) / 1000;
  if (time < bestTime) {
    bestTime = time;
  }
  totalTime += time;
  information.style.display = "none";
  reactionTime.innerText = `Your Reaction Time = ${time.toFixed(1)} Sec`;
  bestReaction.innerText = `Best Reaction Time = ${bestTime.toFixed(1)} Sec`;
  userTime.innerText = `Total Time You Played = ${totalTime.toFixed(1)} Sec`;
  stopButton.style.display = "inline-block";
  Show();
}

// Function Calculate Total Time Per Week

let totalTimePerWeek = 0;
function CalcTimePerWeek() {
  stopButton.style.display = "none";
  myShape.style.display = "none";
  startButton.style.display = "inline-block";
  startButton.innerText = "Continue";

  let storedTime = parseFloat(localStorage.getItem("weeklyTime")) || 0;

  totalTimePerWeek = storedTime + totalTime;

  localStorage.setItem("weeklyTime", totalTimePerWeek);

  timePerWeek.innerText = `Total Time Per Week = ${totalTimePerWeek.toFixed(
    1
  )} second`;
}

// Function  Reset Weekly Time Automatically

function ResetWeeklyTime() {
  const lastReset = localStorage.getItem("lastResetDate");
  const today = new Date();
  const day = today.getDay();

  if (day === 1 && lastReset !== today.toDateString()) {
    localStorage.setItem("weeklyTime", "0");
    localStorage.setItem("lastResetDate", today.toDateString());
  }
}

ResetWeeklyTime();

// Function Close Game
function CloseGame() {
  window.close();
}

// Events

myShape.addEventListener("click", OnClickShape);
startButton.addEventListener("click", Show);
stopButton.addEventListener("click", CalcTimePerWeek);
closeButton.addEventListener("click", CloseGame);
