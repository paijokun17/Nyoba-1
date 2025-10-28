// Search functionality for DodWebTV

// Initialize search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
});

// Handle search input
function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
        // Reset to all videos when search is cleared
        filteredVideos = [...videoData];
        currentPage = 1;
        renderVideos();
        initializePagination();
        return;
    }
    
    if (searchTerm.length < 2) {
        return; // Wait for at least 2 characters
    }
    
    // Debounce search to avoid too many requests
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        performSearch(searchTerm);
    }, 300);
}

// Perform search
function performSearch(searchTerm) {
    // Show loading state
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'video-card loading';
        skeletonCard.innerHTML = `
            <div class="thumbnail-container">
                <div class="thumbnail skeleton skeleton-thumbnail"></div>
            </div>
            <div class="video-info">
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>
        `;
        videoGrid.appendChild(skeletonCard);
    }
    
    // Simulate API call delay
    setTimeout(() => {
        filteredVideos = videoData.filter(video => 
            video.title.toLowerCase().includes(searchTerm) ||
            video.tags.some(tag => tag.includes(searchTerm)) ||
            video.category.includes(searchTerm)
        );
        
        currentPage = 1;
        renderVideos();
        initializePagination();
        
        // Show search results count
        if (searchTerm) {
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.textContent = `Search Results (${filteredVideos.length})`;
            }
        }
    }, 800);
}

// Advanced search filters (could be expanded)
function advancedSearch(filters) {
    const { query, category, quality, language, year, sortBy } = filters;
    
    let results = [...videoData];
    
    // Text search
    if (query) {
        results = results.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.tags.some(tag => tag.includes(query.toLowerCase()))
        );
    }
    
    // Category filter
    if (category && category !== 'all') {
        results = results.filter(video => video.category === category);
    }
    
    // Quality filter
    if (quality && quality !== 'all') {
        results = results.filter(video => video.quality === quality);
    }
    
    // Language filter
    if (language && language !== 'all') {
        results = results.filter(video => video.language === language);
    }
    
    // Sort results
    if (sortBy) {
        switch (sortBy) {
            case 'views':
                results.sort((a, b) => {
                    const aViews = parseFloat(a.views) * (a.views.includes('M') ? 1000000 : 1000);
                    const bViews = parseFloat(b.views) * (b.views.includes('M') ? 1000000 : 1000);
                    return bViews - aViews;
                });
                break;
            case 'newest':
                results.sort((a, b) => b.id - a.id);
                break;
            case 'title':
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }
    
    return results;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { performSearch, advancedSearch };
    }
