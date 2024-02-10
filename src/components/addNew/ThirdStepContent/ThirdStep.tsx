import React from "react";
import styles from "./ThirdStep.module.scss";

export interface ThirdStepContentPropsType {
  setCondition: (params: string) => void;
}

const ThirdStepContent = ({ setCondition }: ThirdStepContentPropsType) => {

  return (
    <div className={styles.main}>
      <div className={styles.topBlock}>
        <p className={styles.title}>Условия сделки</p>
        <textarea
          onChange={(e) => setCondition(e.target.value.trim())}
          className={styles.rules}
          placeholder={`Впишите условия сделки. Пожалуйста, воздержитесь от использования в примечании любых терминов, связанных с криптовалютой, таких как P2P, C2C, BTC и USDT.`}
        ></textarea>
      </div>
      <div className={styles.bottomBlock}>
        <p>
          Обратите внимание, что согласно Правилам запрещено взимать дополнительные комиссии с контрагентов. Если Вы указываете информацию о комиссии в примечаниях или автоматические, мы можем навсегда заблокировать функцию размещения объявлений для Вашего аккаунта.
        </p>
      </div>
    </div>
  );
};
export default ThirdStepContent;
