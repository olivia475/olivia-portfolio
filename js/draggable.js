const card = document.getElementById('draggableCard');
const cardSpace = document.querySelector('.card-space');

// Center the card initially within the card-space
function centerCard() {
    const spaceRect = cardSpace.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    card.style.left = (spaceRect.width - cardRect.width) / 2 + 'px';
    card.style.top = (spaceRect.height - cardRect.height) / 2 + 'px';
}

centerCard();

let isDragging = false;
let offsetX, offsetY;

card.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = card.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const spaceRect = cardSpace.getBoundingClientRect();
        const x = e.clientX - offsetX - spaceRect.left;
        const y = e.clientY - offsetY - spaceRect.top;
        
        // Keep card within card-space bounds
        const maxX = spaceRect.width - card.offsetWidth;
        const maxY = spaceRect.height - card.offsetHeight;
        
        card.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        card.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Recenter card if window is resized
window.addEventListener('resize', centerCard);