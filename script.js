document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU TOGGLE
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-menu');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle the 'active' class on the menu
            navLinks.classList.toggle('active');
            
            // Toggle icon between ☰ and ✕
            if (navLinks.classList.contains('active')) {
                hamburger.textContent = '✕';
            } else {
                hamburger.textContent = '☰';
            }
        });
    }

    // 2. BACKGROUND ANIMATION (Only runs if on Home Page)
    if (document.getElementById('bg-animation')) {
        createShapes();
    }

    // 3. RESEARCH LOADER (Only runs if on Research Page)
    if (document.getElementById('research-list')) {
        loadResearch();
    }
});

function createShapes() {
    const container = document.getElementById('bg-animation');
    const shapeCount = 10; // Reduced count for mobile performance

    for (let i = 0; i < shapeCount; i++) {
        let shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Randomize
        let size = Math.random() * 50 + 20; 
        let posX = Math.random() * 100; 
        let delay = Math.random() * 15; 
        let duration = Math.random() * 10 + 10; 
        let isCircle = Math.random() > 0.5;

        shape.style.width = size + "px";
        shape.style.height = size + "px";
        shape.style.left = posX + "%";
        shape.style.borderRadius = isCircle ? "50%" : "0";
        shape.style.animationDelay = delay + "s";
        shape.style.animationDuration = duration + "s";

        container.appendChild(shape);
    }
}

async function loadResearch() {
    const container = document.getElementById('research-list');
    
    try {
        const response = await fetch('research.json');
        const articles = await response.json();

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <div class="article-date">${article.date}</div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-snippet">${article.content}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = "<p>Loading...</p>";
    }
}