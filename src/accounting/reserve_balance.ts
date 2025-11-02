export class ReserveBalance {
	public readonly reserveAccountName: string;
	public readonly balance: number;

	constructor(reserveAccountName: string, balance: number) {
		this.balance = balance;
		this.reserveAccountName = reserveAccountName;
	}
}
