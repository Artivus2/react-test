import React from 'react'
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import styles from './ApealModal.module.scss'

export interface ApealModalPropsType {
  setIsOpen: (param: boolean) => void;
  setApeal: (param: boolean) => void;
}

const ApealModal = ({
  setIsOpen,
  setApeal,
}: ApealModalPropsType) => {
  return (
    <>
      <div className={styles.popup__cancel} onClick={() => setIsOpen(false)}>
        <div className={styles.popup__block} onClick={(e) => e.stopPropagation()}>
          <div className={styles.popup__title}>Подача апелляции</div>
          <Cross
            className={styles.popup__close}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.text}>
            <p>Перед тем как подать апелляцию попробуйте отправить в чат с продавцом подтверждение оплаты и информацию об аккаунте для уточнения деталей платежа</p>
          </div>
          <div className={styles.popup__btns}>
            <button
              className={styles.popup__yes}
              onClick={() => { setApeal(true); setIsOpen(false) }}
            >
              Подать апелляцию
            </button>
            <button
              className={styles.popup__no}
              onClick={() => setIsOpen(false)}
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApealModal