import React from "react";
import styles from "./Steps.module.scss";

interface AddNewStepsProps {
  step: number;
}

const AddNewSteps = ({ step }: AddNewStepsProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.steps}>
        <div className={styles.stepBlock}>
          <div className={`${styles.numberBlock} ${styles.active}`}>
            {step === 2 || step === 3 ? <div className={styles.ok}></div> : <p className={styles.number}>1</p>}
          </div>
          <p className={styles.description}>Тип объявления и цена</p>
        </div>

        {step === 2 || step === 3 ? <div className={styles.lineOk}></div> : <div className={styles.line}></div>}
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${step === 2 || step === 3 ? styles.active : ""
              }`}
          >
            {step === 3 ? <div className={styles.ok}></div> : <p className={styles.number}>2</p>}
          </div>
          <p className={`${styles.description}  `}>Сумма и способ оплаты</p>
        </div>
        {step === 3 ? <div className={styles.lineOk}></div> : <div className={styles.line}></div>}
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${step === 3 && styles.active}`}
          >
            {step === 4 ? <div className={styles.ok}></div> : <p className={styles.number}>3</p>}
          </div>
          <p className={styles.description}>Условия сделки</p>
        </div>
      </div>
    </div>
  );
};
export default AddNewSteps;
