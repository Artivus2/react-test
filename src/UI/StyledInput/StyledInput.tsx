import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './StyledInput.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type IProps = DefaultInputPropsType & {
    error?: string | boolean;
}

export const StyledInput: React.FC<IProps> = ({ error, className, ...restProps }) => {

    const rootClassName = error
        ? `${styles.styledInput} ${styles.error} ${className}`
        : `${styles.styledInput} ${className}`;

    return (
        <input
            className={rootClassName}
            maxLength={restProps.name === 'rs' || restProps.name === 'ks' ? 28 : restProps.name === 'bik' ? 9 : restProps.name === 'phone' ? 10 : 999}
            {...restProps}
        />
    );
};