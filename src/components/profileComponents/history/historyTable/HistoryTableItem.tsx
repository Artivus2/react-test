import React, { useState } from 'react'
import styles from './HistoryTableItem.module.scss'
import { ReactComponent as RollUp } from "../../../../assets/icons/profile/balance/Button.svg";
import { IStatusList, OfferData, OrderHistory, UserProfile } from '../../../../types/types';
import { NavLink } from 'react-router-dom';
import { IB2bOfferHistory } from '../../../../types/B2b.types';
import cross from '../../../../assets/icons/cross.svg'
import Select from 'react-select'
import { BankProps, FiatProps, TokenProps } from '../../../filters/Filters';
import { CancelB2bOrder, CancelP2pOrder, ChangeB2bOffer, ChangeP2pOffer, DeleteB2bOffer, DeleteP2pOffer } from '../../../../services/UserService';


interface HistoryTableProps {
  offer?: OrderHistory;
  myOffer?: OfferData;
  myB2bOffer?: IB2bOfferHistory;
  bankList?: BankProps[];
  tokenList?: TokenProps[];
  fiatList?: FiatProps[];
  profile: UserProfile;
  title: 'p2p' | 'b2b';
  statusList: IStatusList[];
}

const HistoryTable = ({
  offer,
  profile,
  title,
  myOffer,
  myB2bOffer,
  bankList,
  tokenList,
  fiatList,
  statusList
}: HistoryTableProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [amount, setAmount] = useState(myOffer ? myOffer.amount.toString() : myB2bOffer ? myB2bOffer.amount.toString() : '0')
  const [minLimit, setMinLimit] = useState(myOffer ? myOffer.min_limit.toString() : myB2bOffer ? myB2bOffer.min_limit.toString() : '0')
  const [maxLimit, setMaxLimit] = useState(myOffer ? myOffer.max_limit.toString() : myB2bOffer ? myB2bOffer.max_limit.toString() : '0')
  const [course, setCourse] = useState(myOffer ? myOffer.course.toString() : myB2bOffer ? myB2bOffer.course.toString() : '0')

  const myPayments = myOffer ? myOffer.payments.map(el => { return { label: el.name, value: el.id } }) : []

  const [selectedBankOption, setSelectedBankOption] = useState<any>(myOffer ? myPayments : []);
  const [selectedFiatOption, setSelectedFiatOption] = useState<any>({ label: 'Все', value: undefined });
  const [selectedTokenOption, setSelectedTokenOption] = useState<any>({ label: 'Все', value: undefined });

  const saveP2pOffer = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const currentBanks = selectedBankOption.map((el: any) => +el.value)
    if (!myOffer) return;
    const data = await ChangeP2pOffer(
      token,
      myOffer.order_id,
      +amount !== +myOffer.amount ? +amount : undefined,
      +selectedFiatOption.value,
      +selectedTokenOption.value,
      +course !== +myOffer.course ? +course : undefined,
      +minLimit !== +myOffer.min_limit ? +minLimit : undefined,
      +maxLimit !== +myOffer.max_limit ? +maxLimit : undefined,
      currentBanks
    );
    if (data.status === 200) {
      document.location.reload()
    }
  }

  const deleteP2pOffer = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (!myOffer) return;
    const data = await DeleteP2pOffer(token, myOffer.order_id)
    if (data.status) {
      document.location.reload()
    } else {
      const dataC = await CancelP2pOrder(token, myOffer.order_id).then(res => {
        const data = DeleteP2pOffer(token, myOffer.order_id).then(res => {
          if (res.status) {
            document.location.reload()
          }
        })
      })
    }
  }
  const saveB2bOffer = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (!myB2bOffer) return;
    const data = await ChangeB2bOffer(
      token,
      myB2bOffer.order_id,
      +amount !== +myB2bOffer.amount ? +amount : undefined,
      +selectedFiatOption.value,
      +selectedTokenOption.value,
      +course !== +myB2bOffer.course ? +course : undefined,
      +minLimit !== +myB2bOffer.min_limit ? +minLimit : undefined,
      +maxLimit !== +myB2bOffer.max_limit ? +maxLimit : undefined,
    );
    if (data.status === 200) {
      document.location.reload()
    }
  }


  const deleteB2bOffer = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    if (!myB2bOffer) return;
    const data = await DeleteB2bOffer(token, myB2bOffer.order_id)
    if (data.status) {
      document.location.reload()
    } else {
      const dataC = await CancelB2bOrder(token, myB2bOffer.order_id).then(res => {
        const data = DeleteB2bOffer(token, myB2bOffer.order_id).then(res => {
          if (res.status) {
            document.location.reload()
          }
        })
      })
    }
  }

  const checkValueTotal = (e: any, func: any) => {
    let prev = ''
    const pattern = new RegExp("^(\\d*)\\.{0,1}(\\d*)$")
    if (myOffer?.type === 1 || myB2bOffer?.type === 1) {
      if (pattern.test(e.target.value.trim())) {
        if (e.target.value.trim().length > 15) {
          func(e.target.value.trim().slice(0, 15));
          prev = e.target.value.trim().slice(0, 15);
        } else {
          func(e.target.value.trim());
          prev = e.target.value.trim();
        }
      } else if (e.target.value.trim() === '') {
        func('');
        prev = '';
      } else {
        e.target.value = prev;
      }
    } else {
      if (pattern.test(e.target.value.trim())) {
        if (e.target.value.trim().length > 15) {
          func(e.target.value.trim().slice(0, 15));
          prev = e.target.value.trim().slice(0, 15);
        } else if (e.target.placeholder !== 'Максимум') {
          // if (+e.target.value.trim() > currentBalance) {
          //   func(parseFloat(currentBalance.toString()).toString());
          //   prev = parseFloat(currentBalance.toString()).toString();
          //   setLimitEnd((parseFloat(currentBalance.toString()) * +rate).toString())
          //   setErrorMessage('Вводимое значение превышает баланс')
          // } else if (+e.target.value.trim() * +rate > +limitEnd) {
          //   func(e.target.value.trim());
          //   prev = e.target.value.trim();
          //   let temp =
          //     parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
          //       parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
          //       parseFloat((+e.target.value.trim() * +rate).toString())
          //   setLimitEnd((+temp).toString())
          // } else {
          //   func(e.target.value.trim());
          //   prev = e.target.value.trim();
          //   let temp =
          //     parseFloat((+e.target.value.trim() * +rate).toString()).toString().split(".")[1] ?
          //       parseFloat((+e.target.value.trim() * +rate).toString()).toFixed(8) :
          //       parseFloat((+e.target.value.trim() * +rate).toString())
          //   setLimitEnd((+temp).toString())
          // }
        } else {
          func(e.target.value.trim());
          prev = e.target.value.trim();
        }
      } else if (e.target.value.trim() === '') {
        func('');
        prev = '';
      } else {
        e.target.value = prev;
      }
    }
  }

  const bg = <div className={styles.twoFaMain} onClick={() => { setShowEdit(false) }}></div>
  const edit = myOffer ?
    <div className={styles.twoFaRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Редактирование объявления</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowEdit(false)}
        />
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Сумма</h1>
          <input
            placeholder="Введите сумму"
            className={styles.input}
            value={amount}
            onChange={(e) => checkValueTotal(e, setAmount)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Минимальный лимит</h1>
          <input
            placeholder="Введите минимум"
            className={styles.input}
            value={minLimit}
            onChange={(e) => checkValueTotal(e, setMinLimit)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Максимальный лимит</h1>
          <input
            placeholder="Введите максимум"
            className={styles.input}
            value={maxLimit}
            onChange={(e) => checkValueTotal(e, setMaxLimit)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Валюта</h1>
          <div>
            <Select
              options={fiatList}
              onChange={setSelectedFiatOption}
              closeMenuOnSelect={false}
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
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Криптовалюта</h1>
          <div>
            <Select
              options={tokenList}
              onChange={setSelectedTokenOption}
              closeMenuOnSelect={false}
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
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Способы оплаты</h1>
          <div>
            <Select
              isMulti
              options={bankList}
              onChange={setSelectedBankOption}
              closeMenuOnSelect={false}
              classNames={{
                container: (state) => styles.select3,
                singleValue: (state) => styles.select4,
                control: (state) => styles.select2,
                menuList: (state) => styles.select6,
                menu: (state) => styles.select61,
                option: (state) => styles.select7,
                multiValue: (state) => styles.select8,
                multiValueLabel: (state) => styles.select9,
                multiValueRemove: (state) => styles.select10,
              }}
              classNamePrefix="react-select"
              defaultValue={selectedBankOption}
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Курс</h1>
          <input
            placeholder="Введите курс"
            className={styles.input}
            value={course}
            onChange={(e) => checkValueTotal(e, setCourse)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
      </div>
      {/* {errorMessage ? error : <></>} */}
      <div className={styles.btnBlock}>
        <button className={styles.btnOk} onClick={saveP2pOffer}>Сохранить изменения</button>
        <button className={styles.btnDel} onClick={deleteP2pOffer}>Удалить объявление</button>
      </div>
    </div>
    :
    <div className={styles.twoFaRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Редактирование объявления</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowEdit(false)}
        />
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Сумма</h1>
          <input
            placeholder="Введите сумму"
            className={styles.input}
            value={amount}
            onChange={(e) => checkValueTotal(e, setAmount)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Минимальный лимит</h1>
          <input
            placeholder="Введите минимум"
            className={styles.input}
            value={minLimit}
            onChange={(e) => checkValueTotal(e, setMinLimit)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Максимальный лимит</h1>
          <input
            placeholder="Введите максимум"
            className={styles.input}
            value={maxLimit}
            onChange={(e) => checkValueTotal(e, setMaxLimit)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Валюта</h1>
          <div>
            <Select
              options={fiatList}
              onChange={setSelectedFiatOption}
              closeMenuOnSelect={false}
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
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Криптовалюта</h1>
          <div>
            <Select
              options={tokenList}
              onChange={setSelectedTokenOption}
              closeMenuOnSelect={false}
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
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <h1 className={styles.inputTitle}>Курс</h1>
          <input
            placeholder="Введите курс"
            className={styles.input}
            value={course}
            onChange={(e) => checkValueTotal(e, setCourse)}
          // style={errorMessage === 'Вводимое значение превышает баланс' ? { color: 'rgba(211, 65, 118, 1)' } : {}}
          />
        </div>
      </div>
      {/* {errorMessage ? error : <></>} */}
      <div className={styles.btnBlock}>
        <button className={styles.btnOk} onClick={saveB2bOffer}>Сохранить изменения</button>
        <button className={styles.btnDel} onClick={deleteB2bOffer}>Удалить объявление</button>
      </div>
    </div>

  return (
    <>
      {showEdit ? bg : <></>}
      {showEdit ? edit : <></>}
      {offer ?
        <>
          <div className={styles.blockItem}>
            <div
              onClick={() => setIsVisible((prev) => !prev)}
              className={styles.blockItemTop}
            >
              <div className={styles.item}>
                <h4 className={offer.type === 2 ? styles.saleTitleBuy : styles.saleTitleSell}>{offer.type === 2 ? `Покупка` : `Продажа`}</h4>
                <div className={styles.saleId}>{title === 'p2p' ? offer.volume : offer.volume} {offer.chart}</div>
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
                <span className={styles.blockItemBodyRowLeft}>Сумма</span>
                <span className={styles.blockItemBodyRowRight}>{offer.volume} {offer.chart}</span>
              </div>
              <div className={styles.blockItemBodyRow}>
                <span className={styles.blockItemBodyRowLeft}>Дата</span>
                <span className={styles.blockItemBodyRowRight}>{offer.start_date}</span>
              </div>
              <div className={styles.blockItemBodyRow}>
                <span className={styles.blockItemBodyRowLeft}>Контрагент</span>
                {
                  title === 'p2p' ?
                    <span className={styles.blockItemBodyRowRight}>{profile.id === offer.author_id ? offer.user : offer.author}</span>
                    :
                    //@ts-ignore
                    <span className={styles.blockItemBodyRowRight}>{offer.company}</span>
                }
              </div>
              <div className={styles.blockItemBodyRow}>
                <span className={styles.blockItemBodyRowLeft}>Статус</span>
                <span className={styles.blockItemBodyRowRight}>
                  {statusList.filter(el => el.status_id === offer.status_history)[0]?.title}
                </span>
              </div>
              <div className={styles.btns}>
                {
                  title === 'p2p' ?
                    <NavLink to={`/order/${offer.order_id}`} state={offer}>
                      <button className={styles.btnOk}>Детали</button>
                    </NavLink>
                    :
                    //@ts-ignore
                    <NavLink to={`/trade/${offer.b2b_ads_id}`} state={offer}>
                      <button className={styles.btnOk}>Детали</button>
                    </NavLink>
                }
              </div>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <div className={styles.item}>{title === 'p2p' ? offer.order_id : offer.b2b_ads_id}</div>
            <div className={styles.item}>
              <h4 className={styles.saleTitle}>{offer.type === 2 ? `Покупка` : `Продажа`}</h4>
            </div>
            <p className={styles.item}>{offer.volume} {offer.chart}</p>
            <p className={styles.item}>{offer.start_date}</p>
            <p className={styles.item}>{profile.id === offer.author_id ? offer.user : offer.author}</p>
            <p className={styles.item}>
              {statusList.filter(el => el.status_id === offer.status_history)[0]?.title}
            </p>
            {
              title === 'p2p' ?
                <NavLink to={`/order/${offer.order_id}`} state={offer}>
                  <button className={styles.btnOk}>Детали</button>
                </NavLink>
                :
                //@ts-ignore
                <NavLink to={`/trade/${offer.b2b_ads_id}`} state={offer}>
                  <button className={styles.btnOk}>Детали</button>
                </NavLink>
            }
          </div>
        </>
        :
        myB2bOffer ?
          <>
            <div className={styles.blockItem}>
              <div
                onClick={() => setIsVisible((prev) => !prev)}
                className={styles.blockItemTop}
              >
                <div className={styles.item}>
                  <h4 className={styles.saleTitle}>{myB2bOffer.type === 1 ? `Покупка` : `Продажа`}</h4>
                  <div className={styles.saleId}>{myB2bOffer.order_id}</div>
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
                  <span className={styles.blockItemBodyRowLeft}>Сумма</span>
                  <span className={styles.blockItemBodyRowRight}>{myB2bOffer.amount} {myB2bOffer.chart}</span>
                </div>
                <div className={styles.blockItemBodyRow}>
                  <span className={styles.blockItemBodyRowLeft}>Дата</span>
                  <span className={styles.blockItemBodyRowRight}>{myB2bOffer.date}</span>
                </div>
                <div className={styles.blockItemBodyRow}>
                  <span className={styles.blockItemBodyRowLeft}>Контрагент</span>
                  <span className={styles.blockItemBodyRowRight}>{myB2bOffer.company}</span>
                </div>
                <div className={styles.blockItemBodyRow}>
                  <span className={styles.blockItemBodyRowLeft}>Статус</span>
                  <span className={styles.blockItemBodyRowRight}>
                    {statusList.filter(el => el.status_id === myB2bOffer.status)[0]?.title}
                  </span>
                </div>
                <div className={styles.btns}>
                  {
                    myB2bOffer.history || myB2bOffer.status > 5 ?
                      <button className={styles.btnDel} onClick={deleteB2bOffer}>Удалить</button>
                      :
                      <button className={styles.btnOk} onClick={() => setShowEdit(true)}>Редактировать</button>
                  }
                </div>
              </div>
            </div>

            <div className={styles.itemBlock}>
              <div className={styles.item}>{myB2bOffer.order_id}</div>
              <div className={styles.item}>
                <h4 className={styles.saleTitle}>{myB2bOffer.type === 1 ? `Покупка` : `Продажа`}</h4>
              </div>
              <p className={styles.item}>{myB2bOffer.amount} {myB2bOffer.chart}</p>
              <p className={styles.item}>{myB2bOffer.date}</p>
              <p className={styles.item}>{myB2bOffer.company}</p>
              <p className={styles.item} style={{ fontSize: '14px' }}>
                {statusList.filter(el => el.status_id === myB2bOffer.status)[0]?.title}
              </p>
              {
                myB2bOffer.history || myB2bOffer.status > 5 ?
                  <button className={styles.btnDel} onClick={deleteB2bOffer}>Удалить</button>
                  :
                  <button className={styles.btnOk} onClick={() => setShowEdit(true)}>Редактировать</button>
              }
            </div>
          </>
          :
          myOffer ?
            <>
              <div className={styles.blockItem}>
                <div
                  onClick={() => setIsVisible((prev) => !prev)}
                  className={styles.blockItemTop}
                >
                  <div className={styles.item}>
                    <h4 className={styles.saleTitle}>{myOffer.type === 1 ? `Покупка` : `Продажа`}</h4>
                    <div className={styles.saleId}>{myOffer.order_id}</div>
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
                    <span className={styles.blockItemBodyRowLeft}>Сумма</span>
                    <span className={styles.blockItemBodyRowRight}>{myOffer.amount} {myOffer.chart}</span>
                  </div>
                  <div className={styles.blockItemBodyRow}>
                    <span className={styles.blockItemBodyRowLeft}>Дата</span>
                    <span className={styles.blockItemBodyRowRight}>{myOffer.date}</span>
                  </div>
                  <div className={styles.blockItemBodyRow}>
                    <span className={styles.blockItemBodyRowLeft}>Контрагент</span>
                    <span className={styles.blockItemBodyRowRight}>{myOffer.user}</span>
                  </div>
                  <div className={styles.blockItemBodyRow}>
                    <span className={styles.blockItemBodyRowLeft}>Статус</span>
                    <span className={styles.blockItemBodyRowRight}>
                      {statusList.filter(el => el.status_id === myOffer.status)[0]?.title}
                    </span>
                  </div>
                  <div className={styles.btns}>
                    {
                      myOffer.history || myOffer.status > 5 ?
                        <button className={styles.btnDel} onClick={deleteP2pOffer}>Удалить</button>
                        :
                        <button className={styles.btnOk} onClick={() => setShowEdit(true)}>Редактировать</button>
                    }
                  </div>
                </div>
              </div>

              <div className={styles.itemBlock}>
                <div className={styles.item}>{myOffer.order_id}</div>
                <div className={styles.item}>
                  <h4 className={styles.saleTitle}>{myOffer.type === 1 ? `Покупка` : `Продажа`}</h4>
                </div>
                <p className={styles.item}>{myOffer.amount} {myOffer.chart}</p>
                <p className={styles.item}>{myOffer.date}</p>
                <p className={styles.item}>{myOffer.user}</p>
                <p className={styles.item} style={{ fontSize: '14px' }}>
                  {statusList.filter(el => el.status_id === myOffer.status)[0]?.title}
                </p>
                {
                  myOffer.history || myOffer.status > 5 ?
                    <button className={styles.btnDel} onClick={deleteP2pOffer}>Удалить</button>
                    :
                    <button className={styles.btnOk} onClick={() => setShowEdit(true)}>Редактировать</button>
                }
              </div>
            </>
            : <></>
      }
    </>
  )
}

export default HistoryTable