import styles from './HowItWorksBlock.module.scss';
import card from './../../../assets/img/b2b/Card.png';
import phone from './../../../assets/img/b2b/phone.png';
import note from './../../../assets/img/b2b/note.png';
import money from './../../../assets/img/b2b/money.png';
import Arrow from './../../../assets/img/b2b/Arrow .png';

export const HowItWorksBlock = () => {
  return (
    <div className={styles.howItWorksBlock}>
      <h3>КАК ЭТО РАБОТАЕТ?</h3>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={phone} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              <div>Создайте учетную запись</div>
              <div>Скачайте приложение бесплатно, подпишитесь</div>
              <div>Зарегистрируйте и подтвердите свою учетную запись.</div>
            </div>
          </div>
          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
        <img src={Arrow} alt="404" className={styles.arrow} />
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={note} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              <div>Найдите, интересующего вас контрагента </div>
              <div>
                На нашей платформе все компании проходят полную верификацию,
                вплоть до ген.директоров.
              </div>
            </div>
          </div>
          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
        <img src={Arrow} alt="404" className={styles.arrow} />
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img src={money} alt="404" className={styles.picture} />
            </div>
            <div className={styles.textContainer}>
              <div> Получите возможность создавать ордера</div>
              <div>
                После полной проверки у вас появится возможность создавать
                коммерческие предложения на основе ордеров, а также вы сможете с
                легкостью найти себе подходящих подрядчиков.
              </div>
            </div>
          </div>
          <img src={card} alt="404" className={styles.cardBackground} />
        </div>
      </div>
    </div>
  );
};
