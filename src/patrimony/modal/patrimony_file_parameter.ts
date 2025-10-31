import { Asset } from "src/asset/asset";

export class PatrimonyFileParameter {
	private readonly asset: Asset;
	private readonly period: string;
	private readonly patrimonyValue: number;

	constructor(asset: Asset, period: string, patrimonyValue: number) {
		this.asset = asset;
		this.period = period;
		this.patrimonyValue = patrimonyValue;
	}

	getAsset(): Asset {
		return this.asset;
	}

	getPeriod(): string {
		return this.period;
	}

	getPatrimonyValue(): number {
		return this.patrimonyValue;
	}
}
