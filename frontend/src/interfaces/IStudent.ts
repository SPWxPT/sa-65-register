import { EmployeeInterface } from "./IEmployee";
import { GenderInterface } from "./IGender";
import { ProvinceInterface } from "./IProvince";
import { ProgramInterface } from "./IProgram";
import { RoleInterface } from "./IRole";

export interface StudentInterface {
  ID?: number;
  STUDENT_NUMBER?: string;
  STUDENT_NAME? : string;
  PERSONAL_ID? : number;
  Password?: string;
  GenderID?: number;
  Gender?: GenderInterface;
  ProvinceID?: number;
  Province?: ProvinceInterface;
  ProgramID?: number;
  Program?: ProgramInterface;
  RoleID?: number;
  Role?: RoleInterface;
  EmployeeID? : number;
  Employee? : EmployeeInterface;
}
