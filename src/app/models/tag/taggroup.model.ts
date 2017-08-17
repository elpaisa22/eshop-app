export class TagGroup {
  id : number;
  name: string;
  tags: TagValue[];
}

export class TagValue {
  id : number;
  value: string;
  count: number;
}
