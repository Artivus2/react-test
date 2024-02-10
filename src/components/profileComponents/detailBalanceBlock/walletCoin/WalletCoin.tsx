import React, { useState } from 'react'
import styles from './WalletCoin.module.scss'
import { ReactComponent as RollUp } from "../../../../assets/icons/profile/balance/Button.svg";
import { Chart } from '../../wallet/Wallet';

export interface WalletCoinPropsType {
  coin: Chart;
  setIsOpenPayInModal: (param: boolean) => void;
  setIsOpenPayOutModal: (param: boolean) => void;
}

const WalletCoin = ({
  coin,
  setIsOpenPayInModal,
  setIsOpenPayOutModal,
}: WalletCoinPropsType) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div className={styles.blockItem}>
        <div
          onClick={() => setIsVisible((prev) => !prev)}
          className={styles.blockItemTop}
        >
          <div className={styles.item}>
            <h4 className={styles.saleTitle}>{coin.symbol === 'RUB' ? 'RUB (только B2B)' : coin.symbol}</h4>
            <div className={styles.saleId}>{coin.balance}</div>
          </div>
          <div className={styles.blockItemTopCenter}>
          </div>
          <div>
            <RollUp className={`${isVisible && styles.blockItemBtn}`} />
          </div>
        </div>
        <div
          className={`${styles.blockItemBody} ${isVisible && styles.blockItemBodyVisible
            }`}
        >
          <div className={styles.blockItemBodyRow}>
            <span className={styles.blockItemBodyRowLeft}>Валюта</span>
            <span className={styles.blockItemBodyRowRight}>{coin.symbol === 'RUB' ? 'RUB (только B2B)' : coin.symbol}</span>
          </div>
          <div className={styles.blockItemBodyRow}>
            <span className={styles.blockItemBodyRowLeft}>Сумма</span>
            <span className={styles.blockItemBodyRowRight}>{coin.balance}</span>
          </div>
          <div className={styles.blockItemBodyRow}>
            <span className={styles.blockItemBodyRowLeft}>Доступно</span>
            <span className={styles.blockItemBodyRowRight}>{coin.balance}</span>
          </div>
          <div className={styles.blockItemBodyRow}>
            <span className={styles.blockItemBodyRowLeft}>Заморожено</span>
            <span className={styles.blockItemBodyRowRight}>{coin.blocked}</span>
          </div>
        </div>
      </div>

      <div className={styles.itemBlock}>
        <div className={styles.item}>
          <img src={coin.icon} alt="coin" className={styles.coinIcon} />
          {coin.symbol === 'RUB' ? 'RUB (только B2B)' : coin.symbol}
        </div>
        <p className={styles.item}>{parseFloat(coin.balance.toString())}</p>
        <p className={styles.item}>{parseFloat(coin.balance.toString())}</p>
        <p className={styles.item}>{0}</p>
      </div>
    </>
  )
}

export default WalletCoin