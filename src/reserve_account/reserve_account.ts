export class ReserveAccount {
	private readonly name: string;
	private readonly goal: number;
	private readonly description: string;

	constructor(name: string, goal: number, description: string) {
		this.name = name;
		this.goal = goal;
		this.description = description;
	}

	getName(): string {
		return this.name;
	}

	getGoal(): number {
		return this.goal;
	}

	getDescription(): string {
		return this.description;
	}
}
