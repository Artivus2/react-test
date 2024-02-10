import React from 'react';
import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/Main';
import Header from '../header/Header';
import Error from '../../pages/error/Error';
import Footer from '../footer/Footer';
import P2p from '../../pages/p2p/P2p';
import Profile from '../../pages/profile/Profile';
import Verify from '../profileComponents/verify/Verify';
import ProfileInfo from '../profileComponents/profileInfo/ProfileInfo';
import Wallet from '../profileComponents/wallet/Wallet';
import History from '../profileComponents/history/History';
import Safety from '../profileComponents/safety/Safety';
import Settings from '../profileComponents/settings/Settings';
import HeaderMobile from '../header/headerMobile/HeaderMobile';
import { B2b } from '../../pages/b2b/B2b';
import { B2bOffers } from "../../pages/b2bOffers/B2bOffers";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { useAppInit } from "../../utils/hooks/useAppInit";
import { getIsAppInit } from "../../bll/selectors/app.selector";
import { Trade } from "../../pages/trade/Trade";
import Order from '../../pages/order/Order';
import BuyPage from '../../pages/buy/BuyPage';

const App = () => {

  useAppInit();
  const isAppInit = useAppSelector(getIsAppInit);

  if (!isAppInit) return <div className={styles.preloader}>LOADING...</div>

  return (
    <div className={styles.app}>
      <Header />
      <HeaderMobile />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/p2p" element={<P2p />} />
        <Route path="/order/*" element={<Order />} />
        <Route path="/b2b" element={<B2b />} />
        <Route path="/b2b/:inn" element={<B2bOffers />} />
        <Route path="/trade/:id" element={<Trade />} />
        <Route path="/profile" element={<Profile children={<ProfileInfo />} />} />
        <Route path="/profile/wallet" element={<Profile children={<Wallet />} />} />
        <Route path="/profile/history" element={<Profile children={<History />} />} />
        <Route path="/profile/safety" element={<Profile children={<Safety />} />} />
        <Route path="/profile/verify" element={<Profile children={<Verify />} />} />
        <Route path="/profile/settings" element={<Profile children={<Settings />} />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
