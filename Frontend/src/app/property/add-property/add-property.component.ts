import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property'
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
//import { IProperty } from 'src/app/model/iproperty';
//import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm:NgForm;//Template Driven Form
  @ViewChild('formTabs ') staticTabs: TabsetComponent;

  addPropertyForm:FormGroup;

  //Will come from masters
  propertyType:Array<string>=['House','Apartment','Duplex'];
  furnishTypes:Array<string>=['Fully','Semi','UnFunished'];
  mainEntrance:Array<string>=['East','West','South','North'];
  nextClicked:boolean;
  property =new Property();
  cityList : any[];
  //For Property Preview
  propertyView : IPropertyBase ={
    Id:null,
    Name:'',
    Price:null,
    SellRent:null,
    PType:null,
    FType:null,
    BHK:null,
    BuiltArea:null,
    City:"",//for dropdown
    RTM:null
  };
  constructor(private fb:FormBuilder,private router:Router,
              private housingService:HousingService,
              private alertify:AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data=>{
      this.cityList=data;
      console.log(data);
    });
  }

  CreateAddPropertyForm(){
     this.addPropertyForm=this.fb.group({
      PriceInfo:this.fb.group({
        Price:[null,[Validators.required]],
        BuiltArea:[null,[Validators.required]],
        CarpetArea:[null],
        Security:[null],
        Maintenance:[null],
       }),
      BasicInfo:this.fb.group({
        SellRent:['1',Validators.required],
        PType:[null,Validators.required],
        Name:[null,[Validators.required]],
        BHK:[null,[Validators.required]],
        FType:[null,[Validators.required]],
        City:[null,[Validators.required]]
       }),
       AddressInfo:this.fb.group({
         FloorNo:[null],
         TotalFloor:[null],
         Address:[null,[Validators.required]],
         LandMark:[null],
       }),
       OtherInfo:this.fb.group({
         RTM: [null,[Validators.required]],
         PossessionOn:[null],
         AOP:[null],
         Gated:[null],
         MainEntrance:[null],
         Description:[null]
       }),


     })
   }

   //Getter Methods

   //#region <FormGruop>
   get BasicInfo()
   {
     return this.addPropertyForm.controls.BasicInfo as FormGroup;
   }
   get PriceInfo()
   {
     return this.addPropertyForm.controls.PriceInfo as FormGroup
   }
   get AddressInfo()
   {
     return this.addPropertyForm.controls.AddressInfo as FormGroup
   }

   get OtherInfo()
   {
     return this.addPropertyForm.controls.OtherInfo as FormGroup
   }

  //#endregion
  //#region <formControl>
  get SellRent()
   {
     return this.BasicInfo.controls.SellRent as FormControl;
   }
   get PType()
   {
     return this.BasicInfo.controls.PType as FormControl
   }
   get Name()
   {
     return this.BasicInfo.controls.Name as FormControl
   }
   get FType()
   {
    return this.BasicInfo.controls.FType as FormControl
   }
   get BHK()
   {
     return this.BasicInfo.controls.BHK as FormControl
   }
   get City()
   {
     return this.BasicInfo.controls.City as FormControl
   }

   get Price()
   {
     return this.PriceInfo.controls.Price as FormControl
   }
   get BuiltArea()
   {
     return this.PriceInfo.controls.BuiltArea as FormControl
   }
   get Address()
   {
     return this.AddressInfo.controls.Address as FormControl
   }
   get RTM()
   {
     return this.OtherInfo.controls.RTM as FormControl
   }

   get Security()
   {
     return this.PriceInfo.controls.Security as FormControl
   }
   get Maintenance()
   {
     return this.PriceInfo.controls.Maintenance as FormControl
   }
   get CarpetArea()
   {
     return this.PriceInfo.controls.CarpetArea as FormControl
   }
   get FloorNo()
   {
     return this.AddressInfo.controls.FloorNo as FormControl
   }
   get TotalFloor()
   {
     return this.AddressInfo.controls.TotalFloor as FormControl
   }
   get LandMark()
   {
     return this.AddressInfo.controls.LandMark as FormControl
   }
   get AOP()
   {
     return this.OtherInfo.controls.AOP as FormControl
   }
   get Gated()
   {
     return this.OtherInfo.controls.Gated as FormControl
   }
   get MainEntrance()
   {
     return this.OtherInfo.controls.MainEntrance as FormControl
   }
   get PossessionOn()
   {
     return this.OtherInfo.controls.PossessionOn as FormControl
   }
   get Description()
   {
     return this.OtherInfo.controls.Description as FormControl
   }
  //#endregion

  onBack()
  {
    this.router.navigate(['/']);
  }
  allTabsValid():boolean{
    if(this.BasicInfo.invalid)
    {
       this.staticTabs.tabs[0].active=true;
       return false;
    }
    if(this.PriceInfo.invalid)
    {
      this.staticTabs.tabs[1].active=true;
      return false;
    }
    if(this.AddressInfo.invalid)
    {
      this.staticTabs.tabs[2].active=true;
      return false;
    }
    if(this.OtherInfo.invalid)
    {
      this.staticTabs.tabs[3].active=true;
      return false;
    }
    return true;
  }

  onSubmit()
  {
    this.nextClicked=true;
    if(this.allTabsValid()){
      this.mpaProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats,your property listed successfully on our website!');
      //console.log("SellRent-" + this.addPropertyForm.value.BasicInfo.SellRent);//this.addPropertyForm.value.SellRent---undefined
      console.log("SellRent-" + this.addPropertyForm.value.BasicInfo.SellRent);//Reacitve Form
      console.log(this.addPropertyForm);
      if(this.SellRent.value=='2')
      {
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }
    }
    else{
      this.alertify.error('Please review the form and provide all valid entries')
    }

  }
  selectTab(tabId: number,IscurrentTabValid:boolean) {
    this.nextClicked=true;
    if(IscurrentTabValid)
    {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
  mpaProperty():void{
    this.property.Id=this.housingService.newProopID();
    this.property.SellRent=+this.SellRent.value;
    this.property.BHK=this.BHK.value;
    this.property.PType=this.PType.value;
    this.property.Name=this.Name.value;
    this.property.City=this.City.value;
    this.property.FType=this.FType.value;
    this.property.Price=this.Price.value;
    this.property.Security =this.Security.value;
    this.property.Maintenance=this.Maintenance.value;
    this.property.BuiltArea=this.BuiltArea.value;
    this.property.CarpetArea=this.CarpetArea.value;
    this.property.FloorNo=this.FloorNo.value;
    this.property.TotalFloor=this.TotalFloor.value;
    this.property.Address=this.Address.value;
    this.property.Address2=this.LandMark.value;
    this.property.RTM=this.RTM.value;
    this.property.AOP=this.AOP.value;
    this.property.Gated=this.Gated.value;
    this.property.MainEntrance=this.MainEntrance.value;
    this.property.Possession=this.PossessionOn.value;
    this.property.Description=this.Description.value;
    this.property.PostedOn=new Date().toString();
  }
}
