import {App, Modal, Setting, Notice, TFile} from 'obsidian';
import { Asset } from "../../asset/asset";
import {AssetType} from "../../asset/asset_type";

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
		let period: string = yearInput + "-" + monthInput;
		let patrimonyValue: number = 0;

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

		const currentAssets: Asset[] = [];
		const folder = this.app.vault.getFolderByPath("finance/assets");
		folder?.children.forEach((child) => {
			if (child instanceof TFile && child.extension === "md") {
				const assetFile = child as TFile;
				const frontmatter = this.app.metadataCache.getFileCache(assetFile)?.frontmatter;

				if (frontmatter) {
					try {
						const active = frontmatter.Active as boolean;
						const assetType = frontmatter.Type as AssetType;

						currentAssets.push(new Asset(assetType, assetFile.basename, active));
					} catch (e) {
						console.error(e);
					}
				}
			}
		});

		new Setting(this.contentEl)
			.setName('Asset')
			.addDropdown((dropdown) => {

				currentAssets.forEach((currentAsset) => {
					if (currentAsset.isActive()) {
						dropdown.addOption(currentAsset.getName(), currentAsset.getName());
						if (!asset) {
							asset = currentAsset;
							dropdown.setValue(currentAsset.getName());
						}
					}

				});

				dropdown
					.onChange((value: string) => {
						currentAssets.forEach((currentAsset) => {
							if (value === currentAsset.getName()) {
								asset = currentAsset;
							}
						})
					});
			});

		new Setting(this.contentEl)
			.setName('Value')
			.addText((text) =>
				text.setValue("0.00")
					.onChange((value) => {
						const numericInput = Number(value.replace(/\D/g, '')) / 100;
						const input = numericInput.toFixed(2);
						text.setValue(input);
						patrimonyValue = numericInput;
					})
			);

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
