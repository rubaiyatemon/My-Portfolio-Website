// ===================================
// ROTATING TAGLINE
// ===================================
// ===================================
// TYPEWRITER EFFECT
// ===================================
const taglineElement = document.getElementById('rotating-tagline');
const phrases = [
    "Building End-to-End ML Pipelines",
    "Deploying Scalable AI Models",
    "Optimizing Inference Latency",
    "Architecting MLOps Infrastructure"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    if (!taglineElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting
    } else {
        taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start the loop
document.addEventListener('DOMContentLoaded', typeWriter);

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ===================================
// THEME CONTROLLER (Default Dark)
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    // Default to dark if no preference is saved
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Dynamic feedback for the toggle button itself if needed
        console.log(`Theme switched to: ${newTheme}`);
    });
}

// Initialize on load
initTheme();

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// PROJECT FILTERING
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Cyberpunk Decrypt Transition
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isMatched = filterValue === 'all' || filterValue === category;

            if (isMatched) {
                card.style.display = 'block';
                const anim = card.animate([
                    { opacity: 0, transform: 'translateY(10px) scale(0.95)', filter: 'blur(5px)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
                });
                anim.onfinish = () => {
                    // Clear inline styles so CSS :hover transforms can work
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.filter = '';
                };
            } else {
                const anim = card.animate([
                    { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' },
                    { opacity: 0, transform: 'scale(0.9) translateY(10px)', filter: 'blur(10px)' }
                ], {
                    duration: 300,
                    easing: 'ease-in'
                });
                anim.onfinish = () => {
                    card.style.display = 'none';
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.filter = '';
                };
            }
        });
    });
});

