import React, { useEffect, useState } from 'react'
import styles from './Filters.module.scss'
import Select from "react-select";
import rub from '../../assets/icons/money/RUB.svg'
import usdt from '../../assets/icons/tokens/usdt.svg'
import btc from '../../assets/icons/tokens/btc.svg'
import eth from '../../assets/icons/tokens/eth.svg'
import plus from '../../assets/icons/plus.svg'
import { GetCharts, GetCurrency, GetOffers, GetPayment } from '../../services/P2p';
import { OfferData } from '../../types/types';
import MainBlock from '../addNew/MainBlock/MainBlock';
import filter from '../../assets/icons/filter.svg'
import addNew from '../../assets/icons/addNew.svg'

interface FiltersPropsType {
  offers: OfferData[];
  setOffers: (param: OfferData[]) => void;
  setOffersType: (param: number) => void;
  offersType: number;
  price: string;
  setPrice: (param: string) => void;
  setLoading: (param: boolean) => void;
}

export interface FiatProps {
  label: any;
  value: number;
}
export interface TokenProps {
  label: any;
  value: number;
}
export interface BankProps {
  label: string;
  value: string | number;
}

const Filters = ({
  offers,
  setOffers,
  setOffersType,
  offersType,
  price,
  setPrice,
  setLoading
}: FiltersPropsType) => {

  const [selectedBankOption, setSelectedBankOption] = useState<any>({ label: 'Все способы оплаты', value: undefined });
  const [selectedFiatOption, setSelectedFiatOption] = useState<any>({ label: 'Все', value: undefined });
  const [selectedTokenOption, setSelectedTokenOption] = useState<any>({ label: 'Все', value: undefined });

  const [bankList, setBankList] = useState<BankProps[]>([
    { label: 'Сбербанк', value: 32 }
  ])

  const [fiatList, setFiatList] = useState<FiatProps[]>([
    { label: <div className={styles.fiatBox}><img src={rub} alt="" className={styles.fiat} />RUB</div>, value: 1 }
  ])
  const [tokenList, setTokenList] = useState<TokenProps[]>([
    { label: <div className={styles.fiatBox}><img src={usdt} alt="" className={styles.fiat} />USDT</div>, value: 1 },
    { label: <div className={styles.fiatBox}><img src={btc} alt="" className={styles.fiat} />BTC</div>, value: 2 },
    { label: <div className={styles.fiatBox}><img src={eth} alt="" className={styles.fiat} />ETH</div>, value: 3 },
  ])

  const getKrypto = async (token: string) => {
    const data = await GetCharts(token);
    if (data.status === 200) {
      const temp: TokenProps[] = [];
      //@ts-ignore
      temp.push({ label: 'Все', value: undefined })
      data.data.forEach((el: any) => {
        temp.push({ label: <div className={styles.fiatBox}><img src={el.icon} alt={el.name} className={styles.fiat} />{el.symbol}</div>, value: el.id })
      });
      setTokenList(temp)
    }
  }

  const getCurr = async (token: string) => {
    const data = await GetCurrency(token);
    if (data.status === 200) {
      const temp: FiatProps[] = [];
      //@ts-ignore
      temp.push({ label: 'Все', value: undefined })
      data.data.forEach((el: any) => {
        temp.push({ label: <div className={styles.fiatBox}><img src={el.icon} alt={el.symbol} className={styles.fiat} />{el.name}</div>, value: el.id })
      })
      setFiatList(temp)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getKrypto(token)
    getCurr(token)
  }, [])

  const getBank = async (token: string, fiatID: number) => {
    const data = await GetPayment(token, fiatID ? fiatID : 1);
    if (data.status === 200) {
      const temp: BankProps[] = [];
      //@ts-ignore
      temp.push({ label: 'Все способы оплаты', value: undefined })
      data.data.forEach((el: any) => {
        temp.push({ label: el.name, value: el.id.toString() })
      });
      setBankList(temp)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getBank(token, +selectedFiatOption.value)
  }, [selectedFiatOption])

  const getOffersData = async (token: string, type: number, curr?: number, chart?: number, payments?: number) => {
    const data = await GetOffers(token, type, curr, chart, payments)
    if (data.status === 200) {
      setOffers(data.data)
      setLoading(false)
    } else {
      setLoading(false)
      setShowErr(data.data)
      setTimeout(() => {
        setShowErr('')
      }, 5000);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    setLoading(true)
    getOffersData(
      token,
      offersType,
      +selectedFiatOption.value,
      +selectedTokenOption.value,
      +selectedBankOption.value
    )

  }, [selectedBankOption, selectedFiatOption, selectedTokenOption, offersType])


  let prev = ''
  const priceChange = (e: any) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (pattern.test(e.target.value.trim())) {
      setPrice(e.target.value.trim());
      prev = e.target.value.trim();
    } else if (e.target.value.trim() === '') {
      setPrice('');
      prev = '';
    } else {
      e.target.value = prev;
    }
  }

  const [addNewOpen, setAddNewOpen] = useState(false);
  const [showErr, setShowErr] = useState('')

  const errModal = <div className={styles.errModalContainer}>
    {showErr === `Token не найден` ? `Только авторизированный пользователь может просматривать объявления` : showErr}
    <div className={styles.marq}></div>
  </div>

  useEffect(() => {
    showErr ? setOffers([]) : <></>
  }, [showErr])

  const [showMobileFilters, setshowMobileFilters] = useState(true)


  return (
    <div className={styles.filtersBlock}>
      {showErr ? errModal : <></>}
      <div className={styles.main}>
        <div className={styles.bigFilters}>
          <div className={styles.mainBtn}>
            <div
              className={`${styles.btnBuy} ${offersType === 1 && styles.buyActive}`}
              onClick={() => setOffersType(1)}
            >
              <p className={styles.btnText}>Купить</p>
            </div>
            <div
              className={`${styles.btnSell} ${offersType === 2 && styles.sellActive}`}
              onClick={() => setOffersType(2)}
            >
              <p className={styles.btnText}>Продать</p>
            </div>
          </div>
          <div className={styles.mobileBox}>
            <img src={filter} alt="filter" onClick={() => setshowMobileFilters(!showMobileFilters)} />
            <img src={addNew} alt="filter" onClick={() => setAddNewOpen(true)} />
          </div>
          <div className={styles.tokenFilter} style={showMobileFilters ? { display: "flex" } : { display: "none" }}>
            <Select
              options={tokenList}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
              }}
              // classNamePrefix="react-select"
              defaultValue={selectedTokenOption}
              onChange={(e) => { setSelectedTokenOption(e); setSelectedBankOption({ label: 'Все способы оплаты', value: undefined }) }}
            />
          </div>
          <div className={styles.summ} style={showMobileFilters ? { display: "flex" } : { display: "none" }}>
            <input
              className={styles.summInput}
              type="text"
              placeholder={`Cумма`}
              value={price}
              onChange={(e) => priceChange(e)}
            />
            <Select
              options={fiatList}
              classNames={{
                container: (state) => styles.select31,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
              }}
              defaultValue={selectedFiatOption}
              onChange={(e) => { setSelectedFiatOption(e); setSelectedBankOption({ label: 'Все способы оплаты', value: undefined }) }}
            />
          </div>
          <div className={styles.payment} style={showMobileFilters ? { display: "block" } : { display: "none" }}>
            <Select
              options={bankList}
              classNames={{
                control: (state) => styles.select2,
                singleValue: (state) => styles.select4,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
              }}
              classNamePrefix="react-select"
              placeholder={`Способы оплаты`}
              defaultValue={selectedBankOption}
              value={selectedBankOption}
              onChange={setSelectedBankOption}
            />
          </div>
          {
            !showErr ?
              <div className={styles.btnBlock}>
                <div className={styles.newOfferBtn} onClick={() => setAddNewOpen(true)}>
                  <img src={plus} alt="" className={styles.plus} />
                  <p className={styles.newOfferBtnText}>Новое объявление</p>
                </div>
              </div>
              :
              <></>
          }
        </div>
      </div>
      <MainBlock
        addNewOpen={addNewOpen}
        setAddNewOpen={setAddNewOpen}
        tokenList={tokenList}
        fiatList={fiatList}
      />
    </div>
  )
}

export default Filters