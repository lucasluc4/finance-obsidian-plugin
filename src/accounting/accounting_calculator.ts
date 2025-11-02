import {App} from "obsidian";
import {Accounting} from "./accounting";
import {FetchAccountingFromFile} from "./file/fetch_accounting_from_file";

export class AccountingCalculator {
	private readonly app: App;

	constructor(app: App) {
		this.app = app;
	}

	calculate(period: string): Accounting {

		const fetchAccounting = new FetchAccountingFromFile(this.app);

		const lastPeriodAccounting = fetchAccounting.fetchAccounting(this.lessOneMonth(period));
		const lastNetPatrimony = lastPeriodAccounting ? lastPeriodAccounting.getTotalNetPatrimony() : 0;
		const lastDepositPatrimony = lastPeriodAccounting ? lastPeriodAccounting.getDepositFinancialPatrimony() : 0;
		const lastInvestmentPatrimony = lastPeriodAccounting ?
			lastPeriodAccounting.getInvestmentFinancialPatrimony() : 0;
		const lastFinancialPatrimony = lastPeriodAccounting ? lastPeriodAccounting.getFinancialPatrimony() : 0;
		const lastRealEstatePatrimony = lastPeriodAccounting ? lastPeriodAccounting.getRealEstatePatrimony() : 0;

		const periodPatrimony = fetchAccounting.fetchPatrimony(period);

		const totalFinancialPatrimony = periodPatrimony.getTotalDepositPatrimony()
			+ periodPatrimony.getTotalInvestmentPatrimony();

		const totalPatrimony = totalFinancialPatrimony + periodPatrimony.getTotalRealEstatePatrimony();

		return new Accounting(
			period,
			periodPatrimony.getTotalRealEstatePatrimony(),
			totalFinancialPatrimony,
			periodPatrimony.getTotalInvestmentPatrimony(),
			periodPatrimony.getTotalDepositPatrimony(),
			totalPatrimony,
			totalPatrimony,
			0,
			0,
			0,
			0,
			[],
			totalPatrimony - lastNetPatrimony,
			totalFinancialPatrimony - lastFinancialPatrimony,
			periodPatrimony.getTotalInvestmentPatrimony() - lastInvestmentPatrimony,
			periodPatrimony.getTotalDepositPatrimony() - lastDepositPatrimony,
			periodPatrimony.getTotalInvestmentPatrimony() - lastRealEstatePatrimony,
			0,
			0,
			0,
			0,
			0,
			0
		)
	}

	private lessOneMonth(period: string): string {
		const year = Number(period.substring(0, 4));
		const month = Number(period.substring(5));

		if (month === 1) {
			return `${year-1}-12`;
		}

		if (month <= 10) {
			return `${year}-0${month-1}`;
		}

		return `${year}-${month-1}`;
	}
}
