import React, { useState } from 'react';
import styles from './CustomSelect.module.scss';
import { Option } from "./Option/Option";
import { OptionValue } from "./OptionValue/OptionValue";
import arrowDown from '../../assets/icons/arrow-select-down.svg';
import arrowUp from '../../assets/icons/arrow-select-up.svg';


export class SelectOption {
    id: string | number | null;
    title: string;
    icon?: string;

    constructor(id: string | number, name: string, icon?: string) {
        this.id = id;
        this.title = name;
        if (icon) this.icon = icon;
    }
}

interface CustomSelectProps {
    options: SelectOption[];
    value: string | number | null;               // selectedOptionId
    placeholder: string;
    onChange: (id: string | number | null) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, placeholder, onChange }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectOption = (id: string | number | null) => {
        onChange(id);
        setIsOpen(false);
    };

    const selectedOption = options.find(o => o.id === value);

    const selectedValueToRender = selectedOption
        ? <OptionValue title={selectedOption.title} icon={selectedOption.icon} />
        : <OptionValue title={placeholder} />

    const optionsToRender = options.map(option =>
        <Option
            key={option.id}
            isSelected={option.id === value}
            select={selectOption}
            {...option}
        />
    );

    const nullOption = <Option isSelected={!value} select={selectOption} id={null} title={'Все'} />

    return (
        <div className={styles.customSelectWrapper}>
            <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
                {selectedValueToRender}
                <img className={styles.arrow} src={isOpen ? arrowUp : arrowDown} alt='arrow' />
            </div>
            {isOpen && <>
                <div className={styles.dropDownMenu}>
                    {nullOption}
                    {optionsToRender}
                </div>
                <div className={styles.disabledArea} onClick={() => setIsOpen(false)} />
            </>}
        </div>
    );
};