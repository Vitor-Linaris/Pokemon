//Scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
  effect: "fade",
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const cardPokemon = document.querySelectorAll(".js-open-details-pokemon");
const btnCloseModal = document.querySelector(".js-close-modal-details-pokemon");

function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}

cardPokemon.forEach((card) => {
  card.addEventListener("click", openDetailsPokemon);
});

if (btnCloseModal) {
  btnCloseModal.addEventListener("click", closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector(".js-open-select-custom");

btnDropdownSelect.addEventListener("click", () => {
  btnDropdownSelect.parentElement.classList.toggle("active");
});

const areaPokemons = document.getElementById("js-list-pokemon");

function primeiraLetraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCardPokemon(code, type, nome, imagePok) {
  let card = document.createElement("button");
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  card.setAttribute("code-pokemon", code);
  areaPokemons.appendChild(card);

  let image = document.createElement("div");
  image.classList = "image";
  card.appendChild(image);

  let imageSrc = document.createElement("img");
  imageSrc.className = "thumb-img";
  imageSrc.setAttribute("src", imagePok);
  image.appendChild(imageSrc);

  let infoCardPokemon = document.createElement("div");
  infoCardPokemon.classList = "info";
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement("div");
  infoTextPokemon.classList = "text";
  infoCardPokemon.appendChild(infoTextPokemon);

  let codePokemon = document.createElement("span");
  codePokemon.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement("h3");
  namePokemon.textContent = primeiraLetraMaiuscula(nome);
  infoTextPokemon.appendChild(namePokemon);

  let areaIcon = document.createElement("div");
  areaIcon.classList = "icon";
  infoCardPokemon.appendChild(areaIcon);

  let imageType = document.createElement("img");
  imageType.setAttribute("src", `img/icon-types/${type}.svg`);
  areaIcon.appendChild(imageType);
}

function listingPokemons(urlApi) {
  axios({
    method: "GET",
    url: urlApi,
  }).then((response) => {
    const countPokemons = document.getElementById("js-count-pokemons");

    const { results, next, count } = response.data;

    countPokemons.innerText = count;

    results.forEach((pokemon) => {
      let urlApiDetails = pokemon.url;

      axios({
        method: "GET",
        url: `${urlApiDetails}`,
      }).then((response) => {
        const { name, id, sprites, types } = response.data;

        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name,
        };

        createCardPokemon(
          infoCard.code,
          infoCard.type,
          infoCard.nome,
          infoCard.image
        );

        const cardPokemon = document.querySelectorAll(
          ".js-open-details-pokemon"
        );

        cardPokemon.forEach((card) => {
          card.addEventListener("click", openDetailsPokemon);
        });
      });
    });
  });
}

listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");

// Listando os tipos de Pokemons (Fire, steel, etc).

const areaType = document.getElementById("js-type-area");
const areaTypeMobile = document.querySelector(".dropdown-select");

axios({
  method: "GET",
  url: "https://pokeapi.co/api/v2/type/",
}).then((response) => {
  const { results } = response.data;

  results.forEach((type, index) => {
    if (index < 18) {
      let itemType = document.createElement("li");
      areaType.appendChild(itemType);

      let buttonType = document.createElement("button");
      buttonType.classList = `type-filter ${type.name}`;
      itemType.appendChild(buttonType);

      let iconType = document.createElement("div");
      iconType.classList = "icon";
      buttonType.appendChild(iconType);

      let srcType = document.createElement("img");
      srcType.setAttribute("src", `img/icon-types/${type.name}.svg`);
      iconType.appendChild(srcType);

      let nameType = document.createElement("span");
      nameType.textContent = primeiraLetraMaiuscula(type.name);
      buttonType.appendChild(nameType);

      //Mobile tipos de pokemons

      let itemTypeMobile = document.createElement("li");
      areaTypeMobile.appendChild(itemTypeMobile);

      let buttonTypeMobile = document.createElement("button");
      buttonTypeMobile.classList = `type-filter ${type.name}`;
      itemTypeMobile.appendChild(buttonTypeMobile);

      let iconTypeMobile = document.createElement("div");
      iconTypeMobile.classList = "icon";
      buttonTypeMobile.appendChild(iconTypeMobile);

      let srcTypeMobile = document.createElement("img");
      srcTypeMobile.setAttribute("src", `img/icon-types/${type.name}.svg`);
      iconTypeMobile.appendChild(srcTypeMobile);

      let nameTypeMobile = document.createElement("span");
      nameTypeMobile.textContent = primeiraLetraMaiuscula(type.name);
      buttonTypeMobile.appendChild(nameTypeMobile);
    }
  });
});

// Script load more

const btnLoadMore = document.getElementById("js-btn-load-more");

let countPagination = 10;

function showMorePokemon() {
  listingPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`
  );

  countPagination = countPagination + 9;
}

btnLoadMore.addEventListener("click", showMorePokemon);
