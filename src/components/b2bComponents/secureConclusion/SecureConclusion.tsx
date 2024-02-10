import styles from './SecureConclusion.module.scss';
import features_card from './../../../assets/img/b2b/features_card.png';

import { useState } from 'react';

export const SecureConclusion = () => {
  const [startButton, setStartButton] = useState(true);
  return (
    <div className={styles.secureConclusion}>
      {/* <div className={styles.picture}>
        <img src={features_card} alt="404" className={styles.picture} />
      </div> */}
      <div className={styles.startContainer}>
        <div className={styles.startInfo}>
          <span></span>
          <span>Безопасное заключение международных сделок</span>
          <span>
            Получили после проверки рейтинг от службы безопасности платформы о
            благонадежности контрагента
          </span>
          <span>Обмены по цепочке</span>
          <span>Прямые переводы контрагенту</span>
          <span>Взаимодействие между юридическими лицами по всему миру</span>
          <span>Возможность приобретения и продажи ТМЦ и услуг</span>

          {/* <button className={styles.startWorkButton} disabled={startButton}>
            НАЧАТЬ РАБОТУ
          </button> */}
        </div>
      </div>
    </div>
  );
};
