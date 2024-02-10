import styles from './B2bBuisnesPlatform.module.scss';
import Bitcoin from './../../../assets/img/b2b/Bitcoin.png';
import Ellipse from './../../../assets/img/b2b/Ellipse 6.png';
import Planet from './../../../assets/img/b2b/g3.png';
import {B2BCompanySelector} from "../B2bCompanySelector/B2bCompanySelector";

export const B2bBuisnesPlatform = () => {


    return (
        <div className={styles.B2bBuisnesPlatform}>
            <div className={styles.inputContainer}>
                <h4 className={styles.title}>
                    <span>B2B</span> - платформа для вашего бизнеса.
                </h4>
                <div className={styles.titleInfo}>
                    Мы привносим реальные решения в мир платежей, используя общедоступные
                    блокчейны.
                </div>
                <B2BCompanySelector/>
            </div>
            <div className={styles.startContainer}>
                <div className={styles.picture}>
                    <img src={Bitcoin} alt="404" className={styles.picture}/>
                </div>
                <div className={styles.startInfo}>
          <span>
            GREEnavi B2B - это новое предприятие, созданное при инвестициях и
            сотрудничестве с CUCOIN, GEMINI, BINANCE и тд.
          </span>
          <span>
            Мы намереваемся запустить первую в своем роде расчетную палату для
            бизнеса, которая стремится способствовать следующему этапу развития
            рынка.
          </span>
          <span>
            Централизованная платформа с поддержкой API решает ключевые проблемы
            оптимизацией бизнес процессов и поиском подходящих и проверенных
            контрагентов.
          </span>
          <button className={styles.startWorkButton} >НАЧАТЬ РАБОТУ</button>
        </div>
      </div>
      <img src={Ellipse} alt="404" className={styles.backgrondEllipse} />
      <img src={Planet} alt="404" className={styles.backgrondPlanet} />
    </div>
  );
};
