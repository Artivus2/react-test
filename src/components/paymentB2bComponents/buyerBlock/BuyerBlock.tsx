import React, { ChangeEvent, useState } from 'react'
import styles from './BuyerBlock.module.scss'
import { ApealProps, OrderB2bHistory, UserProfile } from '../../../types/types';
import star from '../../../assets/icons/star.svg'
import starFill from '../../../assets/icons/starFill.svg'
import { AddRating } from '../../../services/P2p';
import ConfirmModal from '../confirmModal/ConfirmModal';
import CancelModal from '../cancelModal/CancelModal';
import ApealModal from '../apealModal/ApealModal';
import ApealConfirmModal from '../apealModal/apealConfirmModal/ApealConfirmModal';
import PayBlock from '../payBlock/PayBlock';

interface BuyerBlockPropsType {
  offerData: OrderB2bHistory,
  setOpenChat: (param: boolean) => void;
  setShowApeal: (param: ApealProps) => void;
  profile: UserProfile;
}

const BuyerBlock = ({
  profile,
  setOpenChat,
  offerData,
  setShowApeal,
}: BuyerBlockPropsType) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenApealModal, setIsOpenApealModal] = useState(false);
  const [apeal, setApeal] = useState(false);
  const [timerOut, setTimerOut] = useState(false)
  const [activeStars, setActiveStars] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const checkComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim() === '') {
      setErrorMessage('Отзыв не может быть пустым')
      setNewComment('')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      setNewComment(e.target.value)
    }
  }

  const sendRating = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (newComment && activeStars > 0) {
      const data = await AddRating(token, offerData.company_id, activeStars, newComment)
      if (data.status === 200) {
        document.location.reload();
      } else {
        setErrorMessage(data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  }


  return (
    <div className={styles.main}>
      <button className={styles.chatBtn} onClick={() => setOpenChat(true)}>Чат с продавцом</button>
      <PayBlock
        currency={offerData.currency}
        chart={offerData.chart}
        course={offerData.course}
        amount={offerData.volume}
      >
        <p className={styles.title}>
          Реквизиты
        </p>
        <div className={styles.requisites}>
          <div className={styles.payMethod}>
            <p className={styles.payMethodText}>
              {
                (offerData.author_id === profile.id ? offerData.creator_bank : offerData.author_bank) ?? "Не указано"
              }
            </p>
          </div>
          <div className={styles.saller}>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Контрагент</p>
              <p className={styles.sallerText}>
                {
                  offerData.author_id === profile.id ? offerData.creator : offerData.author
                }
              </p>
            </div>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Корреспондентский счёт</p>
              <p className={styles.sallerText}>
                {
                  offerData.author_id === profile.id ? offerData.creator_ks : offerData.author_ks
                }</p>
            </div>
          </div>
          <div className={styles.saller}>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>Расчётный счёт</p>
              <p className={styles.sallerText}>
                {
                  offerData.author_id === profile.id ? offerData.creator_rs : offerData.author_rs
                }
              </p>
            </div>
            <div className={styles.sallerInfo}>
              <p className={styles.sallerTitle}>БИК</p>
              <p className={styles.sallerText}>
                {
                  offerData.author_id === profile.id ? offerData.creator_bik : offerData.author_bik
                }
              </p>
            </div>
          </div>

        </div>
        <div className={styles.btnsBlock}>
          {offerData.status_history < 2 ? (
            <div className={styles.btnBox}>
              <div className={styles.btn} onClick={() => setIsOpenConfirm(true)}>
                <p className={styles.btnText}>Приложить платёжный документ</p>
              </div>
              <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
                <p className={styles.reset}>Отменить сделку</p>
              </div>
            </div>
          ) : offerData.status_history === 2 && !timerOut ? (
            <div className={styles.btnBox}>
              <div className={styles.btn}>
                {/* <p className={styles.btnText}>
                  {
                    `Подача аппеляции доступна через: 
                  ${String(m).length === 1 ? `0${m}` : m}: ${String(s).length === 1 ? `0${s}` : s}
                  `
                  }
                </p> */}
                <p className={styles.btnText} onClick={() => setIsOpenApealModal(true)}>
                  Подать аппеляцию
                </p>
              </div>
              {/* <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
                <p className={styles.reset}>Отменить сделку</p>
              </div> */}
            </div>
          ) : offerData.status_history === 2 && timerOut ? (
            <div className={styles.btnBox}>
              <div className={styles.btn}>
                <p className={styles.btnText} onClick={() => setIsOpenApealModal(true)}>
                  Подать аппеляцию
                </p>
              </div>
              {/* <div className={styles.resetBlock} onClick={() => setIsOpenCancel(true)}>
                <p className={styles.reset}>Отменить сделку</p>
              </div> */}
            </div>
          ) : offerData.status_history === 5 ? (
            <div className={styles.endBox}>
              <div className={styles.rateBlock}>
                <h1 className={styles.win}>Подана аппеляция</h1>
              </div>
            </div>
          ) : offerData.status_history > 5 && offerData.status_history < 10 ? (
            <div className={styles.endBox}>
              <div className={styles.rateBlock}>
                <h1 className={styles.win}>Сделка отменена</h1>
              </div>
            </div>
          ) : offerData.status_history === 10 || offerData.status_history === 4 ? (
            <div className={styles.endBox}>
              <div className={styles.rateBlock}>
                <h1 className={styles.win}>Получено {offerData.volume} {offerData.chart}</h1>
              </div>
              <div className={styles.rateBox}>
                <div className={styles.stars}>
                  <img className={styles.star} src={activeStars >= 1 ? starFill : star} alt="star" onClick={() => setActiveStars(1)} />
                  <img className={styles.star} src={activeStars >= 2 ? starFill : star} alt="star" onClick={() => setActiveStars(2)} />
                  <img className={styles.star} src={activeStars >= 3 ? starFill : star} alt="star" onClick={() => setActiveStars(3)} />
                  <img className={styles.star} src={activeStars >= 4 ? starFill : star} alt="star" onClick={() => setActiveStars(4)} />
                  <img className={styles.star} src={activeStars === 5 ? starFill : star} alt="star" onClick={() => setActiveStars(5)} />
                </div>
                <textarea className={styles.rate} placeholder='Напишите отзыв о продавце' onChange={(e) => checkComment(e)}></textarea>
                <button
                  className={newComment && activeStars > 0 ? styles.btnOk : styles.btnDis}
                  onClick={sendRating}
                  style={{ maxWidth: "354px" }}
                >
                  Отправить отзыв
                </button>
                {errorMessage ? error : <></>}
              </div>
              <div className={styles.btnBox}>
                <p className={styles.btnDis}>Сделка завершена</p>
              </div>
            </div>
          ) :
            <></>
          }
        </div>

      </PayBlock >
      {isOpenConfirm && (
        <ConfirmModal setIsOpenConfirm={setIsOpenConfirm} id={offerData.b2b_ads_id} userId={profile.id} date={offerData.start_date} />
      )}
      {isOpenCancel && <CancelModal setIsOpen={setIsOpenCancel} id={offerData.b2b_ads_id} />}
      {isOpenApealModal && <ApealModal setIsOpen={setIsOpenApealModal} setApeal={setApeal} />}
      {apeal && <ApealConfirmModal setIsOpen={setApeal} setShowApeal={setShowApeal} user={profile.login} orderId={offerData.b2b_ads_id} />}
    </div>
  )
}

export default BuyerBlock