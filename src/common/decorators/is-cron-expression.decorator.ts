import { ValidationOptions, registerDecorator } from 'class-validator';
import * as cron from 'node-cron';

export function IsCronExpression(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: unknown, propertyName: string) {
    if (typeof object !== 'object') {
      throw new Error('class only');
    }

    registerDecorator({
      name: 'IsCronExpression',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: 'cron expression only' },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && cron.validate(value);
        },
      },
    });
  };
}
