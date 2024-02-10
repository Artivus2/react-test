import React from 'react'
import styles from './Statistics.module.scss'
import StatisticsItem from '../statisticsItem/StatisticsItem'

const Statistics = () => {

  const data = [
    {
      title: `Ордера за 30 дней`,
      body: `0 раз`,
    },
    {
      title: `Выполненных сделок в %`,
      body: `100 % за 30 дней`,
    },
    {
      title: `Среднее время перевода`,
      body: "0.00 мин.",
    },
    {
      title: `Среднее время ответа`,
      body: "0.00 мин.",
    },
    {
      title: `Зарегистрирован`,
      body: `00.00.0000`,
    },
    {
      title: `Все сделки`,
      body: `0 раз`,
    },
    {
      title: `Примерный объем за все время `,
      body: `00.00 USDT`,
    },
    {
      title: `Примерный объем за 30 дней`,
      body: "00.00 USDT",
    }
  ];

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Статистика</h2>
      <div className={styles.gridContainer}>
        {data.map((el, index) => (
          <StatisticsItem title={el.title} body={el.body} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Statistics