import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
// import ScrollUp from "../ScrollUp";
import Searchbar from "../Searchbar/Searchbar";
// import Section from "../Section";
// import s from  "./App.module.css";

export default class App extends Component {
  state = {
    imageName: "",
    showModal: false,
    modalImg: {
      src: "",
      alt: "",
    },
  };

  onFormSubmit = (imageName) => {
    this.setState({ imageName });
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
    const { imageName, showModal, modalImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />

        <ImageGallery imageName={imageName} openModal={this.toggleModal} />

        {showModal && <Modal onClose={this.toggleModal} modalImg={modalImg} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
