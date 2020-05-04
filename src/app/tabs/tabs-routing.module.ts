import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'org',
        loadChildren: () => import('./org/org.module').then( m => m.OrgPageModule)
      },
      {
        path: 'fav',
        loadChildren: () => import('./fav/fav.module').then( m => m.FavPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canLoad: [AuthGuardGuard]
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'event',
    loadChildren: () => import('./modals/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./modals/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modals/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./Modals/acercade/acercade.module').then( m => m.AcercadePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
