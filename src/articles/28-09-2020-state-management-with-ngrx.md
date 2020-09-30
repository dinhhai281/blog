---
path: "/state-management-with-ngrx-in-angular"
date: "2020-09-28"
title: "State Management Trong Angular Với NgRx"
tags: "TYPESCRIPT,ANGULAR,RXJS"
featuredImage: ../images/state-management-with-ngrx/ngrx-featured.png
---

State Management hay quản lý state là một khái niệm khá phổ biến ở React và Angular cũng đã có một sự giao lưu tuyệt vời với nó qua NgRx - Reactive State for Angular. Bài viết này mình sẽ chia sẽ về cách tổ chức state của mình khi sử dụng NgRx.

#### State là gì?

Với những ai đã từng sử dụng qua React thì state và props là 2 khái niệm đã quá quen thuộc, nhưng nếu bạn chỉ biết đến Angular thì có thể sẽ không biết đến nó dù bạn vẫn dùng nó mỗi ngày.

**State:** Là những thứ được quản lý bên trong component ví dụ bạn có một property để lưu lại một giá trị thì nó có thể được gọi là state. Trong React mỗi khi state thay đổi thì component sẽ re-render. Còn trong Angular thì tuỳ trường hợp mà có thể khi bạn thay đổi state thì component sẽ không re-render. Đề có được cơ chế re-render tương tự trong Angular thì thay vì sử dụng dùng một biến kiểu string để lưu một chuỗi và mutate nó mỗi khi cần thay đổi thì hãy dùng BehaviorSubject và next giá trị mới khi cần thay đổi và async pipe để hiển thị giá trị đó ra ngoài.

Việc có thể sử dụng RxJS để tạo ra "State" đã làm cho sự khác biệt về React và Angular không còn quá lớn. Rất nhiều những kỹ thuật được dùng trong React có thể được áp dụng trong Angular và ngược lại. Trong đó **Flux Architect** là một trong những thứ rất đáng học hỏi để tạo ra những web application có khả năng scale tốt hơn.

#### NgRx - Reactive State cho Angular

`Redux` là một state management library cực kỳ phổ biến trong cộng đồng React cho việc quản lý state theo Flux Architect và `NgRx` được truyền cảm hứng dựa trên Redux để giải quyết vấn đề tương tự cho Angular.

So với Redux thì có thể nói NgRx hoàn thiện hơn rất nhiều và đúng với phong cách của Angular nó có đầy đủ các món ăn chơi để có thể giải quyết mọi vấn đề mà một developer phải đối mặt khi sử dụng state management library.

Khác với Redux, để sử dụng tốt NgRx thì phải có một sự hiểu biết tương đối về Reactive Programming vì state trong NgRx là Reactive State - **Everything is stream** -

**Giới thiệu vậy thôi chứ bài viết này không nhằm mục đích hướng dẫn sử dụng NgRx nên sẽ không hướng dẫn xài cái này đâu nha.**

#### Store module

Việc sử dụng NgRx không có nghĩa là sẽ bỏ qua hoàn toàn local state, chỉ những thứ cần thiết mới nên được lưu trên store. Store này mình thường tách thành một module riêng trong đó sẽ có nhiều store feature module.

Store module này sẽ được import vào AppModule, đồng nghĩa mình sẽ không lazy load store module này. Store module với toàn bộ state sẽ được load ngay từ đầu cho dù có thể feature sử dụng nó có lazy load đi nữa.

Tất nhiên nếu bundle size là một trong những yếu tố quan trọng với project của bạn thì cái store feature module cũng có thể được lazy load nhưng hãy chú ý về những gì store feature module đó có nhé.

Trong Store module này thường sẽ không có gì cả, đây chỉ là nơi để setup NgRx và import các store feature module.

**store/store.module.ts**
```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot(),
    environment.storeInstrument,
    PostFeatureStoreModule,
    AuthFeatureStoreModule,
  ],
})
export class AppStoreModule {}
```

**store/reducer.ts**
```typescript
export interface State {}
```

#### Store Feature Module

Khi cần quản lý một thứ gì đó bằng store thì hãy tách nó thành một Store Feature Module sau đó import ngược lại vào Store Module. Như vậy sẽ dễ hơn trong việc tổ chức code và những logic về một loại state nào đó sẽ được tách biệt.

Ví dụ trong app có một feature là login thì hãy tạo một `AuthFeatureStoreModule`, trong đó có đầy đủ các action, reducer, selector, effects để bạn có thể xử lý mọi logic có thể xảy ra với việc login.

**store/auth/auth.reducer.ts**
```typescript
import { User } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';

import { login, loginFailure, loginSuccess } from './auth.action';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  me: User;
  token: string;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  me: undefined,
  token: undefined,
  loading: false,
  error: undefined,
};

const _authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user, token }) => ({ ...state, loading: false, user, token })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
```
<br>

