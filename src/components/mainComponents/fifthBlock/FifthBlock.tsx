import styles from './FifthBlock.module.scss';

export const FifthBlock = () => {
  return (
    <>
      <h3 className={styles.title}>ПРЕИМУЩЕСТВА P2P-ТОРГОВЛИ</h3>
      <div className={styles.blockCards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Стоимость</div>
          <div>
            У вас есть возможность определить желаемую цену при покупке или
            продаже криптовалюты
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Комиссии</div>
          <div>
            На нашем сервисе нет скрытых платежей. Мы взимаем комиссию
            с создателя предложения только в размере 0,2%, а комиссия сети —
            единственная плата за вывод криптовалюты
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Безопасность</div>
          <div>
            Наша команда способствует честным и надежным сделкам между
            контрагентами.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Способы оплаты</div>
          <div>
            Мы обеспечиваем поддержку широкого спектра популярных способов
            оплаты и постоянно обновляем список новыми вариантами
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Конфиденциальность</div>
          <div>
            В отличие от банковских переводов, платформы P2P не собирают никакой
            информации о покупателе и продавце
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Лёгкий старт</div>
          <div>
            После того, как вы успешно завершили процесс KYC транзакции
            выполняют три простых шага. Весь процесс обычно занимает от 5 до 10
            минут.
          </div>
        </div>
      </div>
    </>
  );
};
