import React from 'react';
import style from './B2BBlock.module.scss';
import PointOption from "./PointOption/PointOption";
import {v1} from "uuid";

interface IPointOption {
    id: string;
    pointPosition: 'left' | 'right';
    text: string;
}

const pointOptions: IPointOption[] = [
    {id: v1(), pointPosition: 'right', text: 'Поиск подходящих и проверенных контрагентов'},
    {id: v1(), pointPosition: 'right', text: 'Оптимизация бизнес процессов'},
    {id: v1(), pointPosition: 'right', text: 'Алгоритм анализа благонадежности контрагентов'},
    {id: v1(), pointPosition: 'left', text: 'Возможность приобретения и продажи ТМЦ и услуг'},
    {id: v1(), pointPosition: 'left', text: 'Безопасное заключение международных сделок'},
    {id: v1(), pointPosition: 'left', text: 'Криптовалютные переводы'},
];


export const B2BBlock = () => {

    const pointOptionsToRender = pointOptions.map(({id, ...rest}) => <PointOption key={id}  {...rest}/>);

    return (
        <div className={style.b2bBlockWrapper}>
            <div className={style.bgLogo}/>
            <h3>B2B СЕРВИС</h3>
            <p className={style.description}>
                помогает осуществить взаимодействие между<br/>юридическими лицами по всему миру
            </p>
            <div className={style.content}>
                <div className={style.background}/>
                <div className={style.optionsWrapper}>
                    {pointOptionsToRender}
                </div>
                <div className={style.overflowWrapper}>
                    <div className={style.circle}/>
                </div>
            </div>

        </div>
    );
};