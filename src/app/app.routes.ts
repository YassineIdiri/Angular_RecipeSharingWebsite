import { Routes } from '@angular/router';
import { RecipeListComponent} from './recipe-list/recipe-list.component';
import { LandingPageComponent} from './landing-page/landing-page.component';
import { SingleRecipeComponent} from './single-recipe/single-recipe.component';
import { NewRecipeComponent} from './new-recipe/new-recipe.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard } from '../app/core/guard/auth.guard';
import { ProfileComponent} from './profile/profile.component';


export const routes: Routes = [
  { path: 'recipes/:word', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: SingleRecipeComponent, canActivate: [AuthGuard] },
  { path: 'list/:all', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'new', component: NewRecipeComponent, canActivate: [AuthGuard] },
  { path: 'categories/:cat', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingPageComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] }

];