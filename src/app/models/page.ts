export interface Page {
  elements: PageElement[]
}

export interface PageElement {
  elementType: string;
  elementText: string;
  elementRules: PageElementRule[];
}

export interface PageElementRule {
  question: string;
  operator: string;
  keyScore: number;
}

