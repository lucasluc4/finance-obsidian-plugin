import {normalizePath} from "obsidian";
import {FinanceFileSetting} from "../../general/modal_decorator/file/finance_file_setting";
import {Accounting} from "../accounting";

export class AccountingFileSetting implements FinanceFileSetting<Accounting> {
	getFileContent(value: Accounting): string {
		return "---\n" +
			"Real Estate Patrimony: " + value.getRealEstatePatrimony() + "\n" +
			"Financial Patrimony: " + value.getFinancialPatrimony() + "\n" +
			"Investment Financial Patrimony: " + value.getInvestmentFinancialPatrimony() + "\n" +
			"Deposit Financial Patrimony: " + value.getDepositFinancialPatrimony() + "\n" +
			"Total Patrimony: " + value.getTotalPatrimony() + "\n" +
			"Total Net Patrimony: " + value.getTotalNetPatrimony() + "\n" +
			"Total Income: " + value.getTotalIncome() + "\n" +
			"Total Investment Deposit: " + value.getTotalInvestmentDeposit() + "\n" +
			"Total Reserve: " + value.getTotalReserve() + "\n" +
			"Reserve Diff: " + value.getReserveDiff() + "\n" +
			"Reserve Balance: \"" +
				JSON.stringify(value.getReserveBalance()).replace(/"/g, "'") + "\"\n" +
			"Patrimony Diff: " + value.getPatrimonyDiff() + "\n" +
			"Financial Patrimony Diff: " + value.getFinancialPatrimonyDiff() + "\n" +
			"Investment Patrimony Diff: " + value.getInvestmentPatrimonyDiff() + "\n" +
			"Deposit Patrimony Diff: " + value.getDepositPatrimonyDiff() + "\n" +
			"Real Estate Patrimony Diff: " + value.getRealEstatePatrimonyDiff() + "\n" +
			"Investment Interest: " + value.getInvestmentInterest() + "\n" +
			"Percentage Investment Interest: " + value.getPercentageInvestmentInterest() + "\n" +
			"Net Economy: " + value.getNetEconomy() + "\n" +
			"Percentage Net Economy: " + value.getPercentageNetEconomy() + "\n" +
			"Financial Net Economy: " + value.getFinancialNetEconomy() + "\n" +
			"Percentage Financial Net Economy: " + value.getPercentageFinancialNetEconomy() + "\n" +
			"---\n";
	}

	getFileName(value: Accounting): string {
		return value.getPeriod() + ".md";
	}

	getPath(value: Accounting): string {
		return normalizePath("finance/accounting");
	}

	validate(value: Accounting): boolean {
		return true;
	}

}
