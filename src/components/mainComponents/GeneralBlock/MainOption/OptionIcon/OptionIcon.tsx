import React from 'react';
import style from './OptionIcon.module.scss';

interface OptionIconProps {
    icon: string;
}

export const OptionIcon = ({icon}: OptionIconProps) => {


    return (
        <div className={style.optionIconWrapper}>
            <img src={icon} alt="option-icon"/>
        </div>
    );
};