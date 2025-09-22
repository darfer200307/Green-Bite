// Mindfulness Page JavaScript

let breathingInterval = null;
let meditationTimer = null;
let meditationTime = 300; // 5 minutes default
let currentMeditationTime = 0;
let isBreathing = false;
let isMeditating = false;
let soundsEnabled = false;
// Audio elements for ambient sounds
const ambientAudios = {
    rain: new Audio('Audio/Rain.mp3'),
    ocean: new Audio('Audio/Ocean.mp3'),
    forest: new Audio('Audio/forest.mp3'),
    birds: new Audio('Audio/Birds.mp3')
};

// Loop all ambient sounds
Object.values(ambientAudios).forEach(audio => {
    audio.loop = true;
    audio.volume = 0.5;
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.mindfulness')) {
        initializeMindfulness();
        loadMindfulnessStats();
    }
});

function initializeMindfulness() {
    initializeBreathing();
    initializeMeditationTimer();
    initializeAmbientSounds();
    initializePresetButtons();
}

function initializeBreathing() {
    const startBreathing = document.getElementById('startBreathing');
    const stopBreathing = document.getElementById('stopBreathing');
    const breathingCircle = document.getElementById('breathingCircle');
    
    if (startBreathing) {
        startBreathing.addEventListener('click', function() {
            if (!isBreathing) {
                startBreathingExercise();
            }
        });
    }
    
    if (stopBreathing) {
        stopBreathing.addEventListener('click', stopBreathingExercise);
    }
    
    if (breathingCircle) {
        breathingCircle.addEventListener('click', function() {
            if (!isBreathing) {
                startBreathingExercise();
            }
        });
    }
}

function startBreathingExercise() {
    isBreathing = true;
    
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingText = document.getElementById('breathingText');
    const startButton = document.getElementById('startBreathing');
    const stopButton = document.getElementById('stopBreathing');
    
    if (breathingCircle) {
        breathingCircle.classList.add('breathing');
    }
    
    if (startButton) {
        startButton.style.display = 'none';
    }
    
    if (stopButton) {
        stopButton.style.display = 'inline-block';
    }
    
    // Breathing pattern: 4 seconds in, 4 seconds out
    let phase = 'inhale'; // 'inhale' or 'exhale'
    let cycleCount = 0;
    
    function updateBreathingText() {
        if (breathingText) {
            if (phase === 'inhale') {
                breathingText.textContent = 'Breathe In';
                phase = 'exhale';
            } else {
                breathingText.textContent = 'Breathe Out';
                phase = 'inhale';
                cycleCount++;
            }
        }
    }
    
    // Start immediately
    updateBreathingText();
    
    // Continue every 4 seconds
    breathingInterval = setInterval(updateBreathingText, 4000);
}

function stopBreathingExercise() {
    isBreathing = false;
    
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }
    
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingText = document.getElementById('breathingText');
    const startButton = document.getElementById('startBreathing');
    const stopButton = document.getElementById('stopBreathing');
    
    if (breathingCircle) {
        breathingCircle.classList.remove('breathing');
    }
    
    if (breathingText) {
        breathingText.textContent = 'Click to Start';
    }
    
    if (startButton) {
        startButton.style.display = 'inline-block';
    }
    
    if (stopButton) {
        stopButton.style.display = 'none';
    }
}

function initializeMeditationTimer() {
    const startMeditation = document.getElementById('startMeditation');
    const pauseMeditation = document.getElementById('pauseMeditation');
    const resetMeditation = document.getElementById('resetMeditation');
    
    if (startMeditation) {
        startMeditation.addEventListener('click', startMeditationSession);
    }
    
    if (pauseMeditation) {
        pauseMeditation.addEventListener('click', pauseMeditationSession);
    }
    
    if (resetMeditation) {
        resetMeditation.addEventListener('click', resetMeditationTimer);
    }
}

function initializePresetButtons() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            presetButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set meditation time
            meditationTime = parseInt(this.dataset.time);
            currentMeditationTime = meditationTime;
            
            // Update display
            updateMeditationDisplay();
        });
    });
    
    // Set default active preset
    if (presetButtons.length > 0) {
        presetButtons[0].classList.add('active');
    }
}

function startMeditationSession() {
    if (isMeditating) return;
    
    isMeditating = true;
    currentMeditationTime = meditationTime;
    
    const startButton = document.getElementById('startMeditation');
    const pauseButton = document.getElementById('pauseMeditation');
    
    if (startButton) {
        startButton.style.display = 'none';
    }
    
    if (pauseButton) {
        pauseButton.style.display = 'inline-block';
        pauseButton.textContent = 'Pause';
    }
    
    meditationTimer = setInterval(() => {
        currentMeditationTime--;
        updateMeditationDisplay();
        
        if (currentMeditationTime <= 0) {
            completeMeditationSession();
        }
    }, 1000);
}

function pauseMeditationSession() {
    if (meditationTimer) {
        clearInterval(meditationTimer);
        meditationTimer = null;
        
        const pauseButton = document.getElementById('pauseMeditation');
        if (pauseButton) {
            pauseButton.textContent = 'Resume';
        }
    } else {
        // Resume
        const pauseButton = document.getElementById('pauseMeditation');
        if (pauseButton) {
            pauseButton.textContent = 'Pause';
        }
        
        meditationTimer = setInterval(() => {
            currentMeditationTime--;
            updateMeditationDisplay();
            
            if (currentMeditationTime <= 0) {
                completeMeditationSession();
            }
        }, 1000);
    }
}

