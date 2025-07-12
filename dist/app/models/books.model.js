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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true
});
bookSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.copies !== undefined) {
            if (update.copies === 0) {
                update.available = false;
            }
            else {
                update.available = true;
            }
            this.setUpdate(update);
        }
        next();
    });
});
bookSchema.post("save", function (doc) {
    console.log(`${doc.title} has been created successfully.`);
});
bookSchema.method("updateAvailability", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies === 0) {
            this.available = false;
        }
        else {
            this.available = true;
        }
        yield this.save();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
