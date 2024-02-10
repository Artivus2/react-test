import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './OfferInfo.module.scss'
import star from '../../../../../assets/icons/star.svg'
import starFill from '../../../../../assets/icons/starFill.svg'
import { IB2bOffer } from '../../../../../types/B2b.types'
import { CompanyList, UserRating } from '../../../../../types/types'
import { AddRating, GetCompany, GetRating } from '../../../../../services/P2p'

interface OfferInfoPropsType {
  offerData: IB2bOffer,
  // profile: UserProfile,
  activeNav: number,
}

const OfferInfo = ({
  offerData,
  // profile,
  activeNav
}: OfferInfoPropsType) => {
  const [comments, setComments] = useState<UserRating[]>([])
  const [totalRate, setTotalRate] = useState(0)
  const [countRate, setCountRate] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [companyInfo, setCompanyInfo] = useState<CompanyList>()

  const getRating = async (token: string, user_id: number) => {
    const data = await GetRating(token, user_id);
    if (data.status === undefined) {

    } else {
      setComments(data.data.history)
      setTotalRate(+data.data.FullRating)
      setCountRate(+data.data.CountRates)
    }
  }

  const getCompany = async (token: string, company_id: number) => {
    const data = await GetCompany(token, +company_id);
    if (data.status === 200) {
      setCompanyInfo(data.data[0])
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getRating(token, offerData.companyId);
    getCompany(token, offerData.companyId)
  }, [offerData.companyId])

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
      const data = await AddRating(token, offerData.companyId, activeStars, newComment)
      if (data.status === 200) {
        document.location.reload();
      }
    }
  }

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const [activeStars, setActiveStars] = useState(0)

  return (
    <div className={styles.main}>
      {
        activeNav === 0 ?
          <div className={styles.first}>
            <div className={styles.creator}>
              <img src={offerData.image} alt="avatar" className={styles.ava} />
              <div className={styles.infoContainer}>
                <p className={styles.username}>{offerData.company}</p>
                <p className={styles.userinfo}>{offerData.userOrdersCount} исполнено </p>
              </div>
            </div>
            <div className={styles.creatorText}>текст от продавца</div>
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
              {/* <div className={styles.rateBox}>
                <div className={styles.stars}>
                  <img className={styles.star} src={activeStars >= 1 ? starFill : star} alt="star" onClick={() => setActiveStars(1)} />
                  <img className={styles.star} src={activeStars >= 2 ? starFill : star} alt="star" onClick={() => setActiveStars(2)} />
                  <img className={styles.star} src={activeStars >= 3 ? starFill : star} alt="star" onClick={() => setActiveStars(3)} />
                  <img className={styles.star} src={activeStars >= 4 ? starFill : star} alt="star" onClick={() => setActiveStars(4)} />
                  <img className={styles.star} src={activeStars === 5 ? starFill : star} alt="star" onClick={() => setActiveStars(5)} />
                </div>
                <textarea className={styles.rate} placeholder='Напишите отзыв о продавце' onChange={(e) => checkComment(e)}></textarea>
                <button className={newComment && activeStars > 0 ? styles.btnOk : styles.btnDis} onClick={sendRating}>Отправить отзыв</button>
                {errorMessage ? error : <></>}
              </div> */}
            </div>
            :
            <div className={styles.third}>
              <div className={styles.creator}>
                <img src={offerData.image} alt="avatar" className={styles.ava} />
                <div className={styles.infoContainer}>
                  <p className={styles.username}>{offerData.company}</p>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>Адрес</h5>
                <p>{companyInfo?.address}</p>
              </div>
              <div className={styles.box}>
                <h5>Название</h5>
                <p>{companyInfo?.bank}</p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>ИНН</h5>
                <p>{companyInfo?.inn}</p>
              </div>
              <div className={styles.box}>
                <h5>ОГРН</h5>
                <p>{companyInfo?.ogrn}</p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.box}>
                <h5>ОКВЭД</h5>
                <p>{companyInfo?.title}</p>
              </div>
              <div className={styles.box}>
                <h5>ФИО</h5>
                <p>{companyInfo?.fio}</p>
              </div>
            </div>
      }
    </div>
  )
}

export default OfferInfo