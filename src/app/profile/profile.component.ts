import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour utiliser le pipe async
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userRecipes: any[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.getAllRecipesUser().subscribe((recipes) => {
      this.userRecipes = recipes;
    });
  }
  deleteRecipe(id: number) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Do you want to delete this recipe ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipesService.deleteRecipe(id).subscribe(() => {
          this.userRecipes = this.userRecipes.filter(recipe => recipe.id !== id);
          Swal.fire('Deleted !', 'Your recipe has been deleted.', 'success');
        }, (error) => {
          Swal.fire('Error !', 'An error occurred while deleting.', 'error');
        });
      }
    });
  }


}





