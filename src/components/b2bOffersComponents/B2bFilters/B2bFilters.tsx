import React, { useState } from 'react';
import styles from './B2bFilters.module.scss';
import { CustomSelect, SelectOption } from "../../../UI/CustomSelect/CustomSelect";
import { OrderType } from "../../../types/types";
import { B2bFilters } from "../../../types/B2b.types";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { setChartId, setOfferType, setMainOkved, setCurrencyId, setSum, setBank } from "../../../bll/slices/b2b.slice";
import Input from "../../../UI/Input";
import { Switcher } from "../../../UI/Switcher/Switcher";
import { getBank, getCharts, getCurrencies, getOkved } from "../../../bll/selectors/app.selector";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import Select from 'react-select'
import filter from '../../../assets/icons/filter.svg'
import addNew from '../../../assets/icons/addNew.svg'

interface B2BFiltersProps {
  filters: B2bFilters;
  sum: number | null;
  disabled: boolean;
  setAddNewOpen: (param: boolean) => void;
}

export const B2BFilters: React.FC<B2BFiltersProps> = ({
  filters,
  sum,
  disabled,
  setAddNewOpen
}) => {

  const charts = useAppSelector(getCharts);
  const currencies = useAppSelector(getCurrencies);
  const okveds = useAppSelector(getOkved);
  const banks = useAppSelector(getBank);

  const chartOptions = Object.values(charts)
    .map(({ id, icon, symbol }) => new SelectOption(id, symbol, icon));

  const currencyOptions = Object.values(currencies).map(
    ({ id, icon, symbol }) => new SelectOption(id, symbol, icon)
  );

  const okvedOptions = Object.values(okveds).map(({ title, id }) => { return { label: title, id: id } })

  const bankOptions = Object.values(banks).map(({ title, id }) => { return { label: title, id: id } })

  const { chartId, currencyId, mainOkved, type } = filters;

  const dispatch = useAppDispatch();

  const changeFilterToken = (id: string | number | null) => {
    if (!id) {
      dispatch(setChartId(null));
      return;
    }
    if (!Number.isFinite(+id)) return;
    dispatch(setChartId(+id));
  };

  const changeFilterCurrencies = (id: string | number | null) => {
    if (!id) {
      dispatch(setCurrencyId(null));
      return;
    }
    if (!Number.isFinite(+id)) return;
    dispatch(setCurrencyId(+id));
  };

  const changeFilterOKVED = (params: { label: string, id: string } | null) => {
    if (!params?.id) {
      dispatch(setMainOkved(null));
      return;
    }
    dispatch(setMainOkved(String(params.id)));
  };
  const changeFilterBank = (params: { label: string, id: number } | null) => {
    if (!params?.id) {
      dispatch(setBank(null));
      return;
    }
    dispatch(setBank(String(params.id)));
  };

  const changeFilterFiatSum = (sum: string) => {
    if (!Number.isFinite(+sum)) return;
    dispatch(setSum(+sum));
  };

  const changeFilterOfferType = (offerType: string) => {
    +offerType === OrderType.BUY && dispatch(setOfferType(OrderType.BUY));
    +offerType === OrderType.SELL && dispatch(setOfferType(OrderType.SELL));
  };

  const rootClassName = disabled
    ? `${styles.b2bFilters} ${styles.disabled}`
    : styles.b2bFilters;

  const [showMobileFilters, setshowMobileFilters] = useState(true)

  return (
    <div className={rootClassName}>
      <div className={styles.mobile}>
        <Switcher
          viewOption1={'Покупка'}
          viewOption2={'Продажа'}
          option1={String(OrderType.BUY)}
          option2={String(OrderType.SELL)}
          value={String(type)}
          changeValue={changeFilterOfferType}
        />
        <div className={styles.mobileBox}>
          <img src={filter} alt="filter" onClick={() => setshowMobileFilters(!showMobileFilters)} />
          <img src={addNew} alt="filter" onClick={() => setAddNewOpen(true)} />
        </div>
        <div style={showMobileFilters ? { display: "flex", flex: 1 } : { display: "none" }}>
          <CustomSelect options={chartOptions} placeholder='Криптовалюта' value={chartId}
            onChange={changeFilterToken} />
        </div>
        <div className={styles.sumWrapper} style={showMobileFilters ? { display: "flex", flex: 1 } : { display: "none" }}>
          <Input value={sum ? String(sum) : ''} placeholder={'Введите сумму'} setValue={changeFilterFiatSum} />
          <CustomSelect options={currencyOptions} placeholder='Валюта' value={currencyId}
            onChange={changeFilterCurrencies} />
        </div>
        {/* <CustomSelect options={okvedOptions} placeholder='ОКВЭД' value={mainOkved} onChange={changeFilterOKVED} /> */}
        <div style={showMobileFilters ? { display: "flex", flex: 1 } : { display: "none" }}>
          <Select
            options={okvedOptions}
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
            onChange={changeFilterOKVED}
          />
        </div>
        <div style={showMobileFilters ? { display: "flex", flex: 1 } : { display: "none" }}>
          <Select
            options={bankOptions}
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
            placeholder='Выберите банк'
            onChange={changeFilterBank}
          />
        </div>
      </div>
      <div className={styles.desk}>
        <Switcher
          viewOption1={'Покупка'}
          viewOption2={'Продажа'}
          option1={String(OrderType.BUY)}
          option2={String(OrderType.SELL)}
          value={String(type)}
          changeValue={changeFilterOfferType}
        />
        <CustomSelect options={chartOptions} placeholder='Криптовалюта' value={chartId}
          onChange={changeFilterToken} />
        <div className={styles.sumWrapper}>
          <Input value={sum ? String(sum) : ''} placeholder={'Введите сумму'} setValue={changeFilterFiatSum} />
          <CustomSelect options={currencyOptions} placeholder='Валюта' value={currencyId}
            onChange={changeFilterCurrencies} />
        </div>
        <Select
          options={okvedOptions}
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
          onChange={changeFilterOKVED}
        />
        <Select
          options={bankOptions}
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
          placeholder='Выберите банк'
          onChange={changeFilterBank}
        />
      </div>
    </div>
  );
};
