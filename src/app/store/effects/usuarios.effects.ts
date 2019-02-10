import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

    // $ no afecta al comportamiento. es solo una nomenclatura recomendada para observables
    constructor(private actions$: Actions, public usuarioService: UsuarioService) {}

    // @Effect({dispatch: false}) Para que el efecto no dispare nuevas acciones
    @Effect()
    cargarUsuarios$ = this.actions$.pipe(
        ofType(usuariosActions.CARGAR_USUARIOS),
        // switchMap cancela el observable y crea uno nuevo
        // (no queremos devolver info del observable original, sino que usamos esa info para crear otro)
        // Una vez que tenemos los datos, cambiamos la accion CARGAR_USUARIOS por la de SUCCESS O FAIL segun el resultado
        switchMap( () => {
            return this.usuarioService.getUsers().pipe(
                map( users => new usuariosActions.CargarUsuariosSuccess(users)),
                // catchError tiene que devolver un observable. para eso usamos el operador of
                catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
            );
        })
    );
}

