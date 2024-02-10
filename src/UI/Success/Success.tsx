import React from "react";
import styles from "./Success.module.scss";
import successIcon from "../../assets/icons/profile/successIcon.svg";

interface SuccessProps {
  title: string;
}

const Success = ({ title }: SuccessProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.iconBox}>
        <img src={successIcon} alt="" />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Success;