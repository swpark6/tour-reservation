import { ConflictException } from '@nestjs/common';

export class CanNotCancelException extends ConflictException {
  constructor(now: Date, cancellationDueDate: Date) {
    super(
      `now=${now.toISOString()}, cancellationDueDate=${cancellationDueDate.toISOString()}`,
    );
  }
}
