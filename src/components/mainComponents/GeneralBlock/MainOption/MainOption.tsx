import React from 'react';
import style from './MainOption.module.scss';
import {OptionIcon} from "./OptionIcon/OptionIcon";

interface OptionProps {
    text: string;
    icon: string;
}

export const MainOption = ({text, icon}: OptionProps) => {
    return (
        <li className={style.option}>
            <p>{text}</p>
            <OptionIcon icon={icon}/>
        </li>
    );
};