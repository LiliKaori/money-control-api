type BalanceProps = {
    _id?: string | number[] | null;
    incomes: number;
    expenses: number;
    balance: number;
};

export class Balance {
    public _id?: string | number[] | null;
    public incomes: number;
    public expenses: number;
    public balance: number;

    constructor({ _id, incomes, expenses, balance }: BalanceProps) {
        this._id = _id;
        this.incomes = incomes;
        this.expenses = expenses;
        this.balance = balance;
    }
}
