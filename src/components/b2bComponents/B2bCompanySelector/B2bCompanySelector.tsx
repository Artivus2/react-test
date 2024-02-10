import React, { useEffect, useState } from 'react';
import styles from './B2bCompanySelector.module.scss';
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { getCompanyList } from "../../../bll/selectors/company.selector";
import { WithPopUp } from "../../../utils/hocs/WithPopUp/WithPopUp";
import { B2BCompanyCreator } from "./B2bCompanyCreator/B2bCompanyCreator";
import { CustomSearchSelect, SelectOption } from "./CustomSearchSelect/CustomSearchSelect";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { findCompanyByINNThunk } from "../../../bll/api/company.thunk";
import { StyledButton } from "../../../UI/StyledButton/StyledButton";
import { ICompany } from "../../../types/Company.type";


export const B2BCompanySelector = () => {

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [creatingCompany, setCreatingCompany] = useState<null | ICompany>(null);

    const companyList = useAppSelector(getCompanyList);
    const dispatch = useAppDispatch();

    const companyOptions = companyList.map(c => new SelectOption(c.inn, c.name));

    const findCompanyByINN = (inn: string) => {
        dispatch(findCompanyByINNThunk(inn)).unwrap()
            .then(findCompany => {
                findCompany && setCreatingCompany({ ...findCompany, inn });
            });
    };

    const createCompany = () => {
        setIsCreating(true);
        const req = document.querySelector('.rfm-marquee-container ');
        (req as HTMLDivElement).style.display = 'none';
    };

    const closeCreating = () => {
        setIsCreating(false);
        const req = document.querySelector('.rfm-marquee-container ');
        (req as HTMLDivElement).style.display = 'flex';
    };

    const placeholder = creatingCompany ? (creatingCompany.name || String(creatingCompany.inn)) : 'Введите ИНН';


    return (
        <>
            <div className={styles.b2bCompanySelector}>
                <CustomSearchSelect
                    placeholder={placeholder}
                    options={companyOptions}
                    findCompany={findCompanyByINN}
                />
                <StyledButton
                    className={styles.addCompanyButton}
                    onClick={createCompany}
                    disabled={!creatingCompany}
                >
                    Добавить компанию
                </StyledButton>
            </div>
            {isCreating && creatingCompany && (
                <WithPopUp close={closeCreating}>
                    {/* // <div className={styles.wrap}> */}
                    <B2BCompanyCreator close={closeCreating} creatingCompany={creatingCompany} />
                    {/* // </div> */}
                </WithPopUp>

            )}
        </>
    );
};