document.addEventListener('DOMContentLoaded', () => {
    // This is the content of the actual page (e.g., index.html, clients.html)
    const pageContent = document.body.innerHTML;

    // Fetch the menu structure
    fetch('menu.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for menu.html');
            }
            return response.text();
        })
        .then(menuHtml => {
            // Clear the body and inject the menu HTML
            document.body.innerHTML = menuHtml;

            // Now, find the .main-content div inside the loaded menu structure
            const mainContentContainer = document.querySelector('.main-content');
            
            if (mainContentContainer) {
                // Inject the original page content into the .main-content container
                mainContentContainer.innerHTML = pageContent;
            }

            // Highlight the active menu item
            const currentPage = window.location.pathname.split('/').pop();
            let activeLinkQuery = `.sidebar-menu a[href="${currentPage}"]`;

            // Special case for home page
            if (currentPage === '' || currentPage === 'index.html') {
                 activeLinkQuery = '.sidebar-menu a[href="index.html"]';
            }
            // Special case for customer page, highlight 'Clients'
            else if (currentPage.startsWith('customer')) {
                activeLinkQuery = '.sidebar-menu a[href="clients.html"]';
            }
             // Special case for quote details page, highlight 'Quotes'
            else if (currentPage.startsWith('quote.html')) {
                activeLinkQuery = '.sidebar-menu a[href="quotes.html"]';
            }


            const activeLink = document.querySelector(activeLinkQuery);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        })
        .catch(error => {
            console.error('Error loading menu:', error);
            document.body.innerHTML = '<p style="color: red; text-align: center;">Could not load the application shell.</p>';
        });
}); 