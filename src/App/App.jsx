import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ImageGallery from "../ImageGallery/ImageGallery";
import Searchbar from "../Searchbar/Searchbar";

export default class App extends Component {
  state = {
    imgName: "",
  };

  onFormSubmit = (imgName) => {
    this.setState({ imgName });
  };

  render() {
    const { imgName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery imgName={imgName} />

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
