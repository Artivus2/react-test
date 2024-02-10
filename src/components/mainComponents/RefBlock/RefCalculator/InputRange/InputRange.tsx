import React, { ChangeEvent, useId, useState } from 'react';
import s from './InputRange.module.scss';
import './inputStyle.scss';

interface InputRangeProps {
    value: number;
    changeValue: (value: number) => void;
    label: string;
    min: number;
    max: number;
}


export const InputRange: React.FC<InputRangeProps> = ({ label, value, changeValue, min, max }) => {

    const [state, setState] = useState<number>(value);
    const id = useId();

    const onMouseUpRangeHandler = () => {
        changeValue(state);
    };

    const onChangeRangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(+e.currentTarget.value);
    };

    const onChangeTextInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        if (value < min || value > max) return;

        setState(value);
        changeValue(value);
    };

    return (
        <div className={s.inputRange}>
            <label htmlFor={id}>{label}</label>
            <div className={s.inputFlexWrapper}>
                <input
                    type="range"
                    className={`styled-slider slider-progress ${s.range}`}
                    value={state}
                    min={min}
                    max={max}
                    onChange={(e) => { changeValue(+e.target.value); onChangeRangeHandler(e) }}
                    // onChange={onChangeRangeHandler}
                    onMouseUp={onMouseUpRangeHandler}
                />
                <input
                    type="text"
                    className={s.monitor}
                    id={id}
                    value={state}
                    // onChange={(e) => changeValue(+e.target.value)}
                    onChange={onChangeTextInputHandler}
                />
            </div>
        </div>
    );
};