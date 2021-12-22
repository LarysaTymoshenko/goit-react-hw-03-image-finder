import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
// import Section from "../Section";
// import s from  "./App.module.css";

export default class App extends Component {
  state = {
    imgName: "",
    // showModal: false,
    // modalImg: {
    //   src: "",
    //   alt: "",
    // },
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
    // const { imgName, showModal, modalImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        <Button />
        {/* <ImageGallery imgName={imgName} openModal={this.toggleModal} />

        {showModal && <Modal onClose={this.toggleModal} modalImg={modalImg} />} */}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
