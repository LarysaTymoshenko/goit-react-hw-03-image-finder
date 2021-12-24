import React, { Component } from "react";
// import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { searchImages } from "../Api/Api";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class ImageGallery extends Component {
  state = {
    imgArr: [],
    page: 1,
    isOpen: false,
    largeImageURL: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { imgName } = this.props;
    const prevName = prevProps.imgName;
    const prevPage = prevState.page;

    // if (prevName !== imgName) {
    //   this.setState({ imgArr: [] });
    // }

    if (prevName !== imgName || prevPage !== page) {
      this.setState({ status: Status.PENDING });

      searchImages(prevName, page)
        .then((imgArr) =>
          this.setState({
            imgArr: [...this.state.imgArr, ...imgArr.hits],
            status: Status.RESOLVED,
          })
        )
        .finally(() => this.setState({ status: Status.IDLE }));
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
    const { imgArr, isOpen, largeImageURL, status } = this.state;
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

        {imgArr.length > 0 && status === "idle" && (
          <Button nextPage={this.buttonOnclickNextPage} />
        )}
        {status === "pending" && <Loader />}

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
