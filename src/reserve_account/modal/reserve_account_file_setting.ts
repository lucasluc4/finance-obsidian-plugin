import { Notice } from 'obsidian';
import { FinanceFileSetting } from "src/general/modal_decorator/file/finance_file_setting";
import { ReserveAccount } from "../reserve_account";

export class ReserveAccountFileSettings implements FinanceFileSetting<ReserveAccount> {

	validate(value: ReserveAccount): boolean {
		if (!value || !value.getName() || !value.getName().length || !value.getGoal()) {
			new Notice('Name and goal cannot be empty');
			return false;
		}
		return true;
	}

	getFileName(value: ReserveAccount): string {
		return value.getName() + ".md";
	}

	getPath(value: ReserveAccount): string {
		return "finance/reserve_accounts";
	}

	getFileContent(value: ReserveAccount): string {
		return "---\n" +
			"Goal: " + value.getGoal() + "\n" +
			"Active: true\n" +
			"Achieved: false\n" +
			"---\n" +
			value.getDescription() + "\n";
	}

}
