// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'folder/Inbox',
//     pathMatch: 'full'
//   },
//   {
//     path: 'folder/:id',
//     loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
//   },
//   {
//     path: 'inicio-sesion',
//     loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
//   }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolpermisoGuard } from './guards/rolpermiso.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'portada',
    loadChildren: () => import('./portada/portada.module').then( m => m.PortadaPageModule)
  },
  {
    path: '',
    redirectTo: 'portada', // Redirige la ruta raíz a la página de portada
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion', // Establece el path para la página de inicio de sesión
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
  {
    path: 'detalle-viaje',
    loadChildren: () => import('./detalle-viaje/detalle-viaje.module').then( m => m.DetalleViajePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rol',
    loadChildren: () => import('./rol/rol.module').then( m => m.RolPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viajeconductor',
    loadChildren: () => import('./viajeconductor/viajeconductor.module').then( m => m.ViajeconductorPageModule),
    canActivate: [RolpermisoGuard]
  },
  {
    path: 'conductortrackeo',
    loadChildren: () => import('./conductortrackeo/conductortrackeo.module').then( m => m.ConductortrackeoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalleconductor',
    loadChildren: () => import('./detalleconductor/detalleconductor.module').then( m => m.DetalleconductorPageModule),
    canActivate: [AuthGuard]
  },


  // Agrega aquí las rutas para las páginas de sidemenu si las tienes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
