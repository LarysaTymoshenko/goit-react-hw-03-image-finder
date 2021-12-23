import React, { Component } from "react";
import { FcSearch } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    imgName: "",
  };

  handleInput = (e) => {
    this.setState({
      imgName: e.currentTarget.value.toLowerCase(),
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.imgName.trim() === "") {
      toast("Enter please request");
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: "" });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchForm_button}>
            <FcSearch />
          </button>

          <input
            className={s.search_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imgName}
            onChange={this.handleInput}
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
