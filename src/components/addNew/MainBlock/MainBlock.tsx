import React, { useEffect, useState } from "react";
import styles from "./MainBlock.module.scss";
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import { ReactComponent as Arr } from "../../../assets/icons/arrow-right.svg";
import AddNewModalSwitch from "../Switch/Switch";
import AddNewSteps from "../Steps/Steps";
import FirstStep from "../FirstStep/FirstStep";
import SecondStep from "../SecondStep/SecondStep";
import ThirdStep from "../ThirdStepContent/ThirdStep";
import { BankProps, FiatProps, TokenProps } from "../../filters/Filters";
import rub from '../../../assets/icons/money/RUB.svg'
import usdt from '../../../assets/icons/tokens/usdt.svg'
import { CreateBuyAdd, CreateSellAdd } from "../../../services/P2p";
import { BalanceInfo, GetPayments } from "../../../services/UserService";
import { Payments, WalletBalance } from "../../../types/types";
import { Chart } from "../../profileComponents/wallet/Wallet";
import { IOkved } from "../../../types/B2b.types";
import { createB2bBuyOffer, createB2bSellOffer } from "../../../services/B2bService";

interface AddNewModalProps {
  addNewOpen: boolean;
  setAddNewOpen: (addNewOpen: boolean) => void;
  tokenList: TokenProps[];
  fiatList: FiatProps[];
  okveds?: Record<string, IOkved>;
}

