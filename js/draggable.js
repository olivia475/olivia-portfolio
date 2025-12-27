const cards = document.querySelectorAll('.card');

// Define positions for different breakpoints
const positionSets = {
    large: [ 
        { left: '55rem', top: '15rem' },
        { left: '6rem', top: '19rem' },
        { left: '30rem', top: '9rem' },
        { left: '10rem', top: '33rem' },
    ],
    largermed: [ 
        { left: '40rem', top: '15rem' },
        { left: '6rem', top: '19rem' },
        { left: '30rem', top: '9rem' }, 
        { left: '10rem', top: '33rem' },
    ],
    largemed: [ 
        { left: '3rem', top: '30rem' },
        { left: '6rem', top: '19rem' },
        { left: '30rem', top: '9rem' }, 
        { left: '35rem', top: '24rem' },
    ],
    medium: [ 
        { left: '10rem', top: '20rem' },
        { left: '3rem', top: '33rem' },
        { left: '24rem', top: '12rem' },
        { left: '7rem', top: '35rem' },
    ],
    small: [ 
        { left: '2rem', top: '45rem' },
        { left: '2rem', top: '20rem' },
        { left: '6rem', top: '19rem' },
        { left: '7rem', top: '35rem' },
    ],
    smaller: [ 
        { left: '2.5rem', top: '40rem' },
        { left: '2rem', top: '20rem' }, //discard
        { left: '2.5rem', top: '17rem' },
        { left: '7rem', top: '33rem' }, 
    ],
    iphone: [ 
        { left: '2.5rem', top: '35rem' },
        { left: '2rem', top: '20rem' }, //discard
        { left: '2.5rem', top: '17rem' },
        { left: '9rem', top: '29rem' }, 
    ]
};

// Function to get current breakpoint
function getBreakpoint() {
    const width = window.innerWidth;
    if (width > 1500) return 'large';
    if (width > 1120) return 'largermed';
    if (width > 1000) return 'largemed';
    if (width > 800) return 'medium';
    if (width > 550) return 'small';
    if (width > 480) return 'smaller';
    return 'iphone';
}

// Function to set card positions based on breakpoint
function setCardPositions() {
    const breakpoint = getBreakpoint();
    const positions = positionSets[breakpoint];
    
    cards.forEach((card, index) => {
        card.style.left = positions[index].left;
        card.style.top = positions[index].top;
    });
}

// Apply initial positions
setCardPositions();

// Track last breakpoint to avoid unnecessary updates
let lastBreakpoint = getBreakpoint();

window.addEventListener('resize', () => {
    const currentBreakpoint = getBreakpoint();
    if (currentBreakpoint !== lastBreakpoint) {
        setCardPositions();
        lastBreakpoint = currentBreakpoint;
    }
});

// Dragging variables
let activeCard = null;
let offsetX, offsetY;
let startX, startY;
let isDragging = false;
const dragThreshold = 5;

cards.forEach(card => {
    card.addEventListener('mousedown', (e) => {
        activeCard = card;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = card.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        card.style.zIndex = 1001;
    });
});

document.addEventListener('mousemove', (e) => {
    if (activeCard && isDragging) {
        // Calculate new position
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY + window.scrollY; // Add scroll offset for vertical position
        
        // Apply position without any constraints
        activeCard.style.left = x + 'px';
        activeCard.style.top = y + 'px';
    } else if (activeCard) {
        // Check if mouse moved beyond threshold
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);
        
        if (deltaX > dragThreshold || deltaY > dragThreshold) {
            isDragging = true;
        }
    }
});

document.addEventListener('mouseup', () => {
    if (activeCard) {
        activeCard.style.zIndex = 1000;
        activeCard = null;
        isDragging = false;
    }
});