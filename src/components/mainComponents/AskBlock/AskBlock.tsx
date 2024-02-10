import React from 'react';
import style from './AskBlock.module.scss';
import {TradeButton} from "./buttons/PayButton/TradeButton";
import {TelegramButton} from "./buttons/TelegramButton/TelegramButton";

export const AskBlock = () => {
    return (
        <div className={style.askBlock}>
            <h3>КТО МЫ?</h3>
            <p><span>GREEnavi</span> - это инновационная криптовалютная биржа с расширенными финансовыми предложениями.</p>
            <div className={style.buttonWrapper}>
                <TradeButton/>
                <TelegramButton/>
            </div>
        </div>
    );
};