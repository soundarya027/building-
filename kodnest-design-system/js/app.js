/**
 * KodNest Premium Build System
 * Application JavaScript
 * 
 * Calm, purposeful interactions. No animation noise.
 */

(function() {
  'use strict';

  // ============================================
  // CHECKBOX INTERACTIONS
  // Toggle completed state on proof items
  // ============================================
  function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.kn-proof-item .kn-checkbox__input');
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const proofItem = this.closest('.kn-proof-item');
        if (this.checked) {
          proofItem.classList.add('kn-proof-item--completed');
        } else {
          proofItem.classList.remove('kn-proof-item--completed');
        }
      });
    });
  }

  // ============================================
  // COPY TO CLIPBOARD
  // Copy prompt content to clipboard
  // ============================================
  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.kn-button');
    
    copyButtons.forEach(button => {
      if (button.textContent.includes('Copy')) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Find the prompt content
          const promptBox = this.closest('.kn-secondary-panel__section')?.querySelector('.kn-secondary-panel__prompt-content');
          
          if (promptBox) {
            const text = promptBox.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
              // Visual feedback
              const originalText = this.innerHTML;
              this.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied
              `;
              
              setTimeout(() => {
                this.innerHTML = originalText;
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy:', err);
            });
          }
        });
      }
    });
  }

  // ============================================
  // BUTTON FEEDBACK
  // Provide subtle feedback on action buttons
  // ============================================
  function initButtonFeedback() {
    const feedbackButtons = document.querySelectorAll('.kn-button');
    
    feedbackButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Skip if it's a copy button (handled separately)
        if (this.textContent.includes('Copy')) return;
        
        // Skip if button has no specific action
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
        }
        
        // Add subtle press effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 100);
      });
    });
  }

  // ============================================
  // INPUT FOCUS MANAGEMENT
  // Clear error states on focus
  // ============================================
  function initInputHandling() {
    const inputs = document.querySelectorAll('.kn-input');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.classList.remove('kn-input--error');
      });
    });
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // Enhance keyboard accessibility
  // ============================================
  function initKeyboardNav() {
    // Enable Enter key on checkboxes for accessibility
    const checkboxLabels = document.querySelectorAll('.kn-proof-item__checkbox');
    
    checkboxLabels.forEach(label => {
      label.setAttribute('tabindex', '0');
      label.setAttribute('role', 'checkbox');
      
      const input = label.querySelector('input');
      if (input) {
        label.setAttribute('aria-checked', input.checked);
        
        label.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            input.click();
            this.setAttribute('aria-checked', input.checked);
          }
        });
        
        input.addEventListener('change', function() {
          label.setAttribute('aria-checked', this.checked);
        });
      }
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    initCheckboxes();
    initCopyButtons();
    initButtonFeedback();
    initInputHandling();
    initKeyboardNav();
    
    console.log('KodNest Premium Build System initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
