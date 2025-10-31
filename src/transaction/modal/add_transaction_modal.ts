import { App, Modal, Setting } from 'obsidian';
import { Asset } from "src/asset/asset";
import { PeriodPickerDecorator } from "src/general/modal_decorator/period_picker_decorator";
import { AssetPickerDecorator } from "src/general/modal_decorator/asset_picker_decorator";
import { ValueFieldDecorator } from "src/general/modal_decorator/value_field_decorator";
import { TransactionType } from "../transaction_type";
import {TransactionFileParameter} from "./transaction_file_parameter";
import {FinanceFileCreationButtonDecorator} from "../../general/modal_decorator/finance_file_creation_button_decorator";
import {TransactionFileSetting} from "./transaction_file_setting";

export class AddTransactionModal extends Modal {
	constructor(app: App) {
		super(app);

		this.setTitle("Create new Transaction");

		let asset: Asset;
		let period: string;
		let transactionValue: number = 0;
		let type: TransactionType = TransactionType.Deposit;
		let description: string = '';

		new PeriodPickerDecorator().include(this, (newPeriod) => {
			period = newPeriod;
		});

		new AssetPickerDecorator().include(this, (newAsset) => {
			asset = newAsset;
		});

		new ValueFieldDecorator().include(this, (newValue) => {
			transactionValue = newValue;
		});

		new Setting(this.contentEl)
			.setName('Type')
			.addDropdown((dropdown) => {
				dropdown
					.addOption(TransactionType.Deposit, 'Deposit')
					.addOption(TransactionType.Withdraw, 'Withdraw')
					.addOption(TransactionType.Salary, 'Salary')
					.addOption(TransactionType.Bonus, 'Bonus')
					.setValue(TransactionType.Deposit)
					.onChange(value => {
						type = value as TransactionType;
					});
			});

		new Setting(this.contentEl)
			.setName('Description (optional)')
			.addTextArea((textArea) => {
				textArea.onChange(value => {
					description = value;
				});
			});

		const getTransactionFileParameter = () => {
			return new TransactionFileParameter(type, asset, transactionValue, period, description);
		}

		new FinanceFileCreationButtonDecorator().include(this, getTransactionFileParameter,
			new TransactionFileSetting(app));
	}
}
