/* defined new variable and wrapped in IIFE to eliminate code from global use*/
let pokemonRepository = (function(){
  /* defined pokemonList as variable and added 3 key-values to differentiate each object in the array */
  let pokemonList = [
      { name: 'charmeleon', height: 1.1, type: 'fire' },
      { name: 'pikachu', height: 0.4, type: 'electric' },
      { name: 'diglett', height: 0.2, type: 'ground' },
    ]
    
      function add(pokemon) {
      pokemonList.push(pokemon);
    }
      function getAll() {
        return pokemonList;
      }
  
    /* created pokemon list with buttons as items displaying the name */
      function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    /* added event listener: returns all pokemon info to console when button is clicked */
        button.addEventListener('click', function() {
          showDetails(pokemon);
        });
        
      }
    
      function showDetails(pokemon){
        console.log(pokemon);
      }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
      };
  
  })();
  
  console.log(pokemonRepository.getAll());
  
  /* use add function to create new Pokemons to my list */
  pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, type: 'grass'});

/* forEach loop iterates over addListItem function*/
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  
});

    
  
  
