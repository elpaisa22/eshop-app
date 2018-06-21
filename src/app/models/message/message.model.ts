export class Message {
	id : number;
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(content, style?, id?) {
  	this.id = id
    this.content = content
    this.style = style || 'info'
  }

}