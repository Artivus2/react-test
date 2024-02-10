import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './CreateOffer.module.scss';
import { CustomSelect, SelectOption, } from '../../../UI/CustomSelect/CustomSelect';
import { useAppSelector } from '../../../utils/hooks/useAppSelector';
import { getCharts, getCurrencies, } from '../../../bll/selectors/app.selector';
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch';
import { createB2bBuyOfferThunk, createB2bSellOfferThunk } from '../../../bll/api/b2b.thunk';
import { getChartPriceThunk } from '../../../bll/api/app.thunk';
import { requestBody } from '../../../utils/fn/createOfferRequest';
import { Switcher } from "../../../UI/Switcher/Switcher";

interface CreateOfferProps {
  close: () => void;
}

export const CreateOffer: React.FC<CreateOfferProps> = ({ close }) => {

  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [currencyId, setCurrencyId] = useState<number>(0);
  const [chartId, setChartId] = useState<number>(0);
  const [course, setCourse] = useState<string>('0');

  const [disabledCreate, setDisabledCreate] = useState<boolean>(true);
  const [minLimit, setMinLimit] = useState<string>('500');
  const [maxLimit, setMaxLimit] = useState<string>('1000000');
  const [amount, setAmount] = useState<string>('');


  const currencies = useAppSelector(getCurrencies);
  const charts = useAppSelector(getCharts);
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('')

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  // COURSE

  // const setCourseHandler = (e: ChangeEvent<HTMLInputElement>, func: (param: number) => void) => {
  //   if (!Number.isFinite(+e.currentTarget.value)) return;
  //   // setCourse(+e.currentTarget.value);
  //   func(+e.currentTarget.value)
  // };

  const checkValueTotal = (e: any, func: any) => {
    let prev = ''
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (orderType === 'buy') {
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
          // if (+e.target.value.trim() > currentBalance) {
          //   func(parseFloat(currentBalance.toString()).toString());
          //   prev = parseFloat(currentBalance.toString()).toString();
          //   setMaxLimit((parseFloat(currentBalance.toString()) * +rate).toString())
          //   setErrorMessage('Вводимое значение превышает баланс')
          // } else if (+e.target.value.trim() * +rate > +limitEnd) {
          //   func(e.target.value.trim());
          //   prev = e.target.value.trim();
          //   let temp =
          //     parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
          //       parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
          //       parseFloat((+e.target.value.trim() * +rate).toString())
          //   setMaxLimit((+temp).toString())
          // } else {
          //   func(e.target.value.trim());
          //   prev = e.target.value.trim();
          //   let temp =
          //     parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
          //       parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
          //       parseFloat((+e.target.value.trim() * +rate).toString())
          //   setMaxLimit((+temp).toString())
          // }
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
    if (+minLimit < 500) {
      setErrorMessage('Минимум 500')
    } else if (+maxLimit > 1000000) {
      if (!errorMessage) {
        setErrorMessage('Максимум 1000000')
      }
    } else if (+minLimit > +maxLimit) {
      setErrorMessage('Минимальное значение не может быть больше максимального')
    } else if (+amount / +course > +maxLimit) {
      setErrorMessage('Обащя сумма ордера превышает максимальный лимит')
    } else {
      setErrorMessage('')
    }
  }, [minLimit, maxLimit, errorMessage])

  const getCourse = async (chartId: number, currencyId: number) => {
    const course = await dispatch(getChartPriceThunk({ chartId, currencyId })).unwrap();
    setCourse((+parseFloat((course || 0).toString())).toString());
  };

  useEffect(() => {
    chartId && currencyId && getCourse(chartId, currencyId);
  }, [chartId, currencyId]);


  const changeFilterToken = (id: string | number | null) => {
    id && setChartId(+id);
  };

  const chartOptions = Object.values(charts).map(
    ({ id, icon, symbol }, index) => {
      // if (index === 0) console.log(symbol);
      return new SelectOption(id, symbol, icon);
    }
  );

  const currencyOptions = Object.values(currencies).map(
    ({ id, icon, symbol }) => new SelectOption(id, symbol, icon)
  );
  const changeFilterPayments = (id: string | number | null) => {
    id && setCurrencyId(+id);
  };

  const createOfferHandler = async () => {
    const body = requestBody(chartId, +amount, currencyId, +minLimit, +maxLimit);

    if (orderType === "sell") {
      const data: any = await dispatch(createB2bSellOfferThunk(body)).unwrap();
      // console.log(data);
      if (data && data.status === 200 && data.data.success) {
        close()
      } else {
        setErrorMessage(data.data.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    } else {
      const data: any = await dispatch(createB2bBuyOfferThunk(body)).unwrap();
      if (data.status === 200 && data.data.success) {
        close()
      } else {
        // console.log(data.data.message);
        setErrorMessage(data.data.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  };

  useEffect(() => {
    chartId && currencyId && +amount && +minLimit && +maxLimit && +minLimit <= +maxLimit
      ? setDisabledCreate(false)
      : setDisabledCreate(true);
  }, [chartId, amount, minLimit, course, currencyId, maxLimit]);

  return (
    <div className={styles.createOffer}>
      <h3 className={styles.title}>Создание объявления</h3>
      <Switcher
        viewOption1='Покупка'
        viewOption2='Продажа'
        option1='buy'
        option2='sell'
        value={orderType}
        changeValue={(order: string) => setOrderType(order as ('buy' | 'sell'))}
      />
      <div className={styles.chartBlock}>
        <CustomSelect
          options={chartOptions}
          placeholder="Криптовалюта"
          value={chartId}
          onChange={changeFilterToken}
        />
        <CustomSelect
          options={currencyOptions}
          placeholder="Валюта"
          value={currencyId}
          onChange={changeFilterPayments}
        />
        <div className={styles.courseWrapper}>
          <span>Курс:</span>
          <input type="text" value={course} onChange={(e) => checkValueTotal(e, setCourse)} />
        </div>
      </div>
      <div className={styles.block}>
        <input
          type="text"
          placeholder={
            `Введите сумму ${chartOptions.filter(el => el.id === chartId)[0] ? chartOptions.filter(el => el.id === chartId)[0].title : ''}`
          }
          value={amount}
          onChange={(e) => checkValueTotal(e, setAmount)}
        />
        {/* <input type="text" placeholder="Выберите время" value={10} /> */}
      </div>
      <div className={`${styles.block}`}>
        <input
          type="text"
          value={minLimit}
          placeholder="Минимум"
          onChange={(e) => checkValueTotal(e, setMinLimit)}
          style={+minLimit < 500 || +minLimit > +maxLimit ? { color: 'rgba(211, 65, 118, 1)' } : {}}
        />
        <input
          type="text"
          value={maxLimit}
          placeholder="Максимум"
          onChange={(e) => checkValueTotal(e, setMaxLimit)}
          style={+maxLimit > 1000000 || +minLimit > +maxLimit ? { color: 'rgba(211, 65, 118, 1)' } : {}}
        />
      </div>
      {errorMessage ? error : <></>}
      <div className={styles.block}>
        <button
          className={`${styles.button} ${styles.create}`}
          onClick={createOfferHandler}
          disabled={disabledCreate}
        >
          Создать объявление
        </button>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={close}
          disabled={false}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};
