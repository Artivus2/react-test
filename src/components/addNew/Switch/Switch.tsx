import React from "react";
import styles from "./Switch.module.scss";

interface AddNewModalSwitchProps {
  type: number;
  setType: (type: number) => void;
}

const AddNewModalSwitch = ({ type, setType }: AddNewModalSwitchProps) => {
  return (
    <div className={styles.main}>
      <div className={`${styles.btn} ${type === 1 && styles.active}`} onClick={() => setType(1)}>
        <p>Купить</p>
      </div>
      <div className={`${styles.btn} ${type === 2 && styles.active}`} onClick={() => setType(2)}>
        <p>Продать</p>
      </div>
    </div>
  );
};
export default AddNewModalSwitch;
