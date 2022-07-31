(() => {
    const Utils = {
      settings: {
        backendBaseUrl: "http://localhost:3000/api/pokemon",
        options:  {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
        }
      },
      getFormattedBackendUrl: ({ query }) => {
        return `${Utils.settings.backendBaseUrl}/${query}`;
      },
      getPokemon: ({ query }) => {
        return Utils.fetch({
          url: Utils.getFormattedBackendUrl({ query })
        });
      },
      getEvolution:  (url)=>{
        return Utils.fetch({url})
      },
      fetch: async ({ url }) => {
        try {
          const rawResponse = await fetch(url, Utils.settings.options);
          console.log(rawResponse)
          if (rawResponse.status !== 200) {   
            throw new Error(`${url} not found`);
          }
          return rawResponse.json();
        } catch (error) {
        
          throw error;
        }
      },
    };
    document.Utils = Utils;
  })();