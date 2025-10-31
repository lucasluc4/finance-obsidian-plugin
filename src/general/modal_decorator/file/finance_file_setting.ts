export interface FinanceFileSetting<T> {
	validate(value: T): boolean;
	getFileName(value: T): string;
	getPath(value: T): string;
	getFileContent(value: T): string;
}
