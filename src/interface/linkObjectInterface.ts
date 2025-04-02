export interface LinkObject {
  UTM: string;
  location: string;
  expected_link: string;
}

export interface LinksObject {
  [key: string]: LinkObject;
}