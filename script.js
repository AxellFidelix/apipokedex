const containerPokemons = document.getElementById("pokemons")
const carregarMaisBtn = document.querySelector(".carregar-mais")
const BASE_API = "https://pokeapi.co/api/v2";

let offset = 0

/* 
    [
    { nome: '', url   }
]

[
    {
        pokemon: {
            nome: '', url: ''    
            },
        slot: 1
    }
]
*/

function pegarPokemons(voltarOriginal = false) {
    if (voltarOriginal) {
        offset = 0
        carregarMaisBtn.style.display = 'block'
        containerPokemons.innerHTML = ''
    }

    fetch(`${BASE_API}/pokemon?offset=${offset}`)
    .then(resposta => resposta.json())
    .then(dados => {
        dados.results.forEach(item => {
            pegarPokemon(item.url)
        })
    })
}

function carregarMais() {
    offset += 20
    pegarPokemons()
}

function pegarPokemon(urlPokemon) {
    fetch(urlPokemon)
    .then(res => res.json())
    .then(pokemon => {
        const img = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ? 
        pokemon.sprites.versions['generation-v']['black-white'].animated.front_default 
        : pokemon.sprites.front_default

        containerPokemons.innerHTML += `
            <div class="pokemon">
                <img src="${img}" />
                <h2>${pokemon.name}</h2>

                <div class="types">
                    ${pokemon.types.map(item => `<span class="type ${item.type.name}">${item.type.name}</span>`).join(" ")}
                </div>
            </div>
        `
    })
}

function filtrarPorTipo(nomeTipo) {
    containerPokemons.innerHTML = ''
    carregarMaisBtn.style.display = 'none'

    fetch(`${BASE_API}/type/${nomeTipo}`)
    .then(resposta => resposta.json())
    .then(dados => {
        dados.pokemon.forEach(item => {
            pegarPokemon(item.pokemon.url)
        })
    })
}

// [] - criar uma função que vai fazer o fetch na rota de tipos baseado em qual tipo o usuario clicou
// [] - mostrar os pokemons filtrado na tela
// [] - prestar atenção no formato do array de pokemons que vem na rota
// base_api/type/nome_do_tipo
//dontpad: 114-21-07

pegarPokemons()