export class DuplicateKeyError extends Error {
	constructor(message: string, asserter=undefined) {
		super(message);
		Error.captureStackTrace?.(this, asserter || this.constructor);
	}
}
