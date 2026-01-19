document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Feed Calculator Logic
    const feedForm = document.getElementById('calc-form');
    const biomassInput = document.getElementById('biomass');
    const percentageSelect = document.getElementById('percentage');
    const feedResultContainer = document.getElementById('result-container');
    const resultGram = document.getElementById('result-gram');
    const resultKg = document.getElementById('result-kg');

    feedForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const biomass = parseFloat(biomassInput.value);
        const percentage = parseFloat(percentageSelect.value);

        if (isNaN(biomass) || isNaN(percentage)) return;

        const feedKg = biomass * percentage;
        const feedGram = feedKg * 1000;

        resultGram.textContent = Math.round(feedGram).toLocaleString('id-ID');
        resultKg.textContent = feedKg.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 });

        feedResultContainer.classList.remove('hidden');
        feedResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // FCR Calculator Logic
    const fcrForm = document.getElementById('fcr-form');
    const totalFeedInput = document.getElementById('total-feed');
    const totalFishInput = document.getElementById('total-fish');
    const fcrResultContainer = document.getElementById('fcr-result-container');
    const resultFcr = document.getElementById('result-fcr');
    const fcrCalcDisplay = document.getElementById('fcr-calculation-display');
    const fcrStatus = document.getElementById('fcr-status');

    fcrForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const totalFeed = parseFloat(totalFeedInput.value);
        const totalFish = parseFloat(totalFishInput.value);

        if (isNaN(totalFeed) || isNaN(totalFish) || totalFish === 0) return;

        const fcr = totalFeed / totalFish;

        // Update display
        resultFcr.textContent = fcr.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
        fcrCalcDisplay.textContent = `FCR = ${totalFeed} kg / ${totalFish} kg = ${fcr.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}`;

        // Status Logic
        if (fcr <= 1.5) {
            fcrStatus.textContent = 'Sangat Baik';
            fcrStatus.className = 'fcr-status-badge';
        } else if (fcr <= 1.8) {
            fcrStatus.textContent = 'Normal';
            fcrStatus.className = 'fcr-status-badge';
        } else if (fcr <= 2.2) {
            fcrStatus.textContent = 'Kurang Efisien';
            fcrStatus.className = 'fcr-status-badge warning';
        } else {
            fcrStatus.textContent = 'Pemborosan Pakan';
            fcrStatus.className = 'fcr-status-badge danger';
        }

        fcrResultContainer.classList.remove('hidden');
        fcrResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});
