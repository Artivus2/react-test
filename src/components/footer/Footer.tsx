import React from 'react'
import styles from './Footer.module.scss'
import { ReactComponent as TG } from "../../assets/icons/footer/telegram.svg.svg";
import { ReactComponent as YouTube } from "../../assets/icons/footer/youtube.svg.svg";
import { ReactComponent as VK } from "../../assets/icons/footer/vk.svg.svg";
import { ReactComponent as Vcru } from "../../assets/icons/footer/vcru.svg.svg";
import { ReactComponent as Email } from "../../assets/icons/footer/email.svg";
import FooterItem from './footerItem/FooterItem';
import footerLogo from '../../assets/img/footerLogo.svg';
import Container from '../../UI/container/Container';

const Footer = () => {

  const data = [
    {
      title: `Продукты`,
      gridItems: [
        `P2P-торговля`,
        `Спот`,
        `Опцион`,
        `Фьючерсы`,
        `B2B`,
      ],
    },
    {
      title: `Поддержка`,
      gridItems: [
        `Контакты`,
        `Политика конфидециальности`,
        `Условия соглашения`,
        `Руководство по торговле`,
        `Правила торговли`,
      ],
    },
    {
      title: `Социальные сети`,
      gridItems: [
        "Telegram",
        `VK`,
        `YouTube`,
      ],
    },
    {
      title: `Торговля`,
      gridItems: [
        `Купить USDT`,
        `Продать USDT`,
      ],
    },
  ];

  return (
    <div className={styles.bg}>
      <Container className={styles.root}>
        {/* <div className={styles.footerLogoBlock}>
          <img src={footerLogo} alt="" />
        </div> */}
        <div className={styles.grid}>
          {data.map((el, index) => (
            <FooterItem title={el.title} gridItems={el.gridItems} key={index} />
          ))}
        </div>
        <div className={styles.contactBlock}>
          <div>
            <img src={''} alt="" className={styles.logo} />
          </div>
          <div className={styles.contacts}>
            <TG />
            <YouTube />
            <VK />
            <Vcru />
          </div>
          <div className={styles.emailBlock}>
            <Email />
            <span>GRENAVI@GREENAVI.RU</span>
          </div>
          <div className={styles.right}>{`© 2023 GREEnavi.ru Все права защищены.`}</div>
        </div>
      </Container>
    </div>
  )
}

export default Footer