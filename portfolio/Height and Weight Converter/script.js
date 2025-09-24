// DOM Elements
const weightInput = document.getElementById('weight-input');
const weightFromUnit = document.getElementById('weight-from-unit');
const heightInput = document.getElementById('height-input');
const heightFromUnit = document.getElementById('height-from-unit');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const clearBtn = document.getElementById('clear-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const converterSections = document.querySelectorAll('.converter-section');

// Weight result elements
const kgResult = document.getElementById('kg-result');
const lbsResult = document.getElementById('lbs-result');
const gResult = document.getElementById('g-result');
const ozResult = document.getElementById('oz-result');
const stoneResult = document.getElementById('stone-result');
const tonResult = document.getElementById('ton-result');

// Height result elements
const cmResult = document.getElementById('cm-result');
const mResult = document.getElementById('m-result');
const inResult = document.getElementById('in-result');
const ftResult = document.getElementById('ft-result');
const mmResult = document.getElementById('mm-result');
const ydResult = document.getElementById('yd-result');
const feetInchesResult = document.getElementById('feet-inches-result');

// Weight conversion factors (to kg)
const weightConversions = {
    kg: 1,
    lbs: 0.453592,
    g: 0.001,
    oz: 0.0283495,
    stone: 6.35029,
    ton: 1000
};

// Height conversion factors (to cm)
const heightConversions = {
    cm: 1,
    m: 100,
    in: 2.54,
    ft: 30.48,
    mm: 0.1,
    yd: 91.44
};

// Event Listeners
weightInput.addEventListener('input', convertWeight);
weightFromUnit.addEventListener('change', convertWeight);
heightInput.addEventListener('input', convertHeight);
heightFromUnit.addEventListener('change', convertHeight);
clearBtn.addEventListener('click', clearAll);

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        switchTab(tabName);
    });
});

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update converter sections
    converterSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${tabName}-converter`) {
            section.classList.add('active');
        }
    });

    hideError();
}

// Weight conversion function
function convertWeight() {
    const inputValue = parseFloat(weightInput.value);
    const fromUnit = weightFromUnit.value;

    if (isNaN(inputValue) || inputValue < 0) {
        if (weightInput.value !== '') {
            showError('Please enter a valid positive number for weight!');
        } else {
            hideError();
            clearWeightResults();
        }
        return;
    }

    hideError();

    // Convert input to kg first
    const valueInKg = inputValue * weightConversions[fromUnit];

    // Convert from kg to all other units
    kgResult.textContent = formatNumber(valueInKg);
    lbsResult.textContent = formatNumber(valueInKg / weightConversions.lbs);
    gResult.textContent = formatNumber(valueInKg / weightConversions.g);
    ozResult.textContent = formatNumber(valueInKg / weightConversions.oz);
    stoneResult.textContent = formatNumber(valueInKg / weightConversions.stone);
    tonResult.textContent = formatNumber(valueInKg / weightConversions.ton);

    // Add animation to results
    animateResults('.converter-section.active .result-card');
}

// Height conversion function
function convertHeight() {
    const inputValue = parseFloat(heightInput.value);
    const fromUnit = heightFromUnit.value;

    if (isNaN(inputValue) || inputValue < 0) {
        if (heightInput.value !== '') {
            showError('Please enter a valid positive number for height!');
        } else {
            hideError();
            clearHeightResults();
        }
        return;
    }

    hideError();

    // Convert input to cm first
    const valueInCm = inputValue * heightConversions[fromUnit];

    // Convert from cm to all other units
    cmResult.textContent = formatNumber(valueInCm);
    mResult.textContent = formatNumber(valueInCm / heightConversions.m);
    inResult.textContent = formatNumber(valueInCm / heightConversions.in);
    ftResult.textContent = formatNumber(valueInCm / heightConversions.ft);
    mmResult.textContent = formatNumber(valueInCm / heightConversions.mm);
    ydResult.textContent = formatNumber(valueInCm / heightConversions.yd);

    // Calculate feet and inches
    const totalInches = valueInCm / heightConversions.in;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    feetInchesResult.textContent = `${feet}' ${formatNumber(inches)}"`;

    // Add animation to results
    animateResults('.converter-section.active .result-card');
}

// Format numbers for display
function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.01) return num.toExponential(2);
    if (num < 1) return num.toFixed(4);
    if (num < 100) return num.toFixed(2);
    if (num < 10000) return num.toFixed(1);
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// Clear all inputs and results
function clearAll() {
    weightInput.value = '';
    heightInput.value = '';
    clearWeightResults();
    clearHeightResults();
    hideError();
    
    // Add clear animation
    const allCards = document.querySelectorAll('.result-card');
    allCards.forEach(card => {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.5';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, 200);
    });
}

// Clear weight results
function clearWeightResults() {
    kgResult.textContent = '0';
    lbsResult.textContent = '0';
    gResult.textContent = '0';
    ozResult.textContent = '0';
    stoneResult.textContent = '0';
    tonResult.textContent = '0';
}

// Clear height results
function clearHeightResults() {
    cmResult.textContent = '0';
    mResult.textContent = '0';
    inResult.textContent = '0';
    ftResult.textContent = '0';
    mmResult.textContent = '0';
    ydResult.textContent = '0';
    feetInchesResult.textContent = '0\' 0"';
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        hideError();
    }, 3000);
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('show');
}

// Animate result cards
function animateResults(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '';
            }, 200);
        }, index * 50);
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    clearWeightResults();
    clearHeightResults();
    
    // Focus on the first input
    weightInput.focus();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        clearAll();
    }
    
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        const activeTab = document.querySelector('.tab-btn.active');
        const nextTab = activeTab.dataset.tab === 'weight' ? 'height' : 'weight';
        switchTab(nextTab);
    }
});
