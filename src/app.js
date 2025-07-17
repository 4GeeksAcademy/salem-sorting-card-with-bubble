import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");
  const cardCountInput = document.getElementById("cardCount");
  const cardIcons = ["♥", "♦", "♣", "♠"];
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let drawnCards = [];

  function generateRandomCard() {
    const icon = cardIcons[Math.floor(Math.random() * cardIcons.length)];
    const value = cardValues[Math.floor(Math.random() * cardValues.length)];
    return { icon, value };
  }

  function renderCards(cards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card m-2 row shadow-lg rounded";
      cardDiv.style.width = "3rem";
      cardDiv.style.height = "4rem";
      cardDiv.innerHTML = `
        <div class="text-start position-absolute top-0 start-0">${card.icon}</div>
        <div class="position-absolute top-50 start-50 translate-middle text-center">${card.value}</div>
        <div class="position-absolute bottom-0 end-0 text-end">${card.icon}</div>
      `;
      container.appendChild(cardDiv);
    });
  }

  function drawCards(count) {
    drawnCards = [];
    for (let i = 0; i < count; i++) {
      drawnCards.push(generateRandomCard());
    }
    renderCards(drawnCards, "cardContainer");
  }

  drawButton.addEventListener("click", () => {
    const count = parseInt(cardCountInput.value);
    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    // Clear the sorted step containers
    document.getElementById("cardContainer0").innerHTML = "";
    document.getElementById("cardContainer1").innerHTML = "";
    document.getElementById("cardContainer2").innerHTML = "";
    document.getElementById("cardContainer3").innerHTML = "";
    document.getElementById("cardContainer4").innerHTML = "";
    document.getElementById("cardContainer5").innerHTML = "";
    document.getElementById("cardContainer6").innerHTML = "";
    document.getElementById("cardContainer7").innerHTML = "";
    drawCards(count);
  });

  // Bubble Sort Implementation with steps
  function bubbleSortWithSteps(arr) {
    let steps = [];
    arr = [...arr]; // Create a copy to avoid modifying the original
    let wall = arr.length - 1; //we start the wall at the end of the array

    while (wall > 0) {
      let index = 0;
      let swapped = false;
      while (index < wall) {
        //compare the adjacent positions, if the right one is bigger, we have to swap
        if (arr[index].value > arr[index + 1].value) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
          swapped = true;
        }
        index++;
      }
      if (swapped) {
        // Only add to steps if we made a swap
        steps.push(arr.map((card) => ({ ...card })));
      }
      wall--; //decrease the wall for optimization
    }
    return steps;
  }

  const bubbleSortButton = document.getElementById("bubblesortButton");
  bubbleSortButton.addEventListener("click", () => {
    if (drawnCards.length === 0) {
      alert("Draw cards first.");
      return;
    }
    const steps = bubbleSortWithSteps([...drawnCards]);
    if (steps[0]) renderCards(steps[0], "cardContainer0");
    if (steps[1]) renderCards(steps[1], "cardContainer1");
    if (steps[2]) renderCards(steps[2], "cardContainer2");
    if (steps[3]) renderCards(steps[3], "cardContainer3");
    if (steps[4]) renderCards(steps[4], "cardContainer4");
    if (steps[5]) renderCards(steps[5], "cardContainer5");
    if (steps[6]) renderCards(steps[6], "cardContainer6");
    if (steps[7]) renderCards(steps[7], "cardContainer7");
  });
};
