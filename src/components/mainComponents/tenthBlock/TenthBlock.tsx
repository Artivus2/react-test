import styles from './TenthBlock.module.scss';
import iPhone from '../../../assets/img/main/iPhone14ProSpaceBlack.png';
import Pixel7Pro from '../../../assets/img/main/Pixel7Pro.png';
import ellipse from '../../../assets/img/main/Ellipse365.png';

export const TenthBlock = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ПРИСОЕДИНЯЙТЕСЬ К ПЛАТФОРМЕ GREENAVI</h3>
      <div className={styles.content}>Нам выгодно, когда вы зарабатываете</div>
      <div className={styles.imgContainer}>
        <img src={Pixel7Pro} alt="phone" />
        <img src={iPhone} alt="phone" />
      </div>
      <img src={ellipse} alt="404" className={styles.ellipse} />
    </div>
  );
};
