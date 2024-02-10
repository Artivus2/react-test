import { FC, useState } from 'react';
import styles from './NinthBlock.module.scss';
import arrowbottom from '../../../assets/img/main/arrowbottom.svg';
import ellipse from '../../../assets/img/main/Ellipse5.png';

export const NinthBlock = () => {
    const content = [
        [
            {
                title: 'Что такое P2P биржа?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'В чем отличие от обменного сервиса?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Какие гарантии, что меня не обманут?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Как быстро проходит сделка?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Почему я не указываю кошелек к получению?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
        ],
        [
            {
                title: 'За что могут заблокировать на платформе?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Какие комиссии по вводу и выводу криптовалют?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Как стать партнером платформы?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Есть ли ограничения по оборотам криптовалюты?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
            {
                title: 'Когда будут доступны другие монеты?',
                text: '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, provident soluta maiores minus iste illo. Commodi quas omnis sunt reiciendis dolore soluta impedit, eaque enim reprehenderit neque alias optio eius?',
            },
        ],
    ];

    return (
        <>
            <h3 className={styles.title}>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h3>
            <div className={styles.accardionContainer}>
                <div className={styles.accardionBlock}>
                    <button className={styles.topButton}>начинающий</button>
                    {content[0].map((list, key) => (
                        <AccordionList title={list.title} info={list.text} key={key} />
                    ))}
                </div>
                <div className={styles.accardionBlock}>
                    <button className={styles.topButton}>продвинутый</button>
                    {content[1].map((list, key) => (
                        <AccordionList title={list.title} info={list.text} key={key} />
                    ))}
                </div>
                <img src={ellipse} alt="404" className={styles.ellipse} />
            </div>
        </>
    );
};

interface AccardionProps {
    title: string;
    info: string;
}

const AccordionList: FC<AccardionProps> = ({ title, info }) => {
    let [openInfo, setOpen] = useState(false);
    return (
        <div className={styles.list}>
            <div className={styles.listContainer}>
                {title}
                <button
                    onClick={() => setOpen(!openInfo)}
                    className={
                        openInfo ? `${styles.buttonListOpen}` : `${styles.buttonListClose}`
                    }
                >
                    <img src={arrowbottom} alt="phone" />
                </button>
            </div>
            {openInfo && <div className={styles.listInfo}>{info}</div>}
        </div>
    );
};
