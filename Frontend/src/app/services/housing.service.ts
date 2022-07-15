import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/Operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllCities():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:5000/api/city');
  }

  getProperty(id:number)
  {
    return this.getAllProperties().pipe(
      map(propertiesArray=>{
        //throw new Error('Some Error');
        return propertiesArray.find(p=>p.Id===id);
      })
    );
  }

  //getAllProperties(SellRent?:number):Observable<IProperty[]> Because use Property in property-detail-resolver
  getAllProperties(SellRent?:number):Observable<Property[]>
  {
    return this.http.get('data/properties.json').pipe(
     map(data=>{

       const propertiesArray:Array<Property>=[];
       //Start Add New Property form local storage before adding json data
       const localproperties=JSON.parse(localStorage.getItem('newProp'));
       if(localproperties)
       {
        for (const id in localproperties)
        {
          if(SellRent)
          {
            if(localproperties.hasOwnProperty(id) && localproperties[id].SellRent===SellRent)
            {
              propertiesArray.push(localproperties[id]);
            }
          }
          else
          {
            propertiesArray.push(localproperties[id]);
          }

        }
       }
       //End Add New Property form local storage before adding json data
       for (const id in data)
       {
         if(SellRent)
         {
          if(data.hasOwnProperty(id) && data[id].SellRent===SellRent)
          {
           propertiesArray.push(data[id]);
          }
         }
         else{
          propertiesArray.push(data[id]);
         }
       }
       return propertiesArray;
     }

     )
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property:Property)
  {
    //Start Overwriting data in local Storage or Add new Property in array if newProp already exists in local storage
    let newProp=[property];
    if(localStorage.getItem('newProp'))
    {
      newProp=[property,
                ...JSON.parse(localStorage.getItem('newProp'))];
    }
    //End Overwriting data in local Storage
    localStorage.setItem('newProp',JSON.stringify(newProp));
  }
  newProopID()
  {
    if(localStorage.getItem('PID'))
    {
      //return localStorage.setItem('PID',String(localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID')+1;
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}
