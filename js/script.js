// Main JavaScript file for DodWebTV

// Sample data for videos
const videoData = [
    {
        id: 1,
        title: "The Last Adventure: Journey to the Unknown",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+1",
        duration: "2:15:30",
        views: "1.2M",
        quality: "1080",
        language: "en",
        subtitle: "id",
        category: "adventure",
        tags: ["adventure", "action", "fantasy"]
    },
    {
        id: 2,
        title: "Cyber Revolution: Rise of the Machines",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+2",
        duration: "1:45:12",
        views: "980K",
        quality: "720",
        language: "en",
        subtitle: "en",
        category: "sci-fi",
        tags: ["sci-fi", "action", "thriller"]
    },
    {
        id: 3,
        title: "Midnight in Paris: A Romantic Tale",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+3",
        duration: "2:05:45",
        views: "750K",
        quality: "1080",
        language: "en",
        subtitle: "id",
        category: "romance",
        tags: ["romance", "drama", "comedy"]
    },
    {
        id: 4,
        title: "Shadow Hunters: The Dark Prophecy",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+4",
        duration: "1:55:20",
        views: "1.5M",
        quality: "1080",
        language: "en",
        subtitle: "en",
        category: "fantasy",
        tags: ["fantasy", "action", "adventure"]
    },
    {
        id: 5,
        title: "Ocean Depths: Secrets of the Abyss",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+5",
        duration: "1:38:55",
        views: "620K",
        quality: "720",
        language: "en",
        subtitle: "id",
        category: "adventure",
        tags: ["adventure", "mystery", "thriller"]
    },
    {
        id: 6,
        title: "Desert Dreams: Journey Through the Sands",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+6",
        duration: "2:12:10",
        views: "890K",
        quality: "1080",
        language: "en",
        subtitle: "en",
        category: "adventure",
        tags: ["adventure", "drama", "mystery"]
    },
    {
        id: 7,
        title: "Mountain High: The Summit Challenge",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+7",
        duration: "1:50:30",
        views: "540K",
        quality: "720",
        language: "en",
        subtitle: "id",
        category: "adventure",
        tags: ["adventure", "action", "drama"]
    },
    {
        id: 8,
        title: "Future City: The Urban Evolution",
        thumbnail: "https://placehold.co/600x400/1e293b/cbd5e1?text=Thumbnail+8",
        duration: "2:25:15",
        views: "1.1M",
        quality: "1080",
        language: "en",
        subtitle: "en",
        category: "sci-fi",
        tags: ["sci-fi", "action", "thriller"]
    }
];

// Categories data
const categories = [
    { name: "Action", count: 128, slug: "action" },
    { name: "Adventure", count: 64, slug: "adventure" },
    { name: "Comedy", count: 92, slug: "comedy" },
    { name: "Drama", count: 75, slug: "drama" },
    { name: "Fantasy", count: 58, slug: "fantasy" },
    { name: "Horror", count: 43, slug: "horror" },
    { name: "Romance", count: 67, slug: "romance" },
    { name: "Sci-Fi", count: 81, slug: "sci-fi" }
];

// Popular tags
const popularTags = [
    "action", "adventure", "comedy", "drama", "fantasy", 
    "horror", "romance", "sci-fi", "thriller", "animation",
    "mystery", "crime", "documentary", "family", "history"
];

// DOM Elements
const videoGrid = document.getElementById('videoGrid');
const categoryList = document.getElementById('categoryList');
const tagsContainer = document.getElementById('tagsContainer');
const paginationList = document.getElementById('paginationList');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const videoModal = document.getElementById('videoModal');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginBtn = document.getElementById('loginBtn');
const exploreBtn = document.getElementById('exploreBtn');
const subscribeBtn = document.getElementById('subscribeBtn');

// Current state
let currentPage = 1;
const videosPerPage = 8;
let filteredVideos = [...videoData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCategories();
    initializeTags();
    renderVideos();
    initializePagination();
    setupEventListeners();
    updateGridColumns();
});

// Initialize categories
function initializeCategories() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <a href="#" class="category-link" data-category="${category.slug}">
                ${category.name} <span class="category-count">${category.count}</span>
            </a>
        `;
        categoryList.appendChild(categoryItem);
    });
}

// Initialize tags
function initializeTags() {
    tagsContainer.innerHTML = '';
    popularTags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = '#';
        tagElement.className = 'tag';
        tagElement.textContent = `#${tag}`;
        tagElement.dataset.tag = tag;
        tagsContainer.appendChild(tagElement);
    });
}

