import {EntryOptionType} from "./entry_option_type";
import {App} from 'obsidian';

import {AddAssetModal} from "src/asset/modal/add_asset_modal";
import {AddPatrimonyModal} from "src/patrimony/modal/add_patrimony_modal";
import {AddTransactionModal} from "src/transaction/modal/add_transaction_modal";

export class EntryModalMap {
	private readonly app: App;

	constructor(app: App) {
		this.app = app;
	}

	getRegisteredTypes(): EntryOptionType[] {
		return [
			EntryOptionType.AddAsset,
			EntryOptionType.AddPatrimony,
			EntryOptionType.AddTransaction,
		]
	}

	getModal(type: EntryOptionType) {
		switch (type) {
			case EntryOptionType.AddAsset:
				return new AddAssetModal(this.app);
			case EntryOptionType.AddPatrimony:
				return new AddPatrimonyModal(this.app);
			case EntryOptionType.AddTransaction:
				return new AddTransactionModal(this.app);
		}
	}
}
