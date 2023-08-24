/* Desenvolva sua lógica aqui ... */
import { products, categories } from "./productsData.js";

function createCard(product){
    const card = document.createElement("li")
    card.classList.add("card");
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
      filterButton.classList.add("list-filters_button")
      listItem.appendChild(filterButton);
      listFilters.appendChild(listItem);
    });
  }

  function renderCards(array) {
    const listCards = document.querySelector(".list-cards");
    
    while (listCards.firstChild) {
      listCards.removeChild(listCards.firstChild);
    }

    array.forEach(product => {
      const card = createCard(product);
      listCards.appendChild(card);
    });
  }
  
  renderFilterButtons(categories);
  renderCards(products);

  // TAREFA 2

  function addEventListenersToButtons(categories, products) {
    const filterButtons = document.querySelectorAll(".list-filters_button");
  
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const buttonText = button.innerText;
        const categoryIndex = categories.indexOf(buttonText);
  
        if (categoryIndex === 0) {
          renderCards(products);
          // console.log("Todos os generos");
        } else {
          const filteredProducts = products.filter(product => product.category === categoryIndex);
          // console.log("Genero filtrado:", filteredProducts);
          renderCards(filteredProducts);
        }
      });
    });
  
    const priceInput = document.querySelector(".input-range");
    const priceParagraph = document.querySelector(".container__price p");
  
    priceInput.addEventListener("input", () => {
      const selectedPrice = parseFloat(priceInput.value);
      priceParagraph.innerText = `Até R$ ${selectedPrice.toFixed(2)}`;
      const filteredProducts = products.filter(product => product.price <= selectedPrice);

      const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => {
    card.classList.remove("hidden");
  });

  // Adicione a classe "hidden" apenas aos cards que não fazem parte da filtragem
  allCards.forEach(card => {
    if (!filteredProducts.some(product => product.id.toString() === card.dataset.productId)) {
      card.classList.add("hidden");
    }
  });

      renderCards(filteredProducts);
    });
  }
  
  // Chamar a função addEventListenersToButtons passando os arrays de categorias e produtos
  addEventListenersToButtons(categories, products);
  
  