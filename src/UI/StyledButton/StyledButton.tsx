import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './StyledButton.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const StyledButton: React.FC<DefaultButtonPropsType> = ({className, ...rest}) => {

    const rootClassName = rest.disabled
        ? `${style.styledButton} ${style.disabled} ${className}`
        : `${style.styledButton} ${className}`;

    return (
        <button className={rootClassName} {...rest}/>
    );
};