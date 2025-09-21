// Workout Page JavaScript

// Workout data
const workoutData = {
    'full-body': {
        'none': [
            { name: 'Jumping Jacks', duration: 30, description: 'Full body cardio exercise' },
            { name: 'Push-ups', duration: 45, description: 'Upper body strength' },
            { name: 'Bodyweight Squats', duration: 45, description: 'Lower body strength' },
            { name: 'Plank', duration: 30, description: 'Core stability' },
            { name: 'Mountain Climbers', duration: 30, description: 'Cardio and core' },
            { name: 'Burpees', duration: 30, description: 'Full body intense exercise' }
        ],
        'dumbbells': [
            { name: 'Dumbbell Squats', duration: 45, description: 'Lower body with weights' },
            { name: 'Dumbbell Press', duration: 45, description: 'Upper body push' },
            { name: 'Bent-over Rows', duration: 45, description: 'Back and biceps' },
            { name: 'Lunges', duration: 45, description: 'Legs and glutes' },
            { name: 'Overhead Press', duration: 45, description: 'Shoulders and core' },
            { name: 'Russian Twists', duration: 30, description: 'Core with weight' }
        ],
        'resistance-bands': [
            { name: 'Band Pull-aparts', duration: 45, description: 'Upper back and shoulders' },
            { name: 'Band Squats', duration: 45, description: 'Legs with resistance' },
            { name: 'Band Rows', duration: 45, description: 'Back muscles' },
            { name: 'Band Chest Press', duration: 45, description: 'Chest and triceps' },
            { name: 'Band Deadlifts', duration: 45, description: 'Posterior chain' },
            { name: 'Band Bicep Curls', duration: 30, description: 'Arm strength' }
        ]
    },
    'upper-body': {
        'none': [
            { name: 'Push-ups', duration: 45, description: 'Chest, shoulders, triceps' },
            { name: 'Pike Push-ups', duration: 30, description: 'Shoulders and upper chest' },
            { name: 'Tricep Dips', duration: 30, description: 'Triceps and shoulders' },
            { name: 'Arm Circles', duration: 30, description: 'Shoulder mobility' },
            { name: 'Wall Handstand', duration: 30, description: 'Shoulder strength' }
        ],
        'dumbbells': [
            { name: 'Dumbbell Press', duration: 45, description: 'Chest and triceps' },
            { name: 'Overhead Press', duration: 45, description: 'Shoulders' },
            { name: 'Bent-over Rows', duration: 45, description: 'Back and biceps' },
            { name: 'Bicep Curls', duration: 30, description: 'Biceps' },
            { name: 'Tricep Extensions', duration: 30, description: 'Triceps' }
        ]
    },
    'lower-body': {
        'none': [
            { name: 'Bodyweight Squats', duration: 45, description: 'Quads and glutes' },
            { name: 'Lunges', duration: 45, description: 'Legs and balance' },
            { name: 'Calf Raises', duration: 30, description: 'Calf muscles' },
            { name: 'Glute Bridges', duration: 45, description: 'Glutes and hamstrings' },
            { name: 'Wall Sit', duration: 30, description: 'Quad endurance' }
        ],
        'dumbbells': [
            { name: 'Goblet Squats', duration: 45, description: 'Legs with weight' },
            { name: 'Romanian Deadlifts', duration: 45, description: 'Hamstrings and glutes' },
            { name: 'Walking Lunges', duration: 45, description: 'Dynamic leg exercise' },
            { name: 'Single-leg RDL', duration: 30, description: 'Balance and hamstrings' }
        ]
    },
    'arms': {
        'none': [
            { name: 'Push-ups', duration: 45, description: 'Triceps and chest' },
            { name: 'Tricep Dips', duration: 30, description: 'Triceps' },
            { name: 'Arm Circles', duration: 30, description: 'Shoulder endurance' },
            { name: 'Diamond Push-ups', duration: 30, description: 'Triceps focus' }
        ],
        'dumbbells': [
            { name: 'Bicep Curls', duration: 45, description: 'Biceps' },
            { name: 'Tricep Extensions', duration: 45, description: 'Triceps' },
            { name: 'Hammer Curls', duration: 30, description: 'Biceps and forearms' },
            { name: 'Overhead Press', duration: 45, description: 'Shoulders and triceps' }
        ]
    },
    'legs': {
        'none': [
            { name: 'Squats', duration: 45, description: 'Quads and glutes' },
            { name: 'Lunges', duration: 45, description: 'Legs and balance' },
            { name: 'Single-leg Glute Bridge', duration: 30, description: 'Glutes and stability' },
            { name: 'Calf Raises', duration: 30, description: 'Calves' }
        ],
        'dumbbells': [
            { name: 'Dumbbell Squats', duration: 45, description: 'Weighted squats' },
            { name: 'Lunges with Weights', duration: 45, description: 'Weighted lunges' },
            { name: 'Stiff-leg Deadlifts', duration: 45, description: 'Hamstrings and glutes' }
        ]
    },
    'core': {
        'none': [
            { name: 'Plank', duration: 45, description: 'Core stability' },
            { name: 'Russian Twists', duration: 30, description: 'Obliques' },
            { name: 'Mountain Climbers', duration: 30, description: 'Dynamic core' },
            { name: 'Leg Raises', duration: 30, description: 'Lower abs' },
            { name: 'Bicycle Crunches', duration: 30, description: 'Abs and obliques' }
        ],
        'dumbbells': [
            { name: 'Weighted Russian Twists', duration: 30, description: 'Obliques with weight' },
            { name: 'Weighted Sit-ups', duration: 30, description: 'Abs with resistance' },
            { name: 'Dumbbell Side Bends', duration: 30, description: 'Obliques' }
        ]
    }
};

