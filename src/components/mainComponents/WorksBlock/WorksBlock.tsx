import React from 'react';
import style from './WorksBlock.module.scss';
import {WorkOption} from "./WorkOption/WorkOption";
import kukoin from '../../../assets/icons/main/kukoin.svg';
import gemini from '../../../assets/icons/main/gemini.svg';
import binance from '../../../assets/icons/main/binance.svg';
import coinbase from '../../../assets/icons/main/coinbase.png';
import gate from '../../../assets/icons/main/gate.png';
import bitstamp from '../../../assets/icons/main/bitstamp.svg';
import bybit from '../../../assets/icons/main/bybit.svg';
import bitfinex from '../../../assets/icons/main/bitfinex.png';
import okx from '../../../assets/icons/main/okx.svg';



export const WorksBlock = () => {
    return (
        <div className={style.blockWrapper}>
            <div className={style.bgLogo}/>
            <div className={style.worksBlock}>
                <div className={style.title}>
                    <h3>МЫ РАБОТАЕМ</h3>
                    <div className={style.add}>
                        с крупными криптовалютными биржами
                    </div>
                </div>
                <WorkOption icon={kukoin}/>
                <WorkOption icon={gemini}/>
                <WorkOption icon={binance}/>
                <WorkOption icon={coinbase}/>
                <WorkOption icon={gate}/>
                <WorkOption icon={bitstamp}/>
                <WorkOption icon={bybit}/>
                <WorkOption icon={bitfinex}/>
                <WorkOption icon={okx}/>
            </div>
    </div>
    );
};