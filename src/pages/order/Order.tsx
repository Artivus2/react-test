import React, { useEffect, useState } from 'react'
import styles from './Order.module.scss'
import { useLocation } from 'react-router-dom'
import { ApealProps, OfferData, OrderHistory, UserProfile } from '../../types/types';
import Container from '../../UI/container/Container';
import Skeleton from 'react-loading-skeleton';
import { ProfileInfo } from '../../services/UserService';
import ChatBlock from '../../components/paymentComponents/chatBlock/ChatBlock';
import { GetAllOffers, GetCurrentOffer } from '../../services/P2p';
import TradeSide from './TradeSide';
import Apeal from '../../components/paymentComponents/apeal/Apeal';

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

const Order = () => {
  const [offerData, setOfferData] = useState<OfferData>();
  const [currentOfferData, setCurrentOfferData] = useState<OrderHistory>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [openChat, setOpenChat] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(nullProfile);
  const [showApeal, setShowApeal] = useState<ApealProps | null>(null)

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
    if (offerData?.order_id && profile.id) {
      const token = localStorage.getItem("access_token") ?? '';
      //@ts-ignore
      if (currentOfferData || offerData?.start_date) {
        //@ts-ignore
        if ((currentOfferData && currentOfferData.status_history < 4)) {
          const data = await GetCurrentOffer(token, profile.id, offerData.order_id)
          if (data.status === 200 && data.data.length) {
            const temp = data.data.filter((el: OrderHistory) => el.start_date === currentOfferData.start_date)[0];
            if (!temp) {
              setLoading(true)
            } else {
              setCurrentOfferData(temp)
              setLoading(false)
            }
          }
          //@ts-ignore
        } else if ((currentOfferData && currentOfferData.status_history >= 4) || (offerData?.start_date)) {
          const data = await GetAllOffers(token, profile.id, offerData.order_id)
          if (data.status === 200 && data.data.length) {
            //@ts-ignore
            const temp = data.data.filter((el: OrderHistory) => el.start_date === (currentOfferData && currentOfferData.start_date) || el.start_date === offerData.start_date)[0];
            setCurrentOfferData(temp)
            setLoading(false)
          }
        }
      } else {
        const data = await GetAllOffers(token, profile.id, offerData.order_id)
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


  return (
    <Container className={styles.main}>
      {loading
        // || (!min && !sec)
        ?
        <div style={{ display: 'block', width: '100%' }}>
          <Container className={styles.skeletonContainer}>
            <div className={styles.skeletonBlock1}>
              <div style={{ marginBottom: '10px' }}>
                <Skeleton height={250} baseColor={'1caf8610'} highlightColor={'1caf8630'} borderRadius={'8px'} />
              </div>
              <div>
                <Skeleton height={350} baseColor={'1caf8610'} highlightColor={'1caf8630'} borderRadius={'8px'} />
              </div>
            </div>
            <div className={styles.skeletonBlock2}>
              <div>
                <Skeleton height={615} baseColor={'1caf8610'} highlightColor={'1caf8630'} borderRadius={'8px'} />
              </div>
            </div>
          </Container>
        </div>
        :
        <>
          {currentOfferData ?
            <>
              <div className={styles.leftBlock}>
                <TradeSide
                  currentOfferData={currentOfferData}
                  profile={profile}
                  setOpenChat={setOpenChat}
                  setShowApeal={setShowApeal}
                />
              </div>
              <div className={styles.rightBlock}>
                <ChatBlock
                  openChat={openChat}
                  setOpenChat={setOpenChat}
                  agentName={profile.id === currentOfferData.author_id ? currentOfferData.user : currentOfferData.author}
                  userId={currentOfferData.author_id !== profile.id ? currentOfferData.user_id : currentOfferData.author_id}
                  avatar={profile.id === currentOfferData.author_id ? currentOfferData.image : currentOfferData.image_author}
                  orderId={currentOfferData.order_id_history}
                  date={currentOfferData.start_date}
                />
              </div>
              <div className={styles.rightBlockSmall} style={openChat ? { display: 'block' } : { display: 'none' }}>
                <ChatBlock
                  openChat={openChat}
                  setOpenChat={setOpenChat}
                  agentName={profile.id === currentOfferData.author_id ? currentOfferData.user : currentOfferData.author}
                  userId={currentOfferData.author_id !== profile.id ? currentOfferData.user_id : currentOfferData.author_id}
                  avatar={profile.id === currentOfferData.author_id ? currentOfferData.image : currentOfferData.image_author}
                  orderId={currentOfferData.order_id_history}
                  date={currentOfferData.start_date}
                />
              </div>
            </>
            :
            <></>
          }
          <>
            {showApeal && <Apeal apeal={showApeal} />}
          </>
        </>
      }
    </Container>
  )
}

export default Order