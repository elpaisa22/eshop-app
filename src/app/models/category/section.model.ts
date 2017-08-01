export class Section {
  id : number;
  name : string;
  categories : Category[];
}

export class Category {
  id : number;
  name : string;
  subcategories : SubCategory[];
}

export class SubCategory {
  id : number;
  name : string;
}
