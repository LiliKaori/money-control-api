type ExpenseProps = {
    _id?: string;
    title: string;
    color: string;
    amount: string;
};

export class Expense {
    public _id?: string;
    public title: string;
    public color: string;
    public amount: string;

    constructor({ _id, color, title, amount }: ExpenseProps) {
        this._id = _id;
        this.title = title;
        this.color = color.toUpperCase();
        this.amount = amount;
    }
}
