// Calculator Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calculatorForm')) {
        initializeCalculator();
    }
});

function initializeCalculator() {
    const calculatorForm = document.getElementById('calculatorForm');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }
}

function calculateCalories() {
    // Clear any previous errors
    GreenBiteUtils.clearFormErrors();
    
    // Get form data
    const formData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        activity: document.getElementById('activity').value
    };
    
    // Validation rules
    const validationRules = {
        age: { required: true },
        gender: { required: true },
        height: { required: true },
        weight: { required: true },
        activity: { required: true }
    };
    
    // Validate form
    const errors = GreenBiteUtils.validateForm(formData, validationRules);
    
    if (Object.keys(errors).length > 0) {
        GreenBiteUtils.displayFormErrors(errors);
        return;
    }
    
    // Convert values to numbers
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseFloat(formData.weight);
    const activityLevel = parseFloat(formData.activity);
    const gender = formData.gender;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activityLevel;
    
    // Calculate macronutrients
    const macros = calculateMacros(tdee);
    
    // Display results
    displayResults(bmr, tdee, macros);
    
    // Save calculation to localStorage
    saveCalculation({
        date: new Date().toISOString(),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros: macros,
        userInfo: formData
    });
}

function calculateMacros(tdee) {
    // Standard healthy ratios: 50% carbs, 20% protein, 30% fat
    const carbCalories = tdee * 0.50;
    const proteinCalories = tdee * 0.20;
    const fatCalories = tdee * 0.30;
    
    // Convert calories to grams
    // Carbs and protein: 4 calories per gram
    // Fat: 9 calories per gram
    const carbGrams = carbCalories / 4;
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    
    return {
        carbs: {
            calories: Math.round(carbCalories),
            grams: Math.round(carbGrams)
        },
        protein: {
            calories: Math.round(proteinCalories),
            grams: Math.round(proteinGrams)
        },
        fat: {
            calories: Math.round(fatCalories),
            grams: Math.round(fatGrams)
        }
    };
}

function displayResults(bmr, tdee, macros) {
    // Show results section
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Display BMR
    const bmrResult = document.getElementById('bmrResult');
    if (bmrResult) {
        bmrResult.textContent = `${Math.round(bmr)} calories/day`;
    }
    
    // Display TDEE
    const tdeeResult = document.getElementById('tdeeResult');
    if (tdeeResult) {
        tdeeResult.textContent = `${Math.round(tdee)} calories/day`;
    }
    
    // Display macronutrients
    updateMacroDisplay('carb', macros.carbs);
    updateMacroDisplay('protein', macros.protein);
    updateMacroDisplay('fat', macros.fat);
}

function updateMacroDisplay(macroType, macroData) {
    const caloriesElement = document.getElementById(`${macroType}Calories`);
    const gramsElement = document.getElementById(`${macroType}Grams`);
    
    if (caloriesElement) {
        caloriesElement.textContent = `${macroData.calories} kcal`;
    }
    
    if (gramsElement) {
        gramsElement.textContent = `${macroData.grams}g`;
    }
}

function saveCalculation(calculation) {
    let calculations = GreenBiteUtils.getFromLocalStorage('calorie_calculations', []);
    
    // Keep only the last 10 calculations
    if (calculations.length >= 10) {
        calculations = calculations.slice(1);
    }
    
    calculations.push(calculation);
    GreenBiteUtils.saveToLocalStorage('calorie_calculations', calculations);
}

function getActivityDescription(activityLevel) {
    const descriptions = {
        '1.2': 'Sedentary (Little or no exercise)',
        '1.375': 'Lightly active (Light exercise 1-3 days/week)',
        '1.55': 'Moderately active (Moderate exercise 3-5 days/week)',
        '1.725': 'Very active (Hard exercise 6-7 days/week)',
        '1.9': 'Super active (Very hard exercise/physical job)'
    };
    
    return descriptions[activityLevel.toString()] || 'Unknown activity level';
}

// Additional utility functions for the calculator
function calculateBMI(weight, height) {
    // BMI = weight (kg) / height (m)²
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function calculateWaterIntake(weight) {
    // Basic water intake: 35ml per kg of body weight
    return Math.round(weight * 35);
}

// Export functions for potential use in other modules
window.CalculatorUtils = {
    calculateBMI,
    getBMICategory,
    calculateWaterIntake,
    getActivityDescription
};
