import React, { useEffect, useState } from 'react'
import styles from './Order.module.scss'
import { ApealProps, OrderHistory, UserProfile } from '../../types/types'
import InfoBlock from '../../components/paymentComponents/infoBlock/InfoBlock';
import Steps from '../../components/paymentComponents/steps/Steps';
import SellerBlock from '../../components/paymentComponents/sellerBlock/SellerBlock';
import BuyerBlock from '../../components/paymentComponents/buyerBlock/BuyerBlock';

interface TradeSidePropsType {
  currentOfferData: OrderHistory;
  profile: UserProfile;
  setOpenChat: (param: boolean) => void;
  setShowApeal: (param: ApealProps) => void;
}

const TradeSide = ({
  currentOfferData,
  profile,
  setOpenChat,
  setShowApeal,
}: TradeSidePropsType) => {
  const [min, setMin] = useState<number>(15);
  const [sec, setSec] = useState<number>(0);

  useEffect(() => {
    if (currentOfferData.status_history >= 4) {
      setMin(0)
      setSec(0)
    }
  }, [currentOfferData.status_history, min, sec])



  return (
    <div
    // className={styles.main}
    >
      <div className={styles.topBlock}>
        <InfoBlock
          offerData={currentOfferData}
          setMin={setMin}
          setSec={setSec}
          m={min}
          s={sec}
        />
        <Steps step={currentOfferData.status_history} />
      </div>
      {
        currentOfferData.user_id !== profile.id ?
          currentOfferData.type === 1 ?
            currentOfferData.author_id !== profile.id ?
              // если не создатель и нажимаешь продать и не инициатор сделки
              <></>
              :
              //если не создатель и нажимаешь продать и инициатор сделки
              <SellerBlock
                profile={profile}
                setOpenChat={setOpenChat}
                offerData={currentOfferData}
              />
            :
            currentOfferData.author_id !== profile.id ?
              //если не создатель и нажимаешь купить и не инициатор сделки
              <></>
              :
              //если не создатель и нажимаешь купить и инициатор сделки
              <BuyerBlock
                profile={profile}
                setShowApeal={setShowApeal}
                setOpenChat={setOpenChat}
                m={min}
                s={sec}
                offerData={currentOfferData}
              />
          :
          currentOfferData.type === 1 ?
            currentOfferData.author_id !== profile.id ?
              // если создатель и кнопка продать и не инициатор сделки
              <BuyerBlock
                profile={profile}
                setShowApeal={setShowApeal}
                setOpenChat={setOpenChat}
                m={min}
                s={sec}
                offerData={currentOfferData}
              />
              :
              //если создатель и кнопка продать и инициатор сделки
              <></>
            :
            currentOfferData.author_id !== profile.id ?
              //если создатель и кнопка купить и не инициатор сделки
              <SellerBlock
                profile={profile}
                setOpenChat={setOpenChat}
                offerData={currentOfferData}
              />
              :
              //если создатель и кнопка купить и инициатор сделки
              <></>
      }
    </div >
  )
}

export default TradeSide;