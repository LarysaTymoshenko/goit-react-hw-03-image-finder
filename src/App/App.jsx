import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ImageGallery from "../ImageGallery/ImageGallery";
// import Modal from "../Modal/Modal";
// import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
// import Section from "../Section";
//  import s from  "./App.module.css";

export default class App extends Component {
  state = {
    imgName: "",
  };

  onFormSubmit = (imgName) => {
    this.setState({ imgName });
  };

  toggleModal = (src, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: {
        src,
        alt,
      },
    }));
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
