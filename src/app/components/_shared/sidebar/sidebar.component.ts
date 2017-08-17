import {Component, Input} from '@angular/core';

import {TagGroup} from '../../../models/tag/taggroup.model';

@Component({
	templateUrl : './sidebar.html',
  selector : 'side-bar'
})
export class SideBarComponent {

	@Input() tags : Map<number, TagGroup>;

}
