// Recipes Page JavaScript

// Recipe data
const recipeData = [
    {
        id: 1,
        name: "Green Smoothie Bowl",
        category: "breakfast",
        description: "A nutritious and delicious smoothie bowl packed with vitamins",
        image: "Images/green-smoothi.jpg",
        ingredients: [
            "1 banana",
            "1 cup spinach",
            "1/2 avocado",
            "1/2 cup almond milk",
            "1 tbsp chia seeds",
            "1 tbsp honey",
            "Fresh berries for topping"
        ],
        instructions: [
            "Add banana, spinach, avocado, and almond milk to blender",
            "Blend until smooth and creamy",
            "Pour into bowl",
            "Top with chia seeds, honey, and fresh berries",
            "Serve immediately"
        ],
        nutrition: {
            calories: 285,
            protein: "8g",
            carbs: "45g",
            fat: "12g",
            fiber: "15g"
        }
    },
    {
        id: 2,
        name: "Quinoa Salad",
        category: "lunch",
        description: "A protein-rich salad with colorful vegetables",
        image: "Images/quinao-salad.jpg",
        ingredients: [
            "1 cup cooked quinoa",
            "1 cucumber, diced",
            "2 tomatoes, chopped",
            "1/4 red onion, minced",
            "1/4 cup feta cheese",
            "2 tbsp olive oil",
            "1 tbsp lemon juice",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Cook quinoa according to package instructions and let cool",
            "Dice cucumber and tomatoes",
            "Mince red onion",
            "Combine all vegetables with quinoa",
            "Add feta cheese",
            "Whisk olive oil and lemon juice together",
            "Pour dressing over salad and toss",
            "Season with salt and pepper"
        ],
        nutrition: {
            calories: 320,
            protein: "12g",
            carbs: "42g",
            fat: "14g",
            fiber: "6g"
        }
    },
    {
        id: 3,
        name: "Grilled Salmon",
        category: "dinner",
        description: "Omega-3 rich salmon with herbs and lemon",
        image: "Images/grilled-salmon.jpg",
        ingredients: [
            "4 salmon fillets",
            "2 tbsp olive oil",
            "2 cloves garlic, minced",
            "1 lemon, sliced",
            "Fresh dill",
            "Salt and pepper",
            "Steamed broccoli for serving"
        ],
        instructions: [
            "Preheat grill to medium-high heat",
            "Brush salmon with olive oil",
            "Season with minced garlic, salt, and pepper",
            "Grill for 4-5 minutes per side",
            "Top with fresh dill and lemon slices",
            "Serve with steamed broccoli"
        ],
        nutrition: {
            calories: 410,
            protein: "35g",
            carbs: "8g",
            fat: "28g",
            fiber: "3g"
        }
    },
    {
        id: 4,
        name: "Energy Balls",
        category: "snack",
        description: "No-bake energy bites perfect for pre-workout",
        image: "Images/energy-balls.jpg",
        ingredients: [
            "1 cup rolled oats",
            "1/2 cup peanut butter",
            "1/3 cup honey",
            "1/3 cup mini chocolate chips",
            "1/3 cup ground flaxseed",
            "1 tsp vanilla extract",
            "Pinch of salt"
        ],
        instructions: [
            "Mix all ingredients in a large bowl",
            "Stir until well combined",
            "Refrigerate mixture for 30 minutes",
            "Roll into 1-inch balls",
            "Store in refrigerator for up to 1 week"
        ],
        nutrition: {
            calories: 145,
            protein: "5g",
            carbs: "18g",
            fat: "7g",
            fiber: "3g"
        }
    },
    {
        id: 5,
        name: "Overnight Oats",
        category: "breakfast",
        description: "Prepare the night before for a quick healthy breakfast",
        image: "Images/overnight-oats.jpg",
        ingredients: [
            "1/2 cup rolled oats",
            "1/2 cup almond milk",
            "1 tbsp chia seeds",
            "1 tbsp maple syrup",
            "1/4 cup Greek yogurt",
            "1/2 banana, sliced",
            "Cinnamon to taste"
        ],
        instructions: [
            "Combine oats, almond milk, chia seeds, and maple syrup",
            "Stir well and refrigerate overnight",
            "In the morning, top with Greek yogurt",
            "Add sliced banana and cinnamon",
            "Enjoy cold or warm"
        ],
        nutrition: {
            calories: 245,
            protein: "12g",
            carbs: "38g",
            fat: "6g",
            fiber: "8g"
        }
    },
    {
        id: 6,
        name: "Vegetable Stir Fry",
        category: "dinner",
        description: "Colorful mixed vegetables with brown rice",
        image: "Images/vegetable-stirfried.png",
        ingredients: [
            "2 cups mixed vegetables",
            "1 cup cooked brown rice",
            "2 tbsp sesame oil",
            "2 cloves garlic, minced",
            "1 tbsp ginger, grated",
            "2 tbsp soy sauce",
            "1 tbsp sesame seeds"
        ],
        instructions: [
            "Heat sesame oil in a large pan",
            "Add garlic and ginger, cook for 1 minute",
            "Add mixed vegetables and stir fry for 5-7 minutes",
            "Add soy sauce and toss to coat",
            "Serve over brown rice",
            "Sprinkle with sesame seeds"
        ],
        nutrition: {
            calories: 290,
            protein: "8g",
            carbs: "45g",
            fat: "10g",
            fiber: "6g"
        }
    }
];

