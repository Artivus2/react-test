import styles from './Search.module.scss';
import card from './../../../assets/img/b2b/Card.png';
import picture1 from './../../../assets/img/b2b/picture1.png';
import picture2 from './../../../assets/img/b2b/picture2.png';
import picture3 from './../../../assets/img/b2b/picture3.png';
import picture4 from './../../../assets/img/b2b/picture4.png';

export const SearchBlock = () => {
  return (
    <div className={styles.search}>
      <h3>ПОИСК</h3>
      <div className={styles.titleInfo}>проверенных контрагентов на платформе</div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={picture1} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              Компания и ее ген.директор прошли верификацию
            </div>
          </div>
          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={picture2} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              Указали корректные данные (инн и оквэд)
            </div>
          </div>

          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={picture3} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              Получили после проверки рейтинг от службы безопасности платформы о
              благонадежности контрагента
            </div>
          </div>

          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={picture4} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              Получили возможность размещать свои коммерческие предложения в
              виде ордеров и находить для себя проверенных и подходящих
              подрядчиков.
            </div>
          </div>

          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
      </div>
    </div>
  );
};
