import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './pages/enrollments/enrollments.component';
import { HomeComponent } from './pages/home/home.component';
import { VentasComponent } from './features/ventas/pages/ventas/ventas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'ventas', component: VentasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
