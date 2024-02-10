import React, { useEffect, useState } from 'react'
import Select from "react-select";
import styles from './PayIn.module.scss';
import { ReactComponent as Cross } from "../../../../assets/icons/cross.svg";
import { payInMethod } from '../../../../services/PayService';
import { TokenProps } from '../../../filters/Filters';
import { GetRate } from '../../../../services/P2p';

interface PayInModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  tokenList: TokenProps[];
  selectedTokenOption: any;
  setSelectedTokenOption: (param: any) => void;
}

const PayIn = ({
  isOpenModal,
  setIsOpenModal,
  tokenList,
  selectedTokenOption,
  setSelectedTokenOption,
}: PayInModalProps) => {

  const [summ, setSumm] = useState('10');
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')
  const [rate, setRate] = useState('0');
  const [load, setLoad] = useState(false);

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const ok = <div className={styles.ok}>
    {okMessage}
  </div>

  let prev = ''
  const priceChange = (e: any) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (pattern.test(e.target.value.trim())) {
      if (e.target.value.trim().length > 15) {
        setSumm(e.target.value.trim().slice(0, 15));
        prev = e.target.value.trim().slice(0, 15);
      } else {
        setSumm(e.target.value.trim());
        prev = e.target.value.trim();
      }
    } else if (e.target.value.trim() === '') {
      setSumm('');
      prev = '';
    } else {
      e.target.value = prev;
    }
  }

  const getRates = async (token: string, currency_id: number, chart_id: number) => {
    const data = await GetRate(token, currency_id, chart_id);
    if (data.status === 200) {
      if (data.data.price === 'нет данных') {
        setRate(data.data.price)
        setLoad(false);
      } else {
        setRate(parseFloat(data.data.price).toString())
        setLoad(false);
      }
    }
  }

  useEffect(() => {
    setLoad(true);
    const token = localStorage.getItem("access_token") ?? '';
    getRates(token, 1, +selectedTokenOption.value)
  }, [selectedTokenOption.value])

  const payInRequest = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (+summ && +selectedTokenOption.value && rate !== 'нет данных' && !load) {
      const data = await payInMethod(token, +selectedTokenOption.value, +summ * +rate);
      if (data.status === 200 && data.data.url) {
        window.location.href = data.data.url;
      } else {
        setErrorMessage(data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    } else if (rate === 'нет данных') {
      setErrorMessage('Нет курса по валютам')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      setErrorMessage('Проверьте правильность введённых данных')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }

  return (
    <>
      {isOpenModal && (
        <>
          <div className={styles.popupIn} onClick={() => setIsOpenModal(false)}></div>
          <div
            className={styles.popupIn__block}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupIn__title}>Купить</div>
            <Cross
              className={styles.popupIn__close}
              onClick={() => setIsOpenModal(false)}
            />
            {/* <div className={styles.popupIn__warning}>
              Минимальная сумма покупки криптовалюты:
              <div className={styles.curValOr}>{10} {selectedTokenOption.label}</div>
            </div> */}
            <div className={styles.popupIn__info}>
              Покупка криптовалюты USDTTRC осуществляется только в сети TRON (TRC20)
            </div>
            <div className={styles.popupIn__text}>Выберите валюту</div>
            <Select
              options={tokenList}
              placeholder={`Выберите криптовалюту`}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
              }}
              classNamePrefix="react-select"
              onChange={setSelectedTokenOption}
              defaultValue={selectedTokenOption}
            />
            <div className={styles.popupIn__input}>
              <input
                type="text"
                placeholder={`Введите сумму`}
                value={summ}
                onChange={(e) => priceChange(e)}
              />
            </div>
            {errorMessage ? error : <></>}
            {okMessage ? ok : <></>}
            <div className={styles.popupIn__btn} onClick={payInRequest}>
              Купить криптовалюту
            </div>
            <div className={styles.popupIn__items}>
              <div className={styles.popupIn__item}>
                Сумма к получению
                <div className={styles.curVal}>{+summ * +rate} RUB</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PayIn