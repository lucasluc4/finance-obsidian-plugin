import { AssetType } from "./asset_type";

export class Asset {
	private readonly _assetType: AssetType;
	private readonly _isActive: boolean;
	private readonly _name: string;

	constructor(assetType: AssetType, name: string, isActive: boolean) {
		this._assetType = assetType;
		this._isActive = isActive;
		this._name = name;
	}

	getAssetType() {
		return this._assetType;
	}

	getName() {
		return this._name;
	}

	isActive() {
		return this._isActive;
	}

}
