import { PageElementRule } from "./PageElementRule";

export interface PageElement {
    elementType: string;
    elementText: string;
    elementVisualizationVariableOne: string;
    elementVisualizationVariableTwo: string;
    elementRules: PageElementRule[];
  }