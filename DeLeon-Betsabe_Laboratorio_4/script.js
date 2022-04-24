//Betsabe De León
let cards = [];
const list = document.getElementById("showing");
const num = document.getElementById("number");


function displayCard() {
  
  const length = num.value;
  var fibonacci = [];
  fibonacci[0] = 0;
  fibonacci[1] = 1;
  for (var i = 2; i < length; i++) {
  fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];

//  console.log(fibonacci);

  let card = document.createElement("div");
  let text = document.createElement("h3");
  card.classList.add("card");
  text.innerText = fibonacci[i];
  card.appendChild(text);
  list.appendChild(card);
  card.addEventListener("click", () => {
    const response = confirm(`¿Está seguro de eliminar este número?`);
    if (response) {
      list.removeChild(card);
    }
  });
  
 }

 
}

