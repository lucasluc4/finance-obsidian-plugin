export class ReserveBalance {
	private readonly reserveAccountName: string;
	private readonly balance: number;

	constructor(reserveAccountName: string, balance: number) {
		this.balance = balance;
		this.reserveAccountName = reserveAccountName;
	}

	getBalance(): number {
		return this.balance;
	}

	getReserveAccountName(): string {
		return this.reserveAccountName;
	}
}
