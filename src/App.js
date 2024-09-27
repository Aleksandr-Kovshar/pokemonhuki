import React, { Component } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PokemonForm from "components/PokemonForm";
import PokemonInfo from "components/PokemonInfo";


class App extends Component {
  state = {
    pokemonName: null,
  };

  handleFormSubmit = (pokemonName) => {
    console.log(pokemonName);
    this.setState({pokemonName})
  };

  render() {
    return (
      <div style={{ maxWidth: 1170, margin: "0 auto", padding: 20 }}>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName = {this.state.pokemonName}/>
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }
}

// class App extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//   };
//   componentDidMount() {
//     this.setState({loading: true});
//     fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//       .then((res) => res.json())
//       .then(pokemon=>this.setState({pokemon})).finally(()=>this.setState({loading: false}));
//   }

//   render() {
//     return (
//       <div style={{ maxWidth: 1170, margin: "0, auto", padding: 20 }}>
//       {this.state.loading&&<h1>Загружаем...</h1>}
//         {this.state.pokemon && (
//           <div>{this.state.pokemon.name}</div>
//         )}
//         {/* <ToastContainer autoClose={3000} /> */}
//       </div>
//     );
//   }
// }

export default App;
