import { AssetType } from "../asset_type";

export class AssetFileParameter {
	private readonly assetType: AssetType;
	private readonly name: string;

	constructor(assetType: AssetType, name: string) {
		this.assetType = assetType;
		this.name = name;
	}

	getType(): AssetType {
		return this.assetType;
	}

	getName(): string {
		return this.name;
	}
}