// ===================================
// PROJECT MODAL
// ===================================
const projectData = {
    fraud: {
        title: 'Real-Time Fraud Detection System',
        tag: 'Speed & Reliability',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
        situation: 'Designed and deployed a low-latency fraud detection API to process 10,000+ transactions per second with a sub-150ms P95 latency requirement, necessitating zero-downtime updates.',
        actions: [
            {
                title: 'Streaming Ingestion',
                description: 'Built a Kafka producer/consumer pipeline to simulate real-time transaction streams (Modules 85-90).'
            },
            {
                title: 'Feature Management',
                description: 'Implemented <strong>Feast</strong> as the feature store to ensure consistency between training (historical batch) and serving (real-time) features, eliminating training-serving skew (Modules 31-35).'
            },
            {
                title: 'Model Lifecycle',
                description: 'Used <strong>MLflow</strong> for experiment tracking, model registry, and stage transitions (v1 → Staging → Production) (Modules 36-41).'
            },
            {
                title: 'Serving & Deployment',
                description: 'Containerized a Scikit-Learn/LightGBM model with <strong>FastAPI</strong>. Implemented a <strong>Blue/Green deployment</strong> strategy on <strong>AWS EC2</strong> (using an Application Load Balancer) to switch traffic with zero downtime (Modules 95-99).'
            },
            {
                title: 'Observability & Drift',
                description: 'Integrated <strong>Prometheus</strong> for metrics (latency, throughput, error rate) and <strong>Grafana</strong> for dashboards. Set up automated <strong>Evidently AI</strong> reports to monitor data drift, triggering alerts and initiating retraining pipelines (Modules 96-97).'
            }
        ],
        results: [
            'Achieved sustained P95 latency of <120ms',
            'Reduced false positives by 18% through iterative A/B testing',
            'Enabled seamless model updates with no service interruption'
        ],
        reflection: '"This project mirrored designing a high-precision sensor system. Latency was a non-negotiable constraint, similar to a tolerance spec. The Blue/Green deployment was the \'fail-safe\' mechanism, and drift monitoring was the \'predictive maintenance\' schedule for the model."'
    },
    recommendation: {
        title: 'Scalable Recommendation Engine',
        tag: 'Distributed Scale',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path></svg>`,
        situation: 'Built a personalized news recommendation system requiring training on a 100GB+ dataset and serving with autoscaling to handle variable user load.',
        actions: [
            {
                title: 'Orchestration Foundation',
                description: 'Provisioned an <strong>EKS (Kubernetes)</strong> cluster using <strong>Terraform</strong> (IaC). Managed pods, services, and ingress for all components (Modules 68-71).'
            },
            {
                title: 'Distributed Training',
                description: 'Used <strong>Ray Train</strong> to parallelize XGBoost/Neural Collaborative Filtering training across a cluster of GPU/CPU nodes, reducing training time by 70% (Modules 72-73).'
            },
            {
                title: 'Hyperparameter Tuning',
                description: 'Scaled the hyperparameter search using <strong>Ray Tune</strong>, efficiently exploring a 50+ parameter space (Module 74).'
            },
            {
                title: 'Model Serving',
                description: 'Deployed the best model as a <strong>Ray Serve</strong> application on the same EKS cluster, configuring auto-scaling based on request queue length (Modules 75-76).'
            },
            {
                title: 'Pipeline Orchestration',
                description: 'Wrote and scheduled the full retraining pipeline (data prep → Ray Train → Ray Tune → model promotion) using <strong>Kubeflow Pipelines</strong> (Modules 59-67).'
            }
        ],
        results: [
            'Scalable training and serving pipeline capable of handling 10x dataset growth',
            'Serving layer autoscales from 2 to 15 pods based on traffic',
            'Optimized cloud costs through elastic infrastructure'
        ],
        reflection: '"This was about designing for \'load\' and \'stress.\' Just as a mechanical structure is tested under varying loads, this system was architected to scale elastically under variable inference demand."'
    },
    llm: {
        title: 'Enterprise LLM & RAG Platform',
        tag: 'GenAI System',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
        situation: 'Developed a Retrieval-Augmented Generation (RAG) system to ground an LLM on a private corpus of engineering documents (500k+ PDFs), improving answer accuracy and reducing hallucinations.',
        actions: [
            {
                title: 'Data Pipeline',
                description: 'Built a document processing pipeline using <strong>LangChain</strong> for chunking, <strong>sentence-transformers</strong> for embeddings, and <strong>Qdrant</strong> (vector database on Kubernetes) for efficient similarity search (Modules 109-112).'
            },
            {
                title: 'Model Fine-Tuning',
                description: 'Fine-tuned a <strong>RoBERTa</strong> model for embedding relevance using <strong>LoRA</strong> (Parameter-Efficient Fine-Tuning) via the <strong>Hugging Face</strong> peft library (Module 113).'
            },
            {
                title: 'Core Architecture Understanding',
                description: 'Implemented a custom <strong>Transformer encoder block from scratch in PyTorch</strong> (including multi-head attention, layer norm) to demonstrate foundational knowledge.'
            },
            {
                title: 'Serving & Caching',
                description: 'Served the fine-tuned embedding model and a quantized Llama-2 chat model via <strong>Ray Serve</strong>. Used <strong>Redis</strong> for caching frequent query-embedding pairs to reduce latency (Modules 114-115).'
            },
            {
                title: 'Evaluation & Monitoring',
                description: 'Set up a rigorous evaluation pipeline using <strong>ragas</strong> for metrics (Faithfulness, Answer Relevance) and logged all prompts/completions to <strong>MLflow</strong> for quality tracking (Modules 116-117).'
            }
        ],
        results: [
            'RAG system achieved 92% answer faithfulness score on a custom test set',
            '40% improvement over the base LLM',
            'Caching reduced frequent query latency by 60%'
        ],
        reflection: '"Treating the LLM as a \'black box reactor,\' I focused on the input conditioning (retrieval) and output validation (evaluation). It\'s about controlling the system\'s operating parameters to ensure quality output."'
    },
    vision: {
        title: 'Computer Vision for Edge Deployment',
        tag: 'Optimization',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        situation: 'Optimized a YOLOv8 object detection model for high-FPS inference on constrained hardware (simulated edge environment), targeting a 50% reduction in model size and 3x speedup.',
        actions: [
            {
                title: 'Model Optimization',
                description: 'Applied <strong>pruning</strong> (removing insignificant neurons) and <strong>quantization</strong> (FP32 → INT8) using <strong>TensorRT</strong>, rigorously validating mean Average Precision (mAP) drop (Modules 100-103).'
            },
            {
                title: 'Edge Serving',
                description: 'Packaged the optimized model using <strong>Triton Inference Server</strong> (via <strong>KFServing</strong>) with GPU support, enabling dynamic batching (Modules 104-105).'
            },
            {
                title: 'Data Drift for Vision',
                description: 'Implemented statistical monitoring (scikit-image) to detect shifts in input image pixel distributions (brightness, contrast) that could degrade model performance (Module 108).'
            },
            {
                title: 'CI/CD for Models',
                description: 'Created a <strong>GitHub Actions</strong> pipeline that, on a new model version in <strong>MLflow</strong>, automatically built a Docker image, ran validation tests, and deployed to a staging Kubernetes namespace (Modules 106-107).'
            }
        ],
        results: [
            'Achieved a 65% reduction in model size',
            '3.5x inference speedup on a T4 GPU',
            'Maintained mAP within 1.5% of the original model'
        ],
        reflection: '"This is pure mechanical optimization: reducing weight (model size) and friction (latency) while preserving structural integrity (accuracy). Every optimization trade-off was measured and justified."'
    }
};

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Open modal when clicking project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-btn') || e.target.closest('.project-btn')) {
            const projectKey = card.dataset.project;
            const project = projectData[projectKey];

            if (project) {
                showProjectModal(project);
            }
        }
    });
});

function showProjectModal(project) {
    const mainActions = project.actions.slice(0, 2);
    const primaryResult = project.results[0];

    // Card helper with HUD scroll integration
    const createCard = (type, content, extraStyles = '', scrollable = false) => `
        <div class="modal-card modal-${type}-card" ${extraStyles}>
            ${scrollable ? `<div class="card-scroll-area">${content}</div>` : content}
        </div>
    `;

    const situationContent = `
        <span class="card-label">Situation & Task</span>
        <div class="card-scroll-area">
            <p class="card-text">${project.situation}</p>
        </div>
    `;

    const action1Content = `
        <span class="card-label">Action 01</span>
        <h4 class="card-subtitle">${mainActions[0].title}</h4>
        <div class="card-scroll-area">
            <p class="card-text">${mainActions[0].description}</p>
        </div>
    `;

    const action2Content = mainActions[1] ? `
        <span class="card-label">Action 02</span>
        <h4 class="card-subtitle">${mainActions[1].title}</h4>
        <div class="card-scroll-area">
            <p class="card-text">${mainActions[1].description}</p>
        </div>
    ` : '';

    const resultsContent = `
        <span class="card-label">Results</span>
        <h3 class="card-title">${primaryResult.includes('%') || primaryResult.includes('x') ? primaryResult.split(' ')[0] : 'Win'}</h3>
        <p class="card-text">${primaryResult}</p>
    `;

    const reflectionContent = `
        <span class="card-label">Engineering Reflection</span>
        <div class="card-scroll-area">
            <p class="card-text">${project.reflection}</p>
        </div>
    `;

    modalBody.innerHTML = `
        <div class="modal-header-content">
            <div class="modal-icon">${project.icon}</div>
            <span class="modal-tag">${project.tag}</span>
        </div>
        <h2 class="modal-title">${project.title}</h2>
        
        <div class="modal-bento-grid">
            ${createCard('header', situationContent)}
            ${createCard('action', action1Content, 'data-index="01"')}
            ${createCard('results', resultsContent)}
            ${createCard('reflection', reflectionContent)}
            ${action2Content ? createCard('action', action2Content, 'data-index="02"') : ''}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================================
// INTERSECTION OBSERVER (Fade-in on scroll)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Staggered Reveal for Skills
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a slight delay based on wait time if multiple appear at once
            // but the CSS transition will handle the visual part.
            // We'll use a specific class for the staggered reveal.
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
});

