import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/authGuard/auth.guard';

export const routes: Routes = [
     {
          path: 'home',
          loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
     },

     {
          path: 'principal',
          loadComponent: () => import('./principal/principal.component').then((c) => c.PrincipalComponent),
          canActivate: [authGuard],
     },

     {
          path: 'room/:username2',
          loadComponent: () => import('./room/room.component').then((c) => c.RoomComponent),
          canActivate: [authGuard],
     },

     {path: '', redirectTo: '/home', pathMatch: 'full'},
];
