import React from 'react';
import styles from './Option.module.scss';
import {SelectOption} from '../CustomSelect';
import {OptionValue} from "../OptionValue/OptionValue";

interface OptionProps extends SelectOption {
    isSelected: boolean;
    select: (id: string | number | null) => void;
}

export const Option: React.FC<OptionProps> = (props) => {

    const {id, icon, title, isSelected, select} = props;

    const selectHandler = () => {
        select(id);
    };

    const rootClassName = isSelected
        ? `${styles.option} ${styles.selected}`
        : styles.option;

    return (
        <div className={rootClassName} onClick={selectHandler}>
            <OptionValue title={title} icon={icon} isSelected={isSelected} />
        </div>
    );
};