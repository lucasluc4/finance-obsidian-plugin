import { Notice } from "obsidian";
import { PatrimonyFileParameter } from "./patrimony_file_parameter";
import { FinanceFileSetting } from "src/general/modal_decorator/file/finance_file_setting";

export class PatrimonyFileSetting implements FinanceFileSetting<PatrimonyFileParameter> {

	validate(value: PatrimonyFileParameter): boolean {
		if (!value || !value.getPatrimonyValue() || !value.getAsset() || !value.getPeriod()) {
			new Notice('All fields are required');
			return false;
		}
		return true;
	}

	getPath(value: PatrimonyFileParameter): string {
		return "finance/patrimony/" + value.getPeriod();
	}

	getFileName(value: PatrimonyFileParameter): string {
		return value.getAsset().getName() + ".md";
	}

	getFileContent(value: PatrimonyFileParameter): string {
		return "---\n" +
			"Value: " + value.getPatrimonyValue().toFixed(2) + "\n" +
			"---\n";
	}
}
