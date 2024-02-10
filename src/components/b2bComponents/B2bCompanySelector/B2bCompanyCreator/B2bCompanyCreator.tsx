import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './B2bCompanyCreator.module.scss';
import { useFormik } from 'formik';
import { StyledButton } from "../../../../UI/StyledButton/StyledButton";
import { StyledInput } from "../../../../UI/StyledInput/StyledInput";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import { createCompanyThunk, getAllCompaniesThunk } from "../../../../bll/api/company.thunk";
import { useNavigate } from "react-router-dom";
import { CreateCompanyRequest, ICompany } from "../../../../types/Company.type";
import { ReactComponent as Cross } from '../../../../assets/icons/cross.svg';
// import Select from 'react-select'
// import { useAppSelector } from '../../../../utils/hooks/useAppSelector';
// import { getBank } from "../../../../bll/selectors/app.selector";
import { GetCompanyByInfo } from '../../../../services/CompanyService';

interface B2BCompanyCreatorProps {
    creatingCompany: ICompany;
    close: () => void;
}

type FormikValuesType = Required<CreateCompanyRequest>

export const B2BCompanyCreator: React.FC<B2BCompanyCreatorProps> = ({ creatingCompany, close }) => {
    const [errorMessage, setErrorMessage] = useState('')
    // const [selectedBankOption, setSelectedBankOption] = useState<any>({ label: 'Выберите банк', value: undefined });
    const [bankId, setBankId] = useState(0);

    const error = <div className={styles.error}>
        {errorMessage}
    </div>

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const createCompany = async (requestData: CreateCompanyRequest) => {
        const data = await dispatch(createCompanyThunk(requestData)).unwrap();
        if (!data?.status) {
            setErrorMessage(data?.data)
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        } else {
            const req = document.querySelector('.rfm-marquee-container ');
            (req as HTMLDivElement).style.display = 'flex';
            await dispatch(getAllCompaniesThunk()).unwrap();
            navigate(`/b2b/${requestData.inn}`);
        }
    };

    const { name, address, inn, ogrn, kpp, fio, phone, bank, rs, ks, bik } = creatingCompany;
    //@ts-ignore
    const mainOkved = creatingCompany.okved;

    // FORMIK
    const initialValues: FormikValuesType = {
        name,
        address,
        inn,
        ogrn,
        mainOkved: mainOkved || '',
        kpp: kpp || '',
        fio: fio || '',
        phone: phone || '',

        bank,
        rs,
        ks,
        bik,
        // eslint-disable-next-line no-restricted-globals
        status,
    };

    const validate = (values: FormikValuesType) => {
        const errors = {} as Partial<Record<string, string>>;

        if (!values.name) errors.name = 'Required field!';
        if (!values.address) errors.address = 'Required field!';
        if (!values.phone) errors.phone = 'Required field!';
        if (!values.inn) errors.inn = 'Required field!';
        if (!values.kpp) errors.kpp = 'Required field!';
        if (!values.fio) errors.fio = 'Required field!';
        if (!values.mainOkved) errors.mainOkved = 'Required field!';
        if (!values.ogrn) errors.ogrn = 'Required field!';
        if (!values.bank) errors.bank = 'Required field!';
        if (!values.rs) errors.rs = 'Required field!';
        if (!values.ks) errors.ks = 'Required field!';
        if (!values.bik) errors.bik = 'Required field!';

        if (String(values.phone).length < 10) errors.phone = 'Incorrect number!';
        if (!new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(values.phone)) errors.phone = 'Incorrect number!';
        if (String(values.ogrn).length < 13) errors.ogrn = 'Incorrect number!';
        if (String(values.rs).length !== 20 && String(values.rs).length !== 28) errors.rs = 'Incorrect number!';
        if (String(values.ks).length !== 20 && String(values.ks).length !== 28) errors.ks = 'Incorrect number!';
        if (String(values.bik).length !== 9) errors.bik = 'Incorrect number!';

        return errors;
    };

    const onSubmit = async (values: FormikValuesType) => {
        const { mainOkved, kpp, fio, phone, ...requiredValues } = values;
        const requestData: CreateCompanyRequest = { ...requiredValues, bank: bankId, status: creatingCompany.status };
        if (mainOkved) requestData.mainOkved = mainOkved;
        if (kpp) requestData.kpp = kpp;
        if (fio) requestData.fio = fio;
        if (phone) requestData.phone = phone;
        // if (selectedBankOption.id) {
        await createCompany(requestData);
        // close();
        // } else {
        //     setErrorMessage('Выберите банк')
        //     setTimeout(() => {
        //         setErrorMessage('')
        //     }, 3000);
        // }
    };

    const onChangeNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isFinite(+e.currentTarget.value)) return;
        if (!e.currentTarget.value) {
            formik.setFieldValue(e.currentTarget.name, undefined);
        }
        formik.setFieldValue(e.currentTarget.name, e.currentTarget.value);
    };

    const onChangeNumberHandlerBik = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isFinite(+e.currentTarget.value)) return;
        if (!e.currentTarget.value) {
            formik.setFieldValue(e.currentTarget.name, undefined);
        }
        formik.setFieldValue(e.currentTarget.name, e.currentTarget.value);
        if (e.currentTarget.value.length === 9) {
            const data = await GetCompanyByInfo(e.currentTarget.value.slice(1));
            if (data.data.length === 1) {
                formik.setFieldValue('ks', data.data[0].ks)
                formik.setFieldValue('bank', data.data[0].title)
                setBankId(+data.data[0].id)
                // setSelectedBankOption({ label: data.data[0].title, id: +data.data[0].id })
            }
        }
    };

    // const getBankInfoByTitle = async (title: string) => {
    //     const data = await GetCompanyByInfo(undefined, title);
    //     formik.setFieldValue('ks', data.data[0].ks)
    //     formik.setFieldValue('bik', '0' + data.data[0].bik)
    // }

    // useEffect(() => {
    //     if (!+selectedBankOption.id) return;
    //     getBankInfoByTitle(selectedBankOption.label)
    // }, [selectedBankOption.id, selectedBankOption.label, setSelectedBankOption])

    const onChangeStringHandler = (e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
    };

    const formik = useFormik({
        onSubmit,
        initialValues,
        validate,
    });

    const isButtonDisabled = !!Object.keys(formik.errors).length;


    // const banks = useAppSelector(getBank);

    // const bankOptions = Object.values(banks).map(({ title, id }) => { return { label: title, id: id } }).slice(1)

    return (
        <div className={styles.b2bCompanyCreator}>
            <div className={styles.poptop}>
                <h3>Добавить компанию</h3>
                <Cross onClick={close} />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.col1}>
                    <h4>Данные компании:</h4>
                    <StyledInput
                        disabled={!!name}
                        type="text"
                        placeholder='Наименование'
                        name='name'
                        value={formik.values.name}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name}
                    />
                    <StyledInput
                        disabled={!!address}
                        type="text"
                        placeholder='Юридический адрес'
                        name='address'
                        value={formik.values.address}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && formik.errors.address}
                    />
                    <StyledInput
                        disabled={!!inn}
                        type="text"
                        placeholder='ИНН'
                        name='inn'
                        value={formik.values.inn || ''}
                        onChange={onChangeNumberHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.inn && formik.errors.inn}
                    />
                    <StyledInput
                        disabled={!!mainOkved}
                        type="text"
                        placeholder='ОКВЭД'
                        name='mainOkved'
                        value={formik.values.mainOkved || ''}
                        onChange={onChangeNumberHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mainOkved && formik.errors.mainOkved}
                    />
                    <StyledInput
                        disabled={!!kpp}
                        type="text"
                        placeholder='КПП'
                        name='kpp'
                        value={formik.values.kpp}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.kpp && formik.errors.kpp}
                    />
                    <StyledInput
                        disabled={!!ogrn}
                        type="text"
                        placeholder='ОГРН'
                        name='ogrn'
                        value={formik.values.ogrn}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ogrn && formik.errors.ogrn}
                    />
                    <StyledInput
                        disabled={!!fio}
                        type="text"
                        placeholder='Руководитель'
                        name='fio'
                        value={formik.values.fio}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fio && formik.errors.fio}
                    />
                    <StyledInput
                        disabled={!!phone}
                        type="text"
                        placeholder='Телефон'
                        name='phone'
                        value={formik.values.phone}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && formik.errors.phone}
                    />
                </div>
                <div className={styles.col2}>
                    <h4>Банковские реквизиты:</h4>
                    {/* <Select
                        options={bankOptions}
                        onChange={setSelectedBankOption}
                        closeMenuOnSelect={false}
                        classNames={{
                            container: (state) => styles.select3,
                            singleValue: (state) => styles.select4,
                            control: (state) => styles.select2,
                            menuList: (state) => styles.select6,
                            menu: (state) => styles.select61,
                            option: (state) => styles.select7,
                        }}
                        classNamePrefix="react-select"
                        defaultValue={selectedBankOption}
                        value={selectedBankOption}
                    /> */}
                    <StyledInput
                        disabled={!!bik}
                        type="text"
                        placeholder='БИК (9)'
                        name='bik'
                        value={formik.values.bik || ''}
                        onChange={onChangeNumberHandlerBik}
                        onBlur={formik.handleBlur}
                        error={formik.touched.bik && formik.errors.bik}
                    />
                    <StyledInput
                        disabled={!!bank}
                        type="text"
                        placeholder='Банк'
                        name='bank'
                        value={formik.values.bank}
                        onChange={onChangeStringHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.bank && formik.errors.bank}
                    />
                    <StyledInput
                        disabled={!!rs}
                        type="text"
                        placeholder='р/с (20/28)'
                        name='rs'
                        value={formik.values.rs || ''}
                        onChange={onChangeNumberHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.rs && formik.errors.rs}
                    />
                    <StyledInput
                        disabled={!!ks}
                        type="text"
                        placeholder='к/с (20/28)'
                        name='ks'
                        value={formik.values.ks || ''}
                        onChange={onChangeNumberHandler}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ks && formik.errors.ks}
                    />
                </div>
                <StyledButton
                    type='submit'
                    disabled={isButtonDisabled}
                    className={styles.addBtn}
                >
                    Добавить компанию
                </StyledButton>
            </form>
            {errorMessage ? error : <></>}
        </div>
    );
};