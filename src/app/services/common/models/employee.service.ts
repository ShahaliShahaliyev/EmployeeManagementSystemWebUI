import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Department } from 'src/app/contracts/department_create';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Departments } from 'src/app/contracts/list_deartments';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Employee } from 'src/app/contracts/employee_create';
import { list_Employees } from 'src/app/contracts/list_employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClientService:HttpClientService) { }

  create(employees :Create_Employee,successCallBack:()=>void,errorCallBack?:(errrorMessage:string)=>void){
    this.httpClientService.post({
      controller:"employees"
    },employees)
    .subscribe(result=>{
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      const _error : Array<{key:string,value:Array<string>}> = errorResponse.error;
      let message ="";
      _error.forEach((v,index)=>{
        v.value.forEach((_v,_index)=>{
          message+=`${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page:number =0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;employees:list_Employees[]}>{
    const promiseData:Promise<{totalCount:number;employees:list_Employees[]}>=this.httpClientService.get<{totalCount:number;employees:list_Employees[]}>({
      controller:"employees",
      queryString:`page=${page}&size=${size}`
    }).toPromise();   

    promiseData.then(d=>successCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id:number){
    const delObservable:Observable<any>=this.httpClientService.delete<any>({
      controller:"employees"
    },id);
    await firstValueFrom(delObservable);
  }

  async getDepartmentsToEmployee(employeeId: number, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<{ employeeDepartments: string[] }> = this.httpClientService.get({
      controller: "departments",
      action: "get-role-to-users"
    }, employeeId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    return (await promiseData).employeeDepartments;
  }

}
