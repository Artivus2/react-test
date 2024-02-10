import React from 'react';
import {v1} from 'uuid';
import style from './GeneralBlock.module.scss';
import {MainOption} from "./MainOption/MainOption";
import {DescriptionOption} from "./DescriptionOption/DescriptionOption";
import option1 from '../../../assets/icons/main/option1.png';
import option2 from '../../../assets/icons/main/option2.png';
import option3 from '../../../assets/icons/main/option3.png';
import option4 from '../../../assets/icons/main/option4.png';
import option5 from '../../../assets/icons/main/option5.png';
import generalPhone from '../../../assets/img/main/generalPhone.png';

interface IOption {
    id: string;
    text: string;
}

interface IMainOption extends IOption {
    icon: string;
}


const mainOptions: IMainOption[] = [
    {
        id: v1(),
        text: 'Взаимодействие физическими между юридическими лицами на локальном и международном уровнях',
        icon: option1,
    },
    {
        id: v1(),
        text: 'Торговая платформа мирового уровня',
        icon: option2,
    },
    {
        id: v1(),
        text: 'Возможность получать пассивный доход',
        icon: option3,
    },
    {
        id: v1(),
        text: 'Минимальные комиссии на рынке',
        icon: option4,
    },
    {
        id: v1(),
        text: 'Профессиональная поддержка клиентов',
        icon: option5,
    },
];

const descriptionOptions: IOption[] = [
    {
        id: v1(),
        text: 'Управлять портфелем децентрализованных финансов с помощью подключенного кошелька Web3 для размещения всех своих децентрализованных активов на одной платформе.',
    },
    {
        id: v1(),
        text: 'Торговать сотнями токенов и торговых пар на спотовых, маржинальных и деривативных рынках.',
    },
    {
        id: v1(),
        text: 'Создавать, покупать и продавать NFT на нашей торговой площадке NFT.',
    },
    {
        id: v1(),
        text: 'Создавать, покупать и продавать NFT на нашей торговой площадке NFT.',
    },
];

export const GeneralBlock = () => {

    const mainOptionsToRender = mainOptions.map(({id, ...rest}) => <MainOption key={id} {...rest} />);

    const descriptionOptionsToRender = descriptionOptions.map(({id, ...rest}) => <DescriptionOption
        key={id} {...rest} />);

    return (
        <div className={style.generalBlockWrapper}>
            <div className={style.rightBgLogo}/>
            <div className={style.centerBgLogo}/>
            <div className={style.leftBgLogo}/>
            <div className={style.blockContainer}>
                <h3>GREENAVI - ЭТО</h3>
                <ul className={style.mainOptionsWrapper}>
                    {mainOptionsToRender}
                </ul>
                <h3>У НАС ТЫ МОЖЕШЬ:</h3>
                <ul className={style.descriptionOptionsWrapper}>
                    {descriptionOptionsToRender}
                </ul>
                <img className={style.generalPhone} src={generalPhone} alt="phone-image"/>
            </div>
        </div>
    );
};