import {Modal, Notice, Setting} from "obsidian";
import {FinanceFileSetting} from "./file/finance_file_setting";

export class FinanceFileCreationButtonDecorator<K> {

	include(modal: Modal, getValue: () => K, financeFileSetting: FinanceFileSetting<K>) {

		new Setting(modal.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Create')
					.setCta()
					.onClick(async () => {
						const value = getValue();

						if (!financeFileSetting.validate(value)) {
							return;
						}

						const fileContent = financeFileSetting.getFileContent(value);

						const path = financeFileSetting.getPath(value);
						const fileName = financeFileSetting.getFileName(value);
						const filePath = path + "/" + fileName;

						try {

							const existingFolder = modal.app.vault.getAbstractFileByPath(path);
							if (!existingFolder) {
								await modal.app.vault.createFolder(path);
							}

							const file = await modal.app.vault.create(filePath, fileContent);
							await modal.app.workspace.getLeaf(false).openFile(file);
						} catch (e) {
							new Notice('An error occurred while creating new patrimony file. ' +
								'Check if file ' + filePath + ' already exists.');
							return;
						}

						modal.close();
					}));
	}
}
