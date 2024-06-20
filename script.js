const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokeball = document.getElementById("pokeball");
const pokemonImg = document.getElementById("pokemon-img");
const typesEl = document.getElementById("types");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttackEl = document.getElementById("special-attack");
const spDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

const pokemonEP = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}"

searchButton.addEventListener("click", async () => {
  let searchValue = searchInput.value;
  let pokeUrl = pokemonEP;
  let pokeData = {};

  if(searchValue === ""){
    alert("Please enter a Pokémon name or ID.")
    return;
  }

  searchValue = cleanInput(searchValue);
  pokeUrl = updateEP(pokeUrl, searchValue);
  pokeData = await fetchPokeData(pokeUrl);

  if(Object.keys(pokeData).length === 0){
    alert("Pokémon not found");
    return;
  }

  setPokeData(pokeData);

});

const cleanInput = (input) => {
  const noSpecialCharacterRegex = /[\s~`@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g;
  return input.replace(noSpecialCharacterRegex, "").toLowerCase().trim();
};

const updateEP = (url, nameOrId) => url.replace(/{name-or-id}/, nameOrId);

const fetchPokeData = async (url) => {
  try{
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }catch(err) {
    alert("Pokémon not found")
    resetData();
  }
};

const setPokeData = (pokeData) => {
  const {
    name,
    id,
    height,
    weight,
    sprites,
    stats,
    types
  } = pokeData;
  

  pokemonName.textContent = capitalize(name);
  pokemonId.textContent = `#${id}`;
  weightEl.textContent = `Weight: ${weight}`;
  heightEl.textContent = `Height: ${height}`;
  pokeball.style.display = "none";
  pokemonImg.id = "sprite";
  pokemonImg.src = sprites.front_default;
  pokemonImg.alt = `${name}-img`;

  typesEl.innerHTML = types.map(({ type }) => `<div class="type ${type.name}">${capitalize(type.name)}</div>`).join("");

  hpEl.textContent = stats.find(item => item.stat.name === "hp").base_stat;
  attackEl.textContent = stats.find(item => item.stat.name === "attack").base_stat;
  defenseEl.textContent = stats.find(item => item.stat.name === "defense").base_stat;
  spAttackEl.textContent = stats.find(item => item.stat.name === "special-attack").base_stat;
  spDefenseEl.textContent = stats.find(item => item.stat.name === "special-defense").base_stat;
  speedEl.textContent = stats.find(item => item.stat.name === "speed").base_stat;
};


const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const resetData = () => {

  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weightEl.textContent = "";
  heightEl.textContent = "";
  pokeball.style.display = "flex";
  pokemonImg.id = "";
  pokemonImg.src = "";
  pokemonImg.alt = "";

  typesEl.innerHTML = "";

  hpEl.textContent = "";
  attackEl.textContent = "";
  defenseEl.textContent = "";
  spAttackEl.textContent = "";
  spDefenseEl.textContent = "";
  speedEl.textContent = "";
};
