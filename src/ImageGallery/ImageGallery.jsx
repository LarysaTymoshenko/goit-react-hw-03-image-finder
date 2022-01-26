import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { searchImages } from "../api/api";
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

    if (prevName !== imgName) {
      this.setState({ imgArr: [] });
    }

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

    // if (page === 1) {
    //   const total = {totalHits}
    //   toast.success(`Found ${imgName.length} images`);
    // }
  }

  clearOnNewRequest = () => {
    this.setState({
      page: 1,
      imgArr: [],
      status: Status.IDLE,
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
      500
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
