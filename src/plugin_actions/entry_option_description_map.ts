import { EntryOptionType } from "./entry_option_type";

export class EntryOptionDescriptionMap {
	private readonly entryOptionDescriptionMap: Map<EntryOptionType, string>;

	constructor() {
		this.entryOptionDescriptionMap = new Map();
		this.entryOptionDescriptionMap.set(EntryOptionType.AddAsset, 'Create new Asset');
		this.entryOptionDescriptionMap.set(EntryOptionType.AddPatrimony, 'Create new Patrimony entry');
		this.entryOptionDescriptionMap.set(EntryOptionType.AddTransaction, 'Create new Transaction');
		this.entryOptionDescriptionMap.set(EntryOptionType.AddReserveAccount, 'Create new Reserve Account');
		this.entryOptionDescriptionMap.set(EntryOptionType.AddReserveTransaction, 'Create new Reserve Transaction');
		this.entryOptionDescriptionMap.set(EntryOptionType.CreateAccounting, 'Create new Accounting');
	}

	getDescription(entryOptionType: EntryOptionType): string {
		const entryOptionDescription = this.entryOptionDescriptionMap.get(entryOptionType);
		if (entryOptionDescription) {
			return entryOptionDescription;
		}

		return entryOptionType;
	}
}
