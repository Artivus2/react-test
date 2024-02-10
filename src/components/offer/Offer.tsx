import React from 'react'
import styles from './Offer.module.scss'
import { OfferData, UserProfile } from '../../types/types';
import OfferClosed from './offerClosed/OfferClosed';
import OfferOpened from './offerOpened/OfferOpened';
import { Chart } from '../profileComponents/wallet/Wallet';

interface OfferPropsType {
  offerData: OfferData;
  offerType: number;
  profile: UserProfile;
  activeOffer: number;
  setActiveOffer: (param: number) => void;
  balanceChartList: Chart[];
}

const Offer = ({
  balanceChartList,
  profile,
  offerData,
  offerType,
  activeOffer,
  setActiveOffer,
}: OfferPropsType) => {

  return (
    <div className={styles.main} style={activeOffer === offerData.order_id ? { backgroundColor: '#d9d9d905' } : {}}>
      {
        activeOffer === offerData.order_id ?
          <OfferOpened offerData={offerData} offerType={offerType} profile={profile} balanceChartList={balanceChartList} />
          :
          <OfferClosed offerData={offerData} offerType={offerType} profile={profile} setActiveOffer={setActiveOffer} />
      }
    </div>
  )
}

export default Offer