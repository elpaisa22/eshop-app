import {Component, Input} from '@angular/core';

import {TagGroup, TagValue} from '../../../models/tag/taggroup.model';

@Component({
	templateUrl : './sidebar.html',
  selector : 'side-bar'
})
export class SideBarComponent {

	@Input() tags : Map<number, TagGroup>;

	_filters : Map<number, String[]> = new Map<number, String[]>();

	public selectionTagChange(tag, value, input: HTMLInputElement) {
		var values : String[];
		if (this._filters.has(tag.id)) {
			values = this._filters.get(tag.id);
		} else {
			values = new Array<String>();
		}

		if (input.checked) {
				values.push(value);
		} else {
			let index = values.findIndex(d => d === value); //find index in your array
			values.splice(index, 1);//remove element from array
		}

		if (values.length == 0) {
				this._filters.delete(tag.id);
		} else {
				this._filters.set(tag.id, values);
		}

	}
}
