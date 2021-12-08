import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// shared
import { AdminRoleGuard } from './shared/guards/admin-role.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/homepage/homepage.module').then(mod => mod.HomepageModule) },
  { path: 'pesquisa-artigos', loadChildren: () => import('./pages/pesquisa-artigo/pesquisa-artigo.module').then(mod => mod.PesquisaArtigoModule) },
  { path: 'artigo-publicado/:id', loadChildren: () => import('./pages/artigo-publicado/artigo-publicado.module').then(mod => mod.ArtigoPublicadoModule) },
  { path: 'artigo', loadChildren: () => import('./pages/artigo/artigo.module').then(mod => mod.ArtigoModule), canActivate: [UserRoleGuard] },
  { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule), canActivate: [UserRoleGuard] },
  { path: 'artigo/:id', loadChildren: () => import('./pages/artigo/artigo.module').then(mod => mod.ArtigoModule) },
  { path: 'usuario/:id', loadChildren: () => import('./pages/usuario/usuario.module').then(mod => mod.UsuarioModule), canActivate: [UserRoleGuard] },
  { path: 'categoria', loadChildren: () => import('./pages/categoria/categoria.module').then(mod => mod.CategoriaModule), canActivate: [AdminRoleGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AdminRoleGuard,
    UserRoleGuard
  ]
})
export class AppRoutingModule { }
