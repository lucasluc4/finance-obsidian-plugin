import { Modal, Setting } from 'obsidian';

export class ValueFieldDecorator {

	include(modal: Modal, valueSetCallback: (value: number) => void) {
		new Setting(modal.contentEl)
			.setName('Value')
			.addText((text) =>
				text.setValue("0.00")
					.onChange((value) => {
						const numericInput = Number(value.replace(/\D/g, '')) / 100;
						const input = numericInput.toFixed(2);
						text.setValue(input);
						valueSetCallback(numericInput);
					})
			);
	}
}
