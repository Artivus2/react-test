import React, { ChangeEvent, useState } from 'react'
import styles from './ApealConfirmModal.module.scss'
import { ApealProps } from '../../../../types/types';
import { ReactComponent as Cross } from "../../../../assets/icons/cross.svg";
import file from '../../../../assets/icons/file.svg';
import { SendB2bApeal } from '../../../../services/P2p';

interface ApealConfirmPropsType {
  setIsOpen: (param: boolean) => void;
  setShowApeal: (param: ApealProps) => void;
  user: string;
  orderId: number;
}

const ApealConfirmModal = ({
  setIsOpen,
  setShowApeal,
  user,
  orderId
}: ApealConfirmPropsType) => {
  const [photoList, setPhotoList] = useState<any[]>([]);
  const [tel, setTel] = useState('')
  const [desc, setDesc] = useState('')
  const [check, setCheck] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const goApel = async () => {
    if (tel && desc && check && photoList.length) {
      const token = localStorage.getItem("access_token") ?? '';
      const data = await SendB2bApeal(token, orderId)
      if (data.status === 200) {
        setShowApeal({ order_id: orderId, tel, desc, check, photoList, user })
        setIsOpen(false)
      } else {
        setErrorMessage(`Что-то пошло не так`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    } else {
      setErrorMessage(`Заполните все поля`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const getBase64 = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoList([...photoList, reader.result])
    };
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && photoList.length < 4) {
      const file = e.target.files[0];
      getBase64(file);
    }
  };

  return (
    <div className={styles.popup__cancel} onClick={() => setIsOpen(false)}>
      <div className={styles.popup__block} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup__title}>Подача апелляции</div>
        <Cross
          className={styles.popup__close}
          onClick={() => setIsOpen(false)}
        />
        <div className={styles.content}>
          <div className={styles.infoBlock}>
            <ol>
              <li>Причина апелляции и доказательства будут доступны обеим сторонам и технической поддержке платформы. Не допускайте отображения конфиденциальных персональных данных.</li>
              <li>В случае бездоказательной апелляции GREEnavi оставляет за собой право заблокировать аккаунт</li>
            </ol>
          </div>
          <div className={styles.changeBlock}>
            <div className={styles.popup__subtitle}>Причина апелляции</div>
            <div className={styles.radioBlock}>
              <p className={styles.radioText}>Выберите причину апелляции</p>
              <div className={styles.radioContainer}>
                <div className={styles.radio}>
                  <label className={styles.custom_radio}>
                    <input type="radio" name="type" value="1" onChange={(e) => setCheck(e.target.value)} />
                    <span>Вы совершили оплату, но продавец не перевел криптовалюту</span>
                  </label>
                </div>

                <div className={styles.radio}>
                  <label className={styles.custom_radio}>
                    <input type="radio" name="type" value="2" onChange={(e) => setCheck(e.target.value)} />
                    <span>Вы произвели оплату, превышающую сумму, указанную в заказе</span>
                  </label>
                </div>

                <div className={styles.radio}>
                  <label className={styles.custom_radio}>
                    <input type="radio" name="type" value="3" onChange={(e) => setCheck(e.target.value)} />
                    <span>Продавец нарушил Политику проведения транзакций</span>
                  </label>
                </div>

                <div className={styles.radio}>
                  <label className={styles.custom_radio}>
                    <input type="radio" name="type" value="4" onChange={(e) => setCheck(e.target.value)} />
                    <span>Продавец проигнорировал пункт «Условиях сделки»</span>
                  </label>
                </div>

                <div className={styles.radio}>
                  <label className={styles.custom_radio}>
                    <input type="radio" name="type" value="5" onChange={(e) => setCheck(e.target.value)} />
                    <span>Подозрительное поведение продавца</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.desc}>
            <div className={styles.popup__subtitle}>Пояснения</div>
            <textarea
              className={styles.textarea}
              placeholder={`Предоставьте информацию о причине апелляции наиболее подробно`}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.docs}>
            <div className={styles.popup__subtitle}>Доказательства</div>
            <div className={styles.imgBlock}>
              {
                photoList.length < 4 ?
                  <div className={styles.popup__file}>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                    <label htmlFor="fileInput">
                      <img src={file} alt="" />
                      Загрузить
                    </label>
                  </div>
                  : <></>
              }
              {
                photoList.map((el, index) => {
                  return <img src={photoList[index]} alt='' className={styles.doc} />
                })
              }
            </div>
            <p className={styles.popup__text}>Общее количество загружаемых файлов в любом формате не более 4 штук, их общий вес НЕ должен превышать 10 Мб.</p>
            <p className={styles.popup__text}>Допустимые форматы:</p>
            <p className={styles.popup__text}>.jpg; .jpeg; .png; .gif; .mp3; .mp4; .avi; .mov; .rm; .rmvb; .wmv</p>
          </div>
          <div className={styles.telBlock}>
            <div className={styles.popup__subtitle}>Телефон для связи</div>
            <input type="tel" name="" id="" placeholder='+7 (___) ___-__-__' className={styles.tel} onChange={(e) => setTel(e.target.value)} />
          </div>
        </div>
        {errorMessage ? error : <></>}
        <div className={styles.popup__btns}>
          <button
            className={styles.popup__yes}
            onClick={goApel}
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
  )
}

export default ApealConfirmModal