let pokemonRenderArea = document.getElementById("pokemonEncounterArea");

function renderPokemonData(pokemonData) {
	if (!pokemonData.name) {
		return;
	}

	let pokemonContainerDiv = document.createElement("div");
	pokemonContainerDiv.classList.add("pokemonCardEntry");

	let pokemonImage = document.createElement("img");
	pokemonImage.src = pokemonData.image;
	pokemonContainerDiv.appendChild(pokemonImage);

	let pokemonHeading = document.createElement("h1");
	pokemonHeading.innerText = pokemonData.name;
	pokemonContainerDiv.appendChild(pokemonHeading);

	let pokemonTypesHeading = document.createElement("h3");
	pokemonTypesHeading.innerText = "Types:";
	pokemonContainerDiv.appendChild(pokemonTypesHeading);

	let pokemonTypeList = document.createElement("ul");
	pokemonData.types.forEach((typeObject) => {
		let pokemonTypeListItem = document.createElement("li");
		pokemonTypeListItem.innerText = typeObject.type.name;
		pokemonTypeList.appendChild(pokemonTypeListItem);
	});
	pokemonContainerDiv.appendChild(pokemonTypeList);

	let pokemonAudioButton = document.createElement("button");
	pokemonAudioButton.innerText = "Play Sound";
	pokemonAudioButton.addEventListener("click", () => {
		let pokemonAudioObject = new Audio(pokemonData.sound);
		pokemonAudioObject.play();
	});
	pokemonContainerDiv.appendChild(pokemonAudioButton);

	pokemonRenderArea.appendChild(pokemonContainerDiv);
}

function getRandomPokemonId() {
	return Math.floor(Math.random() * 1025) + 1;
}

async function getPokemon() {
	let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
	let apiData = await apiResponse.json();

	return {
		name: apiData.name,
		types: apiData.types,
		image: apiData.sprites.other.home.front_default,
		sound: apiData.cries ? apiData.cries.latest : ""
	};
}

let encounterButton = document.getElementById("pokemonEncounterButton");

encounterButton.addEventListener("click", async () => {
	let pokemonResult = await getPokemon();
	renderPokemonData(pokemonResult);
});

let encounterGroupButton = document.getElementById("pokemonGroupEncounter");

encounterGroupButton.addEventListener("click", async () => {
	let multiplePokemonResult = await Promise.all([
		getPokemon(),
		getPokemon(),
		getPokemon(),
		getPokemon(),
		getPokemon(),
		getPokemon(),
	]);

	multiplePokemonResult.forEach(renderPokemonData);
});
