import React, { Component } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// class PokemonForm extends Component {
//   state = {
//     pokemonName: "",
//   };

//   handleNameChange = (e) => {
//     this.setState({ pokemonName: e.currentTarget.value.toLowerCase() });
//   };

  
//   handleSubmit = (e) => {
//     e.preventDefault();

//     if(this.state.pokemonName.trim() === ""){
//       toast.error("введите имя покемона!");;
//         return;
//       }

    
//     this.props.onSubmit(this.state.pokemonName);
//     this.setState({ pokemonName: "" });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} style={StyleSheet.form}>
//         <input
//           type="text"
//           name="pokemonName"
//           value={this.state.pokemonName}
//           onChange={this.handleNameChange}
//         ></input>
//         <button type="submit"><ImSearch style={{marginRight:8}}/>Найти</button>
//       </form>
//     );
//   }
// }

// export default PokemonForm;

import { useState } from "react";

function PokemonForm ({onSubmit}){

  const [pokemonName, setPokemonName]= useState("");

  const handleNameChange = (e) => {
    setPokemonName(e.currentTarget.value.toLowerCase());
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(pokemonName.trim() === ""){
      toast.error("введите имя покемона!");;
        return;
      }

    
    onSubmit(pokemonName);
    setPokemonName("");
  };

 
    return (
      <form onSubmit={handleSubmit} style={StyleSheet.form}>
        <input
          type="text"
          name="pokemonName"
          value={pokemonName}
          onChange={handleNameChange}
        ></input>
        <button type="submit"><ImSearch style={{marginRight:8}}/>Найти</button>
      </form>
    );
  


}


export default PokemonForm;