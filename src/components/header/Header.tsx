import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Container from '../../UI/container/Container'
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import AuthorizationBlock from '../AuthorizationComponents/AuthorizationBlock'
import { LogOutMethod } from '../../services/AuthService'
import { GetCharts } from '../../services/P2p'
import { IChart } from '../../types/types'
import { GetAllRates } from '../../services/UserService'

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [type, setType] = useState('login');
  const [currentPath, setCurrentPath] = useState('')
  const [chartList, setChartList] = useState<IChart[]>([])
  const [rates, setRates] = useState([{ price: '0', chartId: 0 }]);
  const token = localStorage.getItem('access_token') ?? '';

  useEffect(() => {
    setCurrentPath(document.location.pathname)
    token ? setStatus(true) : setStatus(false);
  }, [token])

  const logout = async () => {
    const { data } = await LogOutMethod(token);
    localStorage.removeItem("access_token");
    setStatus(false);
    document.location.href = '/';
  }

  const getCharts = async () => {
    const data = await GetCharts(token);
    if (data.status === 200 && data.data.length) {
      setChartList(data.data)
    }
  }

  const getRates = async () => {
    const urlList = chartList.map(el => `/chart/price?currency_id=1&chart_id=${el.id}`)
    const data = await GetAllRates(token, urlList);
    if (data.status === 200) {
      let temp = data.data.map((el: any) => { return { price: el.data.price, chartId: +el.request.responseURL.split("=")[2] } })
      setRates(temp)
    }
  }

  useEffect(() => {
    status ? getCharts() : <></>
  }, [status])

  useEffect(() => {
    getRates()
  }, [chartList])

  return (
    <>
      <Container className={styles.mainContainer}>
        <div className={styles.main}>
          <Link to={'/'}>
            <img
              src={logo}
              alt=""
              className={styles.logo}
              onClick={() => setCurrentPath('/')}
            />
          </Link>
          <ul className={styles.nav}>
            {
              token ?
                <li className={styles.navItem}>
                  <Link to={'/buy'}>
                    <p
                      className={styles.navItemText}
                      onClick={() => setCurrentPath('/buy')}
                      style={
                        currentPath === '/buy'
                          ? { color: '#0ddcaa' }
                          : { color: '#ffffff' }
                      }
                    >
                      Купить криптовалюту
                    </p>
                  </Link>
                </li>
                :
                <></>
            }
            {
              token ?
                <li className={styles.navItem}>
                  <Link to={'/p2p'}>
                    <p
                      className={styles.navItemText}
                      onClick={() => setCurrentPath('/p2p')}
                      style={
                        currentPath === '/p2p'
                          ? { color: '#0ddcaa' }
                          : { color: '#ffffff' }
                      }
                    >
                      P2P-торговля
                    </p>
                  </Link>
                </li>
                : <></>
            }
            {
              token ?
                <li className={styles.navItem}>
                  <Link to={'/b2b'}>
                    <p
                      className={styles.navItemText}
                      onClick={() => setCurrentPath('/b2b')}
                      style={
                        currentPath === '/b2b'
                          ? { color: '#0ddcaa' }
                          : { color: '#ffffff' }
                      }
                    >B2B</p>
                  </Link>
                </li>
                :
                <></>
            }
            <li className={styles.navItem}>
              <p className={styles.navItemText}>Процессинг</p>
            </li>
            <li className={styles.navItem}>
              <p className={styles.navItemText}>Статьи</p>
            </li>
            <li className={styles.navItem}>
              <p className={styles.navItemText} >Поддержка</p>
            </li>
          </ul>
          <div className={styles.profileBtns}>
            {status ? (
              <>
                <Link to={'/profile'}>
                  <div className={styles.loginBtn}>
                    <p>Профиль</p>
                  </div>
                </Link>
                <div
                  className={styles.loginBtn}
                  onClick={() => { logout() }}
                >
                  <p>Выйти</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.loginBtn}
                  onClick={() => {
                    setOpenModal(true);
                    setType('login');
                  }}
                >
                  <p>Войти</p>
                </div>
                <div
                  className={styles.regBtn}
                  onClick={() => {
                    setOpenModal(true);
                    setType('reg');
                  }}
                >
                  <p>Регистрация</p>
                </div>
              </>
            )}
          </div>
        </div>
        {
          status && rates ?
            <Container className={styles.marqBlock}>
              <Marquee
                pauseOnHover={true}
                pauseOnClick={true}
                gradient={true}
                gradientWidth={50}
                gradientColor={'transparent'}
                autoFill={true}
              >
                {
                  chartList.map((chart, index) => {
                    let currentChart = rates.filter(rate => chart.id === rate.chartId)
                    return currentChart[0]?.price === 'нет данных' ?
                      <div key={index}></div>
                      :
                      <Link to={'/buy'} key={index}>
                        <div
                          className={styles.marqItemContainer}
                          onClick={() => setCurrentPath('/buy')}
                          id='mob'
                        >
                          <img src={chart.icon} alt="" className={styles.icon} />
                          <p className={styles.name}>{chart.name} ({chart.symbol})</p>
                          <p className={styles.rate}>₽ {currentChart[0] ? +currentChart[0]?.price : '...'}</p>
                        </div>
                      </Link>
                  })
                }
              </Marquee>
            </Container>
            : <div className={styles.nomarq}></div>
        }
      </Container>
      <AuthorizationBlock
        type={type}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setStatus={setStatus}
      />
    </>
  );
};

export default Header;
