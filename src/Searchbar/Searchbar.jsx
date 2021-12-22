import React, { Component } from "react";
import { FcSearch } from "react-icons/fc";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default class Saerchbar extends Component {
  state = {
    imgName: "",
  };

  handleInput = (e) => {
    const { imgName, value } = e.currentTarget;
    this.setState({
      [imgName]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.imgName);
    this.reset();
  };
  reset = () => {
    this.setState({ imgName: "" });
  };
  render() {
    return (
      <header class={s.searchbar}>
        <form class="form">
          <button type="submit" class={s.button}>
            <FcSearch />
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Saerchbar.protoType = {
  imgName: PropTypes.string.isRequired,
  onAddContact: PropTypes.func.isRequired,
};
