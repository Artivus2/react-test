import React, { ChangeEvent, useEffect, useState } from 'react'
import Container from '../../UI/container/Container'
import styles from './BuyPage.module.scss'
import rub from '../../assets/icons/money/RUB.svg'
import usdt from '../../assets/icons/coins/usdt.svg'
import btc from '../../assets/icons/coins/btc.svg'
import eth from '../../assets/icons/coins/eth.svg'
import { GetCharts, GetCurrency, GetRate } from '../../services/P2p'
import { FiatProps, TokenProps } from '../../components/filters/Filters'
import Select from "react-select";
import { payInMethod } from '../../services/PayService'

const BuyPage = () => {
  const [selectedFiatOption, setSelectedFiatOption] = useState<any>({ label: <div className={styles.fiatBox}><img src={rub} alt="" className={styles.fiat} />RUB</div>, value: 1 });
  const [selectedTokenOption, setSelectedTokenOption] = useState<any>({ label: <div className={styles.fiatBox}><img src={usdt} alt="" className={styles.fiat} />USDT</div>, value: 259 });

  const [fiatList, setFiatList] = useState<FiatProps[]>([
    { label: <div className={styles.fiatBox}><img src={rub} alt="" className={styles.fiat} />RUB</div>, value: 1 }
  ])
  const [tokenList, setTokenList] = useState<TokenProps[]>([
    { label: <div className={styles.fiatBox}><img src={usdt} alt="" className={styles.fiat} />USDT</div>, value: 259 },
    { label: <div className={styles.fiatBox}><img src={btc} alt="" className={styles.fiat} />BTC</div>, value: 258 },
    { label: <div className={styles.fiatBox}><img src={eth} alt="" className={styles.fiat} />ETH</div>, value: 260 },
  ])

  const [tokenValue, setTokenValue] = useState('0')
  const [fiatValue, setFiatValue] = useState('0')
  const [errorMessage, setErrorMessage] = useState('')
  const [rate, setRate] = useState('0');

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const getRates = async (token: string, currency_id: number, chart_id: number) => {
    const data = await GetRate(token, currency_id, chart_id);
    if (data.status === 200) {
      if (data.data.price === 'нет данных') {
        setRate(data.data.price)
      } else {
        setRate(parseFloat(data.data.price).toString())
        setTokenValue('0');
        setFiatValue('0')
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getRates(token, +selectedFiatOption.value, +selectedTokenOption.value)
  }, [selectedTokenOption.value, selectedFiatOption.value])

  const getKrypto = async (token: string) => {
    const data = await GetCharts(token);
    if (data.status === 200) {
      const temp: TokenProps[] = [];
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

  let prev = ''
  const changeValue = (e: ChangeEvent<HTMLInputElement>, func: (param: string) => void, func2: (param: string) => void, id: number) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (rate !== 'нет данных') {
      if (pattern.test(e.target.value.trim())) {
        if (e.target.value.trim().length > 10) {
          prev = e.target.value.trim().slice(0, 10);
          func(e.target.value.trim().slice(0, 10));
        } else {
          if (id === 1) {
            prev = e.target.value.trim();
            func(e.target.value.trim());
            func2(
              parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
                (+parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8)).toString() :
                (+parseFloat((+e.target.value.trim() * +rate).toString())).toString()
            );
          } else {
            prev = e.target.value.trim();
            func(e.target.value.trim());
            func2(
              parseFloat((+e.target.value.trim() / +rate).toString()).toString().split(".")[1] ?
                (+parseFloat((+e.target.value.trim() / +rate).toString()).toFixed(8)).toString() :
                (+parseFloat((+e.target.value.trim() / +rate).toString())).toString()
            );
          }
        }
      } else if (e.target.value.trim() === '') {
        prev = '';
        func('');
        func2('')
      } else {
        e.target.value = prev;
      }
    }
  }

  const payInRequest = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (+selectedTokenOption.value && rate !== 'нет данных' && +fiatValue) {
      const data = await payInMethod(token, +selectedTokenOption.value, +fiatValue);
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
    <div className={styles.back}>
      <Container>
        <>
          <div className={styles.main}>
            <div className={styles.bg}>
              <div className={styles.textBlock}>
                <p className={styles.title}>Легко покупайте криптовалюты по конкурентоспособным курсам с быстрыми транзакциями</p>
              </div>
            </div>
          </div>
          <Container>
            <div className={styles.purchaseMainContainer}>
              <div className={styles.purchaseContainer}>
                <div className={styles.selectToken}>
                  <div className={styles.countContainer}>
                    <input
                      id='i1'
                      className={styles.count}
                      type="text"
                      defaultValue={0}
                      value={tokenValue}
                      onChange={(e) => changeValue(e, setTokenValue, setFiatValue, 1)}
                    />
                  </div>
                  <div className={styles.changeContainer}>
                    <div className={styles.changeBox}>
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
                        onChange={(e) => setSelectedTokenOption(e)}
                      />
                    </div>
                    <div className={styles.dolVal}>~{rate} {selectedFiatOption.label}</div>
                  </div>
                </div>
                <div className={styles.showRub}>
                  <div className={styles.countContainer}>
                    <input
                      id='i2'
                      className={styles.count}
                      type="text"
                      defaultValue={0}
                      value={fiatValue}
                      onChange={(e) => changeValue(e, setFiatValue, setTokenValue, 2)}
                    />
                  </div>
                  <div className={styles.changeContainer}>
                    <div className={styles.changeBox}>
                      <Select
                        options={fiatList}
                        classNames={{
                          container: (state) => styles.select3,
                          singleValue: (state) => styles.select4,
                          control: (state) => styles.select2,
                          menuList: (state) => styles.select6,
                          menu: (state) => styles.select61,
                          option: (state) => styles.select7,
                        }}
                        // classNamePrefix="react-select"
                        defaultValue={selectedFiatOption}
                        onChange={(e) => setSelectedFiatOption(e)}
                      />
                    </div>
                  </div>
                </div>
                {errorMessage ? error : <></>}
                <button
                  onClick={payInRequest}
                  className={styles.addCap}
                >
                  Пополнить кошелёк
                </button>
              </div>
            </div>
          </Container>
        </>
      </Container>
    </div>
  )
}

export default BuyPage