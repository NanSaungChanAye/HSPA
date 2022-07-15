import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
//import * as alertyfy from 'alertifyjs';  when we use service,no need
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  user:any={};
  userSubmitted:boolean;
  registerationForm:FormGroup;//Reactive

  constructor(private fb:FormBuilder,
    private userService:UserServiceService,
    private alertify:AlertifyService) { }

  ngOnInit() {
    //this.registerationForm=new FormGroup(
      //{
      //name:new FormControl('Mark',Validators.required),
      //email:new FormControl(null,[Validators.required,Validators.email]),
      //password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
      //comfirmPassword:new FormControl(null,[Validators.required]),
      //mobile:new FormControl(null,[Validators.required,Validators.maxLength(10)])
      //},this.passwordMatchingValidator
    //);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registerationForm=this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      comfirmPassword:[null,Validators.required],
      mobile:[null,[Validators.required,Validators.maxLength(10)]]
    },{Validators:this.passwordMatchingValidator})
  }

  passwordMatchingValidator(fg:FormGroup):Validators {
    return fg.get('password').value===fg.get('comfirmPassword').value? null :
    {notmatched:true};
  }
  //Get methods for all form controls
  get email()
  {
    return this.registerationForm.get('email') as FormControl;
  }

  get password()
  {
    return this.registerationForm.get('password') as FormControl;
  }

  get comfirmPassword()
  {
    return this.registerationForm.get('comfirmPassword') as FormControl;
  }

  get mobile()
  {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit()
  {
    console.log(this.registerationForm);
    this.userSubmitted=true;
    if(this.registerationForm.valid)
    {
      this.user=Object.assign(this.user,this.registerationForm.value);
      this.userService.addUser(this.user);
      this.registerationForm.reset();
      this.userSubmitted=false;
      this.alertify.success("Congrats,you are successfully registered!");
    }
    else
    {
      this.alertify.error('Kindly provide the required fields!');
      console.log("You should need to fill data!")
    }
  }

}
