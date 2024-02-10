import React, { useEffect, useState } from 'react'
import styles from './OfferInfo.module.scss'
import { OfferData, UserProfile, UserRating } from '../../../../types/types'
import { GetRating } from '../../../../services/P2p'
import starFill from '../../../../assets/icons/starFill.svg'

interface OfferInfoPropsType {
  offerData: OfferData,
  profile: UserProfile,
  activeNav: number,
}

const OfferInfo = ({ offerData, profile, activeNav }: OfferInfoPropsType) => {
  const [comments, setComments] = useState<UserRating[]>([])
  const [totalRate, setTotalRate] = useState(0)
  const [countRate, setCountRate] = useState(0)

  const getRating = async (token: string, user_id: number) => {
    const data = await GetRating(token, user_id);
    if (data.status === undefined) {

    } else {
      setComments(data.data.history)
      setTotalRate(+data.data.FullRating)
      setCountRate(+data.data.CountRates)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getRating(token, offerData.user_id);
  }, [offerData.user_id])

  return (
    <div className={styles.main}>
      {
        activeNav === 0 ?
          <div className={styles.first}>
            <div className={styles.creator}>
              <img src={offerData.image} alt="avatar" className={styles.ava} />
              <div className={styles.infoContainer}>
                <p className={styles.username}>{offerData.user}</p>
                <p className={styles.userinfo}>{offerData.user_orders_count} исполнено | {offerData.user_orders_count_complete_percent}%</p>
                <p className={styles.userinfo}>{offerData.verify_status ? `Верифицирован` : `Не верифицирован`}</p>
              </div>
            </div>
            <div className={styles.creatorText}>{offerData.description}</div>
            <div className={styles.warning}>
              <p className={styles.warningText}>
                Внимательно прочтите все условия мерчанта. Несоблюдение условий может привести к неудачным транзакциям.
              </p>
            </div>
          </div>
          :
          activeNav === 1 ?
            <div className={styles.second}>
              <div className={styles.totalInfo}>
                {totalRate} <img src={starFill} alt="" /> | Отзывы ({countRate})
              </div>
              <div className={styles.comments}>
                {
                  comments.length ?
                    comments.map((el, index) => {
                      return <div key={index} className={styles.commentBox}>
                        <div className={styles.creator}>
                          <img src={el.image_rater} alt="avatar" className={styles.ava} />
                          <div className={styles.infoContainer}>
                            <p className={styles.username}>{el.login}</p>
                          </div>
                        </div>
                        <div className={styles.comment}>{el.description}</div>
                      </div>
                    })
                    :
                    <div className={styles.noInfo}>Нет отзывов</div>
                }
              </div>
            </div>
            :
            <div className={styles.third}>
              <div className={styles.creator}>
                <img src={offerData.image} alt="avatar" className={styles.ava} />
                <div className={styles.infoContainer}>
                  <p className={styles.username}>{offerData.user}</p>
                  <p className={styles.userinfo}>{offerData.verify_status ? `Верифицирован` : `Не верифицирован`}</p>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>Ордера за 30 дн.</h5>
                <p>{offerData.user_orders_count}</p>
              </div>
              <div className={styles.box}>
                <h5>Процент выполнения за 30 дн.</h5>
                <p>{offerData.user_orders_count_complete_percent} %</p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>Среднее время перевода</h5>
                <p>0.00 <span>Минут(ы)</span></p>
              </div>
              <div className={styles.box}>
                <h5>Среднее время оплаты</h5>
                <p>0.00 <span>Минут(ы)</span></p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>С момента регистрации</h5>
                <p>0 <span>дней назад</span></p>
              </div>
              <div className={styles.box}>
                <h5>Первая сделка</h5>
                <p>0 <span>дней назад</span></p>
              </div>
            </div>
      }
    </div>
  )
}

export default OfferInfo