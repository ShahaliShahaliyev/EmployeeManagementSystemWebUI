import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Department } from 'src/app/contracts/department_create';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Departments } from 'src/app/contracts/list_deartments';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService:HttpClientService) { }

  create(departments :Create_Department,successCallBack:()=>void,errorCallBack?:(errrorMessage:string)=>void){
    this.httpClientService.post({
      controller:"departments"
    },departments)
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
  

  async read(page:number =0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;departments:List_Departments[]}>{
    const promiseData:Promise<{totalCount:number;departments:List_Departments[]}>=this.httpClientService.get<{totalCount:number;departments:List_Departments[]}>({
      controller:"departments",
      queryString:`page=${page}&size=${size}`
    }).toPromise();   

    promiseData.then(d=>successCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }

  readForList():Promise<{departments:List_Departments[]}>{
    const promiseData:Promise<{departments:List_Departments[]}> = this.httpClientService.get<{departments:List_Departments[]}>({
      controller:"departments"
    }).toPromise();

    return promiseData;
  }

  async delete(id:number){
    const delObservable:Observable<any>=this.httpClientService.delete<any>({
      controller:"departments"
    },id);
    await firstValueFrom(delObservable);
  }


  async getDepartments(page: number=0, size: number=5, sucessCallBAck?: () => void,
    errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: "departments",
      queryString: `page=${page}&size=${size}`
    });
  }

}
