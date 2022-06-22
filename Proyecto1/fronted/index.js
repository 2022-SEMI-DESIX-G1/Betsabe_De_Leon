(() => {
    const App = {
      config: {
        apiBaseUrl: "http://localhost:3000/pokemon",
      },
      htmlElements: {
        form: document.querySelector(".pokemon-form"),
        input: document.querySelector("#pokemon-input"),
        pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
        location: document.querySelector("#location"),
        chain: document.querySelector("#chain"),
        sprites: document.querySelector("#sprit"),
      },
      init: () => {
        App.htmlElements.form.addEventListener(
          "submit",
          App.handlers.handleFormSubmit
        );
      },
      handlers: {
        handleFormSubmit: async (e) => {
          e.preventDefault();
          const pokemon = App.htmlElements.input.value;
          const url = App.utils.getUrl({ pokemon });
         
          const { data } = await axios.post(url);
          const evo = await axios.get(url);
        
          console.log({ data });
          const renderTemplates = App.templates.generalCard({data}, evo.data);
          App.htmlElements.pokemonFinderOutput.innerHTML = renderTemplates; 
          

          if (App.htmlElements.location.checked)
          {
          const renderTemplates = App.templates.locationCard(evo.data);
          App.htmlElements.pokemonFinderOutput.innerHTML += renderTemplates; 
          }
          
          if (App.htmlElements.chain.checked){
            
          const renderTemplates = App.templates.evolutionCard(evo.data);
          App.htmlElements.pokemonFinderOutput.innerHTML += renderTemplates; 
          }
          
          if(App.htmlElements.sprites.checked){
            
          const renderTemplates = App.templates.spritesCard({data});
          App.htmlElements.pokemonFinderOutput.innerHTML += renderTemplates; 
          }
        },
      },
 
    templates: {
      spritesCard: ({data}) => {

        return `<form id = "general">
        <div id="pokemon">
          <h3 class="title">Sprites</h3>
          <div class="imgs">

                <img id=sprite src=${data.data.sprites.front_default}></img>
                <img id=sprite src=${data.data.sprites.back_default}></img>
                <img class = "${data.data.sprites.back_female != null ? "d-visible" : "d-none" } id=sprite  src=${data.data.sprites.back_female}></img>
                <img id=sprite src=${data.data.sprites.back_shiny}></img>
                <img class = "${data.data.sprites.back_shiny_female != null ? "d-visible" : "d-none" } id=sprite src=${data.data.sprites.back_shiny_female}></img>
                <img class="${data.data.sprites.front_female != null ? "d-visible" : "d-none" } id=sprite src=${data.data.sprites.front_female}></img>
                <img id=sprite src=${data.data.sprites.front_shiny}></img>
                <img id=sprite src=${data.data.sprites.front_shiny_female}></img>
              
          </div>
          </div>
        </form>
     `;
    },


    generalCard: ({data}) => {
        
       return `<form id = "general">
       <div id="pokemon">
       <h1 class="title">${data.data.name}</h1>
       <div class="firstElements">
         <div class="info">
         
         <div class="imgs">
               <img class=poke src=${data.data.sprites.other.home.front_default}></img>
         </div>
         </div>
         <div id="location-Card" class="otrasOpciones">
       <div class="info">
       <h3 class="titles">Weight/Height </H3>
       <ul>
        ${data.data.weight} / ${data.data.height}
       </ul>
    
       </div>
       </form>
    `;
   },

    evolutionCard: (evo) => {
     
      var evolutionList = evo.evol.map(
        (element) =>
        `<li>${element}</li> `
        );

      return `
              <form id = "general">
              <div class="info">
                  <h3 class="title">Evolutions</h3>
              <H4  class="infoCard">${evolutionList.join("")}<h4>
              </div
              </form>`;
    },

    locationCard: (evo) => {
      var locationList = evo.lug.map(
        (element) =>
        `<li>${element}</li> `
        );
        return `
        <form id = "general">
        <div class="info">
            <h3 class="title">Locations</h3>
        <H4 class="infoCard2">${locationList.join("")}<h4>
        </div>
        </form>`;
      }
      },

      utils: {
        getUrl: ({ pokemon }) => {
          return `${App.config.apiBaseUrl}/${pokemon}`;
        },
      }
    };
    App.init();
  })();