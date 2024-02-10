import React, { useEffect, useState } from 'react'
import styles from './Error.module.scss'
import { Link, useLocation } from 'react-router-dom'

const Error = () => {
  const [current, setCurrent] = useState('')
  const location = useLocation();

  useEffect(() => {
    // (!location.state) && document.location.pathname !== '/404' ? document.location.href = '/404' : <></>
    setCurrent(location.pathname)
  }, [location])

  return (
    <div className={styles.confirm}>
      {
        current === 'confirm' ?
          <div className={styles.wrap}>
            <p className={styles.text} style={{ margin: `40% 0 0 0` }}>Адрес электронной почты подтвержден</p>
            <Link to={'/'}>
              <button className={styles.btn}>Вернуться на главную</button>
            </Link>
          </div>
          : current === '/merchant/success' ?
            <div className={styles.wrap}>
              <p className={styles.text} style={{ margin: `80% 0 0 0` }}>Успешно</p>
              <Link to={'/'}>
                <button className={styles.btn}>Вернуться на главную</button>
              </Link>
            </div>
            : current === '/merchant/fail' ?
              <div className={styles.wrap}>
                <p className={styles.text} style={{ margin: `80% 0 0 0` }}>Что-то пошло не так...</p>
                <Link to={'/'}>
                  <button className={styles.btn}>Вернуться на главную</button>
                </Link>
              </div>
              :
              <div className={styles.wrap}>
                <p className={styles.text} style={{ margin: `80% 0 0 0` }}>404</p>
                <p className={styles.text2}>Данная страница не найдена</p>
                <Link to={'/'}>
                  <button className={styles.btn}>Вернуться на главную</button>
                </Link>
              </div>
      }
    </div>
  )
}

export default Error