import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 1. Шляхи до Guard'ів виправлені
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

export const routes: Routes = [
  {
    path: 'login',
    // 2. Шлях до login.module виправлено
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [NotAuthorizedGuard] 
  },
  {
    path: 'registration',
    // 3. Шлях до registration.module виправлено
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [NotAuthorizedGuard] 
  },
  {
    path: 'courses',
    // 4. Шлях до courses.module виправлено (припускаємо, що це src/app/courses)
    loadChildren: () => import('./store/courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthorizedGuard] 
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
