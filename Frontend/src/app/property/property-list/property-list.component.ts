import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent=1;
  properties:IPropertyBase[];
  Today =new Date();
  City='';
  SearchCity='';
  SortbyParam='';
  SortDirection='asc';

  //Calling from Json
  /*constructor(private http:HttpClient) { }

   ngOnInit(): void {
    this.http.get('data/properties.json').subscribe(
      data=>{
        this.properties=data;
      }
    );
  }

  */
  constructor(private housingService:HousingService,private route:ActivatedRoute){

  }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
    {
      this.SellRent=2;//Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>{
        this.properties=data;
        console.log(data);
        //Start Move to housing.service.ts
        //start Add data on Property List form local storage
        //const newProperty=JSON.parse(localStorage.getItem('newProp'));
        //if(newProperty.SellRent===this.SellRent)//For Rent or Sell
        //{
          //this.properties=[newProperty,...this.properties];
        //}
        //End Add data on Property List form local storage
        //End Move to housing.service.ts
      },error=>{
        console.log(error);
      }
    );
}

onCityFilter()
{
  this.SearchCity=this.City;
}
onCityFilterClear(){
  this.SearchCity='';
  this.City='';
}
onSortDirection()
{
  if(this.SortDirection==='desc'){
    this.SortDirection='asc';
  }
  else{
    this.SortDirection='desc';
  }
}

}
