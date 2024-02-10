import React, { useEffect, useState } from 'react'
import styles from './History.module.scss'
import HistoryTable from './historyTable/HistoryTable';
import { IStatusList, UserProfile } from '../../../types/types';
import { GetStatusList } from '../../../services/UserService';

const History = (props: any) => {
  const [activeP2pNavItem, setActiveP2pNavItem] = useState(0);
  const [activeB2bNavItem, setActiveB2bNavItem] = useState(0);

  const [profile, setProfile] = useState<UserProfile>(props)

  const [statusList, setStatusList] = useState<IStatusList[]>([])

  const getStatusList = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const data = await GetStatusList(token);
    if (data.status === 200) {
      setStatusList(data.data)
    }
  }

  useEffect(() => {
    setProfile(props)
    getStatusList()
  }, [props])

  const navP2pItems = [
    {
      id: 0,
      title: `Активные сделки`,
    },
    {
      id: 1,
      title: `Последние операции`,
    },
    {
      id: 2,
      title: `Мои объявления`,
    },
  ];
  const navB2bItems = [
    {
      id: 0,
      title: `Активные сделки`,
    },
    {
      id: 1,
      title: `Последние операции`,
    },
    {
      id: 2,
      title: `Мои объявления`,
    },
  ];

  return (
    <>
      <div className={styles.root}>
        <div className={styles.p2pBlock}>
          <h2>P2P</h2>
          <div className={styles.nav}>
            <div className={styles.navLeft}>
              {navP2pItems.map((el, index) => (
                <span
                  onClick={() => setActiveP2pNavItem(index)}
                  className={`${styles.navItem} ${activeP2pNavItem === index ? styles.navItemActive : ""
                    }`}
                  key={el.id}
                >
                  {el.title}
                </span>
              ))}
            </div>
          </div>
          <HistoryTable statusList={statusList} type={activeP2pNavItem} profile={profile} title={'p2p'} />
        </div>
      </div>
      <div className={styles.root} style={{ marginTop: '10px' }}>
        <div className={styles.b2bBlock}>
          <h2>B2B</h2>
          <div className={styles.nav}>
            <div className={styles.navLeft}>
              {navB2bItems.map((el, index) => (
                <span
                  onClick={() => setActiveB2bNavItem(index)}
                  className={`${styles.navItem} ${activeB2bNavItem === index ? styles.navItemActive : ""
                    }`}
                  key={el.id}
                >
                  {el.title}
                </span>
              ))}
            </div>
          </div>
          <HistoryTable statusList={statusList} type={activeB2bNavItem} profile={profile} title={'b2b'} />
        </div>
      </div>
    </>
  )
}

export default History