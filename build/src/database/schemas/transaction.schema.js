"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_schema_1 = require("./category.schema");
const TransactionSchema = new mongoose_1.default.Schema({
    title: String,
    amount: Number,
    type: String,
    date: Date,
    category: category_schema_1.CategorySchema,
}, { versionKey: false });
exports.TransactionModel = mongoose_1.default.model('Transaction', TransactionSchema);
