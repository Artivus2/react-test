import React from 'react'
import styles from './Apeal.module.scss';
import { ApealProps } from '../../../types/types';

interface ApealPropsType {
  apeal: ApealProps;
}

const Apeal = ({
  apeal
}: ApealPropsType) => {

  const checkList = [
    `Вы совершили оплату, но продавец не перевел криптовалюту`,
    `Вы произвели оплату, превышающую сумму, указанную в заказе`,
    `Продавец нарушил Политику проведения транзакций`,
    `Продавец проигнорировал пункт «Условиях сделки»`,
    `Подозрительное поведение продавца`,
  ]

  return (
    <div className={styles.AppealBlock}>
      <div className={styles.title}>Апелляция</div>
      <div className={styles.content}>
        <div className={styles.head}>
          <p>Апелляция пользователя</p>
          <p>{apeal.user}</p>
        </div>
        <div className={styles.main}>
          <div className={styles.first}>
            <p className={styles.subTitle}>Причина апелляции:</p>
            <p>{checkList[+apeal.check - 1]}</p>
          </div>
          <div className={styles.second}>
            <p className={styles.subTitle}>Пояснения:</p>
            <p>{apeal.desc}</p>
          </div>
          <div className={styles.third}>
            <p className={styles.subTitle}>Доказательства:</p>
            {
              apeal.photoList.map((el, index) => {
                return <img src={el} alt='' className={styles.doc} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apeal