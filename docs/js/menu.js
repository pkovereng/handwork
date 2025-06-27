document.addEventListener('DOMContentLoaded', () => {
    const menuPlaceholder = document.getElementById('menu-placeholder');
    if (!menuPlaceholder) {
        return;
    }

    // Use an absolute path from the site root
    fetch('/handwork/menu.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for menu.html');
            }
            return response.text();
        })
        .then(html => {
            menuPlaceholder.innerHTML = html;
            
            const currentPage = window.location.pathname.split('/').pop();
            let activeLinkQuery = '';

            if (currentPage.includes('client') || currentPage.includes('customer')) {
                activeLinkQuery = '.top-menu-links a[href="clients.html"]';
            } else if (currentPage.includes('quote')) {
                activeLinkQuery = '.top-menu-links a[href="quotes.html"]';
            } else if (currentPage.includes('product')) {
                activeLinkQuery = '.top-menu-links a[href="products.html"]';
            } else if (currentPage.includes('setting')) {
                activeLinkQuery = '.top-menu-links a[href="settings.html"]';
            }

            if (activeLinkQuery) {
                const activeLink = document.querySelector(activeLinkQuery);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        })
        .catch(error => {
            console.error('Error loading menu:', error);
            menuPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Could not load menu.</p>';
        });
}); 