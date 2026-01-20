/* Particles */
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}
createParticles();

/* Upload Handler */
function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) return;

    // Show loading
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const uploadZone = document.querySelector('.upload-zone');
    
    uploadZone.style.display = 'none';
    loading.style.display = 'block';
    results.style.display = 'none';
    
    // Simulate "Scanning" phases
    const loadingText = loading.querySelector('.loading-text');
    const phases = [
        "INITIALIZING NEURAL NETWORK...",
        "PREPROCESSING IMAGERY...",
        "EXTRACTING DEEP FEATURES...",
        "ANALYZING RETINAL STRUCTURE...",
        "CALCULATING DIAGNOSTIC PROBABILITIES..."
    ];
    
    let phaseIndex = 0;
    const phaseInterval = setInterval(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        loadingText.textContent = phases[phaseIndex];
    }, 800);

    const formData = new FormData();
    formData.append('file', file);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(phaseInterval);
        loading.style.display = 'none';
        
        if (data.success) {
            displayResults(data);
        } else {
            alert('Error: ' + data.error);
            uploadZone.style.display = 'block';
        }
    })
    .catch(error => {
        clearInterval(phaseInterval);
        alert('Error: ' + error);
        loading.style.display = 'none';
        uploadZone.style.display = 'block';
    });
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.style.display = 'block';
    
    // --- 1. Diagnosis Panel ---
    document.getElementById('predictionClass').textContent = data.predicted_class;
    
    // Animate Confidence Number
    animateValue('confidenceValue', 0, data.confidence, 1500, 1, '%');
    
    const circumference = 2 * Math.PI * 45; // r=45
    const offset = circumference - ((data.confidence / 100) * circumference);
    const circle = document.getElementById('mainConfidenceCircle');
    circle.style.strokeDashoffset = offset;
    
    // Colorize based on Main Class
    const predictionClassElem = document.getElementById('predictionClass');
    if (data.predicted_class === 'NORMAL') {
        predictionClassElem.style.color = '#74ee15'; // Green
        circle.style.stroke = '#74ee15';
    } else {
        predictionClassElem.style.color = '#f000ff'; // Accent/Magenta
        circle.style.stroke = '#f000ff';
    }

    // --- 2. Images Panel ---
    document.getElementById('originalImg').src = 'data:image/png;base64,' + data.images.original;
    document.getElementById('heatmapImg').src = 'data:image/png;base64,' + data.images.heatmap;

    // --- 3. Severity Banner ---
    const sevInfo = data.severity_info;
    const sevBanner = document.getElementById('severityBanner');
    const sevTitle = document.getElementById('severityTitle');
    const sevDesc = document.getElementById('severityDesc');
    const riskScore = document.getElementById('riskScore');

    sevTitle.textContent = `SEVERITY: ${sevInfo.level.toUpperCase()}`;
    sevDesc.textContent = sevInfo.description;
    riskScore.textContent = `${sevInfo.risk_score}/100`;

    // Dynamic Banner Styling
    sevBanner.style.background = `${sevInfo.color}15`; // 15 = low opacity hex
    sevBanner.style.borderColor = `${sevInfo.color}40`;
    sevTitle.style.color = sevInfo.color;
    riskScore.style.color = sevInfo.color;

    // --- 4. GLCM Features ---
    const glcmContainer = document.getElementById('glcmControls');
    glcmContainer.innerHTML = '';
    
    Object.entries(data.glcm_features).forEach(([name, value]) => {
        const valPercent = Math.min((value / 300) * 100, 100); // Normalize roughly
        const row = document.createElement('div');
        row.className = 'feature-row';
        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="color: var(--text-muted); font-size: 0.9rem;">${name}</span>
                <span style="font-family: 'Space Grotesk';">${value.toFixed(2)}</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${valPercent}%"></div>
            </div>
        `;
        glcmContainer.appendChild(row);
    });

    // --- 5. Differential Diagnosis (Probabilities) ---
    const probList = document.getElementById('probList');
    probList.innerHTML = '';
    
    // Sort probs
    const sortedProbs = Object.entries(data.all_probabilities)
        .sort(([,a], [,b]) => b - a);

    sortedProbs.forEach(([cls, prob]) => {
        if (prob < 1) return; // Skip tiny probs
        
        const row = document.createElement('div');
        row.className = 'feature-row';
        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span style="font-weight: 600; color: ${cls === data.predicted_class ? 'var(--primary)' : 'white'}">${cls}</span>
                <span>${prob.toFixed(1)}%</span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill" style="width: ${prob}%; background: ${cls === data.predicted_class ? 'var(--primary)' : 'var(--text-muted)'}"></div>
            </div>
        `;
        probList.appendChild(row);
    });

    // --- 6. Medical Insights ---
    const dInfo = data.disease_info;
    
    function populate(id, items) {
        document.getElementById(id).innerHTML = items.map(i => `<li>${i}</li>`).join('');
    }
    
    populate('symptomsList', dInfo.symptoms);
    populate('causesList', dInfo.causes);
    populate('treatmentList', dInfo.treatment);
    populate('lifestyleList', dInfo.lifestyle);

    // Scroll to results
    setTimeout(() => {
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function animateValue(id, start, end, duration, decimals = 0, suffix = '') {
    const obj = document.getElementById(id);
    const range = end - start;
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round((end - (remaining * range)) * 100) / 100; // rough step
        
        if (decimals === 0) {
            obj.innerHTML = Math.round(value) + suffix;
        } else {
            obj.innerHTML = value.toFixed(decimals) + suffix;
        }
        
        if (now >= endTime) {
            clearInterval(timer);
        }
    }, 16);
}