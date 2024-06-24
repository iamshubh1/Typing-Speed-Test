const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 30;
let timer = "";
let mistakes = 0;
  


const refreshBtn = document.getElementById("btnRefresh");
function handleClick() {
  window.location.reload();
}
refreshBtn.addEventListener("click", handleClick);



window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    document.getElementById("btnRefresh").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
  


function startTest(){
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
    document.getElementById("btnRefresh").style.display = "none";
};
  
  

function timeReduce(){
      time = 30;
      timer = setInterval(updateTimer, 1000);
    };
    function updateTimer() {
        if (time == 0) {
          displayResult();
        } else {
          document.getElementById("timer").innerText = --time + "s";
        }
}



const renderNewQuote = async () => {
  const response = await fetch(quoteApiUrl);
  let data = await response.json();
  quote = data.content;
  let arr = quote.split("").map((value) => {
   return "<span class='quote-chars'>" + value + "</span>";
  });
  quoteSection.innerHTML += arr.join("");
};




userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);
  let userInputChars = userInput.value.split("");
   quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    else {
      if(!char.classList.contains("fail")) {
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    if (check) {
      displayResult();
    }
  });
});

  


function displayResult(){
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 0.5;
    if (time != 0) {
      timeTaken = (30 - time) / 60;
    }
    document.getElementById("wpm").innerText =
      ((userInput.value.length-mistakes) / 4 / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText =
      Math.round(
        ((userInput.value.length - mistakes) / userInput.value.length) * 100
      ) + " %";
      document.getElementById("btnRefresh").style.display = "block";
};


