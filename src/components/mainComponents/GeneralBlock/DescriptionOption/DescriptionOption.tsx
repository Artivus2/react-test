import React from 'react';
import style from './DescriptionOption.module.scss';

interface DescriptionOptionProps {
    text: string;
}

export const DescriptionOption = ({text}: DescriptionOptionProps) => {
    return (
        <li className={style.descriptionOption}>
            {text}
        </li>
    );
};