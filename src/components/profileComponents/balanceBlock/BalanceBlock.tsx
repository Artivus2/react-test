import React, { useEffect, useState } from "react";
import styles from "./BalanceBlock.module.scss";
// import arrow from "../../../../assets/profile/icons/out.svg";
// import add from "../../../../assets/profile/icons/add.svg";
// import exchange from "../../../../assets/profile/icons/exchange.svg";
import arrow from "../../../assets/icons/profile/balance/1.svg";
import arrow2 from "../../../assets/icons/profile/balance/2.svg";
import add from "../../../assets/icons/profile/balance/3.svg";
import exchange from "../../../assets/icons/profile/balance/4.svg";
import { Link, useLocation } from "react-router-dom";
import PayIn from "../modals/payIn/PayIn";
import PayOut from "../modals/payOut/PayOut";
import { BankProps, TokenProps } from "../../filters/Filters";
import { GetCharts } from "../../../services/P2p";
import MoveIn from "../modals/MoveIn/MoveIn";
import MoveOut from "../modals/MoveOut/MoveOut";
import { GetPayments } from "../../../services/UserService";

interface BalanceBlockProps {
  balance: number;
  blocked: number;
  title: 'total' | 'b2b';
}

const BalanceBlock = ({ balance, blocked, title }: BalanceBlockProps) => {
  const location = useLocation();
  const [isOpenMoveInModal, setIsOpenMoveInModal] = useState(false);
  const [isOpenMoveOutModal, setIsOpenMoveOutModal] = useState(false);
  const [isOpenPayInModal, setIsOpenPayInModal] = useState(false);
  const [isOpenPayOutModal, setIsOpenPayOutModal] = useState(false);

  const [bankList, setBankList] = useState<BankProps[]>([])
  const [selectedBankOption, setSelectedBankOption] = useState<any>({ label: 'SberBank', value: '32' });
  const [tokenList, setTokenList] = useState<TokenProps[]>([])
  const [selectedTokenOption, setSelectedTokenOption] = useState<any>({ label: <div className={styles.fiatBox}>USDT</div>, value: 259 });

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

  const getBank = async (token: string, fiatID: number) => {
    const data = await GetPayments(token, fiatID);
    if (data.status === 200) {
      const temp: BankProps[] = [];
      data.data.forEach((el: any) => {
        temp.push({ label: el.name, value: el.payment_id.toString() })
      });
      setBankList(temp)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getBank(token, 1)
    getKrypto(token)
  }, [balance])


  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.topBlock}>
          <div className={styles.balanceInfo}>
            <p className={styles.generalText}>{title === 'total' ? 'Общий баланс' : <>Баланс <span>B2B</span></>}</p>
          </div>
          <div className={styles.precentInfo}></div>
        </div>
        <div className={styles.mainBalance}>
          <p className={styles.balanceText}>≈ {balance}</p>
          <p className={styles.currency}>USDT</p>
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.available}>Доступно: {balance}</p>
          <p className={styles.frozen}>Заморожено: {blocked}</p>
        </div>
        <div className={styles.btnsBlock}>
          <div className={styles.btnBlock} onClick={() => setIsOpenPayInModal(true)}>
            <img src={arrow} alt="" className={`${styles.img}`} />
            <p className={styles.btnText}>Ввод</p>
          </div>
          <div className={styles.btnBlock} onClick={() => setIsOpenPayOutModal(true)}>
            <img src={arrow2} alt="" className={`${styles.img}`} />
            <p className={styles.btnText}>Вывод</p>
          </div>
          <div className={styles.btnBlock} onClick={() => setIsOpenPayInModal(true)}>
            <img
              src={add}
              alt=""
              className={`${styles.buyImg} ${styles.img}`}
            />
            <p className={styles.btnText}>Купить</p>
          </div>
          <div className={styles.btnBlock} onClick={() => setIsOpenPayOutModal(true)}>
            <img
              src={exchange}
              alt=""
              className={`${styles.sellImg} ${styles.img}`}
            />
            <p className={styles.btnText}>Продать</p>
          </div>
        </div>
      </div>
      <Link className={styles.navLink} to={'/profile/wallet'} style={location.pathname === '/profile/wallet' ? { display: 'none' } : { display: 'block' }}>
        <button className={styles.bottomBtn}>Перейти в кошелёк</button>
      </Link>
      <MoveIn
        // tokenList={tokenList}
        // selectedTokenOption={selectedTokenOption}
        // setSelectedTokenOption={setSelectedTokenOption}
        isOpenModal={isOpenMoveInModal}
        setIsOpenModal={setIsOpenMoveInModal}
      />
      <MoveOut
        // bankList={bankList}
        // selectedBankOption={selectedBankOption}
        // setSelectedBankOption={setSelectedBankOption}
        // tokenList={tokenList}
        // selectedTokenOption={selectedTokenOption}
        // setSelectedTokenOption={setSelectedTokenOption}
        isOpenModal={isOpenMoveOutModal}
        setIsOpenModal={setIsOpenMoveOutModal}
      // balance={balance}
      />
      <PayIn
        tokenList={tokenList}
        selectedTokenOption={selectedTokenOption}
        setSelectedTokenOption={setSelectedTokenOption}
        isOpenModal={isOpenPayInModal}
        setIsOpenModal={setIsOpenPayInModal}
      />
      <PayOut
        bankList={bankList}
        selectedBankOption={selectedBankOption}
        setSelectedBankOption={setSelectedBankOption}
        tokenList={tokenList}
        selectedTokenOption={selectedTokenOption}
        setSelectedTokenOption={setSelectedTokenOption}
        isOpenModal={isOpenPayOutModal}
        setIsOpenModal={setIsOpenPayOutModal}
        balance={balance}
      />
    </div>
  );
};

export default BalanceBlock;
