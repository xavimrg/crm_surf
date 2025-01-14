export interface Customer {
    id: number;
    customerSurname: string;
    customerName: string;
    age : number ;
    gender?: string;
    email: string; 
    joinDate?: string,
    profilePhoto: string,
    companyName?:string, 
    companyId?:string,
    companyAddress?:string,
}
