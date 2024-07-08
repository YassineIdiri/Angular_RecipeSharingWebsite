import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';
import { NgStyle, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input() ARecipe!: any;
  likesCount: number = 0;

  constructor(private router: Router, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.getLikesCount();
  }

  onView(): void {
    this.router.navigateByUrl(`recipe/${this.ARecipe.id}`);
  }

  onLike(id: number): void {
    this.recipeService.likeRecipe(id).subscribe(
      (updatedRecipe) => {
        // Mettre à jour le nombre de likes après l'aimer
        this.getLikesCount();
        console.log('Recette aimée avec succès', updatedRecipe);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la recette', error);
        // Gérer les erreurs ici, si nécessaire
      }
    );
  }

  getLikesCount(): void {
    this.recipeService.getLikesCount(this.ARecipe.id).subscribe(
      (response: any) => { // Utilisation de 'any' pour éviter les erreurs de type
        if (response && response.likesCount !== undefined) {
          this.likesCount = response.likesCount;
        } else {
          console.error('Réponse invalide de l\'API');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de likes', error);
        // Gérer les erreurs ici, si nécessaire
      }
    );
  }
  
  
}
