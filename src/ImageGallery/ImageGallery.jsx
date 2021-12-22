import React, { Component } from "react";
import PropTypes from "prop-types";

import { searchImages } from "../Api/Api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  state = {
    imgArr: [],
    // page: 1,
    // loading: false,
    // isOpen: false,
    // largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // const { page } = this.state;
    const { imgName } = this.props;
    const prevName = prevProps.imgName;
    if (prevName !== imgName) {
      searchImages(prevName, imgName)
        .then((res) => res.json())
        .then((imgArr) => this.setState({ imgArr }));
    }
  }
  render() {
    return (
      <>
        <ul className={s.gallery}>
          {this.props.imgName && <ImageGalleryItem />}
        </ul>
      </>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  itemsImg: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  myRef: PropTypes.object,
  onClickImg: PropTypes.func.isRequired,
};
