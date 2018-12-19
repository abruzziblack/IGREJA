import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Produto } from 'app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { ProdutoComponent } from './produto.component';
import { ProdutoDetailComponent } from './produto-detail.component';
import { ProdutoUpdateComponent } from './produto-update.component';
import { ProdutoDeletePopupComponent } from './produto-delete-dialog.component';
import { IProduto } from 'app/shared/model/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoResolve implements Resolve<IProduto> {
    constructor(private service: ProdutoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Produto>) => response.ok),
                map((produto: HttpResponse<Produto>) => produto.body)
            );
        }
        return of(new Produto());
    }
}

export const produtoRoute: Routes = [
    {
        path: 'produto',
        component: ProdutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lojaApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto/:id/view',
        component: ProdutoDetailComponent,
        resolve: {
            produto: ProdutoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lojaApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto/new',
        component: ProdutoUpdateComponent,
        resolve: {
            produto: ProdutoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lojaApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produto/:id/edit',
        component: ProdutoUpdateComponent,
        resolve: {
            produto: ProdutoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lojaApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produtoPopupRoute: Routes = [
    {
        path: 'produto/:id/delete',
        component: ProdutoDeletePopupComponent,
        resolve: {
            produto: ProdutoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lojaApp.produto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
