import { App, Modal, Setting } from 'obsidian';
import { FinanceFileCreationButtonDecorator } from "src/general/modal_decorator/finance_file_creation_button_decorator";
import { ValueFieldDecorator } from "src/general/modal_decorator/value_field_decorator";
import { ReserveAccount } from "../reserve_account";
import { ReserveAccountFileSettings } from "./reserve_account_file_setting";

export class AddReserveAccountModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setTitle("Create new Reserve Account")

		let name = '';
		let goal = 0;
		let description = '';

		new Setting(this.contentEl)
			.setName("Name")
			.addText((text) => {
				text.onChange(value => name = value);
			});

		new ValueFieldDecorator().include(this, value => goal = value);

		new Setting(this.contentEl)
			.setName("Description (optional)")
			.addTextArea((text) => text.onChange(value => description = value));

		const getReserveAccountParameter = () => {
			return new ReserveAccount(name, goal, description);
		}

		new FinanceFileCreationButtonDecorator<ReserveAccount>().include(this, getReserveAccountParameter,
			new ReserveAccountFileSettings());
	}
}
