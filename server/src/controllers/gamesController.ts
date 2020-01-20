import { Request, Response  } from 'express';
import pool from '../routes/database';

class GamesController {

    public async list (req: Request, res: Response): Promise<void> {
        
        const games = await (await pool).query('SELECT * FROM games').then((data) =>{ return data} ).catch((err) => console.log(err));
        res.json(games)
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
         const games = await (await pool).query('SELECT * FROM games WHERE id_games = ?', [id]).then((data) =>{ return data} ).catch((err) => console.log(err)); 
         console.log(games);

         res.json({text: 'Game Found'});
    }

    public async create (req: Request, res: Response) {
        await (await pool).query('INSERT INTO games set ?', [req.body]).then((data) =>{ return data} ).catch((err) => console.log(err));
        console.log(req.body);
        res.json({message: 'Game Saved'});
    }

    public async updtate (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await (await pool).query('UPDATE games set ? WHERE id_games =?', [req.body, id]).then((data) =>{ return data} ).catch((err) => console.log(err));
        res.json({message: 'The game was updtated'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await (await pool).query('DELETE FROM games WHERE id_games = ?', [id]).then((data) =>{ return data} ).catch((err) => console.log(err));
        res.json({message: "The game was deleted"});
    }
}

export const gamesController = new GamesController();