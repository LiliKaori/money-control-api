"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const http_status_codes_1 = require("http-status-codes");
class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
        this.create = async (req, res, next) => {
            try {
                const { title, color } = req.body;
                const result = await this.categoriesService.create({
                    title,
                    color,
                });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.index = async (_, res, next) => {
            try {
                const result = await this.categoriesService.index();
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.CategoriesController = CategoriesController;
