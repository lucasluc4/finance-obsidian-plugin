import { App } from 'obsidian';
import { FinanceFileSetting } from "src/general/modal_decorator/file/finance_file_setting";
import { TransactionFileParameter } from "./transaction_file_parameter";
import { Notice } from "obsidian";

export class TransactionFileSetting implements FinanceFileSetting<TransactionFileParameter> {

	private readonly app: App;

	constructor(app: App) {
		this.app = app;
	}

	getFileContent(value: TransactionFileParameter): string {
		return "---\n" +
			"Asset: " + value.getAsset().getName() + "\n" +
			"Type: " + value.getTransactionType().toString() + "\n" +
			"Value: " + value.getValue().toFixed(2) + "\n" +
			"---\n" +
			value.getDescription() + "\n";
	}

	getFileName(value: TransactionFileParameter): string {
		let num = 1;
		while (true) {
			const fileName = value.getAsset().getName()
				+ " - " + value.getTransactionType().toString()
				+ " " + num
				+ ".md";
			const fullPath = this.getPath(value) + "/" + fileName;
			const existingFile = this.app.vault.getAbstractFileByPath(fullPath);
			if (!existingFile) {
				return fileName;
			}
			num++;
		}
	}

	getPath(value: TransactionFileParameter): string {
		return "finance/transaction/" + value.getPeriod();
	}

	validate(value: TransactionFileParameter): boolean {
		if (!value || !value.getValue() || !value.getAsset() || !value.getPeriod() || !value.getTransactionType()) {
			new Notice('All fields are required');
			return false;
		}
		return true;
	}

}
