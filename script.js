let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let counter = 0;
spinner.classList.toggle("d-none");

function startCounter() {
  counter += 1;
  timer.textContent = counter;
}

let counterValue = setInterval(startCounter, 1000);

function getQuote() {
  let options = {
    method: "GET"
  };
  fetch("https://apis.ccbp.in/random-quote", options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      spinner.classList.add("d-none");

      let quote = jsonData.content;

      // Wrap each character in a span
      let styledQuote = quote.split('').map(char => `<span>${char}</span>`).join('');

      quoteDisplay.innerHTML = styledQuote;

      console.log(jsonData.content);
    });
}

getQuote();
startCounter();

resetBtn.onclick = function() {
  spinner.classList.remove("d-none");
  getQuote();
  startCounter();
  counter = 0;
  result.textContent = "";
  quoteInput.value = "";
};

quoteInput.addEventListener('input', function() {
  let typedText = quoteInput.value;
  let characters = quoteDisplay.querySelectorAll('span');

  characters.forEach((char, index) => {
    if (index < typedText.length) {
      // Check if the typed character matches the original quote
      if (typedText[index] === char.textContent) {
        char.classList.add('hover');
        char.classList.remove('misspelled');
      } else {
        char.classList.remove('hover');
        char.classList.add('misspelled');
      }
    } else {
      char.classList.remove('hover', 'misspelled');
    }
  });
});

submitBtn.onclick = function() {
  // Remove HTML tags from the displayed quote for comparison
  let originalQuote = quoteDisplay.innerText.replace(/<\/?span>/g, '');

  if (quoteInput.value === originalQuote) {
    clearInterval(counterValue);
    result.textContent = "You Typed in " + counter + " seconds";
  } else {
    result.textContent = "You typed Incorrect Sentence";
  }
};

