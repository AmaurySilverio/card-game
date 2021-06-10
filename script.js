const deck = document.querySelector(".card-container");
const level = document.querySelector('.buttons');
const x = document.querySelector(".close");


let cardsFlipped = 0;
let mode = null;
const numPairsPerMode = {
  easy: 3,
  medium: 6,
  hard: 10,
  master: 20
}

const flip = (event) => {
  if (
    event.target.attributes["data-status"].value === "match" ||
    event.target.attributes["data-status"].value === "clicked" ||
    cardsFlipped === 2
  ) {
    return;
  }
  if (event.target.localName === "img") {
    var front = event.target.attributes["data-image"].value;
    event.target.src = `./images/image${front}.jpeg`;
    event.target.setAttribute("data-status", "clicked");
    cardsFlipped++;
    if (cardsFlipped === 2) {
      const results = document.querySelectorAll("[data-status='clicked']");
      if (results) {
        const [guess1, guess2] = results;
        if (guess1.src === guess2.src) {
          guess1.setAttribute("data-status", "match");
          guess2.setAttribute("data-status", "match");
          let val = document.querySelector(".matches").textContent;
          val = Number(val) + 1;
          document.querySelector(".matches").textContent = val;
          modal();
          cardsFlipped = 0;
        } else {
          setTimeout(() => {
            guess1.setAttribute("data-status", "");
            guess2.setAttribute("data-status", "");
            guess1.src = "./backOfCard.jpeg";
            guess2.src = "./backOfCard.jpeg";
            cardsFlipped = 0;
          }, 600);
        }
      }

      let val2 = document.querySelector(".moves").textContent;
      val2 = Number(val2) + 1;
      document.querySelector(".moves").textContent = val2;
    }
  }
}




const gameMode = (event) => {
  if(event.target.localName === 'button'){
    mode = event.target.textContent.toLowerCase();
    if(mode){
      reset()
    
    var cards = numPairsPerMode[mode] * 2;
    let obj = {};
    while(Object.keys(obj).length < numPairsPerMode[mode]){
     let randomNum = Math.ceil(Math.random() * 20) // this will give us random numbers, between 1 and 20
      if(!obj['hasOwnProperty'](randomNum)){ // if the obj does not have its own property of randomNum, we give it one and assign it a value of 0;
        obj[randomNum] = 0
      }
    }
     while(deck.children.length < numPairsPerMode[mode] * 2){
       const randomIndex = Math.floor(Math.random() * numPairsPerMode[mode]) 
       const foundNumAtRandomIndex = Object.keys(obj)[randomIndex] // [2,7,9,12] [2] = 9 

       if(obj[foundNumAtRandomIndex] !== 2){ // obj[9] 
         obj[foundNumAtRandomIndex] = obj[foundNumAtRandomIndex] + 1 || 1 
         let card = document.createElement('img')
         let container = document.createElement('div');
         container.setAttribute('class', 'card');
         card.src = "./backOfCard.jpeg"
         card.setAttribute("data-image", foundNumAtRandomIndex)
         card.setAttribute("data-status", "")
         container.appendChild(card);
         deck.appendChild(container);

       }
     }
  }
} 
}


function reset(){
cardsFlipped = 0;
document.querySelector(".matches").textContent = 0;
document.querySelector(".moves").textContent = 0;
deck.innerHTML = "";
}

function modal(){
  if (Number(document.querySelector(".matches").textContent) === numPairsPerMode[mode]) {
  document.getElementById('myModal').style.display = 'block';
}
}


function close(event){
  document.getElementById('myModal').style.display = 'none';
}

deck.addEventListener("click", flip);
level.addEventListener('click', gameMode);
x.addEventListener("click", close);

