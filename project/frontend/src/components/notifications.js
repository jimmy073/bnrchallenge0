import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

export const successNotification = (object, language) => {
  Store.addNotification({
    title: `${object} Created`,
    message: `${object} is created in ${language}`,
    type: "success",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
    width: 450,
  });
};

export const confirmNotification = () => {
  Store.addNotification({
    title: `Confirm!`,
    message: `Click on Save or Update button to save permanently`,
    type: "info",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 8000,
      showIcon: true,
    },
  });
};

export const errorNotification = (object) => {
  Store.addNotification({
    title: `${object} Failed`,
    message: `${object} failed to be created`,
    type: "warning",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      showIcon: true,
      duration: 8000,
    },
    width: 450,
  });
};