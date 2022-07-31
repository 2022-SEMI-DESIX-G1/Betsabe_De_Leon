((Utils) => {
  const App = {
    htmlElements: {
      pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
      clean: document.querySelector("#limpiar"),
      pokemonFinderSearchType: document.querySelector(
        "#pokemon-finder-search-type"
      ),
      pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
      pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
      responseCard: document.querySelector(".card-pokemon"),
      location: document.querySelector("#location"),
      chain: document.querySelector("#chain"),
      sprites: document.querySelector("#sprit"),
      sprites: ``,
      encounters: ``,
      evolutions: ``,
      generals: ``,
    },
    init: () => {
      App.htmlElements.pokemonFinderForm.addEventListener(
        "submit",
        App.handlers.pokemonFinderFormOnSubmit
      );
    },
    handlers: {
      pokemonFinderFormOnSubmit: async (e) => {
        e.preventDefault();

        const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();

        try {
          const data = await Utils.getPokemon({
            query,
          });

          App.htmlElements.generals = App.templates.general(data.infoPokemon);

          if (App.htmlElements.sprites.checked) {
            App.htmlElements.sprites = App.templates.sprites(data.infoPokemon);
          } else {
            App.htmlElements.sprites = ``;
          }

          if (App.htmlElements.encounters.checked) {
            App.htmlElements.encounters = App.templates.encounters(
              data.infoPokemon
            );
          } else {
            App.htmlElements.encounters = ``;
          }

          if (App.htmlElements.evolutions.checked) {
            App.htmlElements.evolutions = App.templates.evolutions(
              data.infoPokemon
            );
          } else {
            App.htmlElements.evolutions = ``;
          }

          App.htmlElements.pokemonFinderOutput.innerHTML =
            App.htmlElements.generals +
            App.htmlElements.sprites +
            App.htmlElements.evolutions +
            App.htmlElements.encounters;
        } catch (error) {
          console.log(error);
          App.htmlElements.pokemonFinderOutput.innerHTML = `<div id="error"><h1 class="cleanSearch">Error en la busqueda</h1><div>`;
        }
      },
    },
    templates: {
      general: ({ id, sprites, name, weight, height, abilities, data}) => {
        abilietieList = abilities.map(
          (element) =>
            `<li>${element.ability.name} ${
              element.is_hidden ? App.htmlElements.hidden : ""
            }</li>`
        );
        return `<div id="general" >
                  <div><img class=poke src="${
                    sprites[0].other.home.front_default
                  }" alt=""></div>
                  <div> 
                  <h2>${name}(${id})</h2>
                  <div class="general">
                    weight: ${weight} <br>
                    height: ${height} <br><br>
                    <div class="ability-info">     
                  </div>
             
                </div>`;
               

                
      },
      encounters: ({ encounters }) => {
        const table = [];

        encounters.map((element) => {
          table.push(`<br><h3>${element.location_area.name}</h3><hr>`);
          element.version_details.map((index) => {
            table.push(
              `<strong><i><h4>&nbsp&nbsp&nbsp&nbsp&nbsp Version: ${index.version.name}</h4></i></strong>`
            );
            index.encounter_details.map((indexs) => {
              table.push(
                `<li>&nbsp&nbsp&nbsp&nbsp&nbsp${indexs.method.name} <strong>(${indexs.chance})</strong></li>`
              );
            });
          });
        });

        return `
              <div class="encounters">
              <h1>Encounters</h1>
              <div  class="card-encounters">
              ${table.join("")}
              </div>
              </div>
        `;
      },
      sprites: ({ sprites }) => {
        const sprite = Object.keys(sprites[0]);
        const spriteArray = [];
        sprite.map((element, index) => {
          if (index < 8 && sprites[0][element] != null) {
            spriteArray.push(
              `<img alt="PokéAPI"src="${sprites[0][element]}"/>`
            );
          }
        });
        return `
        <div id="hidden" class="sprites">
        <h1>Sprites</h1>
            <div class="sprites-all">
              ${spriteArray.join("")}
            </div>
        </div>`;
      },
      evolutions: ({ evolesArray }) => {
        evolutionList = evolesArray.map(
          (element) =>
            `<li>${element.species.name} ${
              element.is_baby ? App.htmlElements.baby : ""
            }</li> `
        );

        return ` <div class="evolutions">
                    <div class="info-detail">
                      <h1>Evolutions</h1>
                      <ul>${evolutionList.join("")}</ul>
                    </div>
                  </div>`;
      },
    },
  };
  App.init();
})(document.Utils);
