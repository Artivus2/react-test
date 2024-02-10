import styles from './HowDoesThisHappen.module.scss';
import background1 from './../../../assets/img/b2b/background1.png';
import background2 from './../../../assets/img/b2b/background2.png';

export const HowDoesThisHappen = () => {
  const data = [
    ' Продавец/покупатель выкладывает ордер, в котором содержится коммерческое предложение  ',
    'Продавец/покупатель выкладывает ордер, в котором содержится коммерческое предложение',
    'Платформа предоставляет информацию о благонадежности сторон (галочка благонадежности)',
    'Покупатель и продавец договариваются об условиях сделки в конфиденциальном чате и подписывают договор(им видны только данные о ЮЛ, сама коммуникация конфиденциальна)',
    'Отправляют подписанный скан договора с двух сторон на платформу ',
  ];
  const data2 = [
    'Проводится проверка администратором платформы',
    'Продавец перечисляет средства на счет платформы',
    'Продавец выполняет обязательства по договору',
    'Контрагенты обмениваются первичной финансово-хозяйственной документацией (договорами, счетами -фактурами, актами и т.д.)',
    'Продавец получает денежные средства расчетный счет',
  ];
  return (
    <div className={styles.howDoesThisHappen}>
      <h3 className={styles.title}>КАК ПРОИСХОДИТ?</h3>
      <p className={styles.infoTitle}>
        Безопасное заключение сделки между юридическими лицами на платформе
        Greenavi
      </p>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {data.map((item, key) => (
            <div key={key} className={styles.itemContainer}>
              <h3 key={key} className={styles.title}>
                {++key}
              </h3>
              {/* <img src={Circle} alt="404" className={styles.picture} /> */}
              <div className={styles.item}>{item}</div>
            </div>
          ))}
        </div>
        <div className={styles.content}>
          {data2.map((item, key) => (
            <div key={key} className={styles.itemContainer}>
              <h3 key={key} className={styles.title}>
                {6 + key}
              </h3>
              <div className={styles.item}>{item}</div>
            </div>
          ))}
        </div>
      </div>
      <img src={background1} alt="404" className={styles.background1} />
      <img src={background2} alt="404" className={styles.background2} />
    </div>
  );
};
