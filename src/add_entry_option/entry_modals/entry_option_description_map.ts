import { EntryOptionType } from "./entry_option_type";

const entryOptionDescriptionMap = new Map<EntryOptionType, string>();
entryOptionDescriptionMap.set(EntryOptionType.AddAsset, 'Create new Asset');
entryOptionDescriptionMap.set(EntryOptionType.AddPatrimony, 'Create new Patrimony entry');
entryOptionDescriptionMap.set(EntryOptionType.AddTransaction, 'Create new Transaction');
entryOptionDescriptionMap.set(EntryOptionType.AddReserveAccount, 'Create new Reserve Account');
entryOptionDescriptionMap.set(EntryOptionType.AddReserveTransaction, 'Create new Reserve Transaction');

export default entryOptionDescriptionMap;
