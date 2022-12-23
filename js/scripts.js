/* defined new variable and wrapped in IIFE to eliminate code from global use*/
let pokemonRepository = (function(){

  /* list array is replaced with link to API */
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  /* positioned at beginning of code so I don't need to declare it in every function it's used on */
  let modalContainer = document.querySelector('#modal-container');
    
  /* data to be fetched from API */
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
          showModal(pokemon);
          // console.log(pokemon);
        });
      }

      function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
        
        let contentElement = document.createElement('p');
        contentElement.innerText = "Height: " + pokemon.height;
        
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
      }
    
      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }
      
      window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
         }
       });
    
       modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
       let target = e.target;
       if (target === modalContainer) {
        hideModal();
      }
  
  });
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
      };
  
  })();

  pokemonRepository.loadList().then(function() {
/* forEach loop iterates over addListItem function*/
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  
});
  });

    
  
  
