import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/homepage/homepage.module').then(mod => mod.HomepageModule) },
  { path: 'artigo-publicado/:id', loadChildren: () => import('./pages/artigo-publicado/artigo-publicado.module').then(mod => mod.ArtigoPublicadoModule) },
  { path: 'artigo', loadChildren: () => import('./pages/artigo/artigo.module').then(mod => mod.ArtigoModule) },
  { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule) },
  { path: 'artigo/:id', loadChildren: () => import('./pages/artigo/artigo.module').then(mod => mod.ArtigoModule) },
  { path: 'usuario/:id', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule) },
  { path: 'categoria', loadChildren: () => import('./pages/categoria/categoria.module').then(mod => mod.CategoriaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
