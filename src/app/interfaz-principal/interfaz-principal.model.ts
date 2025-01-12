export interface usuario{
    userId: number,
    id: number,
    title: string,
    body: string
}

// export interface UserStatus {
//     name: string,
//     cell_phone: string,
//     auxiliary_cell_phone: string;
// }

export interface UserStatus {
    id: number,
    name: string,
    cellPhone: string,
    auxiliaryCellPhone: string;
}