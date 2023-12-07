"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const http_status_codes_1 = require("http-status-codes");
class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
        this.create = async (req, res, next) => {
            try {
                const { title, amount, categoryId, date, type } = req.body;
                const result = await this.transactionsService.create({
                    title,
                    amount,
                    categoryId,
                    date,
                    type,
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.index = async (req, res, next) => {
            try {
                const { title, categoryId, beginDate, endDate } = req.query;
                const result = await this.transactionsService.index({
                    title,
                    categoryId,
                    beginDate,
                    endDate,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.getDashboard = async (req, res, next) => {
            try {
                const { beginDate, endDate } = req.query;
                const result = await this.transactionsService.getDashboard({
                    beginDate,
                    endDate,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.getFinancialEvolution = async (req, res, next) => {
            try {
                const { year } = req.query;
                const result = await this.transactionsService.getFinancialEvolution({
                    year,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.TransactionsController = TransactionsController;
