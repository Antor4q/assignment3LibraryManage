"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoute = express_1.default.Router();
exports.booksRoute.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit } = req.query;
    try {
        const filterObj = {};
        if (filter && typeof filter === "string") {
            filterObj.genre = filter;
        }
        const sortOrder = sort === "asc" ? 1 : -1;
        const data = yield books_model_1.Book.find({ genre: filter })
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error
        });
    }
}));
exports.booksRoute.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error
        });
    }
}));
exports.booksRoute.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const data = yield books_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Books updated successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error
        });
    }
}));
exports.booksRoute.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error
        });
    }
}));
exports.booksRoute.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Book.create(body);
        res.status(201).json({ success: true, message: "Book created successfully", book });
    }
    catch (error) {
        res.status(400).json({ message: "Book has not created. Please try again.", success: false, error });
    }
}));
