// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('contactForm')) {
        initializeContact();
        initializeFAQ();
    }
});

function initializeContact() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    // Add real-time validation
    addRealTimeValidation();
}

function submitContactForm() {
    // Clear previous errors
    GreenBiteUtils.clearFormErrors();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };
    
    // Validation rules
    const validationRules = {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        subject: { required: true },
        message: { required: true, minLength: 10 }
    };
    
    // Validate form
    const errors = GreenBiteUtils.validateForm(formData, validationRules);
    
    if (Object.keys(errors).length > 0) {
        GreenBiteUtils.displayFormErrors(errors);
        return;
    }
    
    // Save contact submission
    saveContactSubmission(formData);
    
    // Show success message
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.innerHTML = `
            <div class="form-feedback success">
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will get back to you within 24 hours.</p>
                <p><strong>Reference ID:</strong> GB-${Date.now().toString().slice(-6)}</p>
            </div>
        `;
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

function addRealTimeValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const nameError = document.getElementById('nameError');
            if (this.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
            } else {
                nameError.textContent = '';
            }
        });
    }
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailError = document.getElementById('emailError');
            if (!GreenBiteUtils.validateEmail(this.value)) {
                emailError.textContent = 'Please enter a valid email address';
            } else {
                emailError.textContent = '';
            }
        });
    }
    
    // Message validation
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const messageError = document.getElementById('messageError');
            const remainingChars = 10 - this.value.length;
            
            if (remainingChars > 0) {
                messageError.textContent = `Please add at least ${remainingChars} more characters`;
            } else {
                messageError.textContent = '';
            }
        });
    }
}

function saveContactSubmission(formData) {
    const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: 'GB-' + Date.now().toString().slice(-6),
        status: 'pending'
    };
    
    let submissions = GreenBiteUtils.getFromLocalStorage('contact_submissions', []);
    submissions.push(submission);
    
    // Keep only last 50 submissions
    if (submissions.length > 50) {
        submissions = submissions.slice(-50);
    }
    
    GreenBiteUtils.saveToLocalStorage('contact_submissions', submissions);
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Additional contact utilities
function getContactStats() {
    const submissions = GreenBiteUtils.getFromLocalStorage('contact_submissions', []);
    
    return {
        total: submissions.length,
        thisMonth: submissions.filter(sub => {
            const subDate = new Date(sub.timestamp);
            const now = new Date();
            return subDate.getMonth() === now.getMonth() && 
                   subDate.getFullYear() === now.getFullYear();
        }).length,
        bySubject: submissions.reduce((acc, sub) => {
            acc[sub.subject] = (acc[sub.subject] || 0) + 1;
            return acc;
        }, {})
    };
}

function exportContactData() {
    const submissions = GreenBiteUtils.getFromLocalStorage('contact_submissions', []);
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'greenbite-contact-data.json';
    link.click();
}

// Export contact utilities
window.ContactUtils = {
    getContactStats,
    exportContactData,
    saveContactSubmission
};
