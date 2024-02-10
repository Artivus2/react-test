import React, { useEffect, useState } from 'react'
import styles from './OfferOpened.module.scss'
import { OfferData, UserProfile } from '../../../types/types';
import OfferInfo from './offerInfo/OfferInfo';
import { useNavigate } from 'react-router-dom';
import { StartOffer } from '../../../services/P2p';
import { Chart } from '../../profileComponents/wallet/Wallet';
import checked from '../../../assets/icons/checked.svg';

interface OfferOpenedPropsType {
  offerData: OfferData;
  offerType: number;
  profile: UserProfile;
  balanceChartList: Chart[];
}

const OfferOpened = ({
  balanceChartList,
  profile,
  offerData,
  offerType,
}: OfferOpenedPropsType) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [amount, setAmount] = useState('')
  const [activeNav, setActiveNav] = useState(0)
  const navigate = useNavigate();
  const [choosePayment, setChoosePayment] = useState('')

  let prev = ''
  const amountChange = (e: any) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (pattern.test(e.target.value.trim())) {
      if (e.target.value.trim().length > 15) {
        setAmount(e.target.value.trim().slice(0, 15));
        prev = e.target.value.trim().slice(0, 15);
      } else {
        setAmount(e.target.value.trim());
        prev = e.target.value.trim();
      }
    } else if (e.target.value.trim() === '') {
      setAmount('');
      prev = '';
    } else {
      e.target.value = prev;
    }
  }

  useEffect(() => {
    if (offerType === 1) {
      if (+amount < +offerData.min_limit && amount !== '') {
        setErrorMessage(`Минимальный лимит ${offerData.min_limit} ${offerData.currency}`)
      } else if (+amount > +offerData.max_limit) {
        setErrorMessage(`Максимальный лимит ${offerData.max_limit} ${offerData.currency}`)
      } else {
        setErrorMessage(``)
      }
    } else {
      if (+amount * offerData.course < +offerData.min_limit && amount !== '') {
        setErrorMessage(`Минимальный лимит ${offerData.min_limit} ${offerData.currency}`)
      } else if (+amount * +offerData.course > +offerData.max_limit) {
        setErrorMessage(`Максимальный лимит ${offerData.max_limit} ${offerData.currency}`)
      } else if (+amount > +offerData.amount) {
        setErrorMessage(`Максимальный лимит сделки ${offerData.amount} ${offerData.chart}`)
      } else {
        setErrorMessage(``)
      }
    }
  }, [amount])

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const checkToOrder = async () => {
    if (!errorMessage && amount && profile?.login) {
      const token = localStorage.getItem("access_token") ?? '';
      let temp =
        parseFloat((+amount * +(+offerData.course)).toString()).toString().split(".")[1] ?
          +parseFloat((+amount * +(+offerData.course)).toString()).toFixed(8) :
          +parseFloat((+amount * +(+offerData.course)).toString());
      const data = await StartOffer(token, offerData.order_id, offerType === 1 ? +amount : +temp, +choosePayment)
      if (data.status === 200) {
        navigate(`/order/${offerData.order_id}`, { state: offerData })
      } else {
        setErrorMessage(data.data === 'У вас есть активный ордер с текущим ользователем' ?
          'У вас есть активный ордер'
          : data.data === 'Не выбран способ орлаты для продажи криптовалюты' ?
            'Не выбран способ оплаты для продажи криптовалюты'
            :
            data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      }
    }
  }

  const changeMax = () => {
    const currentChartList = balanceChartList.filter(el => offerData.chart === el.symbol);
    if (currentChartList.length) {
      if (+currentChartList[0].balance * +offerData.course > +offerData.max_limit) {
        if (parseFloat((+offerData.max_limit / +offerData.course).toString()) > offerData.amount) {
          setAmount(offerData.amount.toString())
        } else {
          setAmount(parseFloat((+offerData.max_limit / +offerData.course).toString()).toString())
        }
      } else {
        if (parseFloat(currentChartList[0].balance.toString()) > offerData.amount) {
          setAmount(offerData.amount.toString())
        } else {
          setAmount(parseFloat(currentChartList[0].balance.toString()).toString())
        }
      }
    } else {
      setAmount('0')
    }
  }

  const [outValue, setOutValue] = useState(0);

  useEffect(() => {
    if (offerType === 1) {
      let temp =
        parseFloat((+amount / +(+offerData.course)).toString()).toString().split(".")[1] ?
          parseFloat((+amount / +(+offerData.course)).toString()).toFixed(8) :
          parseFloat((+amount / +(+offerData.course)).toString())
      setOutValue(+temp);
    } else {
      let temp =
        parseFloat((+amount * +(+offerData.course)).toString()).toString().split(".")[1] ?
          parseFloat((+amount * +(+offerData.course)).toString()).toFixed(8) :
          parseFloat((+amount * +(+offerData.course)).toString())
      setOutValue(+temp);
    }
  }, [amount, offerData.course])

  return (
    <div className={styles.openOfferContainer}>
      <div className={styles.left}>
        <div className={styles.details}>
          <div className={styles.box}>
            <h5>Цена</h5>
            <p>{(+offerData.course).toFixed(2)} {offerData.currency}</p>
          </div>
          <input
            type="text"
            placeholder={offerType === 1 ? `Введите сумму ${offerData.currency}` : `Введите сумму ${offerData.chart}`}
            value={amount}
            onChange={(e) => amountChange(e)}
            style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
          <button
            className={styles.allBtn}
            style={offerType === 1 ? { display: 'none' } : { display: 'block' }}
            onClick={changeMax}
          >MAX
          </button>
          <div className={styles.box}>
            <h5>Лимит сделки</h5>
            <p style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}>{offerData.amount} {offerData.chart}</p>
          </div>
          <div className={styles.box}>
            <h5>Лимит</h5>
            <p
              style={
                errorMessage !== 'Отсутствует кошелек' && errorMessage ?
                  { color: 'rgba(211, 65, 118, 1)' }
                  :
                  {}
              }>
              {offerData.min_limit} {offerData.currency} - {offerData.max_limit} {offerData.currency}
            </p>
          </div>
          <div className={styles.box}>
            <h5>Количество к получению</h5>
            {
              offerType === 1 ?
                <p>{outValue} {offerData.chart}</p>
                :
                <p style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}>
                  {outValue} {offerData.currency}
                </p>
            }
          </div>
          <button
            className={errorMessage || !amount || !profile?.login ? styles.btnDis : styles.btnOk}
            onClick={checkToOrder}
          >
            {offerType === 1 ? `Купить` : `Продать`} {offerData.chart}
          </button>
          <div className={offerType === 1 ? styles.box : styles.boxChoose}>
            <h5>{offerType === 1 ? `Способ оплаты` : `Выберите способ оплаты`}</h5>
            {offerType === 1 ?
              offerData.payments.map((el, index) => {
                return <p style={errorMessage === 'Отсутствует кошелек' ? { color: 'rgba(211, 65, 118, 1)' } : {}} className={styles.bank} key={index}>{el.name}</p>
              })
              :
              offerData.payments.map((el, index) => {
                return <div
                  style={errorMessage === 'Не выбран способ оплаты для продажи криптовалюты' ?
                    { borderColor: 'rgba(211, 65, 118, 1)' }
                    : {}}
                  className={+choosePayment === el.id ? styles.bankChoose : styles.bank}
                  key={index}
                  onClick={() => setChoosePayment(el.id.toString())}
                >
                  <img src={checked} alt="" style={+choosePayment === el.id ? { display: 'block' } : { display: 'none' }} />
                  {el.name}
                </div>
              })
            }
          </div>
          <div className={styles.box}>
            <h5>Срок оплаты</h5>
            <p>{offerData.duration} мин.</p>
          </div>
        </div>
        {errorMessage ? error : <></>}
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <div className={styles.nav}>
            <div className={styles.navItem} onClick={() => setActiveNav(0)} style={activeNav === 0 ? { borderBottom: '2px solid #0ddcaa' } : {}}>Условия сделки</div>
            <div className={styles.navItem} onClick={() => setActiveNav(1)} style={activeNav === 1 ? { borderBottom: '2px solid #0ddcaa' } : {}}>Обратная связь</div>
            <div className={styles.navItem} onClick={() => setActiveNav(2)} style={activeNav === 2 ? { borderBottom: '2px solid #0ddcaa' } : {}}>Данные</div>
          </div>
          <OfferInfo offerData={offerData} profile={profile} activeNav={activeNav} />
        </div>
      </div>
    </div>
  )
}

export default OfferOpened