import React from 'react'
import style from './MainTopBlock.module.scss'
import {Link} from 'react-router-dom'
import Container from "../../../UI/container/Container";

const MainTopBlock = () => {
    return (
        <>
            <div className={style.main}>
                <div className={style.bg} id="bg">
                    <Container>
                        <div className={style.logoBlock}>
                            <div className={style.logoText}>
                                GREEnav<span>i</span>
                            </div>
                        </div>
                        <div className={style.textBlock}>
                            <p className={style.title}>
                                инновационная криптовалютная биржа с расширенными финансовыми предложениями.
                            </p>
                            <div className={style.textBtnBlock}>
                                <Link
                                    to={'/p2p'}
                                    style={{textDecoration: 'none'}}
                                >
                                    <div className={style.tradeBtn}>
                                        <div className={style.tradeText}>Торговать</div>
                                        <div className={style.tradeArr}/>
                                    </div>
                                </Link>
                                <div className={style.telegramBtn}/>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className={style.promotion}>
                <p className={style.promotionText}>
                    Получите 50 ₽ за каждый завершенный ордер
                </p>
            </div>
        </>
    )
}

export default MainTopBlock