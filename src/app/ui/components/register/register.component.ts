import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { MessageTypes } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageTypes, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  [x: string]: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)
      ]],
      name: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)
      ]],
      surname: ["",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2)
        ]],
      email: ["",
        [
          Validators.required
          ,
          Validators.email
        ]],
      password: ["",
        [
          Validators.required,
          Validators.minLength(8)
        ]]
    })
  }


  get component() {
    return this.form.controls;
  }


  submitted: boolean = false;
  async onSubmit(users: User) {
    this.submitted = true;
    if (this.form.invalid)
      return;


    const result: Create_User = await this.userService.create(users);
    if (result.succeded)
      this.toastrService.message(result.message, "User Creating Succesfully!", {
        messageType: ToastrMessageTypes.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "User Created Failed!", {
        messageType: ToastrMessageTypes.Error,
        position: ToastrPosition.TopRight
      })

    //   const result:Create_User= await  this.userService.create(users);
    //   if(result.succeded)
    //     this.toastrService.message(result.message,"User Creating Succesfully!",{
    //   messageType:ToastrMessageTypes.Success,
    //   position:ToastrPosition.TopRight
    //  })
    //   // if(!result.succeded)
    //   //   this.toastrService.message(result.message,"User Created Failed!",{
    //   //   messageType:ToastrMessageTypes.Error,
    //   //   position:ToastrPosition.TopRight
    //   // })

  }
}