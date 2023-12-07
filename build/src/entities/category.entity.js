"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor({ _id, color, title }) {
        this._id = _id;
        this.title = title;
        this.color = color.toUpperCase();
    }
}
exports.Category = Category;
