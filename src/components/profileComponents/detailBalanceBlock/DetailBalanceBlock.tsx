import React, { useState } from 'react'
import styles from './DetailBalanceBlock.module.scss'
import arrow from "../../../assets/icons/profile/balance/1_iconoir_database-export.svg";
import arrow2 from "../../../assets/icons/profile/balance/2_iconoir_database-export.svg";
import add from "../../../assets/icons/profile/balance/3_iconoir_database-export.svg";
import exchange from "../../../assets/icons/profile/balance/4_iconoir_database-export.svg";
import { Link } from 'react-router-dom';
import PayIn from '../modals/payIn/PayIn';
import PayOut from '../modals/payOut/PayOut';
import WalletCoin from './walletCoin/WalletCoin';
import { Chart } from '../wallet/Wallet';

export interface CoinType {
  name: string;
  sum: number;
  yes: number;
  no: number;
}

interface DetailBalanceBlockPropsType {
  chartList: Chart[];
}

const DetailBalanceBlock = ({
  chartList
}: DetailBalanceBlockPropsType) => {

  const [isOpenPayInModal, setIsOpenPayInModal] = useState(false);
  const [isOpenPayOutModal, setIsOpenPayOutModal] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.mainHis}>
        <div className={styles.filter}>
          <p className={styles.filterItem}>Валюта</p>
          <p className={styles.filterItem}>Сумма</p>
          <p className={styles.filterItem}>Доступно</p>
          <p className={styles.filterItem}>Заморожено</p>
          {/* <p className={styles.filterItem}>Действия</p> */}
        </div>
        <div>
          {
            chartList.length ?
              chartList.map((el, index) => {
                return <div key={index}><WalletCoin coin={el} setIsOpenPayInModal={setIsOpenPayInModal} setIsOpenPayOutModal={setIsOpenPayOutModal} /></div>
              })
              :
              <div className={styles.noBlock}>Нет активных средств</div>
          }
        </div>
      </div>
    </div>
  )
}

export default DetailBalanceBlock