/* ===============================
   DOM READY SAFETY WRAPPER
=============================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const themeBtn = document.getElementById("theme-btn");

    /* ===============================
       THEME SYSTEM (FIXED + PREMIUM)
    =============================== */

    const flash = document.createElement("div");
    flash.classList.add("theme-flash");
    document.body.appendChild(flash);

    const applyTheme = (theme) => {
        if (theme === "dark") {
            body.classList.add("dark");
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove("dark");
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Load saved theme once
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Theme toggle (clean + animated)
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {

            flash.classList.add("active");

            setTimeout(() => {
                flash.classList.remove("active");
            }, 400);

            const newTheme = body.classList.contains("dark") ? "light" : "dark";

            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    /* ===============================
       FAQ ACCORDION (OPTIMIZED)
    =============================== */

    document.querySelectorAll(".faq-question").forEach((btn) => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;

            const isOpen = answer.style.maxHeight;

            document.querySelectorAll(".faq-answer").forEach((el) => {
                el.style.maxHeight = null;
            });

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* ===============================
       COUNTER ANIMATION (IMPROVED)
    =============================== */

    const counters = document.querySelectorAll(".stat-card h2");

    const animateCounter = (el) => {
        const targetText = el.innerText;
        const target = parseInt(targetText.replace(/\D/g, ""));

        if (isNaN(target)) return;

        let current = 0;
        const step = target / 80;

        const update = () => {
            current += step;

            if (current < target) {
                el.innerText =
                    Math.ceil(current) +
                    (targetText.includes("%") ? "%" :
                     targetText.includes("+") ? "+" : "");

                requestAnimationFrame(update);
            } else {
                el.innerText = targetText;
            }
        };

        update();
    };

    /* ===============================
       INTERSECTION OBSERVER (STATS)
    =============================== */

    const statsSection = document.querySelector(".stats");

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    /* ===============================
       SCROLL REVEAL (CLEAN)
    =============================== */

    const revealElements = document.querySelectorAll(
        ".feature-card, .price-card, .testimonial-card, .faq-item"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.classList.add("hidden-element");
        revealObserver.observe(el);
    });

    /* ===============================
       CURSOR GLOW + PARALLAX (OPTIMIZED)
    =============================== */

    const glow = document.createElement("div");
    glow.classList.add("cursor-glow");
    document.body.appendChild(glow);

    const blob1 = document.querySelector(".blob1");
    const blob2 = document.querySelector(".blob2");
    const blob3 = document.querySelector(".blob3");

    document.addEventListener("mousemove", (e) => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // cursor glow
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

        // blobs parallax
        if (blob1 && blob2 && blob3) {
            blob1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            blob2.style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
            blob3.style.transform = `translate(${x * 20}px, ${-y * 20}px)`;
        }
    });

    /* ===============================
       BUTTON HOVER EFFECT (CLEAN)
    =============================== */

    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .price-card button"
    ).forEach(btn => {

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-5px) scale(1.05)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0) scale(1)";
        });
    });

    /* ===============================
       NAVBAR SCROLL EFFECT (SAFE)
    =============================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(20px)";
            navbar.style.background = "rgba(255,255,255,0.08)";
            navbar.style.borderRadius = "20px";
        } else {
            navbar.style.background = "transparent";
        }
    });

    /* ===============================
       PAGE LOADER
=============================== */

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    console.log("🚀 ThemePro Fully Optimized Script Loaded");
});