const AddNewModal = ({
  addNewOpen,
  setAddNewOpen,
  tokenList,
  fiatList,
  okveds,
}: AddNewModalProps) => {
  const [type, setType] = useState(1);
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState('100');
  const [limit, setLimit] = useState('')
  const [limitStart, setLimitStart] = useState('500')
  const [limitEnd, setLimitEnd] = useState('1000000')
  const [bankList, setBankList] = useState<BankProps[]>([])
  const [condition, setCondition] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [okFirst, setOkFirst] = useState(false)
  const [okSecond, setOkSecond] = useState(false)
  const [okThird, setOkThird] = useState(false)
  const [rate, setRate] = useState(0);
  const [isError, setIsError] = useState(false)
  const [duration, setDuration] = useState(15);

  const [selectedFiatOption, setSelectedFiatOption] = useState<any>({ label: <div className={styles.fiatBox}><img src={rub} alt="" className={styles.fiat} />RUB</div>, value: '1' });
  const [selectedTokenOption, setSelectedTokenOption] = useState<any>({ label: <div className={styles.fiatBox}><img src={usdt} alt="" className={styles.fiat} />USDT</div>, value: '259' });
  const [selectedBankOption, setSelectedBankOption] = useState<any>([]);
  const [selectedOkvedOption, setSelectedOkvedOption] = useState<any>({ label: '', value: '' });

  const create = async (type: number) => {
    const token = localStorage.getItem("access_token") ?? '';
    const currentBanks = selectedBankOption.map((el: any) => +el.value)
    if (!okveds) {
      if (type === 1) {
        const data = await CreateBuyAdd(
          token,
          +selectedTokenOption.value,
          +selectedFiatOption.value,
          +limit,
          +price,
          +limitStart,
          +limitEnd,
          currentBanks,
          duration,
          condition
        );
        if (!data.data.success) {
          setErrorMessage(data.data.message)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } else {
          document.location.href = '/p2p'
        }
      } else {
        const data = await CreateSellAdd(
          token,
          +selectedTokenOption.value,
          +selectedFiatOption.value,
          +limit,
          +price,
          +limitStart,
          +limitEnd,
          currentBanks,
          duration,
          condition
        );
        if (!data.status) {
          setErrorMessage(`Что-то пошло не так`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } if (!data.data.success) {
          setErrorMessage(data.data.message)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } else {
          document.location.href = '/p2p'
        }
      }
    } else {
      if (type === 1) {
        const data = await createB2bBuyOffer(
          token,
          +selectedTokenOption.value,
          +selectedFiatOption.value,
          +limit,
          +price,
          +limitStart,
          +limitEnd,
          +selectedOkvedOption.id,
          condition
        );
        if (!data.status) {
          setErrorMessage(`Что-то пошло не так`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } if (!data.data.success) {
          setErrorMessage(data.data.message)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } else {
          document.location.reload()
        }
      } else {
        const data = await createB2bSellOffer(
          token,
          +selectedTokenOption.value,
          +selectedFiatOption.value,
          +limit,
          +price,
          +limitStart,
          +limitEnd,
          +selectedOkvedOption.id,
          condition
        );
        if (!data.status) {
          setErrorMessage(`Что-то пошло не так`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } if (!data.data.success) {
          setErrorMessage(data.data.message)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        } else {
          document.location.reload()
        }
      }
    }
  }

  const error = <div className={styles.error}>
    {errorMessage}
  </div>


  const checkForm = () => {
    if (step === 1) {
      if (okFirst) {
        setStep((prev) => prev + 1)
      }
    } else if (step === 2) {
      if (!+limit || !+limitStart || !+limitEnd || +limitStart >= +limitEnd || isError) {
        setErrorMessage(`Проверьте введённые данные`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      } else {
        if (okSecond) {
          setStep((prev) => prev + 1)
        }
      }
    } else {
      if (okThird) {
        create(type)
      }
    }
  }

  const getBanks = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetPayments(token);
    if (data.status === 200 && data.data.length) {
      const temp: BankProps[] = [];
      data.data.forEach((el: Payments) => {
        //@ts-ignore
        temp.push({ label: el.name, value: el.payment_id.toString() })
      });
      if (!temp.length) {
        setErrorMessage('Настройте способы оплаты в профиле')
      } else {
        setBankList(temp)
      }
    }
  }

  const [p2pChartList, setP2pChartList] = useState<Chart[]>([])

  const getBalance = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await BalanceInfo(token);
    if (data.status === 200) {
      let row: WalletBalance[] = data.data;
      let tempP2pChartList: Chart[] = row.map((el) => { return { symbol: el.symbol, icon: el.icon, balance: el.balance, blocked: el.blocked } });
      setP2pChartList(tempP2pChartList);
    }
  }

  useEffect(() => {
    getBanks()
    getBalance();
  }, [])

  useEffect(() => {
    if (condition.trim()) {
      setOkThird(true)
    } else {
      setOkThird(false)
    }
  }, [condition])

  useEffect(() => {
    if (price.trim()) {
      setOkFirst(true)
    } else {
      setOkFirst(false)
    }
  }, [price])

  useEffect(() => {
    if (!okveds) {
      if (limit.trim() && limitStart.trim() && limitEnd.trim() && selectedBankOption.length !== 0) {
        setOkSecond(true)
      } else {
        setOkSecond(false)
      }
    } else {
      if (limit.trim() && limitStart.trim() && limitEnd.trim() && +selectedOkvedOption.id) {
        setOkSecond(true)
      } else {
        setOkSecond(false)
      }
    }
  }, [limit, limitStart, limitEnd, selectedBankOption, okveds, selectedOkvedOption.id])

  const back = () => {
    setStep(step > 1 ? step - 1 : step);
    setOkFirst(false);
    setOkSecond(false)
    setOkThird(false)
  }

  return (
    <>
      <div
        className={`${styles.bg} ${addNewOpen && styles.active}`}
        onClick={() => setAddNewOpen(false)}
      />
      <div className={`${styles.main} ${addNewOpen && styles.active}`}>
        <div className={styles.topBlock}>
          <Arr className={styles.arr} style={step === 1 ? { display: 'none' } : { display: 'block' }} onClick={back} />
          <p className={styles.title}>Новое объявление</p>
          <Cross className={styles.cross} onClick={() => setAddNewOpen(false)} />
        </div>
        <AddNewModalSwitch type={type} setType={setType} />
        <AddNewSteps step={step} />
        {step === 1 ? (
          <FirstStep
            tokenList={tokenList}
            fiatList={fiatList}
            selectedFiatOption={selectedFiatOption}
            setSelectedFiatOption={setSelectedFiatOption}
            selectedTokenOption={selectedTokenOption}
            setSelectedTokenOption={setSelectedTokenOption}
            price={price}
            setPrice={setPrice}
            rate={rate}
            setRate={setRate}
          />
        ) : step === 2 ? (
          <SecondStep
            duration={duration}
            setDuration={setDuration}
            selectedOkvedOption={selectedOkvedOption}
            setSelectedOkvedOption={setSelectedOkvedOption}
            okveds={okveds}
            setIsError={setIsError}
            balanceChartList={p2pChartList}
            bankList={bankList}
            type={type}
            selectedFiatOption={selectedFiatOption}
            selectedTokenoption={selectedTokenOption}
            selectedBankOption={selectedBankOption}
            setSelectedBankOption={setSelectedBankOption}
            limit={limit}
            setLimit={setLimit}
            limitEnd={limitEnd}
            setLimitEnd={setLimitEnd}
            limitStart={limitStart}
            setLimitStart={setLimitStart}
            rate={rate}
          />
        ) : (
          <ThirdStep setCondition={setCondition} />
        )}
        {errorMessage ? error : <></>}
        <div
          className={
            step === 1 ?
              !okFirst ?
                styles.btnDis :
                styles.btnOk :
              step === 2 ?
                !okSecond || isError ?
                  styles.btnDis :
                  styles.btnOk :
                step === 3 ?
                  !okThird ?
                    styles.btnDis :
                    styles.btnOk :
                  styles.btnOk
          }
          onClick={() => {
            step <= 3 ? checkForm() : setAddNewOpen(false);
          }}
        >
          <p>Далее</p>
        </div>
      </div>
    </>
  );
};
export default AddNewModal;
