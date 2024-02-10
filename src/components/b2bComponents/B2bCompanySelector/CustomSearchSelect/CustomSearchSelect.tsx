import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './CustomSearchSelect.module.scss';
import {Option} from "./Option/Option";
import {OptionValue} from "./OptionValue/OptionValue";
import arrowDown from '../../../../assets/icons/arrow-select-down.svg';
import arrowUp from '../../../../assets/icons/arrow-select-up.svg';
import {useNavigate} from "react-router-dom";
import loop from '../../../../assets/icons/search-icon.svg';


export class SelectOption {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

interface CustomSearchSelectProps {
    options: SelectOption[];
    placeholder: string;
    findCompany: (inn: string) => void;
}

export const CustomSearchSelect: React.FC<CustomSearchSelectProps> = ({options, placeholder, findCompany}) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inn, setInn] = useState<string>('');

    useEffect(() => {
        if (inn.length === 10) {
            setInn('');
            setIsOpen(false);
            findCompany(inn);
        }
    }, [inn, findCompany, setInn, setIsOpen]);

    const selectOption = (id: string) => {
        navigate(`/b2b/${id}`);
    };

    const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isFinite(+e.currentTarget.value)) return;
        setInn(e.currentTarget.value);
    };

    const optionsToRender = options.map(option =>
        <Option
            key={option.id}
            select={selectOption}
            {...option}
        />
    );

    const selectClassName = isOpen
        ? `${styles.customSelect} ${styles.openBorder}`
        : styles.customSelect;

    return (
        <div className={styles.customSelectWrapper}>
            <div className={selectClassName}>
                <div className={styles.head} onClick={() => setIsOpen(!isOpen)}>
                    <OptionValue name={placeholder}/>
                    <img className={styles.arrow} src={isOpen ? arrowUp : arrowDown} alt='arrow'/>
                </div>
                {isOpen && (
                    <div className={styles.dropDownMenu}>
                        <div className={styles.searchField}>
                            <img src={loop} alt="loop-icon"/>
                            <input
                                type="text"
                                placeholder='поиск'
                                value={inn || ''}
                                onChange={onChangHandler}
                            />
                        </div>
                        {optionsToRender}
                    </div>
                )}
            </div>
            {isOpen && <div className={styles.disabledArea} onClick={() => setIsOpen(false)}/>}
        </div>
    );
};