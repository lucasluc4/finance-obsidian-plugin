import {App, Modal} from "obsidian";
import {PeriodPickerDecorator} from "../../general/modal_decorator/period_picker_decorator";
import {AccountingCalculator} from "../accounting_calculator";
import {FinanceFileCreationButtonDecorator} from "../../general/modal_decorator/finance_file_creation_button_decorator";
import {AccountingFileSetting} from "../file/accounting_file_setting";

export class CreateAccountingModal extends Modal {
	constructor(app: App) {
		super(app);

		this.setTitle("Create Accounting");

		let period: string;

		new PeriodPickerDecorator().include(this, (newPeriod) => {
			period = newPeriod;
		});

		const calculateAccounting = () => {
			return new AccountingCalculator(app).calculate(period);
		}

		new FinanceFileCreationButtonDecorator().include(this, calculateAccounting,
			new AccountingFileSetting());
	}
}
