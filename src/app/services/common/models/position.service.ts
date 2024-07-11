import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Position_Create } from 'src/app/contracts/position/position_create';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Position } from 'src/app/contracts/position/position_list';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpClientService:HttpClientService) { }

  create(positions :Position_Create,successCallBack:()=>void,errorCallBack?:(errrorMessage:string)=>void){
    this.httpClientService.post({
      controller:"position"
    },positions)
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

  async read(page:number =0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number;positions:List_Position[]}>{
    const promiseData:Promise<{totalCount:number;positions:List_Position[]}>=this.httpClientService.get<{totalCount:number;positions:List_Position[]}>({
      controller:"position",
      queryString:`page=${page}&size=${size}`
    }).toPromise();   

    promiseData.then(d=>successCallBack())
    .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id:number){
    const delObservable:Observable<any>=this.httpClientService.delete<any>({
      controller:"position"
    },id);
    await firstValueFrom(delObservable);
  }

}
