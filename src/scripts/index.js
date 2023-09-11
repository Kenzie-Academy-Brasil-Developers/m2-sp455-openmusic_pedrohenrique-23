/* Desenvolva sua lógica aqui ... */
import { products, categories } from "./productsData.js";
import { handleDarkMode } from "./theme.js"

/* Trabalhe sua lógica aqui */
function createCard(product) {
  const card = document.createElement("li")
  card.classList.add("card");
  const imgCard = document.createElement("img");
  imgCard.src = product.img;
  imgCard.classList.add("img-card");
  const bandAgeCard = document.createElement("p");
  bandAgeCard.innerText = `${product.band} - ${product.year}`;
  bandAgeCard.classList.add("title-card");
  const titleCard = document.createElement("h2");
  titleCard.innerText = product.title;
  const priceCard = document.createElement("span");
  priceCard.innerText = `R$ ${product.price.toFixed(2)}`;
  priceCard.classList.add("price-card")
  const buttonPayCard = document.createElement("button");
  buttonPayCard.innerText = "Comprar";
  buttonPayCard.classList.add("btn-pay");

  card.appendChild(imgCard);
  card.appendChild(bandAgeCard);
  card.appendChild(titleCard);
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
    filterButton.classList.add("list-filters_button")
    listItem.appendChild(filterButton);
    listFilters.appendChild(listItem);
  });
}

function renderCards(array) {
  const listCards = document.querySelector(".list-cards");

  listCards.innerHTML = "";

  array.forEach(product => {
    const card = createCard(product);
    listCards.appendChild(card);
  });
}

renderFilterButtons(categories);
renderCards(products);

function addEvents(categoriesArray, productsArray) {
  let filterButtons = document.querySelectorAll(".list-filters_button");
  let priceInput = document.querySelector(".input-range");
  let priceParagraph = document.querySelector(".text-price");

  let filteredArray = productsArray;
  let categoryIndex = 0;

  priceInput.addEventListener("input", () => {
    const inputValue = priceInput.value;
    priceParagraph.innerText = `Até R$ ${inputValue}`;

    if (categoryIndex === 0) {
      // Se a categoria for "Todos", filtre apenas por preço
      filteredArray = productsArray.filter(
        (product) => product.price <= parseFloat(inputValue)
      );
    } else {
      // Para outras categorias, filtre por categoria e preço
      filteredArray = productsArray.filter(
        (product) =>
          product.category === categoryIndex &&
          product.price <= parseFloat(inputValue)
      );
    }

    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
      card.classList.remove("hidden");
    });

    allCards.forEach((card, index) => {
      const product = filteredArray[index];

      if (!product) {
        card.classList.add("hidden");
      }
    });

    renderCards(filteredArray);
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.innerText;
      categoryIndex = categoriesArray.indexOf(buttonText);

      const inputValue = priceInput.value; // Mova a obtenção do valor do input para dentro do evento de clique

      if (categoryIndex === 0) {
        // Se a categoria for "Todos", filtre apenas por preço
        filteredArray = productsArray.filter(
          (product) => product.price <= parseFloat(inputValue)
        );
      } else {
        // Para outras categorias, filtre por categoria e preço
        filteredArray = productsArray.filter(
          (product) =>
            product.category === categoryIndex &&
            product.price <= parseFloat(inputValue)
        );
      }
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((card) => {
        card.classList.remove("hidden");
      });

      allCards.forEach((card, index) => {
        const product = filteredArray[index];

        if (!product) {
          card.classList.add("hidden");
        }
      });

      renderCards(filteredArray);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const priceInput = document.querySelector(".input-range");
  const priceParagraph = document.querySelector(".text-price");
  const maxValue = priceInput.getAttribute("max");

  priceInput.value = maxValue;
  priceParagraph.innerText = `Até R$ ${maxValue}`;
});

addEvents(categories, products);
handleDarkMode();