// General observer for other elements
document.querySelectorAll('.project-card, .curriculum-module').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--primary-gradient);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ===================================
// TECH BADGE HOVER EFFECT
// ===================================
document.querySelectorAll('.tech-badge, .skill-tag').forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c👋 Hello, Fellow Engineer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code behind this portfolio?', 'color: #b8c1ec; font-size: 14px;');
console.log('%cCheck out the GitHub repo or reach out to discuss ML systems!', 'color: #b8c1ec; font-size: 14px;');

// ===================================
// MOUSE FOLLOWER TITLE EFFECT
// ===================================
const heroTitle = document.querySelector('.hero-title');
const heroName = document.querySelector('.hero-name');
const heroRole = document.querySelector('.hero-role');

if (heroTitle && heroName && heroRole) {
    heroTitle.addEventListener('mousemove', (e) => {
        const rect = heroTitle.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Update gradient position
        heroName.style.setProperty('--x', `${xPercent}%`);
        heroName.style.setProperty('--y', `${yPercent}%`);
        heroRole.style.setProperty('--x', `${xPercent}%`);
        heroRole.style.setProperty('--y', `${yPercent}%`);

        // Calculate tilt
        const xRotation = ((y / rect.height) - 0.5) * -10; // Rotate X based on Y axis
        const yRotation = ((x / rect.width) - 0.5) * 10;   // Rotate Y based on X axis

        heroName.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        heroRole.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    heroTitle.addEventListener('mouseleave', () => {
        // Reset gradient to center
        heroName.style.setProperty('--x', '50%');
        heroName.style.setProperty('--y', '50%');
        heroRole.style.setProperty('--x', '50%');
        heroRole.style.setProperty('--y', '50%');

        // Reset transform
        heroName.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        heroRole.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===================================
// GLOBAL SPOTLIGHT EFFECT
// ===================================
// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Simulate API call
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        } else {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
        }
    });
}

// ===================================
// LIVE GITHUB ACTIVITY
// ===================================
const githubFeed = document.getElementById('github-feed');

async function fetchGitHubActivity() {
    if (!githubFeed) return;

    const repos = [
        { name: 'apache/kafka', label: 'Kafka' },
        { name: 'mlflow/mlflow', label: 'MLflow' },
        { name: 'kubernetes/kubernetes', label: 'Kubernetes' },
        { name: 'tiangolo/fastapi', label: 'FastAPI' },
        { name: 'ray-project/ray', label: 'Ray' }
    ];

    try {
        // Fetch latest commit from each repo in parallel
        const requests = repos.map(repo =>
            fetch(`https://api.github.com/repos/${repo.name}/commits?per_page=1`)
                .then(res => res.ok ? res.json() : null)
                .then(data => data ? { ...repo, commit: data[0] } : null)
        );

        const results = await Promise.all(requests);
        const activeResults = results.filter(r => r && r.commit);

        // Sort by date descending
        activeResults.sort((a, b) =>
            new Date(b.commit.commit.author.date) - new Date(a.commit.commit.author.date)
        );

        const commitsHTML = activeResults.slice(0, 3).map(res => {
            const date = new Date(res.commit.commit.author.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            const message = res.commit.commit.message.split('\n')[0];

            return `
                <div class="commit-card">
                    <div>
                        <div class="commit-message">${message}</div>
                        <div class="commit-date">${date}</div>
                    </div>
                    <div class="commit-repo">${res.label}</div>
                </div>
            `;
        }).join('');

        githubFeed.innerHTML = commitsHTML || '<p>No recent activity found.</p>';

    } catch (error) {
        githubFeed.innerHTML = '<p class="error-msg">Unable to load recent activity. Check back later.</p>';
        console.error('GitHub Fetch Error:', error);
    }
}

// Fetch on load
document.addEventListener('DOMContentLoaded', fetchGitHubActivity);

// ===================================
// GLOBAL SPOTLIGHT EFFECT & CUSTOM CURSOR
// ===================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Custom Cursor
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;

        // Simple delay for outline is handled by CSS transition
        cursorOutline.style.left = `${x}px`;
        cursorOutline.style.top = `${y}px`;
    }

    // Spotlight
    document.body.style.setProperty('--mouse-x', `${(x / window.innerWidth) * 100}%`);
    document.body.style.setProperty('--mouse-y', `${(y / window.innerHeight) * 100}%`);
});