// Initialize recipes page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('recipeGrid')) {
        initializeRecipes();
        initializeRecipeFilters();
        initializeRecipeModal();
    }
});

function initializeRecipes() {
    displayRecipes(recipeData);
}

function displayRecipes(recipes) {
    const recipeGrid = document.getElementById('recipeGrid');
    
    if (!recipeGrid) return;
    
    recipeGrid.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card hover-effect';
    card.onclick = () => openRecipeModal(recipe);
    
    card.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.name}" style="width: 100%; max-width: 120px; border-radius: 12px; object-fit: cover;" onerror="this.onerror=null;this.src='images/recipes/placeholder.jpg';">
        </div>
        <div class="recipe-info">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <span class="recipe-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
        </div>
    `;
    
    return card;
}

function initializeRecipeFilters() {
    const searchInput = document.getElementById('recipeSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterRecipes);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterRecipes);
    }
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipeSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    let filteredRecipes = recipeData;
    
    // Filter by search term
    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.category === selectedCategory
        );
    }
    
    displayRecipes(filteredRecipes);
}

function initializeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = closeRecipeModal;
    }
    
    if (modal) {
        window.onclick = function(event) {
            if (event.target === modal) {
                closeRecipeModal();
            }
        };
    }
}

function openRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <div style="text-align: center; margin: 20px 0;">
            <img src="${recipe.image}" alt="${recipe.name}" style="width: 100%; max-width: 240px; border-radius: 18px; object-fit: cover;" onerror="this.onerror=null;this.src='images/recipes/placeholder.jpg';">
        </div>
        <p style="font-style: italic; margin-bottom: 20px;">${recipe.description}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
                <h3 style="color: var(--primary-green); margin-bottom: 15px;">Ingredients</h3>
                <ul style="list-style-type: disc; padding-left: 20px;">
                    ${recipe.ingredients.map(ingredient => `<li style="margin-bottom: 5px;">${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h3 style="color: var(--primary-green); margin-bottom: 15px;">Nutrition Info</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Calories:</strong></td><td style="padding: 5px; border-bottom: 1px solid #eee;">${recipe.nutrition.calories}</td></tr>
                    <tr><td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Protein:</strong></td><td style="padding: 5px; border-bottom: 1px solid #eee;">${recipe.nutrition.protein}</td></tr>
                    <tr><td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Carbs:</strong></td><td style="padding: 5px; border-bottom: 1px solid #eee;">${recipe.nutrition.carbs}</td></tr>
                    <tr><td style="padding: 5px; border-bottom: 1px solid #eee;"><strong>Fat:</strong></td><td style="padding: 5px; border-bottom: 1px solid #eee;">${recipe.nutrition.fat}</td></tr>
                    <tr><td style="padding: 5px;"><strong>Fiber:</strong></td><td style="padding: 5px;">${recipe.nutrition.fiber}</td></tr>
                </table>
            </div>
        </div>
        
        <div>
            <h3 style="color: var(--primary-green); margin-bottom: 15px;">Instructions</h3>
            <ol style="padding-left: 20px;">
                ${recipe.instructions.map(instruction => `<li style="margin-bottom: 10px; line-height: 1.6;">${instruction}</li>`).join('')}
            </ol>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="saveRecipe(${recipe.id})" class="mindfulness-btn" style="margin-right: 10px;">Save Recipe</button>
            <button onclick="closeRecipeModal()" class="mindfulness-btn" style="background-color: var(--gray-medium);">Close</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function saveRecipe(recipeId) {
    const recipe = recipeData.find(r => r.id === recipeId);
    if (!recipe) return;
    
    let savedRecipes = GreenBiteUtils.getFromLocalStorage('saved_recipes', []);
    
    if (!savedRecipes.find(r => r.id === recipeId)) {
        savedRecipes.push(recipe);
        GreenBiteUtils.saveToLocalStorage('saved_recipes', savedRecipes);
        
        // Show success message
        const modalContent = document.getElementById('modalContent');
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.textContent = 'Recipe saved successfully!';
        message.style.marginTop = '20px';
        modalContent.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    } else {
        // Show already saved message
        const modalContent = document.getElementById('modalContent');
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.textContent = 'Recipe already saved!';
        message.style.marginTop = '20px';
        modalContent.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}