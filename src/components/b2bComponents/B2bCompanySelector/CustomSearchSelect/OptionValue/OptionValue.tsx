import React from 'react';
import styles from './OptionValue.module.scss';
import {SelectOption} from "../CustomSearchSelect";

type PropsType = Omit<SelectOption, 'id'>;

export const OptionValue: React.FC<PropsType> = ({name}) => {

    return (
        <div className={styles.optionValue}>
            <span>{name}</span>
        </div>
    );
};