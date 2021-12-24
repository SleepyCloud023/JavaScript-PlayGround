import { ValidateRule } from "../types";

export default class Validator {
    private validateRules: ValidateRule[];

    constructor(validateRules: ValidateRule[] = []) {
        this.validateRules = validateRules;
    }

    public validate = (targetText: string | undefined): ValidateRule | null => {
      const target = targetText ? targetText.trim() : '';
  
      const invalidateRules = this.validateRules
        .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);
  
      return (invalidateRules.length > 0) ? invalidateRules[0] : null;
    }

    public addValidateRule = (rule:ValidateRule) => {
        this.validateRules.push(rule);
      }
    
}