// Render videos to the grid
function renderVideos() {
    videoGrid.innerHTML = '';
    
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToShow = filteredVideos.slice(startIndex, endIndex);
    
    if (videosToShow.length === 0) {
        videoGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 8px;">No videos found</h3>
                <p style="color: var(--text-muted);">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    videosToShow.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail" loading="lazy">
                <div class="thumbnail-overlay">
                    <div class="play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span>${video.views} views</span>
                    <span class="video-quality">HD ${video.quality}p</span>
                    <span>SUB</span>
                </div>
            </div>
        `;
        
        videoCard.addEventListener('click', () => openVideoModal(video));
        videoGrid.appendChild(videoCard);
    });
}

// Initialize pagination
function initializePagination() {
    paginationList.innerHTML = '';
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
    
    if (totalPages <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
        const prevItem = document.createElement('li');
        prevItem.className = 'pagination-item';
        prevItem.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevItem.addEventListener('click', () => {
            currentPage--;
            renderVideos();
            initializePagination();
        });
        paginationList.appendChild(prevItem);
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `pagination-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            renderVideos();
            initializePagination();
        });
        paginationList.appendChild(pageItem);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextItem = document.createElement('li');
        nextItem.className = 'pagination-item';
        nextItem.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextItem.addEventListener('click', () => {
            currentPage++;
            renderVideos();
            initializePagination();
        });
        paginationList.appendChild(nextItem);
    }
}

// Open video modal
function openVideoModal(video) {
    document.getElementById('modalVideoTitle').textContent = video.title;
    document.getElementById('modalVideoViews').textContent = `${video.views} views`;
    document.getElementById('modalVideoQuality').textContent = `HD ${video.quality}p`;
    document.getElementById('modalVideoSub').textContent = 'SUB';
    
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open login modal
function openLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close login modal
function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeVideoModal);
    closeLoginModal.addEventListener('click', closeLoginModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
        if (e.target === loginModal) closeLoginModal();
    });
    
    // Button events
    loginBtn.addEventListener('click', openLoginModal);
    exploreBtn.addEventListener('click', () => {
        document.querySelector('.video-grid').scrollIntoView({ behavior: 'smooth' });
    });
    subscribeBtn.addEventListener('click', () => {
        showNotification('Subscription feature coming soon!');
    });
    
    // Category filter
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.currentTarget.dataset.category;
            
            // Toggle active state
            document.querySelectorAll('.category-link').forEach(item => {
                item.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Filter videos
            if (category) {
                filteredVideos = videoData.filter(video => video.category === category);
            } else {
                filteredVideos = [...videoData];
            }
            
            currentPage = 1;
            renderVideos();
            initializePagination();
        });
    });
    
    // Tag filter
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedTag = e.currentTarget.dataset.tag;
            
            // Toggle active state
            document.querySelectorAll('.tag').forEach(item => {
                item.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Filter videos by tag
            filteredVideos = videoData.filter(video => 
                video.tags.includes(selectedTag)
            );
            
            currentPage = 1;
            renderVideos();
            initializePagination();
        });
    });
    
    // Quality filter
    document.getElementById('qualityFilter').addEventListener('change', (e) => {
        applyFilters();
    });
    
    // Language filter
    document.getElementById('languageFilter').addEventListener('change', (e) => {
        applyFilters();
    });
    
    // Subtitle filter
    document.getElementById('subtitleFilter').addEventListener('change', (e) => {
        applyFilters();
    });
    
    // Window resize for responsive grid
    window.addEventListener('resize', updateGridColumns);
}

// Apply all filters
function applyFilters() {
    const qualityFilter = document.getElementById('qualityFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const subtitleFilter = document.getElementById('subtitleFilter').value;
    
    filteredVideos = videoData.filter(video => {
        const qualityMatch = qualityFilter === 'all' || video.quality === qualityFilter;
        const languageMatch = languageFilter === 'all' || video.language === languageFilter;
        const subtitleMatch = subtitleFilter === 'all' || video.subtitle === subtitleFilter;
        
        return qualityMatch && languageMatch && subtitleMatch;
    });
    
    currentPage = 1;
    renderVideos();
    initializePagination();
}

// Update grid columns based on screen size
function updateGridColumns() {
    const grid = document.querySelector('.video-grid');
    const width = window.innerWidth;
    
    if (width < 576) {
        grid.style.gridTemplateColumns = '1fr';
    } else if (width < 768) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (width < 992) {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (width < 1200) {
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
        closeLoginModal();
    }
});
