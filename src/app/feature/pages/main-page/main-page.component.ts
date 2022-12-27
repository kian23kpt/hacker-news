import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { RestService } from 'src/app/core/services/rest.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  stories: Item[] = [];
  comments: Item[] = [];
  private _subscriptions = new SubSink();

  constructor(private _restService: RestService) {}

  ngOnInit(): void {
    this.stories = [];
    this._subscriptions.add(
      this._restService
        .getTopStories()
        .pipe(
          map((items) => {
            const slicedItems = items.slice(0, 5);
            slicedItems.forEach((item) => {
              this._restService.getItem(item).subscribe((story) => {
                this.stories.push(story);
              });
            });
          })
        )
        .subscribe()
    );
  }

  getComments(kids: number[]) {
    this.comments = [];
    kids.slice(0, 3).forEach((kid) => {
      this._subscriptions.add(
        this._restService.getItem(kid).subscribe((comment: Item) => {
          this.comments.push(comment);
        })
      );
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
