import {ReserveTransactionType} from "./reserve_transaction_type";

export class ReserveTransaction {
	private readonly value: number;
	private readonly reserveAccountName: string;
	private readonly type: ReserveTransactionType;

	constructor(value: number, reserveAccountName: string, type: ReserveTransactionType) {
		this.value = value;
		this.type = type;
		this.reserveAccountName = reserveAccountName;
	}

	getValue() {
		return this.value;
	}

	getReserveAccountName() {
		return this.reserveAccountName;
	}

	getType() {
		return this.type;
	}
}
