import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  stories!: Item[];

  constructor(private _restService: RestService) {}

  ngOnInit(): void {
    this.stories = [];

    this._restService
      .getNewStories()
      .pipe(
        map((items) => {
          const slicedItems = items.slice(0, 5);
          slicedItems.forEach((item) => {
            this._restService.getItem(item).subscribe((res) => {
              this.stories.push(res);
            });
          });
        })
      )
      .subscribe();
  }
}
