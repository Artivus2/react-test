import React from 'react'
import styles from './OfferClosed.module.scss'
import { OfferData, UserProfile } from '../../../types/types';

interface OfferClosedPropsType {
  offerData: OfferData;
  offerType: number;
  profile: UserProfile;
  setActiveOffer: (param: number) => void;
}

const OfferClosed = ({
  setActiveOffer,
  profile,
  offerData,
  offerType,
}: OfferClosedPropsType) => {
  return (
    <div className={styles.items}>
      <div className={styles.item1}>
        <img src={offerData.image} alt="avatar" className={styles.ava} />
        <div className={styles.infoContainer}>
          <p className={styles.username}>{offerData.user}</p>
          <p className={styles.userinfo}>{offerData.user_orders_count} исполнено / {offerData.user_orders_count_complete_percent}% выполнено</p>
          <p className={styles.userinfo}>{offerData.verify_status ? `Верифицирован` : `Не верифицирован`}</p>
        </div>
      </div>
      <p className={styles.priceName}>Цена</p>
      <div className={styles.item2}>
        <p className={styles.curPrice}>{(+offerData.course).toFixed(2)} <span>{offerData.currency}</span></p>
        <p className={styles.currency}></p>
      </div>
      <div className={styles.item3}>
        <div className={styles.limit}>
          <p className={styles.limitTitle}>Доступно</p>
          <p className={styles.limitTitle}>Лимиты</p>

        </div>
        <div className={styles.limit}>
          <p className={styles.limitText}>
            {`${+offerData.amount} ${offerData.chart}`}
          </p>
          <p className={styles.limitText}>{offerData.min_limit} - {offerData.max_limit} {offerData.currency}</p>
        </div>
      </div>
      <div className={styles.item4}>
        <div className={styles.banks}>
          {
            offerData.payments.map((el, index) => {
              return <p className={styles.bank} key={index}>{el.name}</p>
            })
          }
        </div>
      </div>
      <div className={styles.item5}>
        {
          offerData.user === profile.login ?
            <div>Ваше объявление</div>
            :
            <div
              className={`${offerType === 2 ? styles.btnSell : styles.btnBuy}`}
              onClick={() => setActiveOffer(offerData.order_id)}
            >
              <p>
                {`${offerType === 1 ? `Купить` : `Продать`} `}
                <i> {`${offerData.chart}`} </i>
              </p>
            </div>
        }
      </div>
      <div className={styles.item4Small}>
        <div className={styles.banks}>
          {
            offerData.payments.map((el, index) => {
              return <p key={index}>{el.name}</p>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default OfferClosed