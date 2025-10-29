import { App, Modal, Setting } from 'obsidian';
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
					.onClick(() => {
						this.close();
					}));
	}
}
