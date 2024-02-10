import React, { useEffect, useState } from 'react'
import styles from './HistoryTableItem.module.scss'
import HistoryTableItem from './HistoryTableItem';
import { IStatusList, OfferData, OrderHistory, Payments, UserProfile } from '../../../../types/types';
import { GetActiveB2bOffers, GetActiveOffers, GetCharts, GetCurrency, GetLastB2bOffers, GetLastOffers, GetMyB2bOffers, GetMyOffers } from '../../../../services/P2p';
import { IB2bOfferHistory } from '../../../../types/B2b.types';
import { GetPayments } from '../../../../services/UserService';
import { BankProps, FiatProps, TokenProps } from '../../../filters/Filters';

interface HistoryTablePropsType {
  type: number;
  profile: UserProfile;
  title: 'p2p' | 'b2b';
  statusList: IStatusList[];
}

const HistoryTable = ({
  title,
  type,
  profile,
  statusList,
}: HistoryTablePropsType) => {

  const [history, setHistory] = useState<OrderHistory[]>([]);
  const [activeOrders, setActiveOrders] = useState<OrderHistory[]>([]);
  const [myOffers, setMyOffers] = useState<OfferData[]>([]);
  const [myB2bOffers, setMyB2bOffers] = useState<IB2bOfferHistory[]>([]);

  const [bankList, setBankList] = useState<BankProps[]>([])
  const [fiatList, setFiatList] = useState<FiatProps[]>([
    { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />RUB</div>, value: 1 }
  ])
  const [tokenList, setTokenList] = useState<TokenProps[]>([
    { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />USDT</div>, value: 1 },
    { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />BTC</div>, value: 2 },
    { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />ETH</div>, value: 3 },
  ])

  const getActiveHistory = async (user_id: number) => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetActiveOffers(token, user_id);
    if (data.status === 200) {
      setActiveOrders(data.data)
    }
  }
  const getActiveB2bHistory = async (user_id: number) => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetActiveB2bOffers(token, user_id);
    if (data.status === 200) {
      setActiveOrders(data.data)
    }
  }
  const getLastHistory = async (user_id: number) => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetLastOffers(token, user_id);
    if (data.status === 200) {
      setHistory(data.data)
    }
  }
  const getLastB2bHistory = async (user_id: number) => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetLastB2bOffers(token, user_id);
    if (data.status === 200) {
      setHistory(data.data)
    }
  }

  const getMyOffers = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetMyOffers(token, profile.id);
    if (data.status === 200) {
      setMyOffers(data.data)
    }
  }
  const getMyB2bOffers = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetMyB2bOffers(token, profile.id);
    if (data.status === 200) {
      setMyB2bOffers(data.data)
    }
  }

  const getBanks = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetPayments(token);
    if (data.status === 200 && data.data.length) {
      const temp: BankProps[] = [];
      data.data.forEach((el: Payments) => {
        temp.push({ label: el.name, value: el.id.toString() })
      });
      setBankList(temp)
    }
  }

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
    getBanks()
    getCurr(token)
    getKrypto(token)
  }, [])

  useEffect(() => {
    if (title === 'p2p') {
      type === 2 ? getMyOffers() : type === 0 ? getActiveHistory(profile.id) : getLastHistory(profile.id)
    } else {
      type === 2 ? getMyB2bOffers() : type === 0 ? getActiveB2bHistory(profile.id) : getLastB2bHistory(profile.id)
    }

  }, [profile, title, type])

  return (
    <div className={styles.main}>
      <div className={styles.filter}>
        <p className={styles.filterItem}>ID</p>
        <p className={styles.filterItem}>Тип</p>
        <p className={styles.filterItem}>Сумма</p>
        <p className={styles.filterItem}>Дата</p>
        <p className={styles.filterItem}>Контрагент</p>
        <p className={styles.filterItem}>Статус</p>
        <p className={styles.filterItem} style={{ textAlign: 'center' }}>Операции</p>
      </div>
      <div className={styles.wrap}>
        {
          type === 1 ?
            history.length ?
              history.reverse().map((el, index) => {
                return <div key={index}><HistoryTableItem statusList={statusList} profile={profile} offer={el} title={title} /></div>
              })
              : <div className={styles.filterItem}>Нет сделок</div>
            : type === 0 ?
              activeOrders.length ?
                activeOrders.reverse().map((el, index) => {
                  return <div key={index}><HistoryTableItem statusList={statusList} profile={profile} offer={el} title={title} /></div>
                })
                : <div className={styles.filterItem}>Нет активных сделок</div>
              : type === 2 ?
                myOffers.length ?
                  myOffers.reverse().map((el, index) => {
                    return <div key={index}><HistoryTableItem statusList={statusList} bankList={bankList} tokenList={tokenList} fiatList={fiatList} profile={profile} myOffer={el} title={title} /></div>
                  })
                  : myB2bOffers.length ?
                    myB2bOffers.reverse().map((el, index) => {
                      return <div key={index}><HistoryTableItem statusList={statusList} tokenList={tokenList} fiatList={fiatList} profile={profile} myB2bOffer={el} title={title} /></div>
                    })
                    : <div className={styles.filterItem}>Нет сделок</div>
                : <></>
        }
      </div>
    </div>
  )
}

export default HistoryTable