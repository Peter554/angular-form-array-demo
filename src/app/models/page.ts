export interface Page {
  elements: PageElement[]
}

export interface PageElement {
  elementType: string;
  elementText: string;
  elementVisualizationVariableOne: string;
  elementVisualizationVariableTwo: string;
  elementRules: PageElementRule[];
}

export interface PageElementRule {
  variable: string;
  operator: string;
  keyScore: number;
}

