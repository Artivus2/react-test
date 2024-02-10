import React, { useRef, useState } from 'react'
import styles from './Verify.module.scss'

interface FormStepPropsType {
  img: any;
  step: number;
  setStep: (props: number) => void;
  photoList: any[];
  setPhotoList: (props: any) => void;
  title: string;
  text: string;
  extra: string;
}

const FormStep = ({
  img,
  step,
  setStep,
  photoList,
  setPhotoList,
  title,
  text,
  extra
}: FormStepPropsType) => {

  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const inputRef = useRef(null);

  const error = <div className={styles.error}>
    {errorMessage}
  </div>

  const currentTypes = ['jpeg', 'jpg', 'png']

  const goNext = () => {
    if (photoList.length >= step) {
      setStep(step + 1)
    } else {
      setErrorMessage(`Загрузите фотографию`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }

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

  const onButtonClick = () => {
    //@ts-ignore
    inputRef.current.click();
  };

  return (
    <div className={styles.step1}>
      {/* <img src={img} alt="" className={styles.step1Img} /> */}
      <div className={styles.step1Title}>{title}</div>
      <div className={styles.step1Text}>{text}</div>
      <form className={styles.formFileUpload} onDragEnter={(e) => handleDrag(e)} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" className={styles.inputFileUpload} multiple={true} onChange={handleChange} />
        <label className={styles.labelFileUpload} htmlFor="input-file-upload">
          <div>
            <p>{extra}</p>
            <button className={styles.uploadButton} onClick={onButtonClick}>Загрузить фото</button>
          </div>
        </label>
        {dragActive && <div className={styles.dragFileElement} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </form>
      {/* <img src={img} alt="" className={styles.step1ImgSmall} /> */}
      <input type="file" onChange={handleChange} id="input-file-upload-small" className={styles.inputFileUpload} />
      <label className={photoList.length < step ? styles.btnOkSmall : styles.inputFileUpload} htmlFor="input-file-upload-small">Загрузить файл</label>
      {errorMessage ? error : <></>}
      <button className={photoList.length >= step ? styles.btnOk : styles.btnDis} onClick={goNext}>Продолжить</button>
    </div>
  )
}

export default FormStep