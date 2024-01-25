export default interface User {
  id?: string;
  name: string;
  surname: string,
  bornDate: string,
  documentType: string,
  documentNumber: number,
  address: string,
  email: string,
  salary: number,
  password: string,
  confirmPassword: string
}
