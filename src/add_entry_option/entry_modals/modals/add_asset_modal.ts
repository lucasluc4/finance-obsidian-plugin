import { App, Modal } from 'obsidian';

export class AddAssetModal extends Modal {
	constructor(app: App) {
		super(app);
		this.setContent('Look at me, I\'m a modal! 👀')
	}
}
