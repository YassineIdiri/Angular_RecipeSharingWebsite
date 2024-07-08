import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';


@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.scss'
})
export class SingleRecipeComponent {
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.recipesService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
 
}
