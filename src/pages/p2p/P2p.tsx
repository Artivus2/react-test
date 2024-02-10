import React, { useEffect, useState } from 'react'
import styles from './P2p.module.scss'
import Filters from '../../components/filters/Filters'
import Offer from '../../components/offer/Offer'
import { OfferData, UserProfile, WalletBalance } from '../../types/types'
import { BalanceInfo, ProfileInfo } from '../../services/UserService'
import Container from '../../UI/container/Container'
import { Chart } from '../../components/profileComponents/wallet/Wallet'
import Paginator from '../../components/paginator/Paginator'
import bannerImg from '../../assets/img/bannerImg.png'

import { RefBlock } from '../../components/mainComponents/RefBlock/RefBlock';
import { NinthBlock } from '../../components/mainComponents/ninthBlock/NinthBlock';

import icon1 from '../../assets/icons/p2p/icon1.svg'
import icon2 from '../../assets/icons/p2p/icon2.svg'
import icon3 from '../../assets/icons/p2p/icon3.svg'
import icon4 from '../../assets/icons/p2p/icon4.svg'
import icon5 from '../../assets/icons/p2p/icon5.svg'
import icon6 from '../../assets/icons/p2p/icon6.svg'

import phone from '../../assets/icons/p2p/phone.svg'

import blockchain from '../../assets/icons/p2p/blockchain.svg'
import trustwallet from '../../assets/icons/p2p/trustwallet.svg'
import polygon from '../../assets/icons/p2p/polygon.svg'
import binance from '../../assets/icons/p2p/binance.svg'
import bybit from '../../assets/icons/p2p/bybit.svg'
import metamask from '../../assets/icons/p2p/metamask.svg'

import rafiki from '../../assets/icons/p2p/rafiki.svg'


