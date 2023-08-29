/* Desenvolva sua lógica aqui ... */
import { products, categories } from "./productsData.js";
import { handleDarkMode } from "./theme.js"

/* Trabalhe sua lógica aqui */
function createCard(product){
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

  // TAREFA 2

  function addEvents(categories, products) {
    const filterButtons = document.querySelectorAll(".list-filters_button");
    const priceInput = document.querySelector(".input-range");
    const priceParagraph = document.querySelector(".text-price");

    let filteredArray = products;
    let categoryIndex = 0;
    let inputValue = priceInput.value;

    priceInput.addEventListener("input", () => {
     priceParagraph.innerText = `Até R$ ${inputValue}`;
    })
    
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const buttonText = button.innerText;
        categoryIndex = categories.indexOf(buttonText);
        
        if (categoryIndex === 0) {
          filteredArray = products.filter(product => product.price <= parseFloat(inputValue));
        } else {
          filteredArray = products.filter(product => 
            product.category === categoryIndex && product.price <= parseFloat(inputValue)
          );
        }
        
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(card => {
          card.classList.remove("hidden");
        });
  
        // Adição da classe "hidden" apenas aos cards que não fazem parte da filtragem
        allCards.forEach((card, index) => {
          const product = filteredArray[index];
          
          if (!product) {
            card.classList.add("hidden");
          }
        });
  
        renderCards(filteredArray);
      });
    });
  
    priceInput.addEventListener("input", () => {
      inputValue = priceInput.value;
      if (categoryIndex === 0) {
        filteredArray = products.filter(product => product.price <= parseFloat(inputValue));
      } else {
        filteredArray = products.filter(product => 
          product.category === categoryIndex && product.price <= parseFloat(inputValue)
        );
      }
  
      // Remoção da classe "hidden" dos cards
      const allCards = document.querySelectorAll(".card");
      allCards.forEach(card => {
        card.classList.remove("hidden");
      });
  
      // Adição da classe "hidden" apenas aos cards que não fazem parte da filtragem
      allCards.forEach((card, index) => {
        const product = filteredArray[index];
        
        if (!product) {
          card.classList.add("hidden");
        }
      });
  
      renderCards(filteredArray);
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

