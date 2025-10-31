import { Notice } from "obsidian";
import { FinanceFileSetting } from "../../general/modal_decorator/file/finance_file_setting";
import { AssetFileParameter } from "./asset_file_parameter";

export class AssetFileSetting implements FinanceFileSetting<AssetFileParameter> {

	getFileContent(value: AssetFileParameter): string {
		return "---\n" +
			"Type: " + value.getType() + "\n" +
			"Active: true\n" +
			"---\n";
	}

	getFileName(value: AssetFileParameter): string {
		return value.getName() + ".md";
	}

	getPath(value: AssetFileParameter): string {
		return "finance/assets";
	}

	validate(value: AssetFileParameter): boolean {
		if (!value.getName() || !value.getName().length) {
			new Notice('Name cannot be empty');
			return false;
		}
		return true;
	}

}
