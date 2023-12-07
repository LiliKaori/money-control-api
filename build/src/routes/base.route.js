"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRoutes = void 0;
const express_1 = require("express");
const package_json_1 = __importDefault(require("../../package.json"));
exports.baseRoutes = (0, express_1.Router)();
exports.baseRoutes.get('/', (_, res) => {
    const { name, version, description, author } = package_json_1.default;
    res.status(200).json({ name, version, description, author });
});
