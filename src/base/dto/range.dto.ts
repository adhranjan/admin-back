import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  /**
   * Property-level decorator to enforce a range relationship between two properties
   * @param relatedProperty - the other property to pair with
   */
  export function IsRangedWith(relatedProperty: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isRangedWith',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [relatedProperty],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const relatedValue = (args.object as any)[relatedProperty];
            // If one exists, both must exist
            if ((value !== undefined && relatedValue === undefined) || (value === undefined && relatedValue !== undefined)) {
              return false;
            }  
            // If both exist, start must be less than end
            if (value !== undefined && relatedValue !== undefined) {
              const start = propertyName === 'startDate' ? value : relatedValue;
              const end = propertyName === 'endDate' ? value : relatedValue;
              return typeof start === 'number' && typeof end === 'number' && start < end;
            }
  
            return true; // neither exists is fine
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be set together with ${relatedProperty}, and start must be less than end`;
          },
        },
      });
    };
  }
  