import React, { useState } from "react";
import styles from "./index.module.scss";
import { ReactComponent as IiconoirEyeAlt } from "../../assets/icons/iconoir_eye-alt.svg";
import { ReactComponent as IiconoirEyeClose } from "../../assets/icons/iconoir_eye-close.svg";
// import { useIntl } from "react-intl";

interface InputProps {
  value: string;
  setValue: (str: string) => void;
  placeholder: string;
  type?: "text" | "password" | "email";
}

const Input = ({ value, setValue, placeholder, type = "text" }: InputProps) => {
  const [typeState, setTypeState] = useState(type);
  // const intl = useIntl();
  return (
    <div className={styles.root}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.inp}
        type={typeState}
        placeholder={placeholder}
      />
      {placeholder === `Пароль` ? (
        typeState !== "password" ? (
          <IiconoirEyeAlt
            className={styles.eyeSvg}
            onClick={() => setTypeState("password")}
          />
        ) : (
          <IiconoirEyeClose
            className={styles.eyeSvg}
            onClick={() => setTypeState("text")}
          />
        )
      ) : null}
    </div>
  );
};

export default Input;
