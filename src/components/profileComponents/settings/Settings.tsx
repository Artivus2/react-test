import React, { useEffect, useRef, useState } from 'react'
import styles from './Settings.module.scss'
import cross from '../../../assets/icons/cross.svg'
import Input from '../../../UI/Input'
import { UserProfile } from '../../../types/types'
import { ChangeAvatar, ChangeProfile } from '../../../services/UserService'

const Settings = (props: any) => {
  const [showNameModal, setShowNameModal] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [newLogin, setNewLogin] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')

  const [profile, setProfile] = useState<UserProfile>(props)

  useEffect(() => {
    setProfile(props)
  }, [props])

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const ok = <div className={styles.ok}>
    {okMessage}
  </div>

  const changeName = async () => {
    if (newLogin.trim().length < 4) {
      setErrorMessage(`Длина имени должна быть больше четырёх символов`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    } else {
      const newProfile = {
        login: newLogin,
        telegram: profile.telegram,
        last_name: profile.last_name,
        first_name: profile.first_name,
        patronymic: profile.patronymic,
      }

      const token = localStorage.getItem("access_token") ?? '';
      const data = await ChangeProfile(token, newProfile);
      if (data.status === 200) {
        setOkMessage(`Данные успешно изменены`)
        setTimeout(() => {
          setOkMessage('');
          document.location.reload();
        }, 3000);
      } else {
        setErrorMessage(`Что-то пошло не так...`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  }

  const bg = <div className={styles.avatarMain} onClick={() => { setShowNameModal(false); setShowAvatarModal(false) }}></div>
  const nameModal =
    <div className={styles.nameRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Изменить логин</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowNameModal(false)}
        />
      </div>
      <Input
        value={newLogin}
        setValue={setNewLogin}
        placeholder={`Новый логин`}
        type={'text'}
      />
      {errorMessage ? error : <></>}
      {okMessage ? ok : <></>}
      <button className={styles.btn} onClick={changeName}>Изменить</button>
    </div>

  const [photoList, setPhotoList] = useState<any>([])
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const currentTypes = ['jpeg', 'jpg', 'png']

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      if (currentTypes.indexOf(e.target.files[0].type.split('/')[1]) !== -1) {
        setPhotoList([...photoList, ...e.target.files])
      } else {
        setErrorMessage(`Формат фото должен быть .jpeg, .jpg или .png`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (currentTypes.indexOf(e.dataTransfer.files[0].type.split('/')[1]) !== -1) {
        setPhotoList([...photoList, ...e.dataTransfer.files])
      } else {
        setErrorMessage(`Формат фото должен быть .jpeg, .jpg или .png`)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    }
  };

  const onButtonClick = () => {
    //@ts-ignore
    inputRef.current.click();
  };

  const changeAvatar = async () => {
    const token = localStorage.getItem("access_token") ?? '';
    const { data } = await ChangeAvatar(token, photoList[0])
    if (data?.image) {
      document.location.reload()
    }
  }

  const avatarModal =
    <div className={styles.nameRoot}>
      <div className={styles.topBlock}>
        <p className={styles.topBlocktitle}>Изменить изображение</p>
        <img
          src={cross}
          alt=""
          className={styles.cross}
          onClick={() => setShowAvatarModal(false)}
        />
      </div>
      <div className={styles.avaBox}>
        <img className={styles.avatar} src={profile.image} alt="avatar" />
      </div>
      {
        photoList.length >= 1 ?
          <div className={styles.photoOk}>Изображение загружено</div>
          :
          <div>
            <form className={styles.formFileUpload} onDragEnter={(e) => handleDrag(e)} onSubmit={(e) => e.preventDefault()}>
              <input ref={inputRef} type="file" id="input-file-upload" className={styles.inputFileUpload} multiple={true} onChange={handleChange} />
              <label className={styles.labelFileUpload} htmlFor="input-file-upload">
                <div>
                  {/* <p>{extra}</p> */}
                  <button className={styles.uploadButton} onClick={onButtonClick}>Загрузить фото</button>
                </div>
              </label>
              {dragActive && <div className={styles.dragFileElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
            <input type="file" onChange={handleChange} id="input-file-upload-small" className={styles.inputFileUpload} />
            <label className={photoList.length < 1 ? styles.btnOkSmall : styles.inputFileUpload} htmlFor="input-file-upload-small">Загрузить файл</label>
            {errorMessage ? error : <></>}
            {okMessage ? ok : <></>}
          </div>
      }
      <button className={styles.btn} onClick={changeAvatar}>Изменить</button>
    </div>

  return (
    <div className={styles.main}>
      {showNameModal || showAvatarModal ? bg : <></>}
      {showNameModal ? nameModal : <></>}
      {showAvatarModal ? avatarModal : <></>}
      <h1 className={styles.title}>Настройки</h1>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.text}>
            <h3>Изображение</h3>
            <h4>Установите новое изображение</h4>
          </div>
          <div className={styles.userName}>
            <img className={styles.avatar} src={profile.image} alt="avatar" />
          </div>
          <button className={styles.btn} onClick={() => setShowAvatarModal(true)}>Изменить</button>
        </div>
        <div className={styles.item}>
          <div className={styles.text}>
            <h3>Логин</h3>
            <h4>Задайте профилю уникальный логин</h4>
          </div>
          <div className={styles.userName}>{profile.login}</div>
          <button className={styles.btn} onClick={() => setShowNameModal(true)}>Изменить</button>
        </div>
      </div>
    </div>
  )
}

export default Settings