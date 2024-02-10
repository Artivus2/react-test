import React from 'react'
import styles from './UserInfo.module.scss'
import Error from "../../../UI/Error/Error";
import Success from "../../../UI/Success/Success";
import { Link } from "react-router-dom";
import UserIcon from "../../../assets/icons/profile/sidebar/1_profile.svg";
import WalletIcon from "../../../assets/icons/profile/sidebar/2_wallet.svg";
import BookIcon from "../../../assets/icons/profile/sidebar/3_book.svg";
import ShieldIcon from "../../../assets/icons/profile/sidebar/4_protection.svg";
import LockIcon from "../../../assets/icons/profile/sidebar/5_lock.svg";
// import ReferralIcon from "../../../assets/icons/profile/sidebar/6_gift.svg";
import SettingsIcon from "../../../assets/icons/profile/sidebar/8_settings.svg";

interface ProfileTopProps {
  name: string;
  email: string | null;
  isVerify: number;
  isEmail: number;
  is2Fa: number;
  avatar: string;
}

const sidebarItems = [
  {
    icon: UserIcon,
    title: `Профиль`,
    route: "",
  },
  {
    icon: WalletIcon,
    title: `Кошелёк`,
    route: "wallet",
  },
  {
    icon: BookIcon,
    title: `История`,
    route: "history",
  },
  {
    icon: ShieldIcon,
    title: `Безопасность`,
    route: "safety",
  },
  {
    icon: LockIcon,
    title: `Верификация`,
    route: "verify",
  },
  // {
  //   icon: ReferralIcon,
  //   title: "Реферальная программа",
  //   route: "ref",
  // },
  {
    icon: SettingsIcon,
    title: `Настройки`,
    route: "settings",
  },
];

const ProfileTop = ({ name, email, isVerify, isEmail, is2Fa, avatar }: ProfileTopProps) => {

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.userInfo}>
        <div className={styles.iconWrap}>
          <img className={styles.div} src={avatar} alt="avatar" />
        </div>
        <div className={styles.info}>
          <h2 className={styles.titleInfo}>{name}</h2>
          <h2 className={styles.titleInfo2}>{email}</h2>
          <div className={styles.errorWrap}>
            <Link to={'/profile/verify'}>
              {!isVerify ? <Error title={`Профиль не подтвержден`} /> : <Success title={`Профиль подтвержден`} />}
            </Link>
            <Link to={'/profile/safety'}>
              {!isEmail ? <Error title="Email" /> : <Success title="Email" />}
            </Link>
            <Link to={'/profile/safety'}>
              {!is2Fa ? <Error title={`Двухфакторная аутентификация (2FA)`} /> : <Success title={`Двухфакторная аутентификация (2FA)`} />}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.nav}>
        {sidebarItems.map((el, index) => (
          <Link
            to={`/profile/${el.route}`}
            className={`${styles.sidebarItems} ${document.location.pathname.split('/')[2] === el.route ? styles.sidebarItemsActive : ""
              }`}
            key={index}
          >
            <img src={el.icon} alt="" />
            <h3 className={styles.sidebarItemsTitle}>{el.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileTop;
