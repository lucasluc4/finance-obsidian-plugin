import { App, Modal, Setting, Notice } from 'obsidian';
import { Asset } from "src/asset/asset";
import { PeriodPickerDecorator } from "src/general/modal_decorator/period_picker_decorator";
import { AssetPickerDecorator } from "../../general/modal_decorator/asset_picker_decorator";
import { ValueFieldDecorator } from "../../general/modal_decorator/value_field_decorator";

export class AddPatrimonyModal extends Modal {
	constructor(app: App) {
		super(app);

		this.setTitle('Create new Patrimony Entry');

		let asset: Asset;
		let period: string;
		let patrimonyValue: number = 0;

		new PeriodPickerDecorator().include(this, (newPeriod) => {
			period = newPeriod;
		});

		new AssetPickerDecorator().include(this, (newAsset) => {
			asset = newAsset;
		});

		new ValueFieldDecorator().include(this, (newValue) => {
			patrimonyValue = newValue;
		});

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Create')
					.setCta()
					.onClick(async () => {
						if (!asset || !period || !patrimonyValue) {
							new Notice('All fields are required');
							return;
						}

						const fileContent = "---\n" +
							"Value: " + patrimonyValue.toFixed(2) + "\n" +
							"---\n";

						const path = "finance/patrimony/" + period;
						const fileName = asset.getName() + ".md";
						const filePath = path + "/" + fileName;
						try {

							const existingFolder = app.vault.getAbstractFileByPath(path);
							if (!existingFolder) {
								await this.app.vault.createFolder(path);
							}

							const file = await this.app.vault.create(filePath, fileContent);
							await this.app.workspace.getLeaf(false).openFile(file);
						} catch (e) {
							new Notice('An error occurred while creating new patrimony file. ' +
								'Check if file ' + filePath + ' already exists.');
							return;
						}

						this.close();
					}));
	}
}
