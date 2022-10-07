const baseUrl = "https://pokeapi.co/api/v2/pokemon/" //api
const pokeDisplay = document.querySelector(".pokeDisplay");//con querySelector llamo  a los elmentos que voy a modificar del DOM
const errorMsg = document.querySelector(".errorMsg");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");

//
const pokemonFetch = async (id) => {
    try {
        pokeDisplay.innerHTML = `<p class="load">Loading...</p> `
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json()
        setTimeout(() => renderCard(data), 1000)
        input.value = "";
    } catch (error) { 
        pokeDisplay.innerHTML =
            `<p class="errorMsg">There is no Pokemon with that ID number!</p>`
        input.value = "";
    }
}

//mostrar pokemon
const renderCard = (data) => {
    const { name, weight, height } = data;
    pokeDisplay.innerHTML =
        `
    <h1>${name.toUpperCase()}</h1>
    <p class="pokeId">#${data.id}</p>
    <img src="${data.sprites.other.home.front_default}">
    <div class="tipos">
    <h2 class="${data.types[0].type.name}">${data.types[0].type.name}</h2>
    </div>
    <span class="height">Height: ${height / 10} Mts</span>
    <span class="weight">Weight: ${weight / 10} kg</span>
    `   ;
};

//
const init = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //previene que se reinicie la pagina
        if (input.value === "") {
            pokeDisplay.innerHTML =
                `<p class="errorMsg">Write your Pokemon ID</p> `
            return;
        }
        pokemonFetch(input.value); //conecto mi funcion de fetch con lo que está en el input
    })
};

init()