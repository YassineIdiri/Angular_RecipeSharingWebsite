import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
      recipes:[],
      loading:false,
      newRecipe:null
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt");
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    });
  }

  getAllRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>('http://localhost:5454/api/recipe', { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  getLikesCount(recipeId: number): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`http://localhost:5454/api/recipe/${recipeId}/like/count`, { headers });
  }

  setAll(): void {
    this.getAllRecipes().subscribe();
  }

  addNewRecipe(recipe: any): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.post<Recipe[]>('http://localhost:5454/api/recipe', recipe, { headers }).pipe(
      tap((newRecipe) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes: [newRecipe, ...currentState.recipes] });
      })
    );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`http://localhost:5454/api/recipe/${recipe.id}`, recipe, { headers }).pipe(
      tap((updatedRecipe) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map(
          (item: any) => item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }

  likeRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`http://localhost:5454/api/recipe/${id}/like`, {}, { headers }).pipe(
      tap((updatedRecipe) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map(
          (item: any) => item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`http://localhost:5454/api/recipe/delete/${id}`, { headers }).pipe(
      tap(() => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.filter(
          (item: any) => item.id !== id
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }

  getRecipeById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:5454/api/recipe/${id}`, { headers });
  }

  searchRecipes(word: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:5454/api/recipe/search/${word}`, { headers }).pipe(
      tap((recipes) => {
        
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({
          ...this.recipeSubject.value,
          recipes: recipes,  // This ensures the old recipes are replaced with the new ones
          loading: false
        });
        console.log(this.recipeSubject);
      })
    );
  }

  setSearchTerm(keyword: string): void {
    this.searchRecipes(keyword).subscribe();
  }

  searchRecipesCat(word: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:5454/api/recipe/category/${word}`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  setCategory(keyword: string): void {
    this.searchRecipesCat(keyword).subscribe();
  }

  getAllRecipesUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>('http://localhost:5454/api/recipe/user', { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }
}
