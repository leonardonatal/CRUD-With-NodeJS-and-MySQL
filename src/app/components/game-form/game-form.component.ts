
import { GamesService } from './../../services/games.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id_games: 0,
    title: '',
    desc: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private gamesService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.gamesService.getGame(params.id)
      .subscribe(
        res => {

          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  saveNewGame() {
    delete this.game.id_games;
    delete this.game.created_at;

    this.gamesService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => console.error(err)
      );
  }

  updateGame() {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id_games, this.game)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );

  }

}
