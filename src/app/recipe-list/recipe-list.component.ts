import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipesService } from '../services/recipes.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour utiliser le pipe async
import { LoginService } from '../services/login.service';
import {ActivatedRoute, RouterModule} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeComponent,CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
  export class RecipeListComponent implements OnInit {
    constructor(private recipesService: RecipesService,private loginService: LoginService,private route: ActivatedRoute) { }

    recipes = [];

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const keyword = params.get('word');
        if(keyword)
           this.recipesService.setSearchTerm(keyword);
      });

      this.route.paramMap.subscribe(params => {
        const keyword = params.get('cat');
        if(keyword)
          this.recipesService.setCategory(keyword);
      });

      this.route.paramMap.subscribe(params => {
        const keyword = params.get('all');
        if(keyword)
          this.recipesService.setAll();
      });

      this.loginService.getUserProfile().subscribe();
      this.recipesService.recipeSubject.subscribe(
        (state) => {
          this.recipes = state.recipes;
          console.log(this.recipes);
        }
      );
    }
}