**store/auth/auth.action.ts**
```typescript
import { User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction(
  '[Auth] Login__SUCCESS',
  props<{ user: User; token: string }>(),
);
export const loginFailure = createAction('[Auth] Login__FAILURE', props<{ error: string }>());
```
<br>

**store/auth/auth.selector.ts**
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectMe = createSelector(selectAuthState, state => state.me);
export const selectLoading = createSelector(selectAuthState, state => state.loading);
export const selectIsLoggedIn = createSelector(
  selectToken,
  selectLoading,
  (token, loading) => !!token && !loading,
);
```
<br>

**store/auth/auth.effect.ts**
```typescript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { login, loginFailure, loginSuccess } from './auth.action';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.authService.loginWithLocal(email, password).pipe(
          map(response => loginSuccess({ user: response.user, token: response.token })),
          catchError(err => of(loginFailure({ error: err }))),
        ),
      ),
    ),
  );

  loginSuccessEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/posts'])),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private readonly action$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
```
<br>

**store/auth/auth.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_KEY, reducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthFeatureStoreModule {}
```
<br>

**store/auth/index.ts**
```typescript
export * from './auth.action';
export * from './auth.reducer';
export * from './auth.selector';
export * from './auth.effect';
export * from './auth.module';
```

**store/reducer.ts**
```typescript
import * as fromAuth from '@store/application/auth';

export interface State {
  [fromAuth.AUTH_FEATURE_KEY]: fromAuth.AuthState;
}

export { fromPost, fromAuth };
```
<br>

**store/store.module.ts**
```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFeatureStoreModule } from './application/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot(),
    AuthFeatureStoreModule,
  ],
})
export class AppStoreModule {}

```

#### Store Entity Feature Module
Nếu state đó có dạng một list các item hoặc bị lồng vào nhau hãy tham khảo thử bài viết này https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape. Trong NgRx có`@ngrx/entity` sẽ hỗ trợ việc đó một cách nhanh chóng.

**store/post/post.reducer.ts**
```typescript
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '@app/models';
import { loadPosts, selectPost } from './post.action';

export const POST_FEATURE_KEY = 'posts';
export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export interface PostEntityState extends EntityState<Post> {
  selectedPostId: number | null;
}

export const initialState: PostEntityState = adapter.getInitialState({
  selectedPostId: null,
});

const _postReducer = createReducer(
  initialState,
  on(selectPost, (state, { id }) => ({ ...state, selectedPostId: id })),
  on(loadPosts, (state, { posts }) => adapter.addMany(posts, { ...state, selectedPostId: null })),
);

export function reducer(state: PostEntityState | undefined, action: Action) {
  return _postReducer(state, action);
}
```
<br>

**store/post/post.action.ts**
```typescript
import { createAction, props } from '@ngrx/store';
import { Post } from '@app/models';

export const fetchPosts = createAction('[Post] Fetch Posts');
export const selectPost = createAction('[Post] Select Post', props<{ id: number }>());

export const loadPosts = createAction('[Post] Load Posts', props<{ posts: Post[] }>());
```
<br>

**store/post/post.selector.ts**
```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, POST_FEATURE_KEY, PostEntityState } from './post.reducer';

const selectPostState = createFeatureSelector<PostEntityState>(POST_FEATURE_KEY);
const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectPostIds = createSelector(selectPostState, selectIds);
export const selectPostEntities = createSelector(selectPostState, selectEntities);
export const selectPostTotal = createSelector(selectPostState, selectTotal);
export const selectAllPosts = createSelector(selectPostState, selectAll);
export const selectCurrentPostId = createSelector(selectPostState, state => state.selectedPostId);
export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (postEntities, postId) => postEntities[postId],
);
```
<br>

**store/post/post.effect.ts**
```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMapTo } from 'rxjs/operators';
import { PostService } from '@app/services';

import { fetchPosts, loadPosts } from './post.action';

@Injectable()
export class PostEffects {
  fetchPostsEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchPosts),
      mergeMapTo(this.postService.getAllPost()),
      map(posts => loadPosts({ posts })),
    ),
  );

  constructor(private action$: Actions, private postService: PostService) {}
}
```
<br>

**store/post/post.module.ts**
```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostEffects } from './post.effect';
import { POST_FEATURE_KEY, reducer } from './post.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POST_FEATURE_KEY, reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostFeatureStoreModule {}
```
<br>

**store/post/index.ts**
```typescript
export * from './post.action';
export * from './post.reducer';
export * from './post.effect';
export * from './post.selector';
export * from './post.module';
```
<br>

**store/reducer.ts**
```typescript
import * as fromPost from '@store/entities/post';
import * as fromAuth from '@store/application/auth';

export interface State {
  [fromPost.POST_FEATURE_KEY]: fromPost.PostEntityState;
  [fromAuth.AUTH_FEATURE_KEY]: fromAuth.AuthState;
}

export { fromPost, fromAuth };

```
<br>

