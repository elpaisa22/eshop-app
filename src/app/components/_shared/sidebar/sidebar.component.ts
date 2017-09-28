import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {TagGroup, TagValue} from '../../../models/tag/taggroup.model';

@Component({
	templateUrl : './sidebar.html',
  selector : 'side-bar'
})
export class SideBarComponent {

	@Input() tags : Map<number, TagGroup>;

	@Input()  priceMin : number;
	@Input()  priceMax : number;

	@Output() tagFilterChange = new EventEmitter();
	@Output() clearTagFilter = new EventEmitter();
	@Output() priceRangeChange = new EventEmitter();
	@Output() clearPriceRange = new EventEmitter();

	public selectionTagChange(tag : TagGroup, value, event) {
		this.tagFilterChange.emit({
				tag : tag,
				value : value,
				checked : event.currentTarget.checked
	 	});
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

		this.clearTagFilter.emit({
				tag : tag
	 	});
	}

	public onPriceRangeChange(event : any) {
		this.priceRangeChange.emit({
				priceMin : event.range_min,
				priceMax : event.range_max
	 	});
  }

	public onClearRangeValues() {
		this.clearPriceRange.emit();
	}

}
