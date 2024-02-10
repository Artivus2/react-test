import React, { useEffect, useState } from 'react'
import styles from './HeaderMobile.module.scss';
import logo from '../../../assets/img/logo.svg';
import burger from "../../../assets/icons/burger.svg";
import cross from "../../../assets/icons/cross.svg";
import profileIcon from '../../../assets/icons/profile.svg';
import AuthorizationBlock from '../../AuthorizationComponents/AuthorizationBlock';
import { Link, useLocation } from 'react-router-dom';
import { LogOutMethod } from '../../../services/AuthService';
import Container from '../../../UI/container/Container';
import UserInfo from '../../profileComponents/userInfo/UserInfo';
import { UserProfile } from '../../../types/types';
import { ProfileInfo } from '../../../services/UserService';

const nullProfile = {
  email: 'testemail@yandex.com',
  first_name: '',
  id: 0,
  image: '',
  last_name: '',
  login: 'a',
  patronymic: '',
  phone: '',
  status: 0,
  telegram: '',
  two_factor: false,
  verify_status: 0,
}

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [type, setType] = useState('login');
  const [currentPath, setCurrentPath] = useState('')
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

  const [profile, setProfile] = useState<UserProfile>(nullProfile);
  const location = useLocation();

  const checkToken = async (token: string) => {
    const { data } = await ProfileInfo(token);

    if (data === 'Token не найден') {
      localStorage.removeItem("access_token");
      location.pathname !== '/' ? document.location.href = '/' : <></>
    } else if (data === undefined) {
      // console.log('Слабое');
    } else {
      setProfile(data)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token') ?? '';
    checkToken(token);
  }, [])

  useEffect(() => {
    setIsOpenProfile(false)
  }, [location])

  return (
    <>
      <div className={styles.main} id='mob'>
        <Container className={styles.wrap}>
          <div className={styles.header}>
            <Link to={'/'}>
              <img
                src={logo}
                alt=""
                className={styles.logo}
              />
            </Link>
            <div className={styles.burBox}>
              {token ?
                <div className={styles.burgerBlock} style={token ? { display: 'flex' } : { display: 'none' }}>
                  <img
                    src={profileIcon}
                    alt=""
                    className={styles.burger}
                    onClick={() => { setIsOpen(false); setIsOpenProfile(!isOpenProfile) }}
                  />
                </div>
                :
                <button className={styles.logBtn} onClick={() => { setOpenModal(true); setIsOpenProfile(false); setIsOpen(false); setType('login') }}>Войти</button>
              }
              <div className={styles.burgerBlock}>
                <img
                  src={isOpen ? cross : burger}
                  alt=""
                  className={styles.burger}
                  onClick={() => { setIsOpenProfile(false); setIsOpen(!isOpen) }}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.content} ${isOpen && styles.active}`}>
            <div className={styles.navigation}>
              <Link to={'/'}>
                <div onClick={() => { setCurrentPath('/'); setIsOpen(false) }}
                  style={currentPath === '/' ? { color: '#0ddcaa36' } : { color: '#ffffff' }}
                  className={styles.navItem}>
                  <p>Главная</p>
                </div>
              </Link>
              {
                token ?
                  <Link to={'/buy'}>
                    <div
                      onClick={() => { setCurrentPath('/buy'); setIsOpen(false) }}
                      style={currentPath === '/buy' ? { color: '#0ddcaa36' } : { color: '#ffffff' }}
                      className={styles.navItem}>
                      <p>Купить криптовалюту</p>
                    </div>
                  </Link>
                  : <></>
              }
              {
                token ?
                  <Link to={'/p2p'}>
                    <div
                      className={styles.navItem}
                      onClick={() => { setCurrentPath('/p2p'); setIsOpen(false) }}
                      style={currentPath === '/p2p' ? { color: '#0ddcaa36' } : { color: '#ffffff' }}
                    >
                      P2P-торговля
                    </div>
                  </Link>
                  : <></>
              }
              {
                token ?
                  <Link to={'/b2b'}>
                    <div
                      className={styles.navItem}
                      onClick={() => { setCurrentPath('/b2b'); setIsOpen(false) }}
                      style={currentPath === '/b2b' ? { color: '#0ddcaa36' } : { color: '#ffffff' }}
                    >
                      <p className={styles.navItemText} >B2B</p>
                    </div>
                  </Link>
                  : <></>
              }
              <div className={styles.navItem} >
                <p className={styles.navItemText} >Процессинг</p>
              </div>
              <div className={styles.navItem} >
                <p className={styles.navItemText} >Статьи</p>
              </div>
              <div className={styles.navItem}>
                <p className={styles.navItemText} >Поддержка</p>
              </div>
              {status ? (
                <>
                  {/* <Link to={'/profile'}>
                    <div
                      className={styles.loginBtn}
                      onClick={() => { setIsOpen(false) }}
                    >
                      <p>Профиль</p>
                    </div>
                  </Link> */}
                  <div
                    className={styles.loginBtn}
                    onClick={() => { setIsOpen(false); logout() }}
                  >
                    <p>Выйти</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.loginBtn}
                    onClick={() => { setOpenModal(true); setIsOpenProfile(false); setIsOpen(false); setType('login') }}
                  >
                    <p>Войти</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={`${styles.contentProfile} ${isOpenProfile && styles.activeProfile}`}>
            <UserInfo
              name={profile.login}
              email={profile.email}
              isVerify={profile.verify_status}
              isEmail={profile.email ? 1 : 0}
              is2Fa={profile.two_factor ? 1 : 0}
              avatar={profile.image}
            />
          </div>
        </Container>
      </div>
      <AuthorizationBlock
        type={type}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setStatus={setStatus}
      />
    </>
  )
}

export default HeaderMobile