import React, { useEffect, useState } from "react";
import styles from "./FirstStep.module.scss";
import arrow from "../../../assets/icons/arrow-right.svg";
import Select from "react-select";
import { FiatProps, TokenProps } from "../../filters/Filters";
import { GetRate } from "../../../services/P2p";

interface FirstStepContentModalProps {
  price: string;
  setPrice: (price: string) => void;
  selectedFiatOption: any;
  setSelectedFiatOption: (param: any) => void;
  selectedTokenOption: any;
  setSelectedTokenOption: (param: any) => void;
  tokenList: TokenProps[];
  fiatList: FiatProps[];
  rate: number;
  setRate: (param: number) => void;
}

const FirstStepContentModal = ({
  price,
  setPrice,
  selectedFiatOption,
  setSelectedFiatOption,
  selectedTokenOption,
  setSelectedTokenOption,
  tokenList,
  fiatList,
  rate,
  setRate,
}: FirstStepContentModalProps) => {
  const [type, setType] = useState("fix");
  const [percents, setPercents] = useState('100');


  const getRates = async (token: string, currency_id: number, chart_id: number) => {
    const data = await GetRate(token, currency_id, chart_id);
    if (data.status === 200) {
      setRate(+data.data.price)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getRates(token, +selectedFiatOption.value, +selectedTokenOption.value)
  }, [selectedFiatOption, selectedTokenOption, setSelectedFiatOption, setSelectedTokenOption])

  useEffect(() => {
    if (type !== 'fix') {
      setPrice((+rate / 100 * +percents).toFixed(2))
    } else {
      setPrice((+rate).toFixed(2))
    }
  }, [type])

  useEffect(() => {
    if (type !== 'fix') {
      setPrice((+rate / 100 * +percents).toFixed(2))
    }
  }, [percents])

  const checkVal = (e: any) => {
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (pattern.test(e.target.value)) {
      if (type === 'fix') {
        if (e.target.value.trim().length > 9) {
          setPrice(e.target.value.trim().slice(0, 9));
        } else if (e.target.value.trim() === '') {
          setPrice('');
        } else {
          setPrice(e.target.value.trim());
        }
      } else {
        if (e.target.value.trim().length > 3) {
          setPercents(e.target.value.slice(0, 3))
          e.target.value = e.target.value.trim().slice(0, 3);
        } else if (+e.target.value.trim() > 100) {
          setPercents('100')
          e.target.value = 100;
        } else if (e.target.value.trim() === '') {
          setPercents('');
        } else {
          setPercents(e.target.value.trim())
        }
      }
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <p className={styles.title}>Актив</p>
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
            classNamePrefix="react-select"
            defaultValue={selectedTokenOption}
            onChange={(e) => setSelectedTokenOption(e)}
            placeholder={"USDT"}
          />
        </div>
        <img src={arrow} alt="" className={styles.arr} />
        <div className={styles.input}>
          <p className={styles.title}>За фиат</p>
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
            classNamePrefix="react-select"
            defaultValue={selectedFiatOption}
            onChange={(e) => setSelectedFiatOption(e)}
            placeholder={"RUB"}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentBlock}>
          <div className={styles.prices}>
            <div className={styles.yourPrice}>
              <p className={styles.title}>Ваша цена</p>
              <div className={styles.price}>
                {type === "fix"
                  ? +price === 0
                    ? `00.00`
                    : String((+price).toFixed(2)).length <= 4
                      ? `0${(+price).toFixed(2)}`
                      : (+price).toFixed(2)
                  : ((+rate / 100) * +percents).toFixed(2)}{" "}
                {selectedFiatOption.label}
              </div>
            </div>
            <div className={styles.actual}>
              <p className={styles.title}>Актуальный курс</p>
              <div className={styles.price}>{rate} {selectedFiatOption.label}</div>
            </div>
          </div>
          <div className={styles.type}>
            <div
              className={styles.typeContent}
              onClick={() => setType("notFix")}
            >
              <div className={styles.mainCircle}>
                {type === "notFix" && <div className={styles.circle} />}
              </div>
              <p>Плавающая</p>
            </div>
            <div className={styles.typeContent} onClick={() => setType("fix")}>
              <div className={styles.mainCircle}>
                {type === "fix" && <div className={styles.circle} />}
              </div>
              <p>Фиксированная</p>
            </div>
          </div>
        </div>
        {type === "fix" ? (
          <div className={styles.summ}>
            <p>Фиксированная цена</p>
            <div className={styles.counter}>
              <button onClick={() => setPrice((+price + 1).toString())}>+</button>
              <input
                type="text"
                placeholder={`Введите сумму`}
                value={price}
                onChange={(e) => checkVal(e)}
              />
              <button onClick={() => setPrice((+price === 0 ? 0 : +price - 1).toString())}>-</button>
            </div>
          </div>
        ) : (
          <div className={styles.summ}>
            <p>Коэффициент маржи для плавающей цены</p>
            <div className={styles.counter}>
              <button onClick={() => setPercents((+percents === 100 ? +percents : +percents + 1).toString())}>+</button>
              <input
                type="text"
                placeholder={`Введите процент`}
                value={percents}
                onChange={(e) => checkVal(e)}
              />
              <button onClick={() => setPercents((+percents === 0 ? 0 : +percents - 1).toString())}>-</button>
            </div>
            <div className={styles.hint}>{`${rate} * ${percents}% ≈ ${(+rate / 100 * +percents).toFixed(2)}`} {selectedFiatOption.label}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FirstStepContentModal;
