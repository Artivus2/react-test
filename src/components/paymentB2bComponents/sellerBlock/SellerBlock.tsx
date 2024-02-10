import React, { ChangeEvent, useState } from 'react'
import styles from './SellerBlock.module.scss'
import { OrderB2bHistory, UserProfile } from '../../../types/types';
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import warning from '../../../assets/icons/warning.svg';
import checked from '../../../assets/icons/checked.svg';
import { AddRating, SellerB2bConfirm } from '../../../services/P2p';
import star from '../../../assets/icons/star.svg'
import starFill from '../../../assets/icons/starFill.svg'
import CancelModal from '../cancelModal/CancelModal';
import PayBlock from '../payBlock/PayBlock';

interface SellerBlockPropsType {
  offerData: OrderB2bHistory;
  setOpenChat: (param: boolean) => void;
  profile: UserProfile;
}

const SellerBlock = ({
  offerData,
  setOpenChat,
  profile,
}: SellerBlockPropsType) => {
  const [ok, setOk] = useState(false)
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
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

  const isCheck = async () => {
    if (ok) {
      const token = localStorage.getItem("access_token") ?? '';
      const data = await SellerB2bConfirm(token, offerData.order_id_history)
      if (data.status === 200) {
        setIsConfirm(false)
        document.location.reload();
      } else {
        setErrorMessage("Что-то пошло не так")
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  }

  const confirm = () => {
    if (offerData.status_history === 2) {
      setIsConfirm(true)
    }
  }

  const bg = <div className={styles.popupConfirmation} onClick={() => setIsConfirm(false)}>  </div>
  const confirmation = <div className={styles.popupConfirmation__block}>
    <div className={styles.popupConfirmation__title}>
      Информация
    </div>
    <Cross className={styles.popupConfirmation__close} onClick={() => setIsConfirm(false)} />
    <div className={styles.popupConfirmation__warning}>
      <img src={warning} alt="" /> Внимание
    </div>
    <div className={styles.popupConfirmation__text}>
      Проверьте баланс Вашего банковского счета или электронного кошелька и подтвердите получение денежных средств.
    </div>
    <div className={styles.popupConfirmation__text}>
      <Cross className={styles.popupConfirmation__subclose} />Не подтверждайте ордер, если денежные средства не были получены. Вы не сможете подать апелляцию после завершения сделки.
    </div>
    <div className={styles.popupConfirmation__checboxs}>
      <div className={styles.popupConfirmation__checbox}>
        <input type="checkbox" id='checked' onChange={() => setOk(!ok)} />
        <label htmlFor='checked' id='co'><img src={checked} alt="" /></label>
      </div>
      <span>Я подтверждаю что покупатель перевел оплату. Сумма и информация об отправителе верны.</span>
    </div>
    {errorMessage ? error : <></>}
    <div className={styles.popupConfirmation__btns}>
      <button className={ok ? styles.btnOk : styles.btnDis} onClick={isCheck}>
        Подтвердить оплату
      </button>
      <button className={styles.popupConfirmation__no} onClick={() => setIsConfirm(false)}>
        Отменить
      </button>
    </div>
  </div>

  return (
    <div className={styles.main}>
      {isConfirm ? bg : <></>}
      {isConfirm ? confirmation : <></>}
      <button className={styles.chatBtn} onClick={() => setOpenChat(true)}>Чат с покупателем</button>
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
                }
              </p>
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
        {
          offerData.status_history < 2 ?
            (
              <div className={styles.btnsBlock}>
                <div className={styles.btnDis}>
                  <p className={styles.btnText}>
                    Ожидание перевода средств покупателем
                  </p>
                </div>
                {/* <div className={styles.resetBlock}>
                  <p className={styles.reset} onClick={() => setIsOpenCancel(true)}>Отменить сделку</p>
                </div> */}
              </div>
            ) : offerData.status_history === 2 ?
              (
                <div className={styles.btnsBlock}>
                  <div className={styles.btnOk}>
                    <p className={styles.btnText} onClick={confirm}>
                      Подтвердить получение платежа
                    </p>
                  </div>
                  {/* <div className={styles.resetBlock}>
                    <p className={styles.reset} onClick={() => setIsOpenCancel(true)}>Отменить сделку</p>
                  </div> */}
                </div>
              ) : offerData.status_history === 3 ?
                (
                  <div className={styles.btnDis}>
                    <p className={styles.btnText}>
                      Покупатель произвёл оплату. Ожидайте перевода {offerData.currency}
                    </p>
                  </div>
                ) : offerData.status_history === 5 ?
                  (
                    <div className={styles.endBox}>
                      <div className={styles.rateBlock}>
                        <h1 className={styles.win}>Подана апелляция</h1>
                      </div>
                    </div>
                  ) : offerData.status_history > 5 && offerData.status_history < 10 ?
                    (
                      <div className={styles.endBox}>
                        <div className={styles.rateBlock}>
                          <h1 className={styles.win}>Сделка отменена</h1>
                        </div>
                      </div>
                    ) : offerData.status_history === 10 || offerData.status_history === 4 ?
                      (
                        <div className={styles.end}>
                          <div className={styles.endBox}>
                            <div className={styles.rateBlock}>
                              <h1 className={styles.win}>
                                Получено {`${parseFloat((+offerData.volume * +(+offerData.course)).toString()).toString().split(".")[1] ?
                                  +parseFloat((+offerData.volume * +(+offerData.course)).toString()).toFixed(2) :
                                  +parseFloat((+offerData.volume * +(+offerData.course)).toString())}`} {offerData.currency}
                              </h1>
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
                        </div>
                      )
                      : <></>
        }
      </PayBlock >
      {isOpenCancel && <CancelModal setIsOpen={setIsOpenCancel} id={offerData.b2b_ads_id} />}
    </div>
  )
}

export default SellerBlock