import React, { useState } from 'react'
import styles from './Steps.module.scss'
import Countdown from 'react-countdown';
import { OrderB2bHistory } from '../../../types/types';

interface StepsProps {
  step: number;
  offerData: OrderB2bHistory;
}

const Steps = ({ step, offerData }: StepsProps) => {

  const [min, setMin] = useState<number>(15);
  const [sec, setSec] = useState<number>(0);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    setMin(minutes)
    setSec(seconds)
    if (completed) {
      return (<div className={styles.timeBlock}>
        <div className={styles.timeBox}>
          00
        </div>
        :
        <div className={styles.timeBox}>
          00
        </div>
        :
        <div className={styles.timeBox}>
          00
        </div>
        :
        <div className={styles.timeBox}>
          00
        </div>
      </div>);
    } else {
      return (
        <div className={styles.timeBlock}>
          <div className={styles.timeBox}>
            {days} d
          </div>
          :
          <div className={styles.timeBox}>
            {hours.toString().length === 1 ? '0' : ''}{hours} h
          </div>
          :
          <div className={styles.timeBox}>
            {minutes.toString().length === 1 ? '0' : ''}{minutes} m
          </div>
          :
          <div className={styles.timeBox}>
            {seconds.toString().length === 1 ? '0' : ''}{seconds} s
          </div>
        </div>
      );
    }
  };

  const tz = new Date(Date.now()).getTimezoneOffset() * -1;
  const currentTz = tz - 180;
  const endTime = new Date(offerData.end_date).getTime();
  const currentEndStamp = offerData.status_history < 4 ?
    (endTime + (currentTz * 60 * 1000))
    :
    (new Date(Date.now()).getTime() + (currentTz * 60 * 1000));

  return (
    <div className={styles.main}>
      <div className={styles.steps}>
        <div className={styles.stepBlock}>
          <div className={`${styles.numberBlock} ${styles.active}`}>
            <p className={styles.number}>1</p>
          </div>
          {/* <p className={styles.description}>Перевод платежа продавцу</p> */}
        </div>

        <div className={`${styles.line} ${step >= 2 && styles.active}`}></div>
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${(step >= 2) && styles.active
              }`}
          >
            <p className={styles.number}>2</p>
          </div>
          {/* <p className={`${styles.description}  `}>
            Ожидание подтверждения перевода продавцом
          </p> */}
        </div>
        <div className={`${styles.line} ${step === 4 && styles.active}`}></div>
        <div className={styles.stepBlock}>
          <div
            className={`${styles.numberBlock} ${step === 4 && styles.active}`}
          >
            <p className={styles.number}>3</p>
          </div>
          {/* <p className={styles.description}>Завершение сделки</p> */}
        </div>
      </div>
      <div className={styles.timerText}>
        <Countdown
          date={currentEndStamp}
          renderer={renderer}
        />
      </div>
    </div>
  )
}

export default Steps