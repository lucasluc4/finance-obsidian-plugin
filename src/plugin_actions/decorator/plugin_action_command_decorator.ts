import { Notice, Plugin } from 'obsidian';
import { EntryOptionDescriptionMap } from "../entry_option_description_map";
import { EntryModalMap } from "../entry_option_modal_map";

export class PluginActionCommandDecorator {

	include(plugin: Plugin) {
		const entryOptionDescriptionMap = new EntryOptionDescriptionMap();
		const entryModalMap = new EntryModalMap(plugin.app);

		entryModalMap.getRegisteredTypes().forEach(type => {
			plugin.addCommand({
				id: 'cmd-open-modal-' + type,
				name: entryOptionDescriptionMap.getDescription(type),
				callback: () => {
					const modal = entryModalMap.getModal(type);
					if (modal) {
						modal.open();
					} else {
						new Notice('Command is not properly configured');
					}
				}
			});
		});
	}
}
