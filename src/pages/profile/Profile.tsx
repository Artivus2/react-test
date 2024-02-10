import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import UserInfo from '../../components/profileComponents/userInfo/UserInfo'
import UserIcon from "../../assets/icons/profile/sidebar/1_profile.svg";
import WalletIcon from "../../assets/icons/profile/sidebar/2_wallet.svg";
import BookIcon from "../../assets/icons/profile/sidebar/3_book.svg";
import ShieldIcon from "../../assets/icons/profile/sidebar/4_protection.svg";
import LockIcon from "../../assets/icons/profile/sidebar/5_lock.svg";
// import ReferralIcon from "../../assets/icons/profile/sidebar/6_gift.svg";
import SettingsIcon from "../../assets/icons/profile/sidebar/8_settings.svg";
import { Link, useLocation } from 'react-router-dom';
import { ProfileInfo } from '../../services/UserService';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { UserProfile } from '../../types/types';
import Container from '../../UI/container/Container';

interface ProfilePropsType {
  children: JSX.Element;
}

const nullProfile = {
  email: 'testemail@yandex.com',
  first_name: '',
  id: 0,
  image: '',
  last_name: '',
  login: 'a',
  patronymic: '',
  phone: '',
  status: 0,
  telegram: '',
  two_factor: false,
  verify_status: 0,
}

const Profile = ({ children }: ProfilePropsType) => {
  const [profile, setProfile] = useState<UserProfile>(nullProfile);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const checkToken = async (token: string) => {
    const { data } = await ProfileInfo(token);

    if (data === 'Token не найден') {
      localStorage.removeItem("access_token");
      document.location.href = '/'
    } else if (data === undefined) {
      // console.log('Слабое');
    } else {
      setProfile(data)
    }
  }

  useEffect(() => {
    profile?.login ? setLoading(false) : <></>
  }, [profile])

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('access_token') ?? '';
    checkToken(token);
  }, [location])

  const childWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, profile);
    }
    return child;
  });

  return (
    <div className={styles.bg}>
      {loading ?
        <Container className={styles.skeletonContainer}>
          <div className={styles.skeletonBlock1}>
            <Skeleton height={615} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
          </div>
          <div className={styles.skeletonBlock2}>
            <div style={{ marginBottom: '10px' }}>
              <Skeleton height={150} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
            </div>
            <div>
              <Skeleton height={450} baseColor={'#0ddcaa10'} highlightColor={'#0ddcaa30'} borderRadius={'8px'} />
            </div>
          </div>
        </Container>
        :
        <Container className={styles.main}>
          <div className={styles.navBlock}>
            <UserInfo name={profile.login} email={profile.email} isVerify={profile.verify_status} isEmail={profile.email ? 1 : 0} is2Fa={profile.two_factor ? 1 : 0} avatar={profile.image} />
          </div>
          <div className={styles.infoBlock}>
            {childWithProps}
          </div>
        </Container>
      }
    </div>
  )
}

export default Profile