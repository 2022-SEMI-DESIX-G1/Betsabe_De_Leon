(() => {
  const Utils = {
    settings: {
      backendBaseUrl: "https://pokeapi.co/api/v2",
    },
    getFormattedBackendUrl: ({ query, searchType }) => {
      return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
    },
    getPokemon: ({ query, searchType = "pokemon" }) => {
      return Utils.fetch({
        url: Utils.getFormattedBackendUrl({ query, searchType }),
        searchType,
      });
    },

    getEvolution:(url)=>{

      return Utils.fetch({url, searchType: ""})

    },
    
    fetch: async ({ url, searchType }) => {
      try {
        const rawResponse = await fetch(url);
        if (rawResponse.status !== 200) {
          throw new Error(`<div >${searchType} no encontrada</div>`);
       }
        return rawResponse.json();
      } catch (error) {
        throw `<div id="pokemon">${error}</div>`;
      }
    },
  };
  document.Utils = Utils;
})();