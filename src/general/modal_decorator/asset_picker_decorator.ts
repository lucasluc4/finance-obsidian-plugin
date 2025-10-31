import { Modal, Setting, TFile } from 'obsidian';
import { Asset } from "src/asset/asset";
import { AssetType } from "src/asset/asset_type";

export class AssetPickerDecorator {

	include(modal: Modal, assetSetCallback: (asset: Asset) => void) {
		const currentAssets: Asset[] = [];
		const folder = modal.app.vault.getFolderByPath("finance/assets");
		folder?.children.forEach((child) => {
			if (child instanceof TFile && child.extension === "md") {
				const assetFile = child as TFile;
				const frontmatter = modal.app.metadataCache.getFileCache(assetFile)?.frontmatter;

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

		new Setting(modal.contentEl)
			.setName('Asset')
			.addDropdown((dropdown) => {
				let firstAssetSet = false;
				currentAssets.forEach((currentAsset) => {
					if (currentAsset.isActive()) {
						dropdown.addOption(currentAsset.getName(), currentAsset.getName());
						if (!firstAssetSet) {
							assetSetCallback(currentAsset);
							dropdown.setValue(currentAsset.getName());
							firstAssetSet = true;
						}
					}

				});

				dropdown
					.onChange((value: string) => {
						currentAssets.forEach((currentAsset) => {
							if (value === currentAsset.getName()) {
								assetSetCallback(currentAsset);
							}
						})
					});
			});
	}
}
