import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ConfirmModal.module.scss'
import { ReactComponent as Cross } from "../../../assets/icons/cross.svg";
import file from "../../../assets/icons/file.svg";
import checked from "../../../assets/icons/checked.svg";
import { BuyerPay } from '../../../services/P2p';
import PubNub from "pubnub";

interface ConfirmModalPropsType {
  setIsOpenConfirm: (isOpen: boolean) => void;
  id: number;
  userId: number;
  date: string;
}

const ConfirmModal = ({
  setIsOpenConfirm,
  id,
  userId,
  date
}: ConfirmModalPropsType) => {
  const [photoList, setPhotoList] = useState<string | ArrayBuffer | null | File>();
  const [checkedInput, setCheckedInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const pubnub = new PubNub({
    publishKey: 'pub-c-ed0d5f65-4368-492b-a376-0b82917208b9',
    subscribeKey: 'sub-c-7a080724-d4d0-46af-a644-53d651aa3dd4',
    userId: `${userId}`
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPhotoList(file)
    }
  };

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (ok) {
      goNext()
    }
  }, [ok])


  const sendFile = async () => {
    if (!photoList) return;
    pubnub
      //@ts-ignore
      .sendFile({ channel: `p2p_order_${id}${date.split(" ").join('_').split("-").join("_").split(":").join("_")}`, file: photoList, message: '' })
      .then(res => {
        setOk(true);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const goNext = async () => {
    if (checkedInput) {
      const token = localStorage.getItem("access_token") ?? '';
      const data = await BuyerPay(token, id);
      if (data.status === 200) {
        setLoading(false)
        setIsOpenConfirm(false)
        document.location.reload();
      } else {
        setLoading(false)
        setErrorMessage("Что-то пошло не так...")
        setTimeout(() => {
          setErrorMessage("")
        }, 3000);
      }
    } else {
      setLoading(false)
      setErrorMessage("Ознакомтесь с информацией")
      setTimeout(() => {
        setErrorMessage("")
      }, 3000);
    }
  }

  const checkPhoto = () => {
    if (photoList || !loading) {
      setLoading(true)
      sendFile()
    } else if (!loading && !photoList) {
      setErrorMessage(`Загрузите фото оплаты`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  return (
    <div className={styles.popup} onClick={() => setIsOpenConfirm(false)}>
      <div className={styles.popup__block} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup__title}>Подтверждение оплаты</div>
        <Cross
          className={styles.popup__close}
          onClick={() => setIsOpenConfirm(false)}
        />
        <div className={styles.popup__text}>
          Покиньте платформу для самостоятельного осуществления перевода. Автоматический перевод от Вашего имени невозможен.
        </div>
        <div className={styles.popup__text}>
          <Cross className={styles.popup__subclose} />
          Нажатие кнопки “Переведено” без подтверждения оплаты приведет к
          временной блокировки Вашего аккаунта. Мы также оставляем за собой право
          требовать возмещение убытков в случае необходимости
        </div>
        <div className={styles.popup__subtitle}>
          1. Загрузите подтверждение оплаты <span>*</span>
        </div>
        <div className={styles.popup__text}>
          Загрузите и отправьте подтверждение оплаты. Загружаемые файлы должны быть в формате .jpg; .jpeg или .png.
        </div>
        <div className={styles.imgBlock}>
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
          {photoList && <p className={styles.fileInfo}>Вы загрузили изображение</p>}
        </div>

        <div className={styles.popup__checboxs}>
          <div className={styles.popup__checbox}>
            <input
              type="checkbox"
              id="checked"
              onChange={(e) => setCheckedInput(e.target.checked)}
            />
            <label htmlFor="checked">
              <img src={checked} alt="" />
            </label>
          </div>
          <span>Я ознакомлен (а) и принимаю информацию выше</span>
        </div>
        {errorMessage ? error : <></>}
        <div className={styles.popup__btns}>
          <button
            className={checkedInput || !loading ? styles.btnOk : styles.btnDis}
            onClick={() => {
              checkPhoto()
            }}
          >
            Подтвердить оплату
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal