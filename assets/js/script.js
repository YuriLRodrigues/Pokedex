const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('form');
const inputSearch = document.querySelector('.input__search');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
let searchPokemon = 1;

const fecthPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200){
    const pokemonData = await APIResponse.json();
    return pokemonData
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = 'Loading... :)'
  pokemonNumber.textContent = '?'
  const data = await fecthPokemon(pokemon);
  if (data){
    pokemonImage.style.display = 'block';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    inputSearch.value = ''
    return
  } else {
    pokemonName.textContent = 'Not Found ;C';
    pokemonImage.style.display = 'none';
    inputSearch.value = ''
  }
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  renderPokemon(inputSearch.value.toLowerCase())
})

nextBtn.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})
prevBtn.addEventListener('click', () => {
  searchPokemon -= 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)