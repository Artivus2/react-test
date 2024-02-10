import React from 'react'
import styles from './Steps.module.scss'

interface StepsProps {
  step: number;
}

const Steps = ({ step }: StepsProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.steps}>
        <div className={styles.stepBlock}>
          <div className={`${styles.numberBlock} ${styles.active}`}>
            <p className={styles.number}>1</p>
          </div>
          <p className={styles.description}>Перевод платежа продавцу</p>
        </div>

        <div className={`${styles.line} ${step >= 2 && styles.active}`}></div>
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${(step >= 2) && styles.active
              }`}
          >
            <p className={styles.number}>2</p>
          </div>
          <p className={`${styles.description}  `}>
            Ожидание подтверждения перевода продавцом
          </p>
        </div>
        <div className={`${styles.line} ${step === 4 && styles.active}`}></div>
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${step === 4 && styles.active}`}
          >
            <p className={styles.number}>3</p>
          </div>
          <p className={styles.description}>Завершение сделки</p>
        </div>
      </div>
    </div>
  )
}

export default Steps