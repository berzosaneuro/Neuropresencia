/* ============================================
   EliasFitPro - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navItems.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active section highlight
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // ========== HERO COUNTER ANIMATION ==========
    var statNumbers = document.querySelectorAll('.stat-number');
    var countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'));
            var duration = 2000;
            var step = target / (duration / 16);
            var current = 0;

            function update() {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                }
            }
            update();
        });
    }

    // Start counters when hero is in view
    var heroObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
        }
    }, { threshold: 0.5 });

    var heroSection = document.getElementById('hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ========== PROGRAM TABS ==========
    var tabBtns = document.querySelectorAll('.tab-btn');
    var programPanels = document.querySelectorAll('.program-panel');

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tab = this.getAttribute('data-tab');

            tabBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            programPanels.forEach(function (panel) {
                panel.classList.remove('active');
                if (panel.id === tab) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ========== CALCULATOR TABS ==========
    var calcTabBtns = document.querySelectorAll('.calc-tab-btn');
    var calcPanels = document.querySelectorAll('.calc-panel');

    calcTabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var calc = this.getAttribute('data-calc');

            calcTabBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            calcPanels.forEach(function (panel) {
                panel.classList.remove('active');
                if (panel.id === 'calc-' + calc) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ========== TESTIMONIAL SLIDER ==========
    var testimonials = document.querySelectorAll('.testimonial');
    var currentTestimonial = 0;
    var dotsContainer = document.getElementById('testimonialDots');

    // Create dots
    if (dotsContainer && testimonials.length > 0) {
        testimonials.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', 'Testimonio ' + (i + 1));
            dot.addEventListener('click', function () {
                goToTestimonial(i);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function goToTestimonial(index) {
        testimonials.forEach(function (t) { t.classList.remove('active'); });
        testimonials[index].classList.add('active');
        currentTestimonial = index;

        var dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(function (d) { d.classList.remove('active'); });
        if (dots[index]) dots[index].classList.add('active');
    }

    window.changeTestimonial = function (dir) {
        var next = currentTestimonial + dir;
        if (next < 0) next = testimonials.length - 1;
        if (next >= testimonials.length) next = 0;
        goToTestimonial(next);
    };

    // Auto-rotate testimonials
    setInterval(function () {
        changeTestimonial(1);
    }, 6000);

    // ========== BACK TO TOP ==========
    var backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ========== SCROLL REVEAL ANIMATION ==========
    var revealElements = document.querySelectorAll(
        '.service-card, .nutrition-card, .transformation-card, .price-card, .faq-item, .meal, .cert'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

}); // end DOMContentLoaded


// ========== CALCULATORS ==========

// --- BMI ---
function calculateBMI() {
    var weight = parseFloat(document.getElementById('bmi-weight').value);
    var height = parseFloat(document.getElementById('bmi-height').value);
    var resultDiv = document.getElementById('bmi-result');

    if (!weight || !height || weight <= 0 || height <= 0) {
        resultDiv.innerHTML = '<p style="color: var(--danger);">Por favor, introduce valores válidos.</p>';
        resultDiv.classList.add('show');
        return;
    }

    var heightM = height / 100;
    var bmi = weight / (heightM * heightM);
    var category, color, barWidth;

    if (bmi < 18.5) {
        category = 'Bajo peso';
        color = '#ffab00';
        barWidth = 20;
    } else if (bmi < 25) {
        category = 'Peso normal';
        color = '#00c853';
        barWidth = 45;
    } else if (bmi < 30) {
        category = 'Sobrepeso';
        color = '#ff9100';
        barWidth = 65;
    } else if (bmi < 35) {
        category = 'Obesidad grado I';
        color = '#ff5722';
        barWidth = 80;
    } else {
        category = 'Obesidad grado II+';
        color = '#ff1744';
        barWidth = 95;
    }

    resultDiv.innerHTML =
        '<div class="result-value">' + bmi.toFixed(1) + '</div>' +
        '<div class="result-label">' + category + '</div>' +
        '<div class="result-bar"><div class="result-bar-fill" style="width: ' + barWidth + '%; background: ' + color + ';"></div></div>' +
        '<div class="result-details">' +
        '<strong>IMC = peso (kg) / altura (m)²</strong><br>' +
        'Bajo peso: &lt;18.5 | Normal: 18.5-24.9 | Sobrepeso: 25-29.9 | Obesidad: &ge;30' +
        '</div>';
    resultDiv.classList.add('show');
}

// --- CALORIES (TDEE) ---
function calculateCalories() {
    var gender = document.getElementById('cal-gender').value;
    var age = parseFloat(document.getElementById('cal-age').value);
    var weight = parseFloat(document.getElementById('cal-weight').value);
    var height = parseFloat(document.getElementById('cal-height').value);
    var activity = parseFloat(document.getElementById('cal-activity').value);
    var resultDiv = document.getElementById('cal-result');

    if (!age || !weight || !height) {
        resultDiv.innerHTML = '<p style="color: var(--danger);">Por favor, completa todos los campos.</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Mifflin-St Jeor Equation
    var bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    var tdee = bmr * activity;
    var deficit = tdee - 500;
    var surplus = tdee + 300;

    resultDiv.innerHTML =
        '<div class="result-value">' + Math.round(tdee) + '</div>' +
        '<div class="result-label">kcal/día (Mantenimiento)</div>' +
        '<div class="result-details">' +
        '<strong>Metabolismo Basal (BMR):</strong> ' + Math.round(bmr) + ' kcal/día<br>' +
        '<strong>Para perder grasa:</strong> ' + Math.round(deficit) + ' kcal/día (-500 kcal)<br>' +
        '<strong>Para ganar músculo:</strong> ' + Math.round(surplus) + ' kcal/día (+300 kcal)' +
        '</div>';
    resultDiv.classList.add('show');
}

// --- MACROS ---
function calculateMacros() {
    var calories = parseFloat(document.getElementById('macro-calories').value);
    var goal = document.getElementById('macro-goal').value;
    var weight = parseFloat(document.getElementById('macro-weight').value);
    var resultDiv = document.getElementById('macro-result');

    if (!calories || !weight) {
        resultDiv.innerHTML = '<p style="color: var(--danger);">Por favor, completa todos los campos.</p>';
        resultDiv.classList.add('show');
        return;
    }

    var proteinPerKg, fatPercent;

    switch (goal) {
        case 'lose':
            proteinPerKg = 2.2;
            fatPercent = 0.25;
            break;
        case 'maintain':
            proteinPerKg = 1.8;
            fatPercent = 0.28;
            break;
        case 'gain':
            proteinPerKg = 2.0;
            fatPercent = 0.25;
            break;
        default:
            proteinPerKg = 1.8;
            fatPercent = 0.28;
    }

    var proteinG = Math.round(weight * proteinPerKg);
    var proteinCal = proteinG * 4;
    var fatCal = Math.round(calories * fatPercent);
    var fatG = Math.round(fatCal / 9);
    var carbsCal = calories - proteinCal - fatCal;
    var carbsG = Math.round(carbsCal / 4);

    if (carbsG < 0) carbsG = 0;

    resultDiv.innerHTML =
        '<div class="result-label" style="margin-bottom: 15px;">Distribución para <strong>' + Math.round(calories) + ' kcal/día</strong></div>' +
        '<div class="macro-grid">' +
        '<div class="macro-item" style="border-left: 3px solid #ff4d4d;">' +
        '<div class="macro-value">' + proteinG + 'g</div>' +
        '<div class="macro-name">Proteína</div>' +
        '<div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 5px;">' + proteinCal + ' kcal (' + Math.round(proteinCal / calories * 100) + '%)</div>' +
        '</div>' +
        '<div class="macro-item" style="border-left: 3px solid #ffab00;">' +
        '<div class="macro-value">' + carbsG + 'g</div>' +
        '<div class="macro-name">Carbohidratos</div>' +
        '<div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 5px;">' + (carbsG * 4) + ' kcal (' + Math.round(carbsG * 4 / calories * 100) + '%)</div>' +
        '</div>' +
        '<div class="macro-item" style="border-left: 3px solid #00c853;">' +
        '<div class="macro-value">' + fatG + 'g</div>' +
        '<div class="macro-name">Grasas</div>' +
        '<div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 5px;">' + fatCal + ' kcal (' + Math.round(fatPercent * 100) + '%)</div>' +
        '</div>' +
        '</div>' +
        '<div class="result-details" style="margin-top: 20px;">' +
        '<strong>Proteína:</strong> ' + proteinPerKg + 'g/kg | <strong>Grasa:</strong> ' + Math.round(fatPercent * 100) + '% | <strong>Carbos:</strong> el resto' +
        '</div>';
    resultDiv.classList.add('show');
}

// --- 1RM ---
function calculateOneRM() {
    var weight = parseFloat(document.getElementById('rm-weight').value);
    var reps = parseInt(document.getElementById('rm-reps').value);
    var resultDiv = document.getElementById('rm-result');

    if (!weight || !reps || weight <= 0 || reps <= 0) {
        resultDiv.innerHTML = '<p style="color: var(--danger);">Por favor, introduce valores válidos.</p>';
        resultDiv.classList.add('show');
        return;
    }

    // Epley formula
    var oneRM;
    if (reps === 1) {
        oneRM = weight;
    } else {
        oneRM = weight * (1 + reps / 30);
    }

    var percentages = [
        { pct: 100, reps: '1', use: 'Fuerza máxima' },
        { pct: 95, reps: '2', use: 'Fuerza' },
        { pct: 90, reps: '3-4', use: 'Fuerza' },
        { pct: 85, reps: '5-6', use: 'Fuerza/Hipertrofia' },
        { pct: 80, reps: '7-8', use: 'Hipertrofia' },
        { pct: 75, reps: '9-10', use: 'Hipertrofia' },
        { pct: 70, reps: '11-12', use: 'Hipertrofia/Resistencia' },
        { pct: 65, reps: '13-15', use: 'Resistencia' },
        { pct: 60, reps: '16-20', use: 'Resistencia' }
    ];

    var tableRows = '';
    percentages.forEach(function (row) {
        var kg = (oneRM * row.pct / 100).toFixed(1);
        tableRows += '<tr><td>' + row.pct + '%</td><td>' + kg + ' kg</td><td>' + row.reps + '</td><td>' + row.use + '</td></tr>';
    });

    resultDiv.innerHTML =
        '<div class="result-value">' + oneRM.toFixed(1) + ' kg</div>' +
        '<div class="result-label">Tu 1RM estimada (Fórmula Epley)</div>' +
        '<table class="rm-table">' +
        '<thead><tr><th>%1RM</th><th>Peso</th><th>Reps</th><th>Objetivo</th></tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
        '</table>' +
        '<div class="result-details" style="margin-top: 15px;">' +
        '<strong>Fórmula:</strong> 1RM = Peso × (1 + Repeticiones / 30)' +
        '</div>';
    resultDiv.classList.add('show');
}


// ========== FAQ ==========
function toggleFAQ(button) {
    var item = button.parentElement;
    var isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('open');
    });

    // Open clicked if it wasn't open
    if (!isOpen) {
        item.classList.add('open');
    }
}


// ========== CONTACT FORM ==========
function handleContactForm(e) {
    e.preventDefault();
    var form = document.getElementById('contactForm');
    var name = document.getElementById('contact-name').value.trim();
    var email = document.getElementById('contact-email').value.trim();

    if (!name || !email) return;

    // Show success message
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = '¡Mensaje enviado!';
    btn.style.background = 'var(--success)';
    btn.disabled = true;

    setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
    }, 3000);
}


// ========== NEWSLETTER ==========
function handleNewsletter(e) {
    e.preventDefault();
    var form = e.target;
    var input = form.querySelector('input');
    var btn = form.querySelector('button');

    if (!input.value.trim()) return;

    var originalText = btn.textContent;
    btn.textContent = '¡Suscrito!';
    btn.style.background = 'var(--success)';
    btn.disabled = true;
    input.disabled = true;

    setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        input.disabled = false;
        form.reset();
    }, 3000);
}
