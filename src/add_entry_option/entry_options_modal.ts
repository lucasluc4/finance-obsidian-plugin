import { SuggestModal, App } from 'obsidian';
import { EntryOptionDescriptionMap } from "./entry_modals/entry_option_description_map";
import { EntryModalMap } from "./entry_modals/entry_option_modal_map";
import { EntryOptionType } from "./entry_modals/entry_option_type";

class DescriptionModalCorrespondence {
	type: EntryOptionType;
	description: string;

	constructor(description: string, type: EntryOptionType) {
		this.description = description || '';
		this.type = type;
	}
}

export class EntryOptionsModal extends SuggestModal<DescriptionModalCorrespondence> {

	private readonly _modalMap: EntryModalMap;
	private readonly _filteredOptions: DescriptionModalCorrespondence[];

	constructor(app: App) {
		super(app);
		this._modalMap = new EntryModalMap(app);

		const descriptionMap = new EntryOptionDescriptionMap();

		const filteredOptions: DescriptionModalCorrespondence[] = [];
		this._modalMap.getRegisteredTypes().forEach(type => {
			filteredOptions.push(
				new DescriptionModalCorrespondence(descriptionMap.getDescription(type), type),
			)
		});
		this._filteredOptions = filteredOptions;
	}

	// Returns all available suggestions.
	getSuggestions(query: string): DescriptionModalCorrespondence[] {
		return this._filteredOptions.filter((option) =>
			option.description.toLowerCase().includes(query.toLowerCase())
		);
	}

	// Renders each suggestion item.
	renderSuggestion(entry: DescriptionModalCorrespondence, el: HTMLElement) {
		console.log('renderSuggestion', entry);
		el.createEl('div', { text: entry.description });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(entry: DescriptionModalCorrespondence, evt: MouseEvent | KeyboardEvent) {
		this._modalMap.getModal(entry.type)?.open();
	}
}
