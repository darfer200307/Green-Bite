// GreenBite Wellness Website - Main JavaScript File

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroQuotes();
    initializeHealthTips();
    initializeNewsletter();
    initializeScrollAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Hero quotes rotation
function initializeHeroQuotes() {
    const heroQuote = document.getElementById('heroQuote');
    
    const quotes = [
        "Your journey to wellness starts here!",
        "Nourish your body, feed your soul.",
        "Healthy living made simple and delicious.",
        "Transform your life one healthy choice at a time.",
        "Wellness is not a destination, it's a journey.",
        "Every healthy choice brings you closer to your best self."
    ];

    if (heroQuote) {
        let currentQuote = 0;
        
        function rotateQuote() {
            heroQuote.style.opacity = '0';
            setTimeout(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                heroQuote.textContent = quotes[currentQuote];
                heroQuote.style.opacity = '1';
            }, 500);
        }

        // Change quote every 4 seconds
        setInterval(rotateQuote, 4000);
    }
}

// Health tips (changes daily)
function initializeHealthTips() {
    const tipTitle = document.getElementById('tipTitle');
    const tipContent = document.getElementById('tipContent');

    const healthTips = [
        {
            title: "Stay Hydrated",
            content: "Drink at least 8 glasses of water daily. Proper hydration boosts energy, improves brain function, and helps maintain healthy skin."
        },
        {
            title: "Eat the Rainbow",
            content: "Include colorful fruits and vegetables in every meal. Different colors provide different nutrients and antioxidants for optimal health."
        },
        {
            title: "Move Your Body",
            content: "Aim for at least 30 minutes of physical activity daily. Even a brisk walk can improve cardiovascular health and mood."
        },
        {
            title: "Practice Mindfulness",
            content: "Take 5 minutes daily for deep breathing or meditation. Mindfulness reduces stress and improves mental clarity."
        },
        {
            title: "Get Quality Sleep",
            content: "Aim for 7-9 hours of quality sleep each night. Good sleep is essential for physical recovery and mental health."
        },
        {
            title: "Limit Processed Foods",
            content: "Choose whole, unprocessed foods whenever possible. They provide more nutrients and fewer harmful additives."
        },
        {
            title: "Practice Gratitude",
            content: "Write down three things you're grateful for each day. Gratitude practice improves mental health and overall well-being."
        }
    ];

    if (tipTitle && tipContent) {
        // Get tip based on day of the year
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const tipIndex = dayOfYear % healthTips.length;
        const todaysTip = healthTips[tipIndex];

        tipTitle.textContent = todaysTip.title;
        tipContent.textContent = todaysTip.content;
    }
}

// Newsletter subscription
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            
            if (validateEmail(email)) {
                // Store email in localStorage
                let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
                
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
                    
                    showMessage(newsletterMessage, 'Thank you for subscribing! We\'ll send you weekly health tips.', 'success');
                    document.getElementById('newsletterEmail').value = '';
                } else {
                    showMessage(newsletterMessage, 'You\'re already subscribed to our newsletter!', 'error');
                }
            } else {
                showMessage(newsletterMessage, 'Please enter a valid email address.', 'error');
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .health-tip, .recipe-card').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(element, message, type) {
    element.innerHTML = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Format time helper
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Save data to localStorage helper
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Get data from localStorage helper
function getFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// Form validation helper
function validateForm(formData, rules) {
    const errors = {};
    
    for (const field in rules) {
        const value = formData[field];
        const rule = rules[field];
        
        if (rule.required && (!value || value.trim() === '')) {
            errors[field] = `${field} is required`;
        } else if (rule.minLength && value.length < rule.minLength) {
            errors[field] = `${field} must be at least ${rule.minLength} characters`;
        } else if (rule.email && !validateEmail(value)) {
            errors[field] = 'Please enter a valid email address';
        }
    }
    
    return errors;
}

// Display form errors
function displayFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Display new errors
    for (const field in errors) {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    }
}

// Clear form errors
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// Random number generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array helper
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Date formatting helper
function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Get streak count helper
function calculateStreak(sessions) {
    if (!sessions || sessions.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    
    // Sort sessions by date (most recent first)
    const sortedSessions = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (const session of sortedSessions) {
        const sessionDate = new Date(session.date);
        
        if (isSameDay(sessionDate, currentDate)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
}

// Export functions for use in other files
window.GreenBiteUtils = {
    validateEmail,
    showMessage,
    scrollToSection,
    formatTime,
    saveToLocalStorage,
    getFromLocalStorage,
    validateForm,
    displayFormErrors,
    clearFormErrors,
    getRandomInt,
    shuffleArray,
    formatDate,
    isSameDay,
    calculateStreak
};