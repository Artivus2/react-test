interface Requisites {
    bank: number;
    rs: string;
    ks: string;
    bik: string;
}

export type ICompany = Requisites & {
    id: number;
    name: string;
    address: string;
    inn: string;
    ogrn: string;
    mainOkved?: string;
    kpp?: string;
    fio?: string;
    phone?: string;
    status?: string;
}

export type CreateCompanyRequest = Omit<ICompany, 'id'>;