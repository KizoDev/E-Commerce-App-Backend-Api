"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
if (!process.env.MONGODB_URL) {
    throw new Error("MOMGODB environmental variable is not defined");
}
const connectdb = mongoose_1.default.connect(process.env.MONGODB_URL);
try {
    if (connectdb) {
        console.log("db connected successfully");
    }
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=index.js.map