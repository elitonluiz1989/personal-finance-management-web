import {
  isBoolean,
  isNullOrUndefined,
  isNullOrWhiteSpace,
  isNumber,
  isString,
} from "@/app/helpers/helpers";
import { ValidationRule } from "@/app/types";

export type ValidationRulePrerequisite = () => boolean;

export class ValidationRules {
  public static required<T>(
    fieldName: string,
    prerequisite: ValidationRulePrerequisite | undefined = undefined
  ): ValidationRule<T> {
    return {
      rule: (value: T) => {
        if (ValidationRules.validatePrerequisitesFulfillment(prerequisite))
          return true;

        return ValidationRules.requiredValidation(value);
      },
      message: `${fieldName} is required.`,
    };
  }

  public static maxlength(
    fieldName: string,
    maxlength: number,
    prerequisite: ValidationRulePrerequisite | undefined = undefined
  ): ValidationRule<string> {
    return {
      rule: (value: string) => {
        if (ValidationRules.validatePrerequisitesFulfillment(prerequisite))
          return true;

        return String(value).length <= maxlength;
      },
      message: `${fieldName} length needs to be less than ${maxlength}.`,
    };
  }

  public static between(
    fieldName: string,
    min: number,
    max: number,
    prerequisite: ValidationRulePrerequisite | undefined = undefined
  ): ValidationRule<number> {
    return {
      rule: (value: number) => {
        if (ValidationRules.validatePrerequisitesFulfillment(prerequisite))
          return true;

        const num = +value;

        if (isNaN(num)) return false;

        return num >= min && num <= max;
      },
      message: `${fieldName} value must be between ${min} and ${max}`,
    };
  }

  private static requiredValidation<T>(value: T) {
    if (Array.isArray(value)) return value.length > 0;

    if (isBoolean(String(value))) return isNullOrUndefined(value) === false;

    if (isNumber(value))
      return ValidationRules.requiredNumberValidation<T>(value);

    if (isString(value)) return isNullOrWhiteSpace(String(value)) == false;

    return isNullOrUndefined(value) === false;
  }

  private static requiredNumberValidation<T>(value: T) {
    const numValue = Number(value);

    return isNaN(numValue) === false && numValue > 0;
  }

  private static validatePrerequisitesFulfillment(
    prerequisite: ValidationRulePrerequisite | undefined
  ) {
    return prerequisite instanceof Function && !prerequisite();
  }
}
