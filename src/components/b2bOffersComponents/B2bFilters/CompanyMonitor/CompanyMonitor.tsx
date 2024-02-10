import React from 'react';
import styles from './CompanyMonitor.module.scss';
import {ICompany} from "../../../../types/Company.type";

interface CompanyMonitorProps {
    company: ICompany;
}

export const CompanyMonitor: React.FC<CompanyMonitorProps> = ({company}) => {
    return (
        <div className={styles.companyMonitor}>
            {company.name}
        </div>
    );
};