export class CanNotCancelException extends Error {
  constructor(now: Date, cancellationDueDate: Date) {
    super(
      `now=${now.toISOString()}, cancellationDueDate=${cancellationDueDate.toISOString()}`,
    );
  }
}
