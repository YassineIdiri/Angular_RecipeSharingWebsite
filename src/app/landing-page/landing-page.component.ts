import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  searchForm!: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private recipeService: RecipesService) { }

   ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      word: [null, [Validators.required]]}, {
    });
  }
  onCategories(cat: string){
    this.recipeService.setCategory(cat);
    this.router.navigateByUrl(`categories/${cat}`);
  }
  onSubmitForm(): void {
    const keyword = this.searchForm.get('word')?.value;
    console.log(keyword);
    if (keyword) {
      this.recipeService.setSearchTerm(keyword);
      this.router.navigateByUrl(`recipes/${keyword}`);
    }
  }
}
