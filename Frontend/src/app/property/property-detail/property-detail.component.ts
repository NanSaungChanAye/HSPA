import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Observable } from 'rxjs';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId:number;
  property =new Property();
  galleryOptions:NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route:ActivatedRoute,private router:Router,
              private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId=Number(this.route.snapshot.params['id']) ;
    this.route.params.subscribe(
      (params)=>{
        this.propertyId=+params['id'];

        this.housingService.getProperty(this.propertyId).subscribe(
         (data?: any)=>{
          this.property=data;
           //this.property.Name=data.Name;
           //this.property.Price=data.Price;
           //this.property.BHK=data.BHK;


           //console.log(data);
           //console.log("data");

         },error =>this.router.navigate(['/'])
        );
      }
    );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation:NgxGalleryAnimation.Slide
      },
      // max-width 800

    ];

    this.galleryImages = [
      {
        small: 'assets/images/internal-1.jpg',
        medium: 'assets/images/internal-1.jpg',
        big: 'assets/images/internal-1.jpg'
      },
      {
        small: 'assets/images/internal-2.jpg',
        medium: 'assets/images/internal-2.jpg',
        big: 'assets/images/internal-2.jpg'
      },
      {
        small: 'assets/images/internal-3.jpg',
        medium: 'assets/images/internal-3.jpg',
        big: 'assets/images/internal-3.jpg'
      },{
        small: 'assets/images/internal-4.jpg',
        medium: 'assets/images/internal-4.jpg',
        big: 'assets/images/internal-4.jpg'
      },
      {
        small: 'assets/images/internal-5.jpg',
        medium: 'assets/images/internal-5.jpg',
        big: 'assets/images/internal-5.jpg'
      }
    ];
  }



  onSelectNext()
  {
    this.propertyId +=1;
    this.router.navigate(['property-detail',this.propertyId]);
  }

}
