import React from 'react'
import { ApealProps, OrderB2bHistory, UserProfile } from '../../types/types';
import BuyerBlock from '../../components/paymentB2bComponents/buyerBlock/BuyerBlock';
import SellerBlock from '../../components/paymentB2bComponents/sellerBlock/SellerBlock';

interface TradeSidePropsType {
  currentOfferData: OrderB2bHistory;
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
  return (
    <div>{
      currentOfferData.company_id !== profile.id ?
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
    }</div>
  )
}

export default TradeSide