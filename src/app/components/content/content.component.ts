import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router }  from '@angular/router';

import {Content} from '../../models/content/content.model';
import {ContentRepository} from '../../repositories/content/content.repository';

import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
	templateUrl : './content.html'
})
export class ContentComponent implements OnInit {

	private _selectedId : any;
  public content : Content;

  constructor(private _activatedRoute: ActivatedRoute,
              private _contentRepository: ContentRepository,
						  private _sanitizer: DomSanitizer) {
	}

  ngOnInit(){
    this._activatedRoute.params.subscribe((params: Params) => {
			this._selectedId = params['id'];
			this._contentRepository.getContent(this._selectedId)
  		                       .subscribe(
  															data => {
  																this.content = data;
  															},
  												      error => console.log(error)
  													 );
			window.scrollTo(0, 0);
	 	});
  }

	public get safeContent() : SafeHtml {
     return this._sanitizer.bypassSecurityTrustHtml(this.content.content);
  }

}
