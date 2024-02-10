import React, { useEffect, useState } from 'react';
import style from './RefCalculator.module.scss';
import { InputRange } from "./InputRange/InputRange";


export const RefCalculator = () => {
    const getResult = (rev: number, refCount: number) => rev * refCount * 0.25;

    const revInit = 10;
    const refCountInit = 10;
    const resultInit = getResult(revInit, refCountInit);

    const [rev, setRev] = useState<number>(revInit);
    const [refCount, setRefCount] = useState<number>(refCountInit);
    const [result, setResult] = useState<number>(resultInit);

    useEffect(() => {
        setResult(getResult(rev, refCount));
    }, [rev, setRev, refCount, setRefCount]);


    return (
        <div className={style.refCalculator}>
            <InputRange
                label='Оборот ваших друзей в USDT'
                value={rev}
                changeValue={setRev}
                min={0}
                max={10000}
            />
            <InputRange
                label='Количество рефералов'
                value={refCount}
                changeValue={setRefCount}
                min={0}
                max={100}
            />
            <div className={style.result}>
                <p>Вы заработаете</p>
                <span>{result.toFixed(2)} ₽</span>
            </div>
        </div>
    );
};