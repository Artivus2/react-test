import React, { useEffect, useState } from "react";
import styles from "./SecondStep.module.scss";
import Select from "react-select";
import { BankProps } from "../../filters/Filters";
import { Chart } from "../../profileComponents/wallet/Wallet";
import { IOkved } from "../../../types/B2b.types";

interface SecondStepContentProps {
  limit: string;
  setLimit: (limit: string) => void;
  limitStart: string;
  setLimitStart: (limitStart: string) => void;
  limitEnd: string;
  setLimitEnd: (limitEnd: string) => void;
  selectedFiatOption: any;
  selectedTokenoption: any;
  selectedBankOption: any;
  setSelectedBankOption: (param: any) => void;
  selectedOkvedOption?: any;
  setSelectedOkvedOption?: (param: any) => void;
  type: number;
  bankList: BankProps[];
  balanceChartList: Chart[];
  rate: number;
  setIsError: (param: boolean) => void;
  okveds?: Record<string, IOkved>;
  duration: number;
  setDuration: (param: number) => void;
}

const SecondStepContent = ({
  type,
  limit,
  setLimit,
  setLimitEnd,
  setLimitStart,
  limitEnd,
  limitStart,
  selectedFiatOption,
  selectedTokenoption,
  selectedBankOption,
  bankList,
  setSelectedBankOption,
  balanceChartList,
  rate,
  setIsError,
  okveds,
  selectedOkvedOption,
  setSelectedOkvedOption,
  duration,
  setDuration
}: SecondStepContentProps) => {
  const [okvedList, setOkvedList] = useState([{ label: '', id: '' }]);

  const [errorMessage, setErrorMessage] = useState('')

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const checkValueTotal = (e: any, func: any) => {
    let prev = ''
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (type === 1) {
      if (pattern.test(e.target.value.trim())) {
        if (e.target.value.trim().length > 15) {
          func(e.target.value.trim().slice(0, 15));
          prev = e.target.value.trim().slice(0, 15);
        } else {
          func(e.target.value.trim());
          prev = e.target.value.trim();
        }
      } else if (e.target.value.trim() === '') {
        func('');
        prev = '';
      } else {
        e.target.value = prev;
      }
    } else {
      if (pattern.test(e.target.value.trim())) {
        if (e.target.value.trim().length > 15) {
          func(e.target.value.trim().slice(0, 15));
          prev = e.target.value.trim().slice(0, 15);
        } else if (e.target.placeholder !== 'Максимум') {
          if (+e.target.value.trim() > currentBalance) {
            func(parseFloat(currentBalance.toString()).toString());
            prev = parseFloat(currentBalance.toString()).toString();
            setLimitEnd((parseFloat(currentBalance.toString()) * +rate).toString())
            setErrorMessage('Вводимое значение превышает баланс')
          } else if (+e.target.value.trim() * +rate > +limitEnd) {
            func(e.target.value.trim());
            prev = e.target.value.trim();
            let temp =
              parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
                parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
                parseFloat((+e.target.value.trim() * +rate).toString())
            setLimitEnd((+temp).toString())
          } else {
            func(e.target.value.trim());
            prev = e.target.value.trim();
            let temp =
              parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
                parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
                parseFloat((+e.target.value.trim() * +rate).toString())
            setLimitEnd((+temp).toString())
          }
        } else {
          func(e.target.value.trim());
          prev = e.target.value.trim();
        }
      } else if (e.target.value.trim() === '') {
        func('');
        prev = '';
      } else {
        e.target.value = prev;
      }
    }
  }

  useEffect(() => {
    if (+limitStart < 500) {
      setErrorMessage('Минимум 500')
    } else if (+limitEnd > 1000000) {
      if (!errorMessage) {
        setErrorMessage('Максимум 1000000')
      }
    } else if (+limitStart > +limitEnd) {
      setErrorMessage('Минимальное значение не может быть больше максимального')
    } else {
      setErrorMessage('')
    }
  }, [limitStart, limitEnd, errorMessage])

  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentChartName, setCurretChartName] = useState('');

  const changeMax = () => {
    let currentChartList = balanceChartList.filter(el => selectedTokenoption.label.props.children[1] === el.symbol);
    if (currentChartList.length) {
      if (+currentChartList[0].balance * +rate > 1000000) {
        setLimit(parseFloat((1000000 / +rate).toString()).toString())
        setLimitEnd((+(1000000 / +rate) * +rate).toString())
      } else {
        setLimit(parseFloat(currentChartList[0].balance.toString()).toString())
        setLimitEnd((+currentChartList[0].balance * +rate).toString())
      }
    } else {
      setLimit('0')
    }
  }

  useEffect(() => {
    let currentChartList = balanceChartList.filter(el => selectedTokenoption.label.props.children[1] === el.symbol);
    if (currentChartList.length) {
      setCurrentBalance(currentChartList[0].balance)
      setCurretChartName(currentChartList[0].symbol)
    }
  }, [])

  useEffect(() => {
    errorMessage ? setIsError(true) : setIsError(false)
  }, [errorMessage])

  useEffect(() => {
    if (okveds) {
      let temp = Object.values(okveds).map(({ title, id }) => { return { label: title, id: id } })
      setOkvedList(temp)
    }
  }, [okveds])

  return (
    <>
      {
        okveds ?
          <div className={styles.okveds}>
            <Select
              options={okvedList}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
                input: (state) => styles.select1,
                placeholder: (state) => styles.select1
              }}
              placeholder='ОКВЭД'
              onChange={setSelectedOkvedOption}
            />
          </div>
          :
          <></>
      }
      <div className={styles.main}>
        <div className={styles.mini} style={okveds ? { width: '100%' } : { flex: '2' }}>
          <p className={styles.title}>Общая сумма</p>
          <div className={styles.mainInputBlock}>
            <input
              placeholder="Введите сумму"
              className={styles.mainInput}
              value={limit}
              onChange={(e) => checkValueTotal(e, setLimit)}
              style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
            />
            {
              type === 2 ?
                <>
                  <div className={styles.mainLabel1} onClick={changeMax}>MAX</div>
                  <div className={styles.mainLabel}>{selectedTokenoption.label}</div>
                </>
                :
                <div className={styles.mainLabel}>{selectedTokenoption.label}</div>
            }
          </div>
          {
            type === 2 ?
              <div className={styles.title2} style={{ textAlign: 'end' }}>Баланс: <span>{parseFloat(currentBalance.toString())} {selectedTokenoption.label}</span></div>
              :
              <></>
          }
          <p className={styles.title}>Лимиты</p>
          <p
            className={styles.title3}
            style={type === 2 ? { display: 'block', textAlign: "center" } : { display: "none" }}
          >
            {limit ? limit : 0} * {rate} (курс {currentChartName} / RUB) = {`${parseFloat((+limit * +rate).toString()).toString().split(".")[1] ?
              +parseFloat((+limit * +rate).toString()).toFixed(8) :
              +parseFloat((+limit * +rate).toString())
              }`}
          </p>
          <div className={styles.limits}>
            <div className={styles.inputBlock}>
              <input
                placeholder="Минимум"
                className={styles.input}
                value={limitStart}
                onChange={(e) => checkValueTotal(e, setLimitStart)}
                style={+limitStart < 500 || +limitStart > +limitEnd ? { color: 'rgba(211, 65, 118, 1)' } : {}}
              />
              <p className={styles.currency}>{selectedFiatOption.label}</p>
            </div>
            <p>~</p>
            <div className={styles.inputBlock}>
              <input
                placeholder="Максимум"
                className={styles.input}
                value={limitEnd}
                onChange={(e) => checkValueTotal(e, setLimitEnd)}
                style={+limitEnd > 1000000 || +limitStart > +limitEnd ? { color: 'rgba(211, 65, 118, 1)' } : {}}
              />
              <p className={styles.currency2}>{selectedFiatOption.label}</p>
            </div>
          </div>
          <div className={styles.counterBlock}>
            <div className={styles.limitBlock}>
              <p>Мин.:</p>
              <p className={styles.counter}>500</p>
            </div>
            <div className={styles.limitBlock}>
              <p>Макс.:</p>
              <p className={styles.counter}>10000000</p>
            </div>
          </div>
          {errorMessage ? error : <></>}
        </div>
        <div className={styles.mini} style={okveds ? { display: 'none' } : { flex: '1' }}>
          <p className={styles.title}>Способ оплаты</p>
          <p className={styles.subTitle}>Выберите метод оплаты</p>
          <div style={{ margin: '10px 0' }}>
            <Select
              isMulti
              options={bankList}
              onChange={setSelectedBankOption}
              closeMenuOnSelect={false}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
                multiValue: (state) => styles.select8,
                multiValueLabel: (state) => styles.select9,
                multiValueRemove: (state) => styles.select10,
              }}
              classNamePrefix="react-select"
              defaultValue={selectedBankOption}
            />
          </div>
          <p className={styles.title}>Срок оплаты</p>
          <div className={styles.type}>
            <div
              className={styles.typeContent}
              onClick={() => setDuration(15)}
            >
              <div className={styles.mainCircle}>
                {duration === 15 && <div className={styles.circle} />}
              </div>
              <p>15 мин.</p>
            </div>
            <div className={styles.typeContent} onClick={() => setDuration(30)}>
              <div className={styles.mainCircle}>
                {duration === 30 && <div className={styles.circle} />}
              </div>
              <p>30 мин.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SecondStepContent;
