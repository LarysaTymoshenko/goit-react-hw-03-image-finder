import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const root = document.createElement("div");

export default class Modal extends Component {
  componentDidMount() {
    document.body.appendChild(root);
    window.addEventListener("keydown", this.closeKeyDown);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeKeyDown);
    document.body.style.overflow = "scroll";
  }
  closeKeyDown = (el) => {
    if (el.code === "Escape") {
      this.props.onClose();
    }
  };
  closeBackDrop = (el) => {
    if (el.target === el.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { openImgModal, alt } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.closeBackDrop}>
        <div className={s.modal}>
          <button className={s.button} onClick={this.closeBackDrop}>
            Close
          </button>
          <img className={s.modal__image} src={openImgModal} alt={alt} />
        </div>
      </div>,
      root
    );
  }
}

Modal.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
