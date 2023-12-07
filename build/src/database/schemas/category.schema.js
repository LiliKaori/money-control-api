"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.CategorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CategorySchema = new mongoose_1.default.Schema({
    title: String,
    color: String,
}, {
    versionKey: false,
});
exports.CategoryModel = mongoose_1.default.model('Category', exports.CategorySchema);
