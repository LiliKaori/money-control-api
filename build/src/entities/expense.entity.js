"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor({ _id, color, title, amount }) {
        this._id = _id;
        this.title = title;
        this.color = color.toUpperCase();
        this.amount = amount;
    }
}
exports.Expense = Expense;
