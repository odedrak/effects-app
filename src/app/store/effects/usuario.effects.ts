import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    // $ no afecta al comportamiento. es solo una nomenclatura recomendada para observables
    constructor(private actions$: Actions, public usuarioService: UsuarioService) {}

    // @Effect({dispatch: false}) Para que el efecto no dispare nuevas acciones
    @Effect()
    cargarUsuario$ = this.actions$.pipe(
        ofType(usuarioActions.CARGAR_USUARIO),
        // switchMap cancela el observable y crea uno nuevo
        // (no queremos devolver info del observable original, sino que usamos esa info para crear otro)
        // Una vez que tenemos los datos, cambiamos la accion CARGAR_USUARIO por la de SUCCESS O FAIL segun el resultado
        switchMap( accion => {
            return this.usuarioService.getUserById(accion['id']).pipe(
                map( user => new usuarioActions.CargarUsuarioSuccess(user)),
                // catchError tiene que devolver un observable. para eso usamos el operador of
                catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
            );
        })
    );
}

