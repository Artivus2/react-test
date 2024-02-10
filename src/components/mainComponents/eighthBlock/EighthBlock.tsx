import styles from './EighthBlock.module.scss';
import phoneImg from '../../../assets/img/main/phoneImg.png';
import Ellipse3 from '../../../assets/img/main/Ellipse3.png';

export const EighthBlock = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>НЕ ЗНАЕШЬ, С ЧЕГО НАЧАТЬ?</h3>
      <div className={styles.content}>Ничего страшного! </div>
      <div className={styles.content}>
        Пройди наше небольшое обучение и начинай зарабатывать свои первые
        деньги.
      </div>
      <img src={phoneImg} alt="404" className={styles.phoneImg} />
      <img src={Ellipse3} alt="404" className={styles.ellipse3} />
    </div>
  );
};
