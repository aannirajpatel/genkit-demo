// First, let's define the recipe JSON schema. This is the schema that will be passed to the model to generate the recipe.
import {z} from 'genkit';
import { ai } from './ai';

const IngredientSchema = z.object({
  name: z.string({
    description: "Name of the ingredient (e.g., 'flour', 'salt', 'eggs')",
  }),
  amount: z.string().optional(), // e.g., "1 cup", "2-3", "1/2"
  unit: z.string().optional(), // e.g., "cups", "tsp", "grams"
});

const StepSchema = z.object({
  instruction: z.string({
    description: "Description of the step (e.g., 'Preheat oven to 350°F')",
  }),
  ingredients: z.array(IngredientSchema).optional(),
  time: z.string().optional(), // Cooking time for this step, can be minutes or a range
  unitOfTime: z.enum(["seconds", "minutes", "hours"]).optional(),
  equipment: z.array(z.string()).optional(), // List of equipment used in this step.
});

const _RecipeSchema = z.object({
  name: z.string({
    description: "Name of the recipe (e.g., 'Chocolate Chip Cookies')",
  }),
  steps: z.array(StepSchema).min(1),
  // Optional fields for more detailed recipes:
  description: z.string().optional(),
  prepTime: z.number().optional(),
  cookTime: z.number().optional(),
  totalTime: z.number().optional(),  // Could be calculated, but useful to have explicitly.
  yield: z.string().optional(), // e.g., "12 cookies", "4 servings"
  ingredients: z.array(IngredientSchema).optional(), // Overall ingredients (can be derived from steps, but convenient)
  notes: z.string().optional(),
  nutrition: z.object({
    calories: z.number().optional(), // etc. 
  }).optional(),
  category: z.string().optional(), // Dessert, Main course, etc.
  cuisine: z.string().optional(), // Italian, Mexican, etc.
  tags: z.array(z.string()).optional(), // vegetarian, gluten-free, etc.
});

const RecipeSchema =ai.defineSchema('RecipeSchema', _RecipeSchema);

export default RecipeSchema;