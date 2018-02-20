export interface Offer {
  id: number;
  name: string;
  image: string;
  initial_date: Date;
  end_date: Date;
  min_required: number;
  details : string;
  offerproduct_set: ProductInOffer[];
}

export interface ProductInOffer {
  product: number;
  discount: number;
}
