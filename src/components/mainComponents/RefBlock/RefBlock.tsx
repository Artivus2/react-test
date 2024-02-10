import React from 'react';
import style from './RefBlock.module.scss';
import { StyledButton } from "../../../UI/StyledButton/StyledButton";
import { RefCalculator } from "./RefCalculator/RefCalculator";

export const RefBlock = () => {

    const getRef = () => {
        //   alert('no api for ref');
    };

    return (
        <div className={style.refBlock}>
            <RefCalculator />
            <div className={style.rightContainer}>
                <h3><span>Торгуйте вместе с друзьями.</span><br />Зарабатывайте больше</h3>
                <StyledButton className={style.refButton} onClick={getRef}>
                    Получить реферальную ссылку
                </StyledButton>
            </div>
        </div>
    );
};