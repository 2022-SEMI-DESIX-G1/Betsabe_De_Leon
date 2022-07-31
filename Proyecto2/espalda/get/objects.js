getEvolutions = (evolution) => {
  const evolutions = [evolution.data.chain.evolves_to];
  let evolutionChain = [];
  let evolesArray = [];
  evolesArray.push(evolution.data.chain);

  while (evolutions[0] !== undefined && evolutions[0].length !== 0) {
    evolutionChain = evolutions.shift();
    evolutionChain.forEach((element) => {
      if (element) {
        evolesArray.push(element  );
        evolutions.push(element.evolves_to);
      }
    });
  }
  return evolesArray;
};

getAbilities = (response) => {
  const abilities = response.abilities.map((element) => element);
  return abilities;
};

getEncountersList = (response) => {
  const encountersArray = [];
  const encountersDetails = response.map((element) => {
    return element.version_details.map((index) => index.encounter_details.map((index1) => index1[0]));
  });
  
  try {
    encountersDetails.map(element => {
      element.map( (secondElement) => {
        encountersArray.push(secondElement)
      })
    })
  } catch (error) {
    console.log(error)
  }

  return encountersDetails;
};

module.exports = {
  getEvolutions,
  getAbilities,
  getEncountersList,
};