// Hover effects for cursor
if (window.matchMedia("(pointer: fine)").matches) {
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-tag, .module-header, .skill-category, .curriculum-module, .modal-close');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// ===================================
// MAGNETIC INTERACTIONS (Nav Links & Project Buttons)
// ===================================
const magneticElements = document.querySelectorAll('.nav-link, .project-btn');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / 2.5; // Slightly stiffer magnetic pull
        const deltaY = (y - centerY) / 2.5;

        el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ===================================
// THEME TOGGLE
// ===================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            localStorage.setItem('theme', '');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    });
}

// ===================================
// HACKER LOGO EFFECT (Scramble)
// ===================================
const logoText = document.querySelector('.logo-text');
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$^*";
let interval = null;

function scrambleLogo() {
    if (!logoText) return;

    let iteration = 0;
    clearInterval(interval);

    const originalValue = logoText.dataset.value;

    interval = setInterval(() => {
        logoText.innerText = logoText.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalValue[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= originalValue.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

// Scramble on hover
if (logoText) {
    logoText.parentElement.addEventListener('mouseenter', scrambleLogo);
    // Initial scramble on load
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(scrambleLogo, 500);
    });
}

// ===================================
// HERO TETRIS REVEAL
// ===================================
class HeroTetris {
    constructor() {
        this.stage = document.getElementById('tetris-hero-stage');
        this.overlay = document.getElementById('ml-status-overlay');
        this.finalContent = document.getElementById('hero-visual-content');
        if (!this.stage) return;

        this.cols = 10;
        this.rows = 16;
        this.blocksProcessed = 0;
        this.shapes = {
            'i': { blocks: [[0, 0], [1, 0], [2, 0], [3, 0]], color: 'i' },
            'j': { blocks: [[0, 0], [0, 1], [1, 1], [2, 1]], color: 'j' },
            'l': { blocks: [[0, 1], [1, 1], [2, 1], [2, 0]], color: 'l' },
            'o': { blocks: [[0, 0], [1, 0], [0, 1], [1, 1]], color: 'o' },
            's': { blocks: [[1, 0], [2, 0], [0, 1], [1, 1]], color: 's' },
            'z': { blocks: [[0, 0], [1, 0], [1, 1], [2, 1]], color: 'z' },
            't': { blocks: [[1, 0], [0, 1], [1, 1], [2, 1]], color: 't' }
        };

        this.sequence = [
            { type: 'o', label: 'AWS', x: 0, targetY: 14 },
            { type: 'i', label: 'K8S', x: 2, targetY: 15 },
            { type: 'j', label: 'DOCKER', x: 8, targetY: 14 },
            { type: 't', label: 'TRT', x: 4, targetY: 11 },
            { type: 'i', label: 'TF', x: 0, targetY: 13 },
            { type: 'o', label: 'SPARK', x: 4, targetY: 13 },
            { type: 'i', label: 'PYTORCH', x: 6, targetY: 13 }
        ];

        this.init();
    }

    init() {
        setTimeout(() => this.runSequence(), 1000);
    }

    createPiece(item) {
        const piece = [];
        const shapeData = this.shapes[item.type];

        shapeData.blocks.forEach(([bx, by]) => {
            const block = document.createElement('div');
            block.className = `tetris-block shape-${shapeData.color}`;
            block.style.gridColumnStart = item.x + bx + 1;
            block.style.gridRowStart = by + 1;
            if (bx === 0 && by === 0) block.innerText = item.label;
            this.stage.appendChild(block);
            piece.push({ element: block, relX: bx, relY: by });
        });
        return piece;
    }

    async animatePiece(piece, targetX, targetY) {
        return new Promise(resolve => {
            let currentY = 0;
            const fallInterval = setInterval(() => {
                currentY++;
                piece.forEach(p => {
                    p.element.style.gridRowStart = currentY + p.relY + 1;
                });
                if (currentY >= targetY) {
                    clearInterval(fallInterval);
                    resolve();
                }
            }, 60);
        });
    }

    async runSequence() {
        for (const item of this.sequence) {
            const piece = this.createPiece(item);
            await this.animatePiece(piece, item.x, item.targetY);
            this.blocksProcessed++;
        }
        await this.completeLine();
    }

    async completeLine() {
        this.stage.style.boxShadow = '0 0 40px var(--accent-primary)';
        await new Promise(r => setTimeout(r, 500));

        const allBlocks = this.stage.querySelectorAll('.tetris-block');
        allBlocks.forEach((b, i) => {
            setTimeout(() => b.classList.add('vanish-line'), i * 30);
        });

        await new Promise(r => setTimeout(r, 800));
        this.overlay.classList.add('visible');

        // Reveal ending at the status message as requested by deleting the subsequent visual section
        await new Promise(r => setTimeout(r, 2000));

        // Optional: Keep the overlay visible but stop further reveal logic
        // If the user wants the stage to stay, we could keep it, but they said "Main Idea" which usually reveals.
        // For now, we'll keep the status message visible.
    }
}

// Initialize Hero Tetris
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tetris-hero-stage')) {
        new HeroTetris();
    }
});

