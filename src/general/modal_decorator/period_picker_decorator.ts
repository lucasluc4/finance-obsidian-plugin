import { Setting, Modal } from 'obsidian';

export class PeriodPickerDecorator {

	include(modal: Modal, periodSetCallback: (period: string) => void) {
		const today = new Date();
		const currentMonth = today.getUTCMonth() + 1;
		const currentYear = today.getUTCFullYear();

		let yearInput: string = currentYear.toString();
		let monthInput: string = currentMonth < 10 ? "0" + currentMonth : currentMonth.toString();
		let period: string = yearInput + "-" + monthInput;

		periodSetCallback(period);

		new Setting(modal.contentEl)
			.setName('Year')
			.addText((text) =>
				text.setValue(yearInput)
					.onChange((value) => {
						const numericInput = value.replace(/\D/g, '');
						if (numericInput.length > 4) {
							yearInput = numericInput.slice(0, 4);
						} else {
							yearInput = numericInput;
						}
						text.setValue(yearInput);
						periodSetCallback(yearInput + "-" + monthInput);
					})
			);

		new Setting(modal.contentEl)
			.setName('Month')
			.addDropdown((dropdown) =>
				dropdown
					.addOption("01", "January")
					.addOption("02", "February")
					.addOption("03", "March")
					.addOption("04", "April")
					.addOption("05", "May")
					.addOption("06", "June")
					.addOption("07", "July")
					.addOption("08", "August")
					.addOption("09", "September")
					.addOption("10", "October")
					.addOption("11", "November")
					.addOption("12", "December")
					.setValue(monthInput)
					.onChange((value: string) => {
						monthInput = value;
						periodSetCallback(yearInput + "-" + monthInput);
					})
			);
	}
}
