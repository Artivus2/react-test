import React from 'react';
import style from './WorkOption.module.scss';

interface WorkOptionProps {
    icon: string;
}

export const WorkOption = ({icon}: WorkOptionProps) => {
    return (
        <div className={style.workOption}>
            <img src={icon} alt="work-icon"/>
        </div>
    );
};