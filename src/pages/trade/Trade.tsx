import React, { useEffect, useState } from 'react';
import styles from './Trade.module.scss';
import { useLocation } from "react-router-dom";
import Container from '../../UI/container/Container';
import Skeleton from 'react-loading-skeleton';
import { ApealProps, OrderB2bHistory, UserProfile } from '../../types/types';
import { IB2bOffer } from '../../types/B2b.types';
import { getActiveB2bOffers } from '../../services/B2bService';
import { ProfileInfo } from '../../services/UserService';
import TradeSide from './TradeSide';
import Steps from '../../components/paymentB2bComponents/steps/Steps';
import ChatBlockB2b from '../../components/paymentB2bComponents/chatBlockB2b/ChatBlockB2b';
import { GetActiveB2bOffers, GetAllB2bOffers, GetCurrentB2bOffer } from '../../services/P2p';

const nullProfile = {
  email: '',
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

export const Trade = () => {
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(nullProfile);
  const [showApeal, setShowApeal] = useState<ApealProps | null>(null)
  const location = useLocation();
  const [offerData, setOfferData] = useState<IB2bOffer>();
  const [currentOfferData, setCurrentOfferData] = useState<OrderB2bHistory>();

  const checkToken = async (token: string) => {
    const { data } = await ProfileInfo(token);
    if (data === 'Token не найден' || data === undefined) {
      localStorage.removeItem("access_token");
      document.location.href = '/'
    } else {
      setProfile(data)
    }
  }

  const getOfferData = async () => {
    if ((offerData?.b2b_ads_id && profile.id) || (offerData?.orderId && profile.id)) {
      const token = localStorage.getItem("access_token") ?? '';
      //@ts-ignore
      if (currentOfferData || offerData?.start_date) {
        //@ts-ignore
        if ((currentOfferData && currentOfferData.status_history < 4)) {
          const data = await GetCurrentB2bOffer(token, profile.id, offerData.orderId)
          if (data.status === 200 && data.data.length) {
            const temp = data.data.filter((el: any) => el.start_date === currentOfferData.start_date)[0];
            if (!temp) {
              setLoading(true)
            } else {
              setCurrentOfferData(temp)
              setLoading(false)
            }
          }
          //@ts-ignore
        } else if ((currentOfferData && currentOfferData.status_history >= 4) || (offerData?.start_date)) {
          const data = await GetAllB2bOffers(token, profile.id, offerData.orderId)
          if (data.status === 200 && data.data.length) {
            //@ts-ignore
            const temp = data.data.filter((el: OrderHistory) => el.start_date === (currentOfferData && currentOfferData.start_date) || el.start_date === offerData.start_date)[0];
            setCurrentOfferData(temp)
            setLoading(false)
          }
        }
      } else {
        const data = await GetAllB2bOffers(token, profile.id, offerData.orderId)
        if (data.status === 200 && data.data.length) {
          setCurrentOfferData(data.data[data.data.length - 1])
          setLoading(false)
        }
      }
    }
  }


  useEffect(() => {
    setOfferData(location.state);
    const token = localStorage.getItem('access_token') ?? '';
    checkToken(token);
  }, [location])


  useEffect(() => {
    if (offerData !== undefined && offerData !== null) {
      getOfferData()
    } else if (offerData === null) {
      document.location.href = '/404'
    }
  }, [profile, offerData])


  useEffect(() => {
    const interval = setInterval(() => {
      setOfferData(location.state);
      const token = localStorage.getItem('access_token') ?? '';
      checkToken(token);
      getOfferData();
    }, 10000)
    return () => clearInterval(interval);
  }, [])

  // console.log(offerData);


  return (
    <Container className={styles.main}>
      {loading ?
        <div style={{ display: 'block', width: '100%' }}>
          <Container className={styles.skeletonContainer}>
            <div className={styles.skeletonBlock1}>
              <div style={{ marginBottom: '10px' }}>
                <Skeleton height={150} baseColor={'#1caf8610'} highlightColor={'#1caf8630'} borderRadius={'8px'} />
              </div>
            </div>
            <div className={styles.containerS}>
              <div className={styles.skeletonBlock2}>
                <div>
                  <Skeleton height={500} baseColor={'#1caf8610'} highlightColor={'#1caf8630'} borderRadius={'8px'} />
                </div>
              </div>
              <div className={styles.skeletonBlock3}>
                <div>
                  <Skeleton height={500} baseColor={'#1caf8610'} highlightColor={'#1caf8630'} borderRadius={'8px'} />
                </div>
              </div>
            </div>
          </Container>
        </div>
        :
        <>
          {currentOfferData ?
            <>
              <div className={styles.topBlock}>
                <Steps step={currentOfferData.status_history} offerData={currentOfferData} />
              </div>
              <div className={styles.bottomBlock}>
                <div className={styles.leftBlock}>
                  <TradeSide
                    currentOfferData={currentOfferData}
                    profile={profile}
                    setOpenChat={setOpenChat}
                    setShowApeal={setShowApeal}
                  />
                </div>
                <div className={styles.rightBlock}>
                  <ChatBlockB2b
                    openChat={openChat}
                    setOpenChat={setOpenChat}
                    agentName={profile.id === currentOfferData.author_id ? currentOfferData.company : currentOfferData.author}
                    userId={currentOfferData.author_id !== profile.id ? currentOfferData.company_id : currentOfferData.author_id}
                    avatar={currentOfferData.author_id === profile.id ? currentOfferData.image_creator : currentOfferData.image_author}
                    orderId={currentOfferData.b2b_ads_id}
                    date={currentOfferData.start_date}
                  />
                </div>
              </div>
              <div className={styles.rightBlockSmall} style={openChat ? { display: 'block' } : { display: 'none' }}>
                <ChatBlockB2b
                  openChat={openChat}
                  setOpenChat={setOpenChat}
                  agentName={profile.id === currentOfferData.author_id ? currentOfferData.company : currentOfferData.author}
                  userId={currentOfferData.author_id !== profile.id ? currentOfferData.company_id : currentOfferData.author_id}
                  avatar={currentOfferData.author_id === profile.id ? currentOfferData.image_creator : currentOfferData.image_author}
                  orderId={currentOfferData.b2b_ads_id}
                  date={currentOfferData.start_date}
                />
              </div>
            </>
            :
            <></>
          }
        </>
      }
    </Container>
  );
};