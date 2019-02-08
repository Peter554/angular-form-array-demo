import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationHelperService {

  constructor() { }

  allControlsAreTouched(fg: FormGroup): boolean {
    for(let key in fg.controls) {
      const control = fg.controls[key] as any;
      if (!control.touched) {
        return false;
      }

    // A bit hacky but works.
    // Recurse down controls and mark as touched.
      if (control.controls) {
        const allChildrenAreTouched = this.allControlsAreTouched(control);
        if (!allChildrenAreTouched) {
          return false;
        }
      }
    }
    
    return true;
  }

  touchAllControls(fg: FormGroup): void {
    fg.markAsTouched();
    for(let key in fg.controls) {
      const control = fg.controls[key] as any;
      control.markAsTouched();
      // A bit hacky but works.
      // Recurse down controls and mark as touched.
      if (control.controls) {
        this.touchAllControls(control);
      }
    }
  }

  makeAllControlsUntouched(fg: FormGroup): void {
    fg.markAsUntouched();
    for(let key in fg.controls) {
      const control = fg.controls[key] as any;
      control.markAsUntouched();
      // A bit hacky but works.
      // Recurse down controls and mark as pristine.
      if (control.controls) {
        this.makeAllControlsUntouched(control);
      }
    }
  }

  visualizationValidator(fg: FormGroup) {
    let result = {};

    if (fg.get('elementType').value == 'Univariate visualization' || fg.get('elementType').value == 'Bivariate visualization') {
       if (fg.get('elementVisualizationVariableOne').value == '') {
          result = {...result, variableOneMissing: true}
       }
    } 
    
    if (fg.get('elementType').value == 'Bivariate visualization') {
      if (fg.get('elementVisualizationVariableTwo').value == '') {
        result = {...result, variableTwoMissing: true}
      }
    } 

    return Object.keys(result).length > 0 ? result : null;
  }
}