/**
 * Holographic Tech Cards System
 * Inspired by premium holographic cards with 3D tilt and flip mechanics.
 */
class HoloSkills {
    constructor() {
        this.container = document.getElementById('holo-skills-container');
        if (!this.container) return;

        this.techStack = [
            {
                category: "Cloud & IaC",
                subtitle: "Infrastructure as Code",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
                items: [
                    { name: "AWS (EKS, Sagemaker)", level: "Advanced" },
                    { name: "Terraform", level: "Expert" },
                    { name: "Docker", level: "Expert" },
                    { name: "K8s Networking", level: "Proficient" }
                ]
            },
            {
                category: "MLOps Platforms",
                subtitle: "Scale & Orchestration",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
                items: [
                    { name: "Kubernetes", level: "Expert" },
                    { name: "Kubeflow", level: "Advanced" },
                    { name: "MLflow", level: "Expert" },
                    { name: "Ray (Train/Serve)", level: "Advanced" },
                    { name: "DVC", level: "Proficient" }
                ]
            },
            {
                category: "Data Engineering",
                subtitle: "Real-time Pipelines",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
                items: [
                    { name: "Apache Kafka", level: "Proficient" },
                    { name: "Apache Spark", level: "Advanced" },
                    { name: "Feast", level: "Proficient" },
                    { name: "PostgreSQL", level: "Expert" },
                    { name: "Redis / Qdrant", level: "Advanced" }
                ]
            },
            {
                category: "ML Frameworks",
                subtitle: "Intelligence Layer",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
                items: [
                    { name: "PyTorch", level: "Expert" },
                    { name: "TensorFlow", level: "Advanced" },
                    { name: "Hugging Face", level: "Expert" },
                    { name: "TensorRT", level: "Advanced" },
                    { name: "LLM (RAG)", level: "Expert" }
                ]
            },
            {
                category: "Monitoring",
                subtitle: "Observability",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
                items: [
                    { name: "Prometheus", level: "Advanced" },
                    { name: "Grafana", level: "Expert" },
                    { name: "Evidently AI", level: "Proficient" },
                    { name: "W&B", level: "Advanced" }
                ]
            },
            {
                category: "CI/CD & DevOps",
                subtitle: "Deployment Ops",
                icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
                items: [
                    { name: "GitHub Actions", level: "Expert" },
                    { name: "Git", level: "Master" },
                    { name: "Blue/Green Deploy", level: "Advanced" },
                    { name: "Canary Releases", level: "Advanced" }
                ]
            }
        ];

        this.init();
    }

