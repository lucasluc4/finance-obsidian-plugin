import { AssetType } from "./asset_type";

export class AssetTypeDescriptionMap {

	private readonly assetTypeDescriptionMap: Map<AssetType, string>;

	constructor() {
		this.assetTypeDescriptionMap = new Map();
		this.assetTypeDescriptionMap.set(AssetType.DepositAccount, 'Deposit Account');
		this.assetTypeDescriptionMap.set(AssetType.InvestmentAccount, 'Investment Account');
		this.assetTypeDescriptionMap.set(AssetType.RealEstate, 'Real Estate');
	}

	getDescription(assetType: AssetType): string {
		const assetDescription = this.assetTypeDescriptionMap.get(assetType);
		if (assetDescription) {
			return assetDescription;
		}

		return assetType;
	}

}
