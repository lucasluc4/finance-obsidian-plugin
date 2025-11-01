import { ReserveTransactionType } from "../reserve_transaction_type";
import { ReserveAccount } from "src/reserve_account/reserve_account";

export class ReserveTransactionFileParameter {
	private readonly reserveAccount: ReserveAccount;
	private readonly value: number;
	private readonly period: string;
	private readonly type: ReserveTransactionType;

	constructor(reserveAccount: ReserveAccount, value: number, period: string,
				reserveTransactionType: ReserveTransactionType) {
		this.reserveAccount = reserveAccount;
		this.value = value;
		this.period = period;
		this.type = reserveTransactionType;
	}

	getReserveAccount() {
		return this.reserveAccount;
	}

	getPeriod() {
		return this.period;
	}

	getValue() {
		return this.value;
	}

	getType() {
		return this.type;
	}
}
