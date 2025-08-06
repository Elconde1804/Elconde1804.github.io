document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const bookCover = document.getElementById('bookCover');
  const bookPages = document.getElementById('bookPages');
  const openBookBtn = document.getElementById('openBookBtn');
  const backButton = document.getElementById('backButton');
  const loginForm = document.getElementById('academicLoginForm');
  const emailInput = document.getElementById('universityEmail');
  const passwordInput = document.getElementById('academicPassword');
  const roleSelect = document.getElementById('userRole');

  // Book state
  let isBookOpen = false;
  
  // Book opening and closing functionality
  function openBook() {
    if (!isBookOpen) {
      bookCover.classList.add('opened');
      bookPages.style.opacity = '1';
      bookPages.style.transform = 'translateZ(0)';
      openBookBtn.innerHTML = '<i class="fas fa-book"></i> Close Portal';
      backButton.classList.add('show');
      isBookOpen = true;
      
      // Add animation delays for page content
      setTimeout(() => {
        const leftPage = document.querySelector('.left-page');
        const rightPage = document.querySelector('.right-page');
        if (leftPage) leftPage.classList.add('fade-in');
        if (rightPage) rightPage.classList.add('fade-in');
      }, 400);
    }
  }

  function closeBook() {
    if (isBookOpen) {
      bookCover.classList.remove('opened');
      bookPages.style.opacity = '0';
      bookPages.style.transform = 'translateZ(-50px)';
      openBookBtn.innerHTML = '<i class="fas fa-book-open"></i> Enter Portal';
      backButton.classList.remove('show');
      isBookOpen = false;
      
      // Reset form if open
      resetLoginForm();
    }
  }

  // Event listeners for book controls
  openBookBtn.addEventListener('click', () => {
    if (isBookOpen) {
      closeBook();
    } else {
      openBook();
    }
  });

  backButton.addEventListener('click', closeBook);

  // Enhanced form validation functions
  function validateEmail() {
    const email = emailInput.value.trim();
    const universityPattern = /^[a-zA-Z0-9._%+-]+@parsu\.edu\.ph$/;
    
    if (!email) {
      showValidationError(emailInput, 'emailError', 'University email address is required');
      return false;
    }
    if (!universityPattern.test(email)) {
      showValidationError(emailInput, 'emailError', 'Please use your official @parsu.edu.ph email address');
      return false;
    }
    clearValidationError(emailInput, 'emailError');
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value;
    if (!password) {
      showValidationError(passwordInput, 'passwordError', 'Password is required for authentication');
      return false;
    }
    if (password.length < 6) {
      showValidationError(passwordInput, 'passwordError', 'Password must be at least 6 characters for security');
      return false;
    }
    clearValidationError(passwordInput, 'passwordError');
    return true;
  }

  function validateRole() {
    const role = roleSelect.value;
    if (!role) {
      showValidationError(roleSelect, 'roleError', 'Please specify your academic role for proper access');
      return false;
    }
    clearValidationError(roleSelect, 'roleError');
    return true;
  }

  function showValidationError(input, errorId, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Academic-style shake animation
    input.style.animation = 'academicShake 0.6s ease-in-out';
    setTimeout(() => {
      input.style.animation = '';
    }, 600);
  }

  function clearValidationError(input, errorId) {
    input.classList.remove('error');
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = 'none';
  }

  function resetLoginForm() {
    loginForm.reset();
    clearValidationError(emailInput, 'emailError');
    clearValidationError(passwordInput, 'passwordError');
    clearValidationError(roleSelect, 'roleError');
    
    // Reset login button if it was in loading state
    const loginButton = loginForm.querySelector('.login-btn');
    loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Access Portal';
    loginButton.disabled = false;
    loginButton.style.background = '';
  }

  // Real-time validation with academic precision
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      setTimeout(validateEmail, 300); // Debounced validation
    } else {
      clearValidationError(emailInput, 'emailError');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value) {
      setTimeout(validatePassword, 300);
    } else {
      clearValidationError(passwordInput, 'passwordError');
    }
  });

  roleSelect.addEventListener('change', validateRole);

  // Professional form submission with academic styling
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isRoleValid = validateRole();

    if (isEmailValid && isPasswordValid && isRoleValid) {
      const loginButton = loginForm.querySelector('.login-btn');
      const originalContent = loginButton.innerHTML;
      
      // Professional loading state
      loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      loginButton.disabled = true;
      loginButton.style.background = 'var(--text-muted)';

      // Simulate academic authentication process
      setTimeout(() => {
        createAcademicNotification('success', 'Authentication Successful', 
          `Welcome to EduVault, ${emailInput.value.split('@')[0].toUpperCase()}!`);
        
        setTimeout(() => {
          showAcademicDashboard();
        }, 2500);
        
      }, 2000);
    } else {
      createAcademicNotification('error', 'Authentication Failed', 
        'Please verify all required fields are correctly completed.');
    }
  });

  // Academic notification system
  function createAcademicNotification(type, title, message) {
    const notification = document.createElement('div');
    const isSuccess = type === 'success';
    const isError = type === 'error';
    const isInfo = type === 'info';
    
    let bgColor, iconClass;
    if (isSuccess) {
      bgColor = 'linear-gradient(135deg, #48bb78, #38a169)';
      iconClass = 'fa-check-circle';
    } else if (isError) {
      bgColor = 'linear-gradient(135deg, #e53e3e, #c53030)';
      iconClass = 'fa-exclamation-circle';
    } else {
      bgColor = 'linear-gradient(135deg, #4299e1, #3182ce)';
      iconClass = 'fa-info-circle';
    }
    
    notification.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      background: ${bgColor};
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      box-shadow: 0 15px 35px ${isSuccess ? 'rgba(72, 187, 120, 0.4)' : isError ? 'rgba(229, 62, 62, 0.4)' : 'rgba(66, 153, 225, 0.4)'};
      z-index: 1000;
      min-width: 300px;
      font-family: 'Source Sans Pro', sans-serif;
      border-left: 6px solid ${isSuccess ? 'var(--accent-gold)' : '#fff'};
      animation: academicSlideIn 0.5s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <i class="fas ${iconClass}" 
           style="font-size: 1.5rem; margin-top: 2px;"></i>
        <div>
          <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 4px;">${title}</div>
          <div style="font-size: 0.9rem; opacity: 0.95;">${message}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'academicSlideOut 0.5s ease-in forwards';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }

  // Academic dashboard modal
  function showAcademicDashboard() {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(26, 35, 50, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(10px);
      animation: academicFadeIn 0.6s ease-out;
    `;
    
    const userRole = roleSelect.options[roleSelect.selectedIndex].text;
    const userName = emailInput.value.split('@')[0].replace(/[._]/g, ' ').toUpperCase();
    
    modal.innerHTML = `
      <div style="
        background: var(--paper-white);
        padding: 3rem 2.5rem;
        border-radius: 16px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        border: 3px solid var(--accent-gold);
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: -50px;
          left: -50px;
          width: 100px;
          height: 100px;
          background: var(--gradient-gold);
          border-radius: 50%;
          opacity: 0.1;
        "></div>
        <div style="
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 60px;
          height: 60px;
          background: var(--gradient-navy);
          border-radius: 50%;
          opacity: 0.1;
        "></div>
        
        <div style="
          width: 120px;
          height: 120px;
          background: var(--gradient-navy);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 3rem;
          border: 6px solid var(--accent-gold);
          position: relative;
          z-index: 2;
        ">
          <i class="fas fa-university"></i>
        </div>
        
        <h2 style="
          color: var(--primary-navy); 
          margin-bottom: 0.5rem; 
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
        ">Portal Access Granted</h2>
        
        <div style="
          background: var(--paper-cream);
          padding: 1.5rem;
          border-radius: 12px;
          margin: 1.5rem 0;
          border-left: 4px solid var(--accent-gold);
          position: relative;
          z-index: 2;
        ">
          <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">
            Welcome, ${userName}
          </div>
          <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
            ${userRole}
          </div>
          <div style="color: var(--text-muted); font-size: 0.8rem; font-style: italic;">
            Email: ${emailInput.value}
          </div>
        </div>
        
        <p style="
          color: var(--text-secondary); 
          margin-bottom: 2rem;
          line-height: 1.5;
          position: relative;
          z-index: 2;
        ">
          You are now connected to the EduVault Academic Portal. 
          Your personalized dashboard is being prepared...
        </p>
        
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="continueDashboard" style="
            background: var(--gradient-navy);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 2;
            box-shadow: 0 8px 20px rgba(26, 35, 50, 0.3);
          ">
            <i class="fas fa-arrow-right"></i> Continue to Dashboard
          </button>
          
          <button id="backToLogin" style="
            background: transparent;
            color: var(--text-secondary);
            border: 2px solid var(--border-light);
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 2;
          ">
            <i class="fas fa-arrow-left"></i> Back to Login
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);

    // Modal button handlers
    modal.querySelector('#continueDashboard').addEventListener('click', () => {
      modal.remove();
      createAcademicNotification('info', 'Redirecting...', 'Taking you to your personalized academic dashboard.');
    });

    modal.querySelector('#backToLogin').addEventListener('click', () => {
      modal.remove();
      resetLoginForm();
    });

    // Add hover effects
    const buttons = modal.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('mouseover', () => {
        if (btn.id === 'continueDashboard') {
          btn.style.transform = 'translateY(-3px)';
          btn.style.boxShadow = '0 12px 25px rgba(26, 35, 50, 0.4)';
        } else {
          btn.style.borderColor = 'var(--accent-gold)';
          btn.style.color = 'var(--accent-gold)';
        }
      });

      btn.addEventListener('mouseout', () => {
        if (btn.id === 'continueDashboard') {
          btn.style.transform = '';
          btn.style.boxShadow = '0 8px 20px rgba(26, 35, 50, 0.3)';
        } else {
          btn.style.borderColor = 'var(--border-light)';
          btn.style.color = 'var(--text-secondary)';
        }
      });
    });
  }

  // Alternative authentication methods
  document.getElementById('googleAuthBtn').addEventListener('click', () => {
    const btn = document.getElementById('googleAuthBtn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fab fa-google fa-spin"></i> Connecting...';
    btn.disabled = true;
    
    setTimeout(() => {
      createAcademicNotification('success', 'Google Integration', 
        'Google Workspace authentication would be processed here with university SSO.');
      btn.innerHTML = originalContent;
      btn.disabled = false;
    }, 2000);
  });

  document.getElementById('newAccountBtn').addEventListener('click', () => {
    createAcademicNotification('info', 'Account Registration', 
      'New student registration portal would open here with university verification process.');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key to close book
    if (e.key === 'Escape' && isBookOpen) {
      closeBook();
    }
    
    // Enter key to open book when focused on cover
    if (e.key === 'Enter' && document.activeElement === openBookBtn) {
      e.preventDefault();
      if (isBookOpen) {
        closeBook();
      } else {
        openBook();
      }
    }
  });

  // Initialize book pages as hidden
  bookPages.style.opacity = '0';
  bookPages.style.transform = 'translateZ(-50px)';
  bookPages.style.transition = 'all 0.6s ease';

  // Add focus management for accessibility
  openBookBtn.addEventListener('click', () => {
    if (isBookOpen) {
      // Focus on first input when book opens
      setTimeout(() => {
        emailInput.focus();
      }, 500);
    }
  });

  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});