function resetMeditationTimer() {
    if (meditationTimer) {
        clearInterval(meditationTimer);
        meditationTimer = null;
    }
    
    isMeditating = false;
    currentMeditationTime = meditationTime;
    
    const startButton = document.getElementById('startMeditation');
    const pauseButton = document.getElementById('pauseMeditation');
    
    if (startButton) {
        startButton.style.display = 'inline-block';
    }
    
    if (pauseButton) {
        pauseButton.style.display = 'none';
    }
    
    updateMeditationDisplay();
}

function completeMeditationSession() {
    clearInterval(meditationTimer);
    meditationTimer = null;
    isMeditating = false;
    
    // Save session
    saveMindfulnessSession('meditation', meditationTime);
    
    // Reset UI
    const startButton = document.getElementById('startMeditation');
    const pauseButton = document.getElementById('pauseMeditation');
    const meditationTimeDisplay = document.getElementById('meditationTime');
    
    if (startButton) {
        startButton.style.display = 'inline-block';
    }
    
    if (pauseButton) {
        pauseButton.style.display = 'none';
    }
    
    if (meditationTimeDisplay) {
        meditationTimeDisplay.textContent = 'Complete! ✓';
        setTimeout(() => {
            currentMeditationTime = meditationTime;
            updateMeditationDisplay();
        }, 2000);
    }
    
    // Update stats
    loadMindfulnessStats();
}

function updateMeditationDisplay() {
    const meditationTimeDisplay = document.getElementById('meditationTime');
    if (meditationTimeDisplay) {
        meditationTimeDisplay.textContent = GreenBiteUtils.formatTime(currentMeditationTime);
    }
}

function initializeAmbientSounds() {
    const soundButtons = document.querySelectorAll('.sound-btn');
    const toggleSounds = document.getElementById('toggleSounds');
    
    soundButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sound = this.dataset.sound;
            // Toggle active state
            soundButtons.forEach(btn => btn.classList.remove('active'));
            // Pause all audios
            Object.values(ambientAudios).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                soundsEnabled = true;
                if (ambientAudios[sound]) {
                    ambientAudios[sound].play();
                }
            } else {
                soundsEnabled = false;
            }
            updateSoundsToggle();
        });
    });

    if (toggleSounds) {
        toggleSounds.addEventListener('click', function() {
            soundsEnabled = !soundsEnabled;
            if (!soundsEnabled) {
                soundButtons.forEach(btn => btn.classList.remove('active'));
                Object.values(ambientAudios).forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
            }
            updateSoundsToggle();
        });
    }
}

function updateSoundsToggle() {
    const toggleSounds = document.getElementById('toggleSounds');
    if (toggleSounds) {
        toggleSounds.textContent = soundsEnabled ? '🔊 Sounds On' : '🔇 Sounds Off';
    }
}

function saveMindfulnessSession(type, duration) {
    const session = {
        type: type,
        duration: duration,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    let sessions = GreenBiteUtils.getFromLocalStorage('mindfulness_sessions', []);
    sessions.push(session);
    
    // Keep only last 100 sessions
    if (sessions.length > 100) {
        sessions = sessions.slice(-100);
    }
    
    GreenBiteUtils.saveToLocalStorage('mindfulness_sessions', sessions);
}

function loadMindfulnessStats() {
    const sessions = GreenBiteUtils.getFromLocalStorage('mindfulness_sessions', []);
    
    // Calculate stats
    const totalSessions = sessions.length;
    const totalMinutes = Math.round(sessions.reduce((sum, session) => sum + session.duration, 0) / 60);
    const streak = calculateMindfulnessStreak(sessions);
    
    // Update UI
    const totalSessionsElement = document.getElementById('totalSessions');
    const totalMinutesElement = document.getElementById('totalMinutes');
    const streakElement = document.getElementById('streak');
    
    if (totalSessionsElement) {
        totalSessionsElement.textContent = totalSessions;
    }
    
    if (totalMinutesElement) {
        totalMinutesElement.textContent = totalMinutes;
    }
    
    if (streakElement) {
        streakElement.textContent = streak;
    }
    
    // Update recent sessions
    updateRecentSessions(sessions);
}

function calculateMindfulnessStreak(sessions) {
    if (sessions.length === 0) return 0;
    
    // Group sessions by date
    const sessionsByDate = {};
    
    sessions.forEach(session => {
        const date = new Date(session.date);
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        
        if (!sessionsByDate[dateKey]) {
            sessionsByDate[dateKey] = [];
        }
        sessionsByDate[dateKey].push(session);
    });
    
    // Calculate streak
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
        
        if (sessionsByDate[dateKey]) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
}

function updateRecentSessions(sessions) {
    const sessionsList = document.getElementById('sessionsList');
    if (!sessionsList) return;
    
    sessionsList.innerHTML = '';
    
    if (sessions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No sessions yet';
        sessionsList.appendChild(li);
        return;
    }
    
    // Show last 5 sessions
    const recentSessions = sessions.slice(-5).reverse();
    
    recentSessions.forEach(session => {
        const li = document.createElement('li');
        const date = new Date(session.date);
        const duration = Math.round(session.duration / 60);
        
        li.textContent = `${session.type.charAt(0).toUpperCase() + session.type.slice(1)} - ${duration} min (${GreenBiteUtils.formatDate(date)})`;
        sessionsList.appendChild(li);
    });
}

// Export mindfulness utilities
window.MindfulnessUtils = {
    startBreathingExercise,
    stopBreathingExercise,
    saveMindfulnessSession,
    loadMindfulnessStats
};
