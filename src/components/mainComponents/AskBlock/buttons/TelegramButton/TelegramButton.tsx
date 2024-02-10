import React from 'react';
import style from './TelegramButton.module.scss';

export const TelegramButton = () => {
    return (
        <a
            href='https://telegram.org/'
            target='_blank'
            className={style.telegramButton}
        />
    );
};