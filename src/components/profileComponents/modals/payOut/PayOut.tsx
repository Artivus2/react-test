import React, { useEffect, useState } from 'react'
import styles from './PayOut.module.scss'
import { ReactComponent as Cross } from "../../../../assets/icons/cross.svg";
import Select from 'react-select'
import { payOutMethod } from '../../../../services/PayService';
import { BankProps, TokenProps } from '../../../filters/Filters';
import { GetRate } from '../../../../services/P2p';
import { WalletBalance } from '../../../../types/types';
import { BalanceInfo } from '../../../../services/UserService';

interface PayOutModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  balance: number;
  bankList: BankProps[];
  selectedBankOption: any;
  setSelectedBankOption: (param: any) => void;
  tokenList: TokenProps[];
  selectedTokenOption: any;
  setSelectedTokenOption: (param: any) => void;
}

interface ChartBalance {
  id: number;
  balance: number;
  price: number;
}

const PayOut = ({
  isOpenModal,
  setIsOpenModal,
  balance,
  bankList,
  selectedBankOption,
  setSelectedBankOption,
  tokenList,
  selectedTokenOption,
  setSelectedTokenOption,
}: PayOutModalProps) => {
  const [summ, setSumm] = useState('10');
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')
  const [rate, setRate] = useState(0);
  const [chartsBalances, setChartsBalances] = useState<ChartBalance[]>([])
  const [currentChartBalance, setCurrentChartBalance] = useState<ChartBalance>({
    id: 259,
    balance: 0,
    price: 0
  })

  const getBalance = async (token: string) => {
    const data = await BalanceInfo(token);
    if (data.status === 200) {
      let row: WalletBalance[] = data.data;
      let tempList: ChartBalance[] = row.map(el => {
        return {
          id: +el.id,
          balance: +el.balance,
          price: +el.price
        }
      })
      setChartsBalances(tempList)
    }
  }

  const getRates = async (token: string, currency_id: number, chart_id: number) => {
    const data = await GetRate(token, currency_id, chart_id);
    if (data.status === 200) {
      setRate(data.data.price)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getBalance(token)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    if (+selectedTokenOption.value) {
      getRates(token, 1, +selectedTokenOption.value);
      let temp = chartsBalances.filter(el => el.id === +selectedTokenOption.value);
      setCurrentChartBalance(temp[0]);
    }
  }, [chartsBalances, selectedTokenOption, setSelectedTokenOption])

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
      if (e.target.value.trim().length > 12) {
        setSumm(e.target.value.trim().slice(0, 12));
        prev = e.target.value.trim().slice(0, 12);
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

  const payOut = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (+selectedTokenOption.value && +summ && +selectedBankOption.value) {
      const data = await payOutMethod(token, +selectedTokenOption.value, +summ, +selectedBankOption.value);
      if (data.status && data.data.success) {
        setOkMessage(data.data.message)
        setTimeout(() => {
          setOkMessage('')
          document.location.reload()
        }, 3000);
      } else {
        setErrorMessage(data.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    } else {
      setErrorMessage('Проверьте правильность введённых данных')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  };

  return (
    <>
      {isOpenModal && (
        <>
          <div className={styles.popupIn} onClick={() => setIsOpenModal(false)}></div>
          <div
            className={styles.popupIn__block}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.popupIn__title}>Продать</div>
            <Cross
              className={styles.popupIn__close}
              onClick={() => setIsOpenModal(false)}
            />
            <div className={styles.popupIn__info}>
              Продажа криптовалюты USDTTRC осуществляется только в сети TRON (TRC20)
            </div>
            <div className={styles.popupIn__text}>Валюта </div>
            <Select
              options={tokenList}
              placeholder={`Выберите валюту`}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
                valueContainer: (state) => styles.select5,
              }}
              classNamePrefix="react-select"
              onChange={setSelectedTokenOption}
              defaultValue={selectedTokenOption}
            />
            <div className={styles.popupIn__text}>Кошелек</div>
            <div className={styles.popupIn__input}>
              <div >
                <Select
                  options={bankList}
                  onChange={setSelectedBankOption}
                  classNames={{
                    container: (state) => styles.select3,
                    singleValue: (state) => styles.select4,
                    control: (state) => styles.select2,
                    menuList: (state) => styles.select6,
                    menu: (state) => styles.select61,
                    option: (state) => styles.select7,
                  }}
                  classNamePrefix="react-select"
                  defaultValue={selectedBankOption}
                />
              </div>
            </div>
            <div className={styles.popupIn__text}>Сумма</div>
            <div className={styles.popupIn__input}>
              <input
                type="text"
                placeholder={`Введите сумму`}
                value={summ}
                onChange={(e) => priceChange(e)}
                id="inp3"
                maxLength={20}
              />
            </div>
            <div className={styles.popupIn__balance}>
              Текущий баланс:
              <div className={styles.curVal}>{currentChartBalance ? +currentChartBalance.balance : 0} {selectedTokenOption.label}</div>
            </div>
            {errorMessage ? error : <></>}
            {okMessage ? ok : <></>}
            <div className={styles.popupIn__btn} onClick={() => payOut()}>
              Продать криптовалюту
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

export default PayOut