const P2p = () => {

  const [offers, setOffers] = useState<OfferData[]>([])
  const [offersToRender, setOffersToRender] = useState<OfferData[]>([])
  const [offersType, setOffersType] = useState<number>(1);
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  const nullProfile = {
    email: '',
    first_name: '',
    id: 0,
    image: '',
    last_name: '',
    login: '',
    patronymic: '',
    phone: '',
    status: 0,
    telegram: '',
    two_factor: false,
    verify_status: 0,
  }

  const [profile, setProfile] = useState<UserProfile>(nullProfile)
  const [p2pChartList, setP2pChartList] = useState<Chart[]>([])

  const getBalance = async (token: string) => {
    const data = await BalanceInfo(token);
    if (data.status === 200) {
      let row: WalletBalance[] = data.data;
      let tempP2pChartList: Chart[] = row.map((el) => { return { symbol: el.symbol, icon: el.icon, balance: el.balance, blocked: el.blocked } });
      setP2pChartList(tempP2pChartList);
    }
  }

  const getProfile = async (token: string) => {
    const { data } = await ProfileInfo(token);
    setProfile(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token") ?? '';
    getProfile(token);
    getBalance(token);
  }, [])


  const [activeOffer, setActiveOffer] = useState(0);
  return (
    <div className={styles.bg}>
      <Container className={loading ? styles.disabled : styles.main}>
        <div className={styles.banner}>
          <div className={styles.bannerTop}>Диктуйте свои правила р2р-сделок</div>
          <div className={styles.bannerBottom}>GREEnavi предлагает выгодный курс покупки и продажи USDT без каких-либо комиссий</div>
          <img src={bannerImg} alt="" />
        </div>
        <Filters
          setOffersType={setOffersType}
          offersType={offersType}
          setOffers={setOffers}
          offers={offers}
          price={price}
          setPrice={setPrice}
          setLoading={setLoading}
        />
        <div className={styles.offersBlock}>
          {
            offersToRender.length ?
              offersToRender.filter((el) => price === '' ? el : +el.min_limit <= +price && +price <= +el.max_limit).map((data, index) => {
                return <Offer
                  offerData={data}
                  offerType={offersType}
                  key={index}
                  profile={profile}
                  activeOffer={activeOffer}
                  setActiveOffer={setActiveOffer}
                  balanceChartList={p2pChartList}
                />
              })
              :
              <div className={styles.notFound}>Объявления не найдены.</div>
          }
        </div>
        <Paginator offers={offers} setOffersToRender={setOffersToRender} />

        <div className={styles.advantagesBlock}>
          <h2>Преимущества Р2Р платформы</h2>
          <div className={styles.advantagesBox}>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Стоимость</strong>
                <img src={icon1} />
              </div>
              <div className={styles.advantagesUp}>
                <p>У вас есть возможность определить желаемую цену при покупке или продаже криптовалюты</p>
              </div>
            </div>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Комиссии</strong>
                <img src={icon2} />
              </div>
              <div className={styles.advantagesUp}>
                <p>На нашем сервисе нет скрытых платежей. Мы взимаем комиссию с создателя предложения только в размере 0,2%, а комиссия сети — единственная плата за вывод криптовалюты</p>
              </div>
            </div>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Безопасность</strong>
                <img src={icon3} />
              </div>
              <div className={styles.advantagesUp}>
                <p>Наша команда способствует честным и надежным сделкам между контрагентами</p>
              </div>
            </div>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Способы оплаты</strong>
                <img src={icon4} />
              </div>
              <div className={styles.advantagesUp}>
                <p>Мы обеспечиваем поддержку широкого спектра популярных способов оплаты и постоянно обновляем список новыми вариантами</p>
              </div>
            </div>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Конфиденциальность</strong>
                <img src={icon5} />
              </div>
              <div className={styles.advantagesUp}>
                <p>В отличие от банковских переводов, платформы P2P не собирают никакой информации о покупателе и продавце</p>
              </div>
            </div>
            <div className={styles.advantagesItem}>
              <div className={styles.advantagesTop}>
                <strong>Лёгкий старт</strong>
                <img src={icon6} />
              </div>
              <div className={styles.advantagesUp}>
                <p>После того, как вы успешно завершили процесс KYC транзакции выполняют три простых  шага. Весь процесс обычно занимает от 5 до 10 минут.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tradeBlock}>
          <h2>Торгуйте легко</h2>
          <div className={styles.tradeBox}>
            <div className={styles.tradeItem}>
              <strong>Оффер</strong>
              <p>Как только вы отправите оффер о покупке, GREEvin-P2P немедленно заморозит для вас криптовалюту.</p>
            </div>
            <div className={styles.tradeItem}>
              <strong>Оплата</strong>
              <p>Обязательно отправьте точную сумму продавцу любым способом оплаты и подтвердите транзакцию, нажав «Оплачено» после завершения перевода.</p>
            </div>
            <div className={styles.tradeItem}>
              <strong>Получение</strong>
              <p>Как только продавец подтвердит платеж, замороженная криптовалюта будет незамедлительно переведена на кошелек вашего аккаунта.</p>
            </div>
          </div>
          <img src={phone} />
        </div>

        <div className={styles.cooperateBlock}>
          <h2>Мы сотрудничаем</h2>
          <div className={styles.cooperateBox}>
            <div className={styles.cooperateItem}>
              <img src={blockchain} />
            </div>
            <div className={styles.cooperateItem}>
              <img src={trustwallet} />
            </div>
            <div className={styles.cooperateItem}>
              <img src={polygon} />
            </div>
            <div className={styles.cooperateItem}>
              <img src={binance} />
            </div>
            <div className={styles.cooperateItem}>
              <img src={bybit} />
            </div>
            <div className={styles.cooperateItem}>
              <img src={metamask} />
            </div>
          </div>
        </div>

        <div className={styles.proBlock}>
          <h2>GREEvin - это про...</h2>
          <div className={styles.proBox}>
            <div className={styles.proItem}>
              <strong>Заработок</strong>
              <p>Наша миссия состоит в том, чтобы обеспечить глобальное получение дохода за счет инвестирования и торговли криптовалютой. Внимательно следя за развивающимся рынком, мы постоянно адаптируемся к изменениям в отрасли, чтобы обеспечить всесторонний охват и успех.</p>
            </div>
            <div className={styles.proItem}>
              <strong>Безопасность</strong>
              <p>Благодаря нашему обширному опыту работы с криптовалютами мы можем минимизировать риски мошенничества, обмана и манипуляций. Мы внимательно следим за работой нашей платформы и принимаем немедленные меры против любых действий, нарушающих правила торговли.</p>
            </div>
            <div className={styles.proItem}>
              <strong>Качество</strong>
              <p>Мы стремимся поставлять качественный продукт, и это обязательство останется неизменным. Наша цель — сделать так, чтобы любые действия на нашем сервисе были эффективными, надежными и полезными для наших пользователей.</p>
            </div>
            <div className={styles.proItem}>
              <strong>Независимость</strong>
              <p>Мы разрабатываем децентрализованные сервисы, на которых пользователи имеют возможность самостоятельно определять условия работы</p>
            </div>
          </div>
          <img src={rafiki} />
        </div>


        <RefBlock />
        {/* <NinthBlock /> */}

      </Container>
    </div>
  )
}

export default P2p