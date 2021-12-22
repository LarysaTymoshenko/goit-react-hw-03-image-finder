import React, { Component } from "react";
import { FcSearch } from "react-icons/fc";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    imgName: "",
  };

  handleInput = (e) => {
    this.setState({
      imgName: e.currentTarget.value.toLowercase(),
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
        <form class={s.searchForm}>
          <button type="submit" class={s.searchForm_button}>
            <FcSearch />
          </button>

          <input
            class={s.searchForm_input}
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

Searchbar.protoType = {
  imgName: PropTypes.string.isRequired,
  onAddContact: PropTypes.func.isRequired,
};