    init() {
        this.renderCards();
        this.addEventListeners();
        this.setupIntersectionObserver();
    }

    getRandomPercentage(level) {
        const ranges = {
            'Expert': { min: 91, max: 99 },
            'Advanced': { min: 81, max: 90 },
            'Proficient': { min: 73, max: 80 },
            'Intermediate': { min: 50, max: 71 },
            'Basic': { min: 30, max: 49 }
        };
        const range = ranges[level] || { min: 30, max: 99 };
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }

    renderCards() {
        this.container.innerHTML = this.techStack.map((category, index) => `
            <div class="skill-category">
                <div class="holo-card-inner">
                    <!-- Front Side -->
                    <div class="holo-card-front">
                        <div class="holo-card-number">#00${index + 1}</div>
                        <div class="holo-card-type">ML-STACK</div>
                        <div class="holo-front-content">
                            <div class="holo-icon-wrapper">
                                ${category.icon}
                            </div>
                            <h3 class="holo-category-title">${category.category}</h3>
                            <p class="holo-category-subtitle">${category.subtitle}</p>
                            <div class="holo-flip-hint">Click to expand</div>
                        </div>
                    </div>
                    
                    <!-- Back Side -->
                    <div class="holo-card-back">
                        <div class="holo-back-header">
                            <h3 class="holo-back-title">${category.category} Details</h3>
                        </div>
                        <div class="holo-item-list">
                            ${category.items.map(item => {
            const percentage = this.getRandomPercentage(item.level);
            return `
                                <div class="holo-item">
                                    <div class="holo-item-info">
                                        <span class="holo-item-name">${item.name}</span>
                                        <span class="holo-item-pct">${percentage}%</span>
                                    </div>
                                    <div class="holo-item-bar-container">
                                        <div class="holo-item-bar-fill bar-${item.level.toLowerCase()}" style="width: ${percentage}%"></div>
                                    </div>
                                </div>
                            `}).join('')}
                        </div>
                        <div class="holo-flip-hint">Click to return</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addEventListeners() {
        const cards = this.container.querySelectorAll('.skill-category');

        cards.forEach(card => {
            const inner = card.querySelector('.holo-card-inner');

            // Flip Logic (Consolidated in JS to avoid transform conflicts)
            card.addEventListener('click', () => {
                const isFlipped = card.classList.toggle('flipped');
                if (isFlipped) {
                    inner.style.transform = 'rotateY(180deg)';
                } else {
                    inner.style.transform = 'rotateY(0deg)';
                }
            });

            // Interactive Tilt & Holographic logic
            card.addEventListener('mousemove', (e) => {
                // Determine if we're flipped or not to maintain rotation
                const isFlipped = card.classList.contains('flipped');

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Update CSS Variables for Sheen (always active)
                card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--my', `${(y / rect.height) * 100}%`);

                // Tilt logic: only apply tilt if NOT currently flipped
                if (!isFlipped) {
                    const rotateX = (centerY - y) / 10;
                    const rotateY = (x - centerX) / 10;
                    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                const isFlipped = card.classList.contains('flipped');

                // reset to base state (0 or 180)
                if (isFlipped) {
                    inner.style.transform = 'rotateY(180deg)';
                } else {
                    inner.style.transform = 'rotateY(0deg)';
                }

                card.style.setProperty('--mx', '50%');
                card.style.setProperty('--my', '50%');
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.container.querySelectorAll('.skill-category').forEach(card => {
            observer.observe(card);
        });
    }
}


// ===================================
// PIPELINE ARCHITECT (Staff Engineer Edition)
// ===================================
class PipelineArchitect {
    constructor() {
        this.container = document.querySelector('.system-canvas');
        if (!this.container) return;

        this.svg = document.getElementById('hero-pipeline-svg');
        this.terminalBody = document.getElementById('hero-telemetry-logs');

        // Modular Configuration
        this.config = {
            nodes: [
                { id: 'hero-node-ingest', label: 'Ingest', metadata: '📡 gRPC Stream | 1.2GB/s | S3://raw' },
                { id: 'hero-node-feature-store', label: 'Feature Store', metadata: '🗄️ Redis Store | v2.1 | 1024 Features' },
                { id: 'hero-node-train', label: 'Train', metadata: '🧠 A100 Cluster | Epoch: 45 | Loss: 0.042' },
                { id: 'hero-node-registry', label: 'Registry', metadata: '🏷️ MLflow v4.2 | Stage: Staging | 450MB' },
                { id: 'hero-node-deploy', label: 'Deploy', metadata: '🚀 Canary 10% | P99: 12ms | Health: OK' }
            ],
            connections: [
                ['hero-node-ingest', 'hero-node-feature-store'],
                ['hero-node-feature-store', 'hero-node-train'],
                ['hero-node-train', 'hero-node-registry'],
                ['hero-node-registry', 'hero-node-deploy']
            ],
            packetInterval: 1200,
            baseSpeed: 4000
        };

        this.init();
    }

    init() {
        this.setupSVG();
        this.calculatePaths();
        this.initializeInteractions();
        this.startSimulation();
        this.setupResizeHandler();
    }

    setupSVG() {
        // Clear and prepare filter and paths
        this.svg.innerHTML = `
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        `;

        this.config.connections.forEach(([from, to], i) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.classList.add('pipeline-path-glow');
            path.id = `link-${i}`;
            path.setAttribute('data-from', from);
            path.setAttribute('data-to', to);
            this.svg.appendChild(path);
        });
    }

    calculatePaths() {
        const canvasRect = this.container.getBoundingClientRect();
        const paths = this.svg.querySelectorAll('.pipeline-path-glow');

        paths.forEach(path => {
            const fromNode = document.getElementById(path.getAttribute('data-from'));
            const toNode = document.getElementById(path.getAttribute('data-to'));

            if (fromNode && toNode) {
                const fromRect = fromNode.getBoundingClientRect();
                const toRect = toNode.getBoundingClientRect();

                // Vector math for center-points
                const x1 = (fromRect.left + fromRect.right) / 2 - canvasRect.left;
                const y1 = (fromRect.top + fromRect.bottom) / 2 - canvasRect.top;
                const x2 = (toRect.left + toRect.right) / 2 - canvasRect.left;
                const y2 = (toRect.top + toRect.bottom) / 2 - canvasRect.top;

                // Organic Cubic Bezier string
                const dy = Math.abs(y2 - y1) * 0.5;
                const d = `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;

                path.setAttribute('d', d);
            }
        });
    }

    setupResizeHandler() {
        const ro = new ResizeObserver(() => this.calculatePaths());
        ro.observe(this.container);
    }

    initializeInteractions() {
        this.config.nodes.forEach(nodeCfg => {
            const el = document.getElementById(nodeCfg.id);
            if (!el) return;

            el.addEventListener('mouseenter', () => {
                this.glitchTelemetry(nodeCfg.metadata);
                this.highlightPath(nodeCfg.id, true);
            });

            el.addEventListener('mouseleave', () => {
                this.highlightPath(nodeCfg.id, false);
            });
        });
    }

    glitchTelemetry(targetText) {
        const chars = 'ABCDEF0123456789!@#$%^&*()';
        let iteration = 0;
        const originalLogLines = Array.from(this.terminalBody.querySelectorAll('.log-line'));

        // Focus on the last line for the "Glitch Transition"
        const lastLine = originalLogLines[originalLogLines.length - 1];
        if (!lastLine) return;

        // Clear any existing glitch to prevent overlaps
        if (this.telemetryInterval) clearInterval(this.telemetryInterval);

        this.telemetryInterval = setInterval(() => {
            lastLine.innerHTML = `<span class="timestamp">[SYS]</span> ` + targetText
                .split('')
                .map((char, index) => {
                    if (index < Math.floor(iteration)) return targetText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= targetText.length) {
                clearInterval(this.telemetryInterval);
                this.telemetryInterval = null;
                // Final clean render to ensure zero glitch remnants
                lastLine.innerHTML = `<span class="timestamp">[SYS]</span> ${targetText}`;
            }
            iteration += 0.4; // Controlled reveal speed
        }, 30);
    }

    highlightPath(nodeId, active) {
        const paths = this.svg.querySelectorAll('.pipeline-path-glow');
        paths.forEach(p => {
            if (p.getAttribute('data-from') === nodeId || p.getAttribute('data-to') === nodeId) {
                p.classList.toggle('active', active);
            }
        });
    }

    startSimulation() {
        // Continuous Log Feed
        setInterval(() => {
            const logs = [
                "[INFO] Weight checksum verified.",
                "[SYS] Latency P99: 12ms",
                "[WARN] Drift detected in Feature 'x24'",
                "[INFO] Epoch 45 complete. Loss: 0.042",
                "[SYS] Re-sharding Redis cluster..."
            ];
            this.addLog(logs[Math.floor(Math.random() * logs.length)]);
        }, 5000);

        // High-Performance Particle Engine
        const paths = Array.from(this.svg.querySelectorAll('.pipeline-path-glow'));
        setInterval(() => {
            const path = paths[Math.floor(Math.random() * paths.length)];
            this.spawnPacket(path);
        }, this.config.packetInterval);
    }

    spawnPacket(path) {
        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        this.container.appendChild(packet);

        const d = path.getAttribute('d');
        const toNode = path.getAttribute('data-to');

        // Variable Flow: Speed up post-training model delivery
        let duration = this.config.baseSpeed;
        if (toNode === 'hero-node-registry' || toNode === 'hero-node-deploy') duration *= 0.6;

        const anim = packet.animate([
            { offsetDistance: '0%', opacity: 1 },
            { offsetDistance: '100%', opacity: 1 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        packet.style.offsetPath = `path("${d}")`;
        anim.onfinish = () => packet.remove();
    }

    addLog(text) {
        const line = document.createElement('div');
        line.classList.add('log-line');
        const now = new Date();
        const stamp = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}]`;
        line.innerHTML = `<span class="timestamp">${stamp}</span> <span class="log-text">${text}</span>`;
        this.terminalBody.appendChild(line);
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
        if (this.terminalBody.children.length > 12) this.terminalBody.removeChild(this.terminalBody.firstChild);
    }
}

// ===================================
// ABOUT DETAIL MODAL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const aboutDetailBtn = document.getElementById('show-about-details');
    if (aboutDetailBtn) {
        aboutDetailBtn.addEventListener('click', () => {
            if (modal && modalBody) {
                modalBody.innerHTML = `
                    <div class="project-header">
                        <div class="project-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <span class="project-tag">System.Profile.v4</span>
                    </div>
                    <h2 class="modal-title">Rubaiyat Emon // Technical Profile</h2>
                    
                    <div class="modal-bento-grid">
                        <div class="modal-card modal-header-card">
                            <span class="card-label">Core Directives</span>
                            <div class="card-scroll-area">
                                <p class="card-text">
                                    Engineer with a "Failure-First" philosophy. specializing in bridge building between 
                                    high-level ML logic and low-level production stability.
                                </p>
                            </div>
                        </div>
                        <div class="modal-card modal-action-card" data-index="01">
                            <span class="card-label">Education Vector</span>
                            <h4 class="card-subtitle">Mechanical Engineering Background</h4>
                            <div class="card-scroll-area">
                                <p class="card-text">
                                    B.Sc. in ME. Provided the rigour for finite element analysis and complex systems 
                                    which now translates to robust ML architecture and high-precision code.
                                </p>
                            </div>
                        </div>
                        <div class="modal-card modal-results-card">
                            <span class="card-label">System Runtime</span>
                            <div class="stat-list">
                                <div class="stat-item">
                                    <span>Coffee-to-Code:</span>
                                    <strong>98.4%</strong>
                                </div>
                                <div class="stat-item">
                                    <span>Bugs Crushed:</span>
                                    <strong>4,200+</strong>
                                </div>
                                <div class="stat-item">
                                    <span>Uptime Target:</span>
                                    <strong>99.99%</strong>
                                </div>
                            </div>
                        </div>
                        <div class="modal-card modal-reflection-card">
                            <span class="card-label">Design Philosophy</span>
                            <div class="card-scroll-area">
                                <p class="card-text">
                                    "If it isn't monitored, it isn't in production." An obsessive focus on observability, 
                                    automated recovery, and data integrity across the entire ML lifecycle.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Modal or ModalBody not found', { modal, modalBody });
            }
        });
    } else {
        console.warn('About Detail Button (#show-about-details) not found in DOM');
    }
});

// Global Initialization for other components
document.addEventListener('DOMContentLoaded', () => {
    if (typeof HoloSkills !== 'undefined') new HoloSkills();
    if (typeof PipelineArchitect !== 'undefined') new PipelineArchitect();
});