**store/store.module.ts**
```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostFeatureStoreModule } from './entities/post';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictActionTypeUniqueness: true,
        },
      },
    ),
    EffectsModule.forRoot(),
    PostFeatureStoreModule,
    AuthFeatureStoreModule,
  ],
})
export class AppStoreModule {}
```
<br>


#### Sử dụng @ngrx/component-store cho local state
Với những state cần phải share trong app thì sẽ được quản lý bằng store. Nhưng sẽ có một số state chỉ được sử dụng bởi chính component đó thì `@ngrx/component-store` sẽ là một sự lựa chọn cho ai thích áp dụng Reactive Programming trong Angular nhiều nhất có thể.

Một số lợi ích đó là:
* Tách biệt logic quản lý local state của component ra một service riêng.
* Reactive hoàn toàn giúp đơn giản hơn trong việc kết hợp với các state khác bằng các operator của RxJS.
* Tất cả logic về get, update state đều được thực hiện qua RxJS giúp được viết theo style declarative rất dễ hiểu (nếu người đọc cũng có nền tảng tốt về Functional Programming và Reactive Programming).

#### Tổng kết
Về cơ bản thì trong angular chúng ta có thể phần chia code thành các module và khi sử dụng NgRx thì mình thường cho store là một module riêng. Module này sẽ được import vào App Module và load ngay từ đầu chứ không cần lazy load gì cả. 

Structure đề nghị sẽ như thế này

```bash
.
├── app
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   ├── features
│   │   ├── board
│   │   │   ├── board-routing.module.ts
│   │   │   ├── board.component.html
│   │   │   ├── board.component.scss
│   │   │   ├── board.component.ts
│   │   │   ├── board.module.ts
│   │   │   ├── header
│   │   │   │   ├── __snapshots__
│   │   │   │   │   └── header.component.spec.ts.snap
│   │   │   │   ├── header.component.html
│   │   │   │   ├── header.component.scss
│   │   │   │   ├── header.component.spec.ts
│   │   │   │   └── header.component.ts
│   │   │   └── index.ts
│   │   ├── login
│   │   │   ├── __snapshots__
│   │   │   ├── index.ts
│   │   │   ├── login-form
│   │   │   │   ├── __snapshots__
│   │   │   │   │   └── login-form.component.spec.ts.snap
│   │   │   │   ├── login-form.component.html
│   │   │   │   ├── login-form.component.scss
│   │   │   │   ├── login-form.component.spec.ts
│   │   │   │   ├── login-form.component.ts
│   │   │   │   └── login-form.store.ts
│   │   │   ├── login-routing.module.ts
│   │   │   ├── login.component.html
│   │   │   ├── login.component.scss
│   │   │   ├── login.component.ts
│   │   │   └── login.module.ts
│   │   └── posts
│   │       ├── __snapshots__
│   │       ├── index.ts
│   │       ├── post-detail
│   │       │   ├── __snapshots__
│   │       │   │   └── post-detail.component.spec.ts.snap
│   │       │   ├── post-detail.component.html
│   │       │   ├── post-detail.component.scss
│   │       │   ├── post-detail.component.spec.ts
│   │       │   └── post-detail.component.ts
│   │       ├── post-list
│   │       │   ├── __snapshots__
│   │       │   │   └── post-list.component.spec.ts.snap
│   │       │   ├── post-list.component.html
│   │       │   ├── post-list.component.scss
│   │       │   ├── post-list.component.spec.ts
│   │       │   └── post-list.component.ts
│   │       ├── posts-routing.module.ts
│   │       ├── posts.component.html
│   │       ├── posts.component.scss
│   │       ├── posts.component.ts
│   │       └── posts.module.ts
│   ├── guards
│   │   ├── auth.guard.spec.ts
│   │   ├── auth.guard.ts
│   │   ├── login.guard.spec.ts
│   │   └── login.guard.ts
│   ├── main
│   │   ├── __snapshots__
│   │   │   └── main.component.spec.ts.snap
│   │   ├── main.component.html
│   │   ├── main.component.scss
│   │   ├── main.component.spec.ts
│   │   └── main.component.ts
│   ├── models
│   │   ├── index.ts
│   │   ├── post.model.ts
│   │   └── user.model.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── index.ts
│   │   └── post.service.ts
│   └── store
│       ├── auth
│       │   ├── auth.action.ts
│       │   ├── auth.effect.ts
│       │   ├── auth.module.ts
│       │   ├── auth.reducer.ts
│       │   ├── auth.selector.ts
│       │   └── index.ts
│       ├── post
│       │   ├── index.ts
│       │   ├── post.action.ts
│       │   ├── post.effect.ts
│       │   ├── post.module.ts
│       │   ├── post.reducer.ts
│       │   └── post.selector.ts
│       ├── reducers.ts
│       └── store.module.ts
├── assets
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── styles.scss
└── theme
    └── base.scss
```

