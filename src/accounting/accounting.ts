import { ReserveBalance } from "./reserve_balance";

export class Accounting {
	private readonly period: string;
	private readonly realEstatePatrimony: number;
	private readonly financialPatrimony: number;
	private readonly investmentFinancialPatrimony: number;
	private readonly depositFinancialPatrimony: number;
	private readonly totalPatrimony: number;
	private readonly totalNetPatrimony: number;
	private readonly totalIncome: number;
	private readonly totalInvestmentDeposit: number;
	private readonly totalReserve: number;
	private readonly reserveDiff: number;
	private readonly reserveBalance: ReserveBalance[];
	private readonly patrimonyDiff: number;
	private readonly financialPatrimonyDiff: number;
	private readonly investmentPatrimonyDiff: number;
	private readonly depositPatrimonyDiff: number;
	private readonly realEstatePatrimonyDiff: number;
	private readonly investmentInterest: number;
	private readonly percentageInvestmentInterest: number;
	private readonly netEconomy: number;
	private readonly percentageNetEconomy: number;
	private readonly financialNetEconomy: number;
	private readonly percentageFinancialNetEconomy: number;

	constructor(period: string,
				realEstatePatrimony: number,
				financialPatrimony: number,
				investmentFinancialPatrimony: number,
				depositFinancialPatrimony: number,
				totalPatrimony: number,
				totalNetPatrimony: number,
				totalIncome: number,
				totalInvestmentDeposit: number,
				totalReserve: number,
				reserveDiff: number,
				reserveBalance: ReserveBalance[],
				patrimonyDiff: number,
				financialPatrimonyDiff: number,
				investmentPatrimonyDiff: number,
				depositPatrimonyDiff: number,
				realEstatePatrimonyDiff: number,
				investmentInterest: number,
				percentageInvestmentInterest: number,
				netEconomy: number,
				percentageNetEconomy: number,
				financialNetEconomy: number,
				percentageFinancialNetEconomy: number) {
		this.period = period;
		this.realEstatePatrimony = realEstatePatrimony;
		this.financialPatrimony = financialPatrimony;
		this.investmentFinancialPatrimony = investmentFinancialPatrimony;
		this.depositFinancialPatrimony = depositFinancialPatrimony;
		this.totalPatrimony = totalPatrimony;
		this.totalNetPatrimony = totalNetPatrimony;
		this.totalIncome = totalIncome;
		this.totalInvestmentDeposit = totalInvestmentDeposit;
		this.totalReserve = totalReserve;
		this.reserveDiff = reserveDiff;
		this.reserveBalance = reserveBalance;
		this.patrimonyDiff = patrimonyDiff;
		this.financialPatrimonyDiff = financialPatrimonyDiff;
		this.investmentPatrimonyDiff = investmentPatrimonyDiff;
		this.depositPatrimonyDiff = depositPatrimonyDiff;
		this.realEstatePatrimonyDiff = realEstatePatrimonyDiff;
		this.investmentInterest = investmentInterest;
		this.percentageInvestmentInterest = percentageInvestmentInterest;
		this.netEconomy = netEconomy;
		this.percentageNetEconomy = percentageNetEconomy;
		this.financialNetEconomy = financialNetEconomy;
		this.percentageFinancialNetEconomy = percentageFinancialNetEconomy;
	}

	getPeriod() {
		return this.period;
	}

	getRealEstatePatrimony() {
		return this.realEstatePatrimony;
	}

	getFinancialPatrimony(): number {
		return this.financialPatrimony;
	}

	getInvestmentFinancialPatrimony() {
		return this.investmentFinancialPatrimony;
	}

	getDepositFinancialPatrimony() {
		return this.depositFinancialPatrimony;
	}

	getTotalPatrimony() {
		return this.totalPatrimony;
	}

	getTotalNetPatrimony() {
		return this.totalNetPatrimony;
	}

	getTotalIncome() {
		return this.totalIncome;
	}

	getTotalInvestmentDeposit() {
		return this.totalInvestmentDeposit;
	}

	getTotalReserve() {
		return this.totalReserve;
	}

	getReserveDiff() {
		return this.reserveDiff;
	}

	getReserveBalance() {
		return this.reserveBalance;
	}

	getPatrimonyDiff() {
		return this.patrimonyDiff;
	}

	getFinancialPatrimonyDiff() {
		return this.financialPatrimonyDiff;
	}

	getInvestmentPatrimonyDiff() {
		return this.investmentPatrimonyDiff;
	}

	getDepositPatrimonyDiff() {
		return this.depositPatrimonyDiff;
	}

	getRealEstatePatrimonyDiff() {
		return this.realEstatePatrimonyDiff;
	}

	getInvestmentInterest() {
		return this.investmentInterest;
	}

	getPercentageInvestmentInterest() {
		return this.percentageInvestmentInterest;
	}

	getNetEconomy() {
		return this.netEconomy;
	}

	getPercentageNetEconomy() {
		return this.percentageNetEconomy;
	}

	getFinancialNetEconomy() {
		return this.financialNetEconomy;
	}

	getPercentageFinancialNetEconomy() {
		return this.percentageFinancialNetEconomy;
	}

}
