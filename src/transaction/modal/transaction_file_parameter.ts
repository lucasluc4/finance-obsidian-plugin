import {TransactionType} from "../transaction_type";
import {Asset} from "../../asset/asset";

export class TransactionFileParameter {
	private readonly transactionType: TransactionType;
	private readonly asset: Asset;
	private readonly value: number;
	private readonly period: string;
	private readonly description: string;

	constructor(transactionType: TransactionType, asset: Asset, value: number, period: string, description: string) {
		this.transactionType = transactionType;
		this.asset = asset;
		this.value = value;
		this.period = period;
		this.description = description;
	}

	getTransactionType() {
		return this.transactionType;
	}

	getValue() {
		return this.value;
	}

	getAsset() {
		return this.asset;
	}

	getPeriod() {
		return this.period;
	}

	getDescription() {
		return this.description;
	}
}
