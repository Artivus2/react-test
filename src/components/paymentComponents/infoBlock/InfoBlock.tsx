import React from 'react'
import styles from './InfoBlock.module.scss'
import { OrderHistory } from '../../../types/types';
import { Circle } from 'rc-progress';
import Countdown from 'react-countdown';

interface InfoBlockProps {
  m: number;
  s: number;
  offerData: OrderHistory;
  setMin: (param: number) => void;
  setSec: (param: number) => void;
}

const InfoBlock = ({
  m,
  s,
  setMin,
  setSec,
  offerData
}: InfoBlockProps) => {


  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    setMin(minutes)
    setSec(seconds)
    if (completed) {
      return (<span>00:00</span>);
    } else {
      return (
        <span>{minutes.toString().length === 1 ? '0' : ''}{minutes}:{seconds.toString().length === 1 ? '0' : ''}{seconds}</span>
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
      <div className={styles.number}>
        <p className={styles.title}>ID</p>
        <p className={styles.value}>{offerData.order_id_history}</p>
      </div>
      <div className={styles.time}>
        <p className={styles.title}>Дата создания сделки</p>
        <p className={styles.value}>{offerData.start_date}</p>
      </div>
      <div className={styles.timerContainer}>
        <div className={styles.timerBlock}>
          <Circle
            percent={m === 0 && s === 0 ? 0 : (s + m * 60) * 100 / (+offerData.duration * 60)}
            strokeWidth={4}
            strokeColor={"#1caf86"}
            className={styles.timer}
          />
          <div className={styles.timerText}>
            <Countdown
              date={currentEndStamp}
              renderer={renderer}
            />
          </div>
        </div>
        <p className={styles.type}>{offerData.status_history >= 2 ? `Таймер оплаты` : `Таймер сделки`}</p>
      </div>
    </div>
  )
}

export default InfoBlock