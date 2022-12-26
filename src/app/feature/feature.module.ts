import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components';
import { MainLayoutComponent } from './layouts';
import { MainPageComponent } from './pages';
import { RouterModule, Routes } from '@angular/router';
import { WidgetModule } from '../widget/widget.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MainLayoutComponent, MainPageComponent, NavbarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
})
export class FeatureModule {}
