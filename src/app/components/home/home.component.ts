import {Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';

import {Offer} from '../../models/offer/offer.model';
import {Content} from '../../models/content/content.model';
import {OfferRepository} from '../../repositories/offer/offer.repository';
import {ContentRepository} from '../../repositories/content/content.repository';

@Component({
	templateUrl : './home.html'
})
export class HomeComponent implements OnInit {

  public currentOffers : Offer[] = [];
  public sliderContent : Content[] = [];

  constructor(private offerRepository: OfferRepository,
              private contentRepository: ContentRepository,) {
	}

  ngOnInit(){
    this.offerRepository.getCurrentOffers()
                        .subscribe(data => {
                             this.currentOffers = data;
                        });

    this.contentRepository.getSliderContent()
                          .subscribe(data => {
                               this.sliderContent = data;
                          });
  }

}
