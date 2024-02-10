import React, { useEffect, useState } from 'react';
import styles from './Offers.module.scss';
import { B2bOffer } from "./B2bOffer/B2bOffer";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { getCharts, getCurrencies } from "../../../bll/selectors/app.selector";
import { IB2bOffer, IOkved } from "../../../types/B2b.types";
import { Chart } from '../../profileComponents/wallet/Wallet';
import { BalanceInfo } from '../../../services/UserService';
import { WalletBalance } from '../../../types/types';

interface OffersProps {
    offers: IB2bOffer[];
    filterSum: number;
    isLoading: boolean;
    okveds: Record<string, IOkved>;
}

export const Offers: React.FC<OffersProps> = ({ offers, filterSum, isLoading, okveds }) => {

    const [p2pChartList, setP2pChartList] = useState<Chart[]>([])

    const getBalance = async (token: string) => {
        const data = await BalanceInfo(token);
        if (data.status === 200) {
            let row: WalletBalance[] = data.data;
            let tempP2pChartList: Chart[] = row.map((el) => { return { symbol: el.symbol, icon: el.icon, balance: el.balance, blocked: el.blocked } });
            setP2pChartList(tempP2pChartList);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token") ?? '';
        getBalance(token);
    }, [])


    const charts = useAppSelector(getCharts);
    const currencies = useAppSelector(getCurrencies);

    const rootClassName = isLoading ? `${styles.offersWrapper} ${styles.disabled}` : styles.offersWrapper;
    const [activeOffer, setActiveOffer] = useState(0);
    const offersToRender = offers.length ? offers.map(offer =>
        <B2bOffer
            p2pChartList={p2pChartList}
            key={offer.uuid}
            offer={offer}
            filterSum={filterSum}
            charts={charts}
            currencies={currencies}
            activeOffer={activeOffer}
            setActiveOffer={setActiveOffer}
            okveds={okveds}
        />)
        : <div className={styles.notFound}>Объявления не найдены.</div>

    return (
        <>
            <div className={rootClassName}>
                {offersToRender}
            </div>
            {/* {isLoading && (
                <div className={styles.preloader}>
                    Loading...
                </div>
            )} */}
        </>
    );
};