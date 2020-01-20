"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield (yield database_1.default).query('SELECT * FROM games').then((data) => { return data; }).catch((err) => console.log(err));
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield (yield database_1.default).query('SELECT * FROM games WHERE id_games = ?', [id]).then((data) => { return data; }).catch((err) => console.log(err));
            console.log(games);
            res.json({ text: 'Game Found' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield database_1.default).query('INSERT INTO games set ?', [req.body]).then((data) => { return data; }).catch((err) => console.log(err));
            console.log(req.body);
            res.json({ message: 'Game Saved' });
        });
    }
    updtate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).query('UPDATE games set ? WHERE id_games =?', [req.body, id]).then((data) => { return data; }).catch((err) => console.log(err));
            res.json({ message: 'The game was updtated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (yield database_1.default).query('DELETE FROM games WHERE id_games = ?', [id]).then((data) => { return data; }).catch((err) => console.log(err));
            res.json({ message: "The game was deleted" });
        });
    }
}
exports.gamesController = new GamesController();
