$(document).ready(function() {
    // Smooth fade-in animation for tab content
    $('.nav-link').on('click', function() {
        const targetTab = $(this).attr('data-bs-target');
        
        // Add fade effect
        $('.tab-pane').removeClass('show active');
        setTimeout(function() {
            $(targetTab).addClass('show active');
        }, 150);
    });

    // Add hover effect to list items
    $('.list-group-item').hover(
        function() {
            $(this).css('cursor', 'pointer');
        }
    );

    // Console log for tab changes
    $('.nav-link').on('shown.bs.tab', function (e) {
        const tabName = $(e.target).text().trim();
        console.log('Switched to tab:', tabName);
    });

    // Optional: Add active class animation
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('scale-effect');
        $(this).addClass('scale-effect');
    });

    // Welcome message
    console.log('%c Welcome to VIT Projects Portfolio! ', 'background: #0d6efd; color: white; font-size: 16px; padding: 10px;');
});