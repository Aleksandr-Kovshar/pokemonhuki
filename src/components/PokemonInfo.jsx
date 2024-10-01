// import React, { Component } from "react";

// class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//     error: null,

//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       console.log("имя покемона изменилось");
//       this.setState({ loading: true,  pokemon: null,});

//       fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
//         .then((res) =>{
//             if(res.ok){
//                 return res.json();
//             }
//             return Promise.reject(new Error(`Нет покемона с именем ${nextName}`))
//         } )
//         .then((pokemon) => this.setState({ pokemon }))
//         .catch(error=>this.setState({error}))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   render() {
//     const { pokemon, loading, error } = this.state;
//     const { pokemonName } = this.props;

//     return (
//       <div>
//         {error && <h1>{error.message}</h1>}
//         {loading && <div>Загружаем...</div>}
//         {!pokemonName && <div>Введите имя покемона</div>}
//         {pokemon && (
//           <div>
//             <p>{pokemon.name}</p>
//             <img
//               src={pokemon.sprites.other["official-artwork"].front_default}
//               width="300"
//               alt="logo pokemon"
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default PokemonInfo;

// Рефакторинг кода, стейт машины  state machine:

import React, { Component } from "react";
import PokemonErrorView from "./PokemonErrorView";
import PokemonDataView from "./PokemonDataView";
import PokemonPendingView from "./PokemonPendingView";
import pokemonAPI from "../services/pokemon-api";

// class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     error: null,
//     status: "idle",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       console.log("имя покемона изменилось");
//       this.setState({ status: "pending" });

//       setTimeout(() => {
//         pokemonAPI
//           .fetchPokemon(nextName)
//           .then((pokemon) => this.setState({ pokemon, status: "resolved" }))
//           .catch((error) => this.setState({ error, status: "rejected" }));
//       }, 3000);
//     }
//   }

//   render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === "idle") {
//       return <div>Введите имя покемона</div>;
//     }

//     if (status === "pending") {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === "rejected") {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === "resolved") {
//       return <PokemonDataView pokemon={pokemon} />;
//     }
//   }
// }

// export default PokemonInfo;

import { useState, useEffect } from "react";

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {

    if(!pokemonName){
      // первый рендер, если нет ничего в покемон нейм, то выходим с функции, то есть не делаем фетч
      return;
    }

    setStatus("pending");

    setTimeout(() => {
      pokemonAPI
        .fetchPokemon(pokemonName)
        .then((pokemon) => {
          // порядок важен, положили покемона, потом меняем статус чтобы ниже этого покемона использовать
          setPokemon(pokemon);
          setStatus("resolved");
        })
        .catch((error) => {
          setError(error);
          setStatus("rejected");
        });
    }, 3000);
  }, [pokemonName]);

  if (status === "idle") {
    return <div>Введите имя покемона</div>;
  }

  if (status === "pending") {
    return <PokemonPendingView pokemonName={pokemonName} />;
  }

  if (status === "rejected") {
    return <PokemonErrorView message={error.message} />;
  }

  if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

export default PokemonInfo;
