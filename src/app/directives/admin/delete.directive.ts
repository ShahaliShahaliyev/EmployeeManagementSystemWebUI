import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,
    private _renderer :Renderer2,
    private httpClientService:HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService
    ) { 
      const img = _renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style","cursor:pointer;");
      img.width = 40;
      img.height = 40;
      _renderer.appendChild(element.nativeElement,img);

    }


    @Input() id:number;
    @Input() controller:string;
    @Output() callback:EventEmitter<any> = new EventEmitter();

    @HostListener("click")

      async onClick(){
        this.openDialog(async ()=>{
          this.spinner.show(SpinnerTypes.SquareJellyBox);
        const td:HTMLTableCellElement=this.element.nativeElement;
        this.httpClientService.delete({
          controller:this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).animate({ 
            opacity:0,
            left:"+=50",
            height:"toogle"
          },700,()=>{
            this.callback.emit();
            this.alertifyService.message( `${this.controller == `roles` ? `Role` : `Department`} deleted` ,{
              position:Position.TopRight,
              messageType:MessageTypes.Success
            })
          });
          },(errorResponse:HttpErrorResponse)=>{
            this.spinner.hide(SpinnerTypes.SquareJellyBox);
            this.alertifyService.message("Error",{
              position:Position.TopRight,
              messageType:MessageTypes.Error
            })
        });      
      });

    }

      openDialog(afterClosed:any): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: DeleteState.Yes,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result==DeleteState.Yes){
            afterClosed();
          }
        });
      }
}
