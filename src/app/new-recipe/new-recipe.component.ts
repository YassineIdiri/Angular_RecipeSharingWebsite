import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map,tap } from 'rxjs/operators'; // Importer map depuis rxjs/operators
import { CommonModule } from '@angular/common'; // Importer CommonModule pour utiliser le pipe async
import { RecipesService } from '../services/recipes.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Assurez-vous que ReactiveFormsModule est importé ici
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'] // Notez le 's' manquant ajouté à 'styleUrls'
})
export class NewRecipeComponent implements OnInit {

  recipeForm!: FormGroup;
  recipeFormPreview$!: Observable<any>;


  constructor(private formBuilder: FormBuilder,private recipeService: RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]]}, {
    });

    this.recipeFormPreview$ = this.recipeForm.valueChanges;
  }

  onSubmitForm() {
    this.recipeService.addNewRecipe(this.recipeForm.value).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/recipes');
      }
    })
  }
}
