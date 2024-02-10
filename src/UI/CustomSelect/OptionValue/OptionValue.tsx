import React from 'react';
import styles from './OptionValue.module.scss';
import { SelectOption } from "../CustomSelect";

type PropsType = Omit<SelectOption, 'id'> & {
    isSelected?: boolean;
};

export const OptionValue: React.FC<PropsType> = ({ title, icon, isSelected }) => {

    const rootClassName =
        //  isSelected
        // ? `${styles.optionValue} ${styles.selected}`
        // : 
        styles.optionValue;

    return (
        <div className={rootClassName}>
            {icon && <img src={icon} alt="icon" />}
            <span>{title}</span>
        </div>
    );
};