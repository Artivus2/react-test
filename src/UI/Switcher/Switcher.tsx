import React, {MouseEvent} from 'react';
import styles from './Switcher.module.scss';

interface SwitcherProps {
    viewOption1: string;
    viewOption2: string;
    option1: string;
    option2: string;
    value: string;
    changeValue: (value: string) => void;
}

interface SwitcherOptionProps {
    viewOption: string;
    option: string;
    value: string;
    changeValue: (value: string) => void;
}

export const Switcher: React.FC<SwitcherProps> = ({viewOption1, viewOption2, option1, option2, ...restProps}) => {

    return (
        <div className={styles.switcher}>
            <SwitcherOption viewOption={viewOption1} option={option1} {...restProps} />
            <SwitcherOption viewOption={viewOption2} option={option2} {...restProps} />
        </div>
    );
};


const SwitcherOption: React.FC<SwitcherOptionProps> = ({viewOption, option, value, changeValue}) => {

    const isSelected = option === value;

    const rootClassName = isSelected ? `${styles.option} ${styles.selectedOption}` : styles.option;

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        changeValue(option);
    };

    return (
        <button className={rootClassName} onClick={onClickHandler}>
            {viewOption}
        </button>
    );
};