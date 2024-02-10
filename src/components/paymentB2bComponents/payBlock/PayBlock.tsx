import React from 'react'
import styles from './PayBlock.module.scss'

interface PayBlockPropsType {
  amount: number;
  children: string | JSX.Element | JSX.Element[];
  currency: string;
  chart: string;
  course: number;
}

const PayBlock = ({
  currency,
  chart,
  amount,
  children,
  course,
}: PayBlockPropsType) => {
  return (
    <div className={styles.main}>
      <p className={styles.title}>Информация об ордере</p>
      <div className={styles.orderInfo}>
        <div className={styles.summ}>
          <p className={styles.orderTitle}>К оплате</p>
          <p className={styles.orderText}>
            {`${parseFloat((+amount * +(+course)).toString()).toString().split(".")[1] ?
              +parseFloat((+amount * +(+course)).toString()).toFixed(2) :
              +parseFloat((+amount * +(+course)).toString())}`} {currency}</p>
        </div>
        <div className={styles.price}>
          <p className={styles.orderTitle}>Курс</p>
          <p className={styles.orderText}>{course} {currency}</p>
        </div>
        <div className={styles.count}>
          <p className={styles.orderTitle}>Количество</p>
          <p className={styles.orderText}>{amount} {chart}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default PayBlock