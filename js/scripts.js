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
  
      return {
        add: add,
        getAll: getAll
      };
  
  })();
  
  console.log(pokemonRepository.getAll());
  
  pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, type: 'grass'});

  
// /* OLD CODE */
// /* tell 'for-loop' code to look to length of variable array above first */
// for (let i=0; i < pokemonList.length; i++){
//   /* set condition for specific key-value of objects in array */
//     if (pokemonList[i].height >= 1){
//       console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
//   /* inserted html break line tag to display each object on a new line  */
//       document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
//   /* only need to use 'else' rather than 'else-if' as we want the output to be on just one object  */
//   } else {
//       console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
//   /* inserted html break line tag to display each object on a new line  */
//       document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>")
//   }
//   }

/* forEach loop uses pokemonRepository.getAll() instead of pokemonList to retrieve data now that array is protected by IIFE*/
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >= 1) {
    document.write(pokemon.name + " " + " (height: " + pokemon.height + ") - Wow, that's big!" + "<br>");
  }else {
      document.write(pokemon.name + " " + "(height: " + pokemon.height + ")" + "<br>");
    }
  
});

    
  
  