let currentWorkout = [];
let currentExerciseIndex = 0;
let workoutTimer = null;
let timeRemaining = 0;
let isPaused = false;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('workoutForm')) {
        initializeWorkout();
    }
});

function initializeWorkout() {
    const workoutForm = document.getElementById('workoutForm');
    
    if (workoutForm) {
        workoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateWorkout();
        });
    }
    
    // Initialize timer controls
    initializeTimerControls();
}

function generateWorkout() {
    const bodyPart = document.getElementById('bodyPart').value;
    const equipment = document.getElementById('equipment').value;
    const duration = parseInt(document.getElementById('duration').value);
    
    if (!bodyPart || !equipment || !duration) {
        alert('Please fill in all fields');
        return;
    }
    
    // Get exercises for the selected body part and equipment
    let exercises = workoutData[bodyPart] && workoutData[bodyPart][equipment] ? 
                   [...workoutData[bodyPart][equipment]] : [];
    
    if (exercises.length === 0) {
        alert('No exercises found for this combination');
        return;
    }
    
    // Shuffle exercises for variety
    exercises = GreenBiteUtils.shuffleArray(exercises);
    
    // Calculate how many exercises to include based on duration
    const totalExerciseDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
    const restTime = exercises.length * 15; // 15 seconds rest between exercises
    
    let selectedExercises = [];
    let currentDuration = 0;
    
    // Select exercises to fit the time duration
    for (let i = 0; i < exercises.length && currentDuration < (duration * 60); i++) {
        selectedExercises.push(exercises[i]);
        currentDuration += exercises[i].duration + 15; // Exercise + rest time
    }
    
    // If we need more time, repeat some exercises
    while (currentDuration < (duration * 60) && selectedExercises.length < 10) {
        const randomExercise = exercises[GreenBiteUtils.getRandomInt(0, exercises.length - 1)];
        selectedExercises.push({...randomExercise, name: randomExercise.name + ' (Round 2)'});
        currentDuration += randomExercise.duration + 15;
    }
    
    currentWorkout = selectedExercises;
    displayWorkoutPlan();
}

function displayWorkoutPlan() {
    const workoutPlan = document.getElementById('workoutPlan');
    const exerciseList = document.getElementById('exerciseList');
    
    if (!workoutPlan || !exerciseList) return;
    
    exerciseList.innerHTML = '';
    
    currentWorkout.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = 'exercise-item';
        exerciseItem.innerHTML = `
            <div>
                <div class="exercise-name">${exercise.name}</div>
                <small style="color: var(--gray-dark);">${exercise.description}</small>
            </div>
            <div class="exercise-duration">${exercise.duration}s</div>
        `;
        exerciseList.appendChild(exerciseItem);
    });
    
    workoutPlan.style.display = 'block';
    workoutPlan.scrollIntoView({ behavior: 'smooth' });
}

function initializeTimerControls() {
    const startWorkout = document.getElementById('startWorkout');
    const pauseTimer = document.getElementById('pauseTimer');
    const nextExercise = document.getElementById('nextExercise');
    const stopWorkout = document.getElementById('stopWorkout');
    
    if (startWorkout) {
        startWorkout.addEventListener('click', startWorkoutTimer);
    }
    
    if (pauseTimer) {
        pauseTimer.addEventListener('click', togglePauseTimer);
    }
    
    if (nextExercise) {
        nextExercise.addEventListener('click', skipToNextExercise);
    }
    
    if (stopWorkout) {
        stopWorkout.addEventListener('click', stopWorkoutTimer);
    }
}

