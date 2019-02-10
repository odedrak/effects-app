import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as usuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  subscription: Subscription = new Subscription();
  loading: boolean;
  error: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('usuarios').subscribe( usuarios => {
      this.usuarios = usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });
    this.store.dispatch(new usuariosActions.CargarUsuarios());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
