import {Component, Input, ViewChild} from '@angular/core';

import {TagGroup, TagValue} from '../../../models/tag/taggroup.model';

import {FilterService} from '../../../services/filter/filter.service';

@Component({
	templateUrl : './sidebar.html',
  selector : 'side-bar'
})
export class SideBarComponent {

	@Input() tags : Map<number, TagGroup>;
	@ViewChild('priceslider') priceslider;

	constructor(public _filterService : FilterService) {
	}

	public selectionTagChange(tag : TagGroup, value, input: HTMLInputElement) {
		this._filterService.applyFilterByTags(tag, value, input.checked);
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

		this._filterService.clearFilterForTag(tag);
	}

	public clearPriceRange() {
		this._filterService.clearPriceRange();
		this.priceslider.resetValues();
	}

	public onPriceRangeChange(event : any) {
		this._filterService.updatePriceRange(event.range_min, event.range_max);
	}

	get filterService() : FilterService {
		return this._filterService;
	}

	get priceMin() : number {
		return this._filterService.priceMin;
	}

	get priceMax() : number {
		return this._filterService.priceMax;
	}
}
