import { Plugin } from 'obsidian';
import { EntryOptionsModal } from "../modal/entry_options_modal";

export class PluginActionButtonDecorator {

	include(plugin: Plugin) {
		const ribbonIconEl = plugin.addRibbonIcon('piggy-bank', 'Add finance entry', (evt: MouseEvent) => {
			new EntryOptionsModal(plugin.app).open();
		});

		// Perform additional things with the ribbon
		ribbonIconEl.addClass('finance-manager-ribbon-class');
	}
}