function startWorkoutTimer() {
    if (currentWorkout.length === 0) return;
    
    currentExerciseIndex = 0;
    
    // Show timer section
    const workoutTimer = document.getElementById('workoutTimer');
    if (workoutTimer) {
        workoutTimer.style.display = 'block';
        workoutTimer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update total exercises count
    const totalExercises = document.getElementById('totalExercises');
    if (totalExercises) {
        totalExercises.textContent = currentWorkout.length;
    }
    
    startCurrentExercise();
}

function startCurrentExercise() {
    if (currentExerciseIndex >= currentWorkout.length) {
        completeWorkout();
        return;
    }
    
    const exercise = currentWorkout[currentExerciseIndex];
    
    // Update UI
    const currentExerciseElement = document.getElementById('currentExercise');
    const exerciseNumber = document.getElementById('exerciseNumber');
    const timeRemainingElement = document.getElementById('timeRemaining');
    const timerCircle = document.getElementById('timerCircle');
    
    if (currentExerciseElement) {
        currentExerciseElement.textContent = exercise.name;
    }
    
    if (exerciseNumber) {
        exerciseNumber.textContent = currentExerciseIndex + 1;
    }
    
    // Set timer
    timeRemaining = exercise.duration;
    isPaused = false;
    
    if (timeRemainingElement) {
        timeRemainingElement.textContent = timeRemaining;
    }
    
    if (timerCircle) {
        timerCircle.classList.add('active');
    }
    
    // Start countdown
    workoutTimer = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            
            if (timeRemainingElement) {
                timeRemainingElement.textContent = timeRemaining;
            }
            
            if (timeRemaining <= 0) {
                clearInterval(workoutTimer);
                
                // Move to next exercise after a brief pause
                currentExerciseIndex++;
                setTimeout(() => {
                    startCurrentExercise();
                }, 1000);
            }
        }
    }, 1000);
}

function togglePauseTimer() {
    isPaused = !isPaused;
    
    const pauseButton = document.getElementById('pauseTimer');
    const timerCircle = document.getElementById('timerCircle');
    
    if (pauseButton) {
        pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
    }
    
    if (timerCircle) {
        if (isPaused) {
            timerCircle.classList.remove('active');
        } else {
            timerCircle.classList.add('active');
        }
    }
}

function skipToNextExercise() {
    clearInterval(workoutTimer);
    currentExerciseIndex++;
    startCurrentExercise();
}

function stopWorkoutTimer() {
    clearInterval(workoutTimer);
    
    // Hide timer section
    const workoutTimerElement = document.getElementById('workoutTimer');
    if (workoutTimerElement) {
        workoutTimerElement.style.display = 'none';
    }
    
    // Reset state
    currentExerciseIndex = 0;
    timeRemaining = 0;
    isPaused = false;
    
    // Reset timer circle
    const timerCircle = document.getElementById('timerCircle');
    if (timerCircle) {
        timerCircle.classList.remove('active');
    }
}

function completeWorkout() {
    clearInterval(workoutTimer);
    
    // Save workout to localStorage
    saveWorkoutSession();
    
    // Show completion message
    const currentExerciseElement = document.getElementById('currentExercise');
    const timeRemainingElement = document.getElementById('timeRemaining');
    const timerCircle = document.getElementById('timerCircle');
    
    if (currentExerciseElement) {
        currentExerciseElement.textContent = 'Workout Complete! 🎉';
    }
    
    if (timeRemainingElement) {
        timeRemainingElement.textContent = '✓';
    }
    
    if (timerCircle) {
        timerCircle.classList.remove('active');
        timerCircle.style.borderColor = 'var(--success-green)';
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
        stopWorkoutTimer();
    }, 3000);
}

function saveWorkoutSession() {
    const session = {
        date: new Date().toISOString(),
        exercises: currentWorkout.length,
        duration: currentWorkout.reduce((sum, ex) => sum + ex.duration, 0),
        type: getWorkoutType(),
        completed: true
    };
    
    let workoutHistory = GreenBiteUtils.getFromLocalStorage('workout_history', []);
    workoutHistory.push(session);
    
    // Keep only last 50 workouts
    if (workoutHistory.length > 50) {
        workoutHistory = workoutHistory.slice(-50);
    }
    
    GreenBiteUtils.saveToLocalStorage('workout_history', workoutHistory);
}

function getWorkoutType() {
    const bodyPart = document.getElementById('bodyPart').value;
    const equipment = document.getElementById('equipment').value;
    return `${bodyPart} (${equipment})`;
}

// Export workout utilities
window.WorkoutUtils = {
    generateWorkout,
    startWorkoutTimer,
    saveWorkoutSession
};
