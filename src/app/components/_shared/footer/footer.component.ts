import {Component, OnInit} from '@angular/core';

import {Observable}     from 'rxjs';

import {Content} from '../../../models/content/content.model';
import {Contact} from '../../../models/contact/contact.model';
import {ContentRepository} from '../../../repositories/content/content.repository';
import {ContactRepository} from '../../../repositories/contact/contact.repository';

@Component({
	templateUrl : './footer.html',
  selector : 'footer-bar'
})
export class FooterComponent implements OnInit {
  public footerContent : Content[] = [];
  public contactInfo : Contact = {} as Contact;

  constructor(private contentRepository: ContentRepository,
              private contactRepository: ContactRepository) {
  }

  ngOnInit(){
    this.contentRepository.getFooterContent()
                          .subscribe(data => {
                               this.footerContent = data;
                          });

    this.contactRepository.getContactInfo()
                          .subscribe(data => {
                               this.contactInfo = data;
                          });
  }
}
