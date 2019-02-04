export interface Page {
  elements: PageElement[]
}

export interface PageElement {
  elementType: string;
  elementText: string;
}