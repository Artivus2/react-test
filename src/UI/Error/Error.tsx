import React from "react";
import styles from "./Error.module.scss";
import errorIcon from "../../assets/icons/profile/errorIcon.svg";

interface ErrorProps {
  title: string;
}

const Error = ({ title }: ErrorProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.iconBox}>
        <img src={errorIcon} alt="" />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Error;