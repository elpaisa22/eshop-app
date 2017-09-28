import {Component, Input, ViewChild, OnInit} from '@angular/core';

import {TagGroup, TagValue} from '../../../models/tag/taggroup.model';

import {FilterService} from '../../../services/filter/filter.service';

@Component({
	templateUrl : './sidebar.html',
  selector : 'side-bar'
})
export class SideBarComponent implements OnInit {

	@Input() tags : Map<number, TagGroup>;

	public  priceMin : number;
	public  priceMax : number;

	constructor(public filterService : FilterService) {
	}

	ngOnInit(){
		//Asigna la data desde el servicio
		this.filterService.priceMin.subscribe(data => this.priceMin = data);
		this.filterService.priceMax.subscribe(data => this.priceMax = data);
	}

	public selectionTagChange(tag : TagGroup, value, event) {
		this.filterService.changeFilterByTags(tag, value, event.currentTarget.checked);
	}

	public clearFilter(tag : TagGroup, event) {
		//Quita el seleccionado de los elementos
		var panel = event.srcElement.closest('.panel');
		var inputs = panel.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++) {
		    if(inputs[i].type == "checkbox") {
		        inputs[i].checked = false;
		    }
		}

		this.filterService.clearFilterForTag(tag);
	}

	public onPriceRangeChange(event : any) {
    this.filterService.changePriceRange(event.range_min, event.range_max);
  }

	public onClearRangeValues() {
		this.filterService.clearPriceRange();
	}

}
