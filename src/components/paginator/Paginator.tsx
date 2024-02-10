import React, { useEffect, useState } from 'react'
import styles from './Paginator.module.scss'
import arr from '../../assets/icons/arrow-select-down.svg'

interface PaginatorPropsType {
  offers: any[];
  setOffersToRender: (param: any[]) => void;
}

const Paginator = ({
  offers,
  setOffersToRender
}: PaginatorPropsType) => {
  const [activePage, setActivePage] = useState(1)

  const maxOnPage = 6;
  const countPages = Math.ceil(offers.length / maxOnPage);

  useEffect(() => {
    const temp = offers.slice((activePage * maxOnPage) - maxOnPage, maxOnPage * activePage)
    setOffersToRender(temp)
  }, [activePage, offers, setOffersToRender])

  const prev = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1)
  }

  const next = () => {
    if (activePage === countPages) return;
    setActivePage(activePage + 1)
  }

  return (
    <div className={styles.main}>
      <div className={styles.arrLeft}>
        <img src={arr} alt="arr" onClick={prev} />
      </div>
      {
        Array.from(Array(countPages), (_, i) => i + 1)
          .map(el =>
            <div
              className={activePage === el ? styles.activePage : styles.page}
              key={el}
              onClick={() => setActivePage(el)}
            >
              {el}
            </div>
          )
      }
      <div className={styles.arrRight}>
        <img src={arr} alt="arr" onClick={next} />
      </div>
    </div>
  )
}

export default Paginator