/* defined new variable and wrapped in IIFE to eliminate code from global use*/
let pokemonRepository = (function(){

  /* list array is replaced with link to API */
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
  /* data to be fetched from API */
      function add(pokemon) {
      pokemonList.push(pokemon);
    };

      function getAll() {
        return pokemonList;
      }
  
    /* calls list group item and button from bootstrap */
      function addListItem(pokemon){
          let listItem = $('<li class="list-group-item"></li>');
          let button = $(
        '<button class="pokemon-button btn btn-info" data-target="#pokemon-modal" data-toggle="modal">' +
          pokemon.name +
          '</button>'
        );

          listItem.append(button);
          pokemonListElement.append(listItem);

          button.on('click', function() {
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
          showModal(pokemon);
          // console.log(pokemon);
        });
      }

      
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
      };
  
  })();

  pokemonRepository.loadList().then(function() {
/* forEach loop iterates over addListItem function*/
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  
});
  });

    
  
  
