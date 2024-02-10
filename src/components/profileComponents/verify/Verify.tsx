import React, { useEffect, useState } from 'react'
import styles from './Verify.module.scss'
import Error from '../../../UI/Error/Error';
import Success from '../../../UI/Success/Success';
import step0 from '../../../assets/icons/profile/verify/step0.svg'
import step1 from '../../../assets/icons/profile/verify/step1.svg'
import step2 from '../../../assets/icons/profile/verify/step2.svg'
import step3 from '../../../assets/icons/profile/verify/step3.svg'
import step4 from '../../../assets/icons/profile/verify/step4.svg'
import step5 from '../../../assets/icons/profile/verify/step5.svg'
import FormStep from './FormStep';

const isVerify = 0;

const Verify = () => {

  const [photoList, setPhotoList] = useState<any>([])
  const [step, setStep] = useState(0)

  useEffect(() => {
    isVerify ? setStep(5) : <></>
  }, [isVerify])

  const goNext = () => {
    setStep(step + 1)
  }

  const title1 = `Шаг 1: Ваше удостоверение личности`
  const text1 = `Загрузите фото первой страницы паспорта, чтобы была отображена вся персональная информация. Файл должен быть формата .PNG и не превышать 5 МБ.`
  const extra1 = `Для прикрепления первой страницы паспорта перетащите файл сюда или загрузите с компьютера`

  const title2 = `Шаг 2: Прописка по паспорту`
  const text2 = `Загрузите фото разворота прописки в паспорте. Файл должен быть формата .PNG и не превышать 5 МБ.`
  const extra2 = `Для прикрепления разворота прописки в паспорте перетащите файл сюда или загрузите с компьютера`

  const title3 = `Шаг 3: Ваше фото`
  const text3 = `Сделайте селфи с паспортом. Лицо и документ должны быть хорошо освещены и полностью помещаться в кадр.`
  const extra3 = `Для прикрепления фото перетащите файл сюда или загрузите с компьютера`

  const goVerify = () => {
    // const api = '';
    // const post1 = axios.post(api, { "image": photoList[0], "int": 0 }, { headers: { "Authorization": token, 'Content-Type': 'multipart/form-data' } })
    // const post2 = axios.post(api, { "image": photoList[1], "int": 1 }, { headers: { "Authorization": token, 'Content-Type': 'multipart/form-data' } })
    // const post3 = axios.post(api, { "image": photoList[2], "int": 2 }, { headers: { "Authorization": token, 'Content-Type': 'multipart/form-data' } })

    // Promise.all([post1, post2, post3])
    //   .then(res => {
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
  }

  useEffect(() => {
    step === 4 ? goVerify() : <></>
  }, [step])

  return (
    <div className={styles.varifyContainer}>
      <div className={styles.top}>
        <h1 className={styles.title}>Верификация</h1>
        <div className={styles.verifyStatus}>
          {!isVerify ? <Error title={`Не верифицирован`} /> : <Success title={`Верифицирован`} />}
        </div>
        <h3 className={styles.helpText}>
          Если у вас возникли трудности с прохождением верификации, пожалуйста, напишите нам в чат поддержки
        </h3>
      </div>
      <div className={styles.verifyBox}>
        {
          step === 0 ? (
            <div className={styles.step0}>
              <img src={step0} alt="" className={styles.step0Img} />
              <div className={styles.step0Title}>
                Начните верификацию аккаунта
              </div>
              <div className={styles.step0Text}>
                Для удобства прохождения верификации вы можете воспользоваться  планшетом или мобильным устройством
              </div>
              <button className={styles.btnOk} onClick={goNext}>Пройти верификацию</button>
            </div>
          ) : step === 1 ? (
            <FormStep
              img={step1}
              step={step}
              setStep={setStep}
              photoList={photoList}
              setPhotoList={setPhotoList}
              title={title1}
              text={text1}
              extra={extra1}
            />
          ) : step === 2 ? (
            <FormStep
              img={step2}
              step={step}
              setStep={setStep}
              photoList={photoList}
              setPhotoList={setPhotoList}
              title={title2}
              text={text2}
              extra={extra2}
            />
          ) : step === 3 ? (
            <FormStep
              img={step3}
              step={step}
              setStep={setStep}
              photoList={photoList}
              setPhotoList={setPhotoList}
              title={title3}
              text={text3}
              extra={extra3}
            />
          ) : step === 4 ? (
            <div className={styles.step4}>
              <img src={step4} alt="" className={styles.step4Img} />
              <div className={styles.step4Title}>
                Ваши данные находятся на проверке у модератора
              </div>
              <div className={styles.step4Text}>
                После успешной проверки ваш аккаунт будет верифицирован
              </div>
            </div>
          ) : step === 5 ? (
            <div className={styles.step5}>
              <img src={step5} alt="" className={styles.step5Img} />
              <div className={styles.step5Title}>
                Верификация пройдена успешно
              </div>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}

export default Verify