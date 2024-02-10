import React, { useEffect, useState } from 'react'
import styles from './Wallet.module.scss'
import BalanceBlock from '../balanceBlock/BalanceBlock'
import DetailBalanceBlock from '../detailBalanceBlock/DetailBalanceBlock'
import { BalanceInfo } from '../../../services/UserService'
import { WalletBalance } from '../../../types/types'
import Container from '../../../UI/container/Container'
import Skeleton from 'react-loading-skeleton'

export interface Chart {
  symbol: string,
  icon: string,
  balance: number,
  blocked: number | null,
}

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [p2pChartList, setP2pChartList] = useState<Chart[]>([])
  // const [b2bChartList, setB2bChartList] = useState<Chart[]>([])
  const [totalBalance, setTotalBalance] = useState<number>(0)
  const [totalBlocked, setTotalBlocked] = useState<number>(0)
  // const [b2bBalance, setB2bBalance] = useState<number>(0)

  const getBalance = async (token: string) => {
    const data = await BalanceInfo(token);
    if (data.status === 200) {
      let row: WalletBalance[] = data.data;
      let tempTotal = row.map((el) => +el.balance * +el.price);
      let total = tempTotal.reduce((prev, cur) => +prev + +cur, 0);
      total = parseFloat(total.toString()).toString().split(".")[1] ?
        +parseFloat(total.toString()).toFixed(8) :
        +parseFloat(total.toString())
      let tempBlocked = row.map((el) => el?.blocked ? +el.blocked : 0);
      let totalBlocked = tempBlocked.reduce((prev, cur) => +prev + +cur, 0);
      totalBlocked = parseFloat(totalBlocked.toString()).toString().split(".")[1] ?
        +parseFloat(totalBlocked.toString()).toFixed(8) :
        +parseFloat(totalBlocked.toString())
      setTotalBlocked(totalBlocked);
      let tempP2pChartList: Chart[] = row.map((el) => { return { symbol: el.symbol, icon: el.icon, balance: el.balance, blocked: el.blocked } });
      setP2pChartList(tempP2pChartList);
      setTotalBalance(total);
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("access_token") ?? '';
    getBalance(token)
  }, [])


  return (
    <div className={styles.main}>
      {loading ?
        <div style={{ display: 'block', width: '100%' }}>
          <Container className={styles.skeletonContainer}>
            <div className={styles.skeletonBlock1}>
              <div style={{ marginBottom: '10px' }} className={styles.skelet1} >
                <Skeleton height={250} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
              </div>
              <div className={styles.skelet2}>
                <Skeleton height={250} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
              </div>
            </div>
            {/* <div className={styles.skeletonBlock2}>
              <div style={{ marginBottom: '10px' }} className={styles.skelet1} >
                <Skeleton height={250} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
              </div>
              <div className={styles.skelet2}>
                <Skeleton height={250} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
              </div>
            </div> */}
          </Container>
        </div>
        :
        <>
          <div className={styles.top}>
            <BalanceBlock balance={totalBalance} blocked={totalBlocked} title={'total'} />
            <DetailBalanceBlock chartList={p2pChartList} />
          </div>
          {/* <div className={styles.bottom}>
            <BalanceBlock balance={b2bBalance} title={'b2b'} />
            <DetailBalanceBlock chartList={b2bChartList} />
          </div> */}
        </>
      }
    </div>
  )
}

export default Wallet