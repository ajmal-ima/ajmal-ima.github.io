document.addEventListener('DOMContentLoaded', () => {

    // --- Expand/Collapse for Job Experience ---
    const jobHeaders = document.querySelectorAll('.job-header.toggle-details');

    jobHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Find the next element sibling, which should be the .job-details div
            const details = header.nextElementSibling;

            if (details && details.classList.contains('job-details')) {
                // Toggle the 'hidden' class to show/hide
                details.classList.toggle('hidden');

                // Toggle an 'active' class on the header for styling (like changing +/- icon)
                header.classList.toggle('active');
            }
        });
        // Add keyboard accessibility
        header.addEventListener('keydown', (event) => {
             if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page scroll on spacebar
                header.click(); // Trigger the click event
            }
        });
        // Make headers focusable for keyboard navigation
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false'); // Initial state

        // Update aria-expanded on toggle
         header.addEventListener('click', () => {
             const isExpanded = !header.nextElementSibling.classList.contains('hidden');
             header.setAttribute('aria-expanded', isExpanded);
         });

    });

    // --- Fade-in Animation on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Update Footer Year ---
     const yearSpan = document.getElementById('year');
     if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
     }

});
