export class ReserveAccount {
	private readonly name: string;
	private readonly goal: number;
	private readonly description: string;
	private readonly active: boolean;

	constructor(name: string, goal: number, description: string, active: boolean) {
		this.name = name;
		this.goal = goal;
		this.description = description;
		this.active = active;
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

	isActive(): boolean {
		return this.active;
	}
}
