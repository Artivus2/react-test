import { FC, useEffect, useState } from 'react';
import styles from './OfferPay.module.scss';
import { IChart, ICurrency } from '../../../../types/types';
import { IB2bOffer } from "../../../../types/B2b.types";
import { useNavigate } from 'react-router';
import OfferInfo from './offerInfo/OfferInfo';
import { Chart } from '../../../profileComponents/wallet/Wallet';
import { StartB2bOffer } from '../../../../services/P2p';

interface OfferPayProps {
  offer: IB2bOffer;
  filterSum: number;
  charts: Record<string, IChart>;
  currencies: Record<string, ICurrency>;
  p2pChartList: Chart[];
}

export const OfferPay: FC<OfferPayProps> = ({
  offer,
  filterSum,
  charts,
  currencies,
  p2pChartList,
}) => {

  const {
    orderId,
    b2b_ads_id,
    company,
    history,
    chart,
    chartId,
    currency,
    currencyId,
    course,
    amount,
    minLimit,
    maxLimit,
    payments
  } = offer;

  const [sum, setSum] = useState<string>('');

  const navigate = useNavigate();

  const checkToOrder = async () => {
    if (!errorMessage && sum) {
      const token = localStorage.getItem("access_token") ?? '';
      let temp =
        parseFloat((+sum * +(+offer.course)).toString()).toString().split(".")[1] ?
          +parseFloat((+sum * +(+offer.course)).toString()).toFixed(8) :
          +parseFloat((+sum * +(+offer.course)).toString())
      const data = await StartB2bOffer(token, offer.orderId, offer.type === 2 ? +sum : +temp)
      if (data.status === 200) {
        navigate(`/trade/${offer.orderId}`, { state: offer })
      } else {
        setErrorMessage(data.data === 'У вас есть активный ордер с текущим ользователем' ? 'У вас есть активный ордер' : data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      }
    }
  };

  const currencyName = currency || 'errorName';

  const [errorMessage, setErrorMessage] = useState('')

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const [activeNav, setActiveNav] = useState(0)
  const [outValue, setOutValue] = useState(0);

  useEffect(() => {
    if (offer.type === 2) {
      if (+sum < +minLimit && sum !== '') {
        setErrorMessage(`Минимальный лимит ${minLimit} ${currencyName}`)
      } else if (+sum > +maxLimit) {
        setErrorMessage(`Максимальный лимит ${maxLimit} ${currencyName}`)
      } else {
        setErrorMessage(``)
      }
    } else {
      if (+sum * course < +minLimit && sum !== '') {
        setErrorMessage(`Минимальный лимит ${minLimit} ${currencyName}`)
      } else if (+sum * +course > +maxLimit) {
        setErrorMessage(`Максимальный лимит ${maxLimit} ${currencyName}`)
      } else if (+sum > +amount) {
        setErrorMessage(`Максимальный лимит сделки ${amount} ${chart}`)
      } else {
        setErrorMessage(``)
      }
    }
  }, [sum])

  useEffect(() => {
    if (offer.type === 2) {
      let temp =
        parseFloat((+sum / +(+course)).toString()).toString().split(".")[1] ?
          parseFloat((+sum / +(+course)).toString()).toFixed(8) :
          parseFloat((+sum / +(+course)).toString())
      setOutValue(+temp);
    } else {
      let temp =
        parseFloat((+sum * +(+course)).toString()).toString().split(".")[1] ?
          parseFloat((+sum * +(+course)).toString()).toFixed(8) :
          parseFloat((+sum * +(+course)).toString())
      setOutValue(+temp);
    }
  }, [sum, course])

  let prev = ''
  const sumChange = (e: any) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (pattern.test(e.target.value.trim())) {
      if (e.target.value.trim().length > 15) {
        setSum(e.target.value.trim().slice(0, 15));
        prev = e.target.value.trim().slice(0, 15);
      } else {
        setSum(e.target.value.trim());
        prev = e.target.value.trim();
      }
    } else if (e.target.value.trim() === '') {
      setSum('');
      prev = '';
    } else {
      e.target.value = prev;
    }
  }

  const changeMax = () => {
    const currentChartList = p2pChartList.filter(el => chart === el.symbol);
    if (currentChartList.length) {
      if (+currentChartList[0].balance * +course > +maxLimit) {
        if (parseFloat((+maxLimit / +course).toString()) > amount) {
          setSum(amount.toString())
        } else {
          setSum(parseFloat((+maxLimit / +course).toString()).toString())
        }
      } else {
        if (parseFloat(currentChartList[0].balance.toString()) > amount) {
          setSum(amount.toString())
        } else {
          setSum(parseFloat(currentChartList[0].balance.toString()).toString())
        }
      }
    } else {
      setSum('0')
    }
  }

  return (
    <div className={styles.accordionOpen}>
      <div className={styles.left}>
        <div className={styles.details}>
          <div className={styles.box}>
            <h5>Цена</h5>
            <p>{(+course).toFixed(2)} {currencyName}</p>
          </div>
          <input
            type="text"
            placeholder={offer.type === 2 ? `Введите сумму ${currencyName}` : `Введите сумму ${chart}`}
            value={sum}
            onChange={(e) => sumChange(e)}
            style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
          <button
            className={styles.allBtn}
            style={offer.type === 2 ? { display: 'none' } : { display: 'block' }}
            onClick={changeMax}
          >MAX
          </button>
          <div className={styles.box}>
            <h5>Лимит сделки</h5>
            <p style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}>{amount} {chart}</p>
          </div>
          <div className={styles.box}>
            <h5>Лимит</h5>
            <p style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}>{minLimit} {currencyName} - {maxLimit} {currencyName}</p>
          </div>
          <div className={styles.box}>
            <h5>Количество к получению</h5>
            {
              offer.type === 2 ?
                <p>{outValue} {chart}</p>
                :
                <p style={errorMessage !== 'Отсутствует кошелек' && errorMessage ? { color: 'rgba(211, 65, 118, 1)' } : {}}>
                  {outValue} {currencyName}
                </p>
            }
          </div>
          <button
            className={errorMessage || !sum ? styles.btnDis : styles.btnOk}
            onClick={checkToOrder}
          >
            {offer.type === 2 ? `Купить` : `Продать`} {chart}
          </button>
          <div className={styles.box}>
            {/* <h5>Способ оплаты</h5>
            {
              offerData.payments.map((el, index) => {
                return <p style={errorMessage === 'Отсутствует кошелек' ? { color: 'rgba(211, 65, 118, 1)' } : {}} className={styles.bank} key={index}>{el.name}</p>
              })
            } */}
            {offer.mainOkved}
          </div>
          <div className={styles.box}>
            <h5>Срок оплаты</h5>
            <p>3 дня</p>
          </div>
        </div>
        {errorMessage ? error : <></>}
      </div>
      <div className={styles.additionalInfo}>
        <div className={styles.info}>
          <div className={styles.nav}>
            <div className={styles.navItem} onClick={() => setActiveNav(0)} style={activeNav === 0 ? { borderBottom: '2px solid #1caf86' } : {}}>Условия сделки</div>
            <div className={styles.navItem} onClick={() => setActiveNav(1)} style={activeNav === 1 ? { borderBottom: '2px solid #1caf86' } : {}}>Обратная связь</div>
            <div className={styles.navItem} onClick={() => setActiveNav(2)} style={activeNav === 2 ? { borderBottom: '2px solid #1caf86' } : {}}>Данные</div>
          </div>
          <OfferInfo offerData={offer} activeNav={activeNav} />
        </div>
      </div>
    </div>
  );
};
