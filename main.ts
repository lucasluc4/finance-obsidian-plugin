import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { EntryOptionsModal } from "./src/add_entry_option/entry_options_modal";
import { EntryModalMap } from "src/add_entry_option/entry_modals/entry_option_modal_map";
import { EntryOptionDescriptionMap } from "src/add_entry_option/entry_modals/entry_option_description_map";

// Remember to rename these classes and interfaces!

interface FinanceManagerPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: FinanceManagerPluginSettings = {
	mySetting: 'default'
}

export default class FinanceManagerPlugin extends Plugin {
	settings: FinanceManagerPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('piggy-bank', 'Add finance entry', (evt: MouseEvent) => {
			new EntryOptionsModal(this.app).open();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('finance-manager-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		const entryOptionDescriptionMap = new EntryOptionDescriptionMap();
		const entryModalMap = new EntryModalMap(this.app);
		entryModalMap.getRegisteredTypes().forEach(type => {
			this.addCommand({
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

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: FinanceManagerPlugin;

	constructor(app: App, plugin: FinanceManagerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
