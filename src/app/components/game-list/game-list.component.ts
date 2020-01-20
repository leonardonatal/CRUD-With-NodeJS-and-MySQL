import { GamesService } from './../../services/games.service';
import { Component, OnInit, HostBinding } from '@angular/core';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: any = [];

  constructor(private gamesService: GamesService) { }

  @HostBinding('class') classes = 'row';

  ngOnInit() {
   this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.log(err)
    );
  }

  deleteGame(id: string) {
    alert(id);

    this.gamesService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );
  }



}
