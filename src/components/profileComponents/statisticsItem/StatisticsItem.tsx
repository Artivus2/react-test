import React from 'react'
import styles from './StatisticsItem.module.scss'

interface StatisticsItemProps {
  title: string;
  body: string;
}

const StatisticsItem = ({
  title,
  body
}: StatisticsItemProps) => {
  return (
    <div className={styles.gridItem}>
      <p className={styles.gridItemTitle}>{title}</p>
      <p className={styles.gridItemBody}>{body}</p>
    </div>
  )
}

export default StatisticsItem