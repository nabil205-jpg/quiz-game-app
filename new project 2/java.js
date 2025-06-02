const quotes=[
{ quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney"},
{quote: "Don’t let yesterday take up too much of today.", author: "Will Rogers"},
{quote: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi"},
{quote: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs"},
{quote: "Success is not in what you have, but who you are.", author: "Bo Bennett"}

];

let index=0;

const quoteText=document.getElementById(`quoteText`);
const quoteAuthor=document.getElementById(`quoteAuthor`);
const prevBtn=document.getElementById(`prevBtn`);
const nextBtn=document.getElementById(`nextBtn`);

  function displayQuote(i) {
      quoteText.textContent = `"${quotes[i].quote}"`;
      quoteAuthor.textContent = `– ${quotes[i].author}`;
    }

    displayQuote(index);

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % quotes.length;
      displayQuote(index);
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + quotes.length) % quotes.length;
      displayQuote(index);
    });