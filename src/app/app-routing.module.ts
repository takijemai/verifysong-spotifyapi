import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { GestorComponent } from './gestor/gestor.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'user', component: SearchComponent },
  { path: 'gestor', component: GestorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
