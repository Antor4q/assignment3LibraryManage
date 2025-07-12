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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
const port = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb+srv://assignment3:XVis6k8XBb9ez8uS@cluster0.i8hseoh.mongodb.net/booksStol?retryWrites=true&w=majority&appName=Cluster0');
            console.log("Connected to the mongoose");
            server = app_1.default.listen(port, () => {
                console.log(`app is listening on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
// assignment3 - db user, XVis6k8XBb9ez8uS - bd pass
//  mongodb url -- mongodb+srv://<db_username>:<db_password>@cluster0.i8hseoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
