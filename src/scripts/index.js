/* Desenvolva sua lógica aqui ... */
import { products, categories } from "./productsData.js";

function createCard(product){
    const card = document.createElement("li")
    /* Trabalhe sua lógica aqui */
    const imgCard = document.createElement("img");
  imgCard.src = product.img; // Set the image source
  const bandAgeCard = document.createElement("p");
  bandAgeCard.innerText = `${product.band} - ${product.year}`;
  bandAgeCard.classList.add("title-card");
  const titleCard = document.createElement("h2");
  titleCard.innerText = product.title;
  // const payCard = document.createElement("span");
  // payCard.innerText = "Preço:";
  const priceCard = document.createElement("span");
  priceCard.innerText = `R$ ${product.price.toFixed(2)}`;
  priceCard.classList.add("price-card")
  const buttonPayCard = document.createElement("button");
  buttonPayCard.innerText = "Comprar";
  buttonPayCard.classList.add("btn-pay");

  card.appendChild(imgCard);
  card.appendChild(bandAgeCard);
  card.appendChild(titleCard);
  // card.appendChild(payCard);
  card.appendChild(priceCard);
  card.appendChild(buttonPayCard);
    return card
}

function renderFilterButtons(array) {
    const listFilters = document.querySelector(".list-filters");
    array.forEach(category => {
      const listItem = document.createElement("li");
      const filterButton = document.createElement("button");
      filterButton.innerText = category;
      listItem.appendChild(filterButton);
      listFilters.appendChild(listItem);
    });
  }

  function renderCards(array) {
    const listCards = document.querySelector(".list-cards");
    array.forEach(product => {
      const card = createCard(product);
      listCards.appendChild(card);
    });
  }
  
  // Call the functions to render the components
  renderFilterButtons(categories);
  renderCards(products);