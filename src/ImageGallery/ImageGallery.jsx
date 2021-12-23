import React, { Component } from "react";
// import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { searchImages } from "../Api/Api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

class ImageGallery extends Component {
  state = {
    imgArr: [],
    page: 1,
    loading: false,
    isOpen: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { imgName } = this.props;
    const prevName = prevProps.imgName;

    if (prevName !== imgName) {
      this.setState({ loading: true });
      searchImages(prevName, page)
        .then((imgArr) =>
          this.setState({
            imgArr: [...this.state.imgArr, ...imgArr.hits.previewURL],
          })
        )
        .finally(() => this.setState({ loading: false }));

      // setTimeout(() => {
      //   fetch(`https://pixabay.com/api/?key=24038047-704cc7956da07111e29f822f6&page=1&q=${imgName}&image_type=photo&orientation=horizontal&per_page=12`).then((res) => res.json()).then((imgArr) => this.setState({ imgArr })).finally(() => this.setState({ loading: false }));
      // }, 1000
      // )
    }
    if (prevName !== imgName) {
      this.clearOnNewRequest();
    }
  }
  clearOnNewRequest = () => {
    this.setState({
      page: 1,
      imgArr: [],
    });
  };
  buttonOnclickNextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });

    this.scrollTop();
  };

  onClickImgToggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  imgModalWriting = (largeImageURL) => {
    this.onClickImgToggleModal();
    this.setState({ largeImageURL: largeImageURL });
  };

  scrollTop = () => {
    setTimeout(
      () =>
        window.scrollTo({
          top: window.pageYOffset + document.documentElement.clientHeight,
          behavior: "smooth",
          block: "end",
        }),
      1000
    );
  };

  render() {
    const { imgArr, isOpen, largeImageURL, loading } = this.state;
    return (
      <>
        <div>
          {imgArr.length > 0 && (
            <ul className={s.gallery}>
              {imgArr.map((img) => (
                <ImageGalleryItem
                  key={img.id}
                  src={img.webformatURL}
                  alt={img.tags}
                  onClick={() => this.imgModalWriting(img.largeImageURL)}
                />
              ))}
            </ul>
          )}
        </div>

        {imgArr.length > 0 && !loading && (
          <Button nextPage={this.buttonOnclickNextPage} />
        )}
        {loading && <Loader />}

        {isOpen && (
          <Modal
            onClose={this.onClickImgToggleModal}
            openImgModal={largeImageURL}
          />
        )}
      </>
    );
  }
}
export default ImageGallery;

// ImageGallery.propTypes = {
//   imgArr: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//       tags: PropTypes.string.isRequired,
//     })
//   ),
//   myRef: PropTypes.object,
//   // onClickImg: PropTypes.func.isRequired,
// };
