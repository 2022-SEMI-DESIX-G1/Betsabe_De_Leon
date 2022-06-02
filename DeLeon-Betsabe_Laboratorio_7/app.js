const axios = require('axios').default;
const url = 'https://pokeapi.co/api/v2';
const pokemon = "pokemon";
const ability = "ability";
const arr = [pokemon, ability];
var link = [];

TipodeBusqueda = Math.floor(Math.random() * arr.length);
link = arr[TipodeBusqueda];
console.log(link);

//Se genera el tipo de búsqueda aleatoriamente

if (link === 'pokemon'){
const obtenerInfo = async() => {
    try{
    
        
        const response = await axios.get(`https://pokeapi.co/api/v2/${link}/pikachu`);
         
              if(response.status === 200){
                       //console.log(response);
            console.log("Nombre: "+" "+response.data.name +"\n");
            console.log("ID: "+" "+response.data.id+"\n");
            console.log("Peso"+" "+response.data.weight+" "+"Altura"+" "+response.data.height+"\n");
            const abilities = response.data.abilities;
            const poke = await axios.get(response.data.species.url);
            const evolution = (poke.data.evolution_chain.url);
            const EvolutionFinal = await axios.get(evolution)
           // console.log(evolution);
           console.log("Habilidades"+"\n")
           const pokemonList = abilities.map(({ability, is_hidden}) =>
           console.log(ability.name)
           );
           console.log("\n");
           console.log("Cadena de Evolución"+"\n");
            console.log(EvolutionFinal.data);
            }
        }catch(error){
            console.log('Error');
        }             
}



const info = async () => {
const information = obtenerInfo().then(response =>{

})
}
info();



}else{

const obtenerInfo = async() => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/${link}/battle-armor`);
    
              if(response.status === 200){
                const pokemon = [];
                const poke = (response.data.pokemon);
                
                pokemon = poke.map(
                  ({ pokemon, is_hidden }) =>
                    console.log(pokemon.name)
                );
           
  
            }
        }catch(error){
            console.log('Error');
        }             
}

const info = async () => {
    const information = obtenerInfo().then(response =>{
        //console.log(response.data.ability)
    })
    }
    info();
}
