import React, { useEffect, useState } from 'react';
import styles from './B2bOffers.module.scss';
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getB2bFilters, getB2bLoading, getB2bOffers, getB2bSum } from "../../bll/selectors/b2b.selector";
import { B2BFilters } from "../../components/b2bOffersComponents/B2bFilters/B2bFilters";
import { CompanyMonitor } from "../../components/b2bOffersComponents/B2bFilters/CompanyMonitor/CompanyMonitor";
import Container from "../../UI/container/Container";
import { Offers } from "../../components/b2bOffersComponents/Offers/Offers";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { getB2bFullListThunk } from "../../bll/api/b2b.thunk";
import { Navigate, useParams } from "react-router-dom";
import { getCompanyList } from "../../bll/selectors/company.selector";
import MainBlock from '../../components/addNew/MainBlock/MainBlock';
import { FiatProps, TokenProps } from '../../components/filters/Filters';
import { GetB2bCharts, GetCurrency } from '../../services/P2p';
import { getOkved } from '../../bll/selectors/app.selector';
import Paginator from '../../components/paginator/Paginator';
import { IB2bOffer } from '../../types/B2b.types';
import bannerImg from '../../assets/img/bannerImg.png'

export const B2bOffers = () => {

    const { inn: companyInn } = useParams<{ inn: string }>();
    const [isCreateOffer, setIsCreateOffer] = useState<boolean>(false);
    const isLoading = useAppSelector(getB2bLoading);
    const offers = useAppSelector(getB2bOffers);
    const filters = useAppSelector(getB2bFilters);
    const sum = useAppSelector(getB2bSum);
    const companyList = useAppSelector(getCompanyList);
    const okveds = useAppSelector(getOkved);
    const dispatch = useAppDispatch();
    const [offersToRender, setOffersToRender] = useState<IB2bOffer[]>([])

    useEffect(() => {
        dispatch(getB2bFullListThunk(filters));
    }, [filters]);

    const openNewOffer = () => {
        setIsCreateOffer(!isCreateOffer);
    };

    const [fiatList, setFiatList] = useState<FiatProps[]>([
        { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />RUB</div>, value: 1 }
    ])
    const [tokenList, setTokenList] = useState<TokenProps[]>([
        { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />USDT</div>, value: 1 },
        { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />BTC</div>, value: 2 },
        { label: <div className={styles.fiatBox}><img src={''} alt="" className={styles.fiat} />ETH</div>, value: 3 },
    ])

    const getKrypto = async (token: string) => {
        const data = await GetB2bCharts(token);
        if (data.status === 200) {
            const temp: TokenProps[] = [];
            data.data.forEach((el: any) => {
                temp.push({ label: <div className={styles.fiatBox}><img src={el.icon} alt={el.name} className={styles.fiat} />{el.symbol}</div>, value: el.id })
            });
            setTokenList(temp)
        }
    }

    const getCurr = async (token: string) => {
        const data = await GetCurrency(token);
        if (data.status === 200) {
            const temp: FiatProps[] = [];
            data.data.forEach((el: any) => {
                temp.push({ label: <div className={styles.fiatBox}><img src={el.icon} alt={el.symbol} className={styles.fiat} />{el.name}</div>, value: el.id })
            })
            setFiatList(temp)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("access_token") ?? '';
        getKrypto(token)
        getCurr(token)
    }, [okveds])

    if (!companyInn) return <Navigate to='/b2b' />;

    const selectedCompany = companyList.find(c => c.inn === companyInn);
    if (!selectedCompany) return <Navigate to='/b2b' />;

    const className = isLoading
        ? `${styles.wrap} ${styles.disabled}`
        : styles.wrap;

    return (
        <Container>
            <div className={styles.b2bOffers}>
                <div className={styles.banner}>
                    <div className={styles.bannerTop}>Диктуйте свои правила b2b-сделок</div>
                    <div className={styles.bannerBottom}>GREEnavi предлагает выгодный курс покупки и продажи USDT без каких-либо комиссий</div>
                    <img src={bannerImg} alt="" />
                </div>
                <div className={styles.headWrapper}>
                    <B2BFilters filters={filters} sum={sum} disabled={isLoading} setAddNewOpen={openNewOffer} />
                    <div className={className}>
                        <CompanyMonitor company={selectedCompany} />
                        <button className={styles.createOfferButton} onClick={openNewOffer}>
                            + Добавить объявление
                        </button>
                    </div>

                </div>
                <Offers offers={offersToRender} filterSum={sum || 0} isLoading={isLoading} okveds={okveds} />
                <Paginator offers={offers} setOffersToRender={setOffersToRender} />
                <MainBlock
                    addNewOpen={isCreateOffer}
                    setAddNewOpen={openNewOffer}
                    tokenList={tokenList}
                    fiatList={fiatList}
                    okveds={okveds}
                />
            </div>
        </Container>
    );
};