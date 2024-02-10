import React from 'react';
import style from './TradeButton.module.scss';
import {Link} from "react-router-dom";

export const TradeButton = () => {
    return (
        <Link to='/p2p' className={style.tradeButton}>
            <span>Торговать</span>
            <div className={style.tradeArrow}/>
        </Link>
    );
};