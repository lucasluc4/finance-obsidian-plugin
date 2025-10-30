import { App, Modal, Setting, Notice } from 'obsidian';
import { Asset } from "../../asset/asset";

export class AddPatrimonyModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle('Create new Patrimony Entry');

		const today = new Date();
		const currentMonth = today.getUTCMonth() + 1;
		const currentYear = today.getUTCFullYear();

		let asset: Asset;
		let yearInput: string = currentYear.toString();
		let monthInput: string = currentMonth < 10 ? "0" + currentMonth : currentMonth.toString();
		let period: string;
		let value: number;

		new Setting(this.contentEl)
			.setName('Year')
			.addText((text) =>
				text.setValue(yearInput)
					.onChange((value) => {
					const numericInput = value.replace(/\D/g, '');
					if (numericInput.length > 4) {
						yearInput = numericInput.slice(0, 4);
					} else {
						yearInput = numericInput;
					}
					text.setValue(yearInput);
					period = yearInput + "-" + monthInput;
				})
			);

		new Setting(this.contentEl)
			.setName('Month')
			.addDropdown((dropdown) =>
				dropdown
					.addOption("01", "January")
					.addOption("02", "February")
					.addOption("03", "March")
					.addOption("04", "April")
					.addOption("05", "May")
					.addOption("06", "June")
					.addOption("07", "July")
					.addOption("08", "August")
					.addOption("09", "September")
					.addOption("10", "October")
					.addOption("11", "November")
					.addOption("12", "December")
					.setValue(monthInput)
					.onChange((value: string) => {
						monthInput = value;
						period = yearInput + "-" + monthInput;
					})
			);

		// new Setting(this.contentEl)
		// 	.addButton((btn) =>
		// 		btn
		// 			.setButtonText('Create')
		// 			.setCta()
		// 			.onClick(async () => {
		// 				if (!name || !name.length) {
		// 					new Notice('Name cannot be empty');
		// 					return;
		// 				}
		//
		// 				const fileContent = "---\n" +
		// 					"Type: " + type + "\n" +
		// 					"Active: true\n" +
		// 					"---\n";
		//
		// 				const path = "finance/assets";
		// 				const fileName = name + ".md";
		// 				const filePath = path + "/" + fileName;
		// 				try {
		//
		// 					const existingFolder = app.vault.getAbstractFileByPath(path);
		// 					if (!existingFolder) {
		// 						await this.app.vault.createFolder(path);
		// 					}
		//
		// 					const file = await this.app.vault.create(filePath, fileContent);
		// 					await this.app.workspace.getLeaf(false).openFile(file);
		// 				} catch (e) {
		// 					new Notice('An error occurred while creating new asset file. ' +
		// 						'Check if file already exists.');
		// 					return;
		// 				}
		//
		// 				this.close();
		// 			}));
	}
}
