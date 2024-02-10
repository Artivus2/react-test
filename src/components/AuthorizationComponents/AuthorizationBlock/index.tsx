import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Login from "../Login";
import Register from "../Register";

interface AuthorizationBlockProps {
  type: string;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setStatus: (status: boolean) => void;
}

const AuthorizationBlock = ({
  type,
  openModal,
  setOpenModal,
  setStatus,
}: AuthorizationBlockProps) => {
  const [authType, setAuthType] = useState('');

  useEffect(() => {
    setAuthType(type)
  }, [type])

  return (
    <>
      {openModal && (
        <>
          <div className={styles.main} onClick={() => setOpenModal(false)}></div>
          <div className={styles.root} onClick={(e) => e.stopPropagation()}>
            {authType === 'login' ? (
              <Login
                setAuthType={setAuthType}
                setOpenModal={setOpenModal}
                setStatus={setStatus}
              />
            ) : (
              <Register setAuthType={setAuthType} setOpenModal={setOpenModal} />
            )}
          </div>
        </>
      )}
    </>
  );
};
export default AuthorizationBlock;
