import React, {ReactNode} from "react";
import styles from './WithPopUp.module.scss';

interface WithPopUpProps {
    close: () => void;
    children: ReactNode;
}

export const WithPopUp: React.FC<WithPopUpProps> = ({children, close}) => {

    return <div className={styles.disabledWrapper} onClick={close}>
        <div className={styles.popUp} onClick={e => e.stopPropagation()}>
            {children}
            {/*<button className={styles.closeButton} onClick={close}/>*/}
        </div>
    </div>
};