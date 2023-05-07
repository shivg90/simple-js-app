/* defined new variable and wrapped in IIFE to eliminate code from global use*/
let pokemonRepository = (function(){

  /* list array is replaced with link to API */
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = $('.pokemon-list');

  /* data to be fetched from API */
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      pokemon.name && pokemon.detailsUrl
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
      return pokemonList;
  }
  
    /* calls list group item and button from bootstrap */
  function addListItem(pokemon){
      
      let listItem = $('<li class="list-group-item"></li>');
      let button = $('<button class="pokemon-button btn btn-info" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');

      listItem.append(button);
      pokemonListElement.append(listItem);
     

    /* event listener to show pokemon details when clicked */
      button.on('click', function() {
        showDetails(pokemon);
      });   
  }
  
    /* loading data from the API using promise */  
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
    /* loading details from API, define which details by "item." */
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map((type) => type.type.name);
        pokemon.abilities = details.abilities.map((abilities) => abilities.ability.name);
      }).catch(function (e) {
          console.error(e);
      });
    }
    
    /* function for showing defined API details within modal layout */
    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        showDetailsModal(pokemon);
      });
    }

    /* modal function and defining elements */
    function showDetailsModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      modalBody.empty();
      modalTitle.text(pokemon.name);

      let heightElement = $('<p>' + 'Height:  ' + pokemon.height + '' + 'cm' + '</p>');
      let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '' + 'g' + '</p>');
      let imageElementFront = $('<img class="pokemon-img" src="' + pokemon.imageUrlFront + '" />');
      let imageElementBack = $('<img class="pokemon-img" src="' + pokemon.imageUrlBack + '" />');
      let typeElement = $('<p>' + 'Types:  ' + pokemon.types + '</p>');
      let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');
        
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);
      modalBody.append(abilitiesElement);

    } 

    const searchPokemon = document.getElementById('search-pokemon');
      searchPokemon.addEventListener('keyup', (e) => {
        e.preventDefault();
        const pokemonListItems = document.querySelectorAll('.list-group-item');
        const filterValue = e.target.value.toLowerCase();
        pokemonListItems.forEach(function (item) {
            if (item.innerText.toLowerCase().indexOf(filterValue) > -1) {
                item.style.display = "";
            } else {
                item.style.display = 'none';
            }
        });
    })
  
    /* returned data from defined functions */
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showDetailsModal: showDetailsModal,
      };
  
  })();

  pokemonRepository.loadList().then(function() {
    /* forEach loop iterates over addListItem function*/
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  
    });
  });


  
  
