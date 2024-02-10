import React from 'react';
import styles from './B2bOffer.module.scss';
import { IChart, ICurrency } from '../../../../types/types';
import { OfferPay } from '../OfferPay/OfferPay';
import { IB2bOffer, IOkved } from "../../../../types/B2b.types";
import { Chart } from '../../../profileComponents/wallet/Wallet';

interface B2bOfferProps {
  offer: IB2bOffer;
  filterSum: number;
  charts: Record<string, IChart>;
  currencies: Record<string, ICurrency>;
  setActiveOffer: (param: number) => void;
  activeOffer: number;
  p2pChartList: Chart[];
  okveds: Record<string, IOkved>;
}

export const B2bOffer: React.FC<B2bOfferProps> = ({
  offer,
  filterSum,
  charts,
  currencies,
  activeOffer,
  setActiveOffer,
  p2pChartList,
  okveds
}) => {


  //@ts-ignore
  const currentOkved = Object.values(okveds).filter((el) => el.id === offer.okved)?.[0];


  return (
    <>
      <div className={styles.b2bOffer}>
        <div className={styles.items}>
          <div className={styles.item1}>
            <div className={styles.infoContainer}>
              <p className={styles.username}>{offer.company}</p>
            </div>
          </div>
          <p className={styles.priceName}>Цена</p>
          <div className={styles.item2}>
            <p className={styles.curPrice}>{(+offer.course).toFixed(2)} <span>{offer.currency}</span></p>
            <p className={styles.currency}></p>
          </div>
          <div className={styles.item3}>
            <div className={styles.limit}>
              <p className={styles.limitTitle}>Доступно</p>
              <p className={styles.limitTitle}>Лимиты</p>

            </div>
            <div className={styles.limit}>
              <p className={styles.limitText}>
                {`${+offer.amount} ${offer.chart}`}
              </p>
              <p className={styles.limitText}>{offer.minLimit} - {offer.maxLimit} {offer.currency}</p>
            </div>
          </div>
          <div className={styles.item4}>
            <div className={styles.banks}>
              {currentOkved ? currentOkved.title : <></>}
            </div>
          </div>
          <div className={styles.item5}>
            <div
              className={`${offer.type === 2 ? styles.btnSell : styles.btnBuy}`}
              onClick={() => setActiveOffer(offer.orderId === activeOffer ? 0 : offer.orderId)}
            >
              <p>
                {`${offer.type === 2 ? `Купить` : `Продать`} ${offer.chart}`}
              </p>
            </div>
          </div>
          <div className={styles.item4Small}>
            <div className={styles.banks}>
              {currentOkved ? currentOkved.title : <></>}
            </div>
          </div>
        </div>
      </div>
      {activeOffer === +offer.orderId && (
        <OfferPay
          p2pChartList={p2pChartList}
          offer={offer}
          filterSum={filterSum}
          charts={charts}
          currencies={currencies}
        />
      )}
    </>
  );
};

