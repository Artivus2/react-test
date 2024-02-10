import styles from './SixthBlock.module.scss';
import imgBlock6 from '../../../assets/img/main/imgBlock6.png';

export const SixthBlock = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ОБЕСПЕЧИВАЕМ</h3>
      <div className={styles.blockLists}>
        <div className={styles.listHead}>безопасность на платформе</div>
        <div className={styles.list}>
          Используем защищенный сервер с современной системой защиты от
          DDoS-атак
        </div>
        <div className={styles.list}>
          Используем двухэтапную аутентификацию при выводе средств
        </div>
        <div className={styles.list}>
          Администратор платформы лично проверяет вводы и выводы средств
          пользователей, которые прошли верификацию
        </div>
        <div className={styles.list}>Защищаем от фальсификации баланса</div>
        <div className={styles.list}>
          Записываем каждое действие пользователя
        </div>
        <div className={styles.list}>
          Гарантируем конфиденциальность действий пользователя
        </div>
      </div>
      <img src={imgBlock6} alt="404" className={styles.imgBlock} />
    </div>
  );
};
