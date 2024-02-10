import React from 'react';
import styles from './Option.module.scss';
import {SelectOption} from '../CustomSearchSelect';
import {OptionValue} from "../OptionValue/OptionValue";

interface OptionProps extends SelectOption {
    select: (id: string) => void;
}

export const Option: React.FC<OptionProps> = (props) => {

    const {id, name, select} = props;

    const selectHandler = () => {
        select(id);
    };

    return (
        <div className={styles.option} onClick={selectHandler}>
            <OptionValue name={name} />
        </div>
    );
};