/* defined new variable and wrapped in IIFE to eliminate code from global use*/
let pokemonRepository = (function(){
  /* list array is replaced with link to API */
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
  /*filled in data to be added for each pokemon list item*/
      function add(pokemon) {
        "name" in pokemon &&
        "detailsUrl" in pokemon &&
        "imageURL" in pokemon
      pokemonList.push(pokemon);
    };

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
        button.addEventListener('click', function(event) {
          showDetails(pokemon);
        });
        
      }
  
    /* getting data from the API using promise */  
      function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
    
      function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
          console.log(pokemon);
        });
      }

      /* attempt at adding image url */
      function addImage(pokemon){
        let pokemonImage = document.createElement('img'); 
        pokemonImage.src = pokemon.imageUrl; 
        // let src = document.getElementById('x'); 
        img.classList.add('img-class');
        src.appendChild(img);
        }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
      };
  
  })();

  pokemonRepository.loadList().then(function() {
/* forEach loop iterates over addListItem function*/
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  
});
  });

    
  
  
