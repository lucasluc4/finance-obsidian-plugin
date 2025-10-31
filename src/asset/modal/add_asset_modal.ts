import { App, Modal, Setting, Notice } from 'obsidian';
import { AssetTypeDescriptionMap } from "src/asset/asset_type_description_map";
import { AssetType } from "src/asset/asset_type";

export class AddAssetModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle('Create new Asset');

		let name = '';
		let type: AssetType = AssetType.DepositAccount;

		const assetTypeDescriptionMap = new AssetTypeDescriptionMap();

		new Setting(this.contentEl)
			.setName('Asset name')
			.addText((text) =>
				text.onChange((value) => {
					name = value;
				}));

		new Setting(this.contentEl)
			.setName('Asset Type')
			.addDropdown((dropdown) =>
				dropdown
					.addOption(AssetType.DepositAccount,
						assetTypeDescriptionMap.getDescription(AssetType.DepositAccount))
					.addOption(AssetType.InvestmentAccount,
						assetTypeDescriptionMap.getDescription(AssetType.InvestmentAccount))
					.addOption(AssetType.RealEstate, assetTypeDescriptionMap.getDescription(AssetType.RealEstate))
					.onChange((value: AssetType) => {
						type = value;
					})
			);

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText('Create')
					.setCta()
					.onClick(async () => {
						if (!name || !name.length) {
							new Notice('Name cannot be empty');
							return;
						}

						const fileContent = "---\n" +
							"Type: " + type + "\n" +
							"Active: true\n" +
							"---\n";

						const path = "finance/assets";
						const fileName = name + ".md";
						const filePath = path + "/" + fileName;
						try {

							const existingFolder = app.vault.getAbstractFileByPath(path);
							if (!existingFolder) {
								await this.app.vault.createFolder(path);
							}

							const file = await this.app.vault.create(filePath, fileContent);
							await this.app.workspace.getLeaf(false).openFile(file);
						} catch (e) {
							new Notice('An error occurred while creating new asset file. ' +
								'Check if file already exists.');
							return;
						}

						this.close();
					}));
	}
}
