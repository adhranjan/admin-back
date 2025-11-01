import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Ensures two properties are either both set or both unset,
 * and enforces that the "smallProperty" <= "bigProperty" if both are numbers or dates.
 *
 * @param smallProperty The property that must be smaller
 * @param bigProperty The property that must be bigger
 * @param validationOptions Optional class-validator options
 */
export function IsRangedWith(
  smallProperty: string,
  bigProperty: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRangedWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [smallProperty, bigProperty],
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [smallProp, bigProp] = args.constraints;
          const obj = args.object as any;

          const smallValue = obj[smallProp];
          const bigValue = obj[bigProp];

          // If one exists, both must exist
          if ((smallValue !== undefined && bigValue === undefined) || (smallValue === undefined && bigValue !== undefined)) {
            return false;
          }

          // If both exist, check small <= big
          if (smallValue !== undefined && bigValue !== undefined) {
            if ((typeof smallValue === 'number' || smallValue instanceof Date) &&
                (typeof bigValue === 'number' || bigValue instanceof Date)) {
              return smallValue <= bigValue;
            }
          }

          return true; // valid if neither exists
        },

        defaultMessage(args: ValidationArguments) {
          const [smallProp, bigProp] = args.constraints;
          return `${smallProp} and ${bigProp} must both be set (or both unset), and ${smallProp} must be less than or equal to ${bigProp}`;
        },
      },
    });
  };
}
