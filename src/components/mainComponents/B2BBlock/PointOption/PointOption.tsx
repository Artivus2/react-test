import React from 'react';
import style from './PointOption.module.scss';

interface PointOptionProps {
    pointPosition: 'left' | 'right';
    text: string;
}

export const PointOption = ({pointPosition, text}: PointOptionProps) => {

    const rootClassName = pointPosition === 'left'
        ? style.pointOption
        : `${style.pointOption} ${style.rightPoint}`;

    return (
        <div className={rootClassName}>
            <p className={style.text}>{text}</p>
            <div className={style.point}/>
        </div>
    );
};

export default PointOption;