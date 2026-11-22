
document.addEventListener("DOMContentLoaded", () => {

    // ==================================
    // ELEMENTS
    // ==================================

    const opening = document.getElementById("opening");
    const enterButton = document.getElementById("enterButton");

    const music = document.getElementById("birthdayMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicDisc = document.getElementById("musicDisc");

    const giftBox = document.getElementById("giftBox");
    const giftIcon = document.getElementById("giftIcon");
    const letter = document.getElementById("letter");
    const closeLetter = document.getElementById("closeLetter");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    const celebration = document.getElementById("celebration");
    const closeCelebration = document.getElementById("closeCelebration");

    const nav = document.getElementById("floatingNav");

    // ==================================
    // OPENING SCREEN
    // ==================================

    enterButton.addEventListener("click", async () => {

        opening.classList.add("hide");

        try {
            await music.play();
            updateMusicButton(true);
        } catch (error) {
            console.log("Music playback unavailable.");
        }

        if (isBirthdayToday()) {

            setTimeout(() => {
                celebration.classList.add("show");
                createConfetti();
            }, 1000);

        }

    });

    // ==================================
    // MUSIC PLAYER
    // ==================================

    function updateMusicButton(isPlaying) {

        musicToggle.textContent = isPlaying ? "Ⅱ" : "▶";

        musicDisc.classList.toggle("playing", isPlaying);

    }

    musicToggle.addEventListener("click", async () => {

        if (music.paused) {

            try {
                await music.play();
                updateMusicButton(true);
            } catch (error) {
                alert("Periksa file lagu.mp3 ya!");
            }

        } else {

            music.pause();
            updateMusicButton(false);

        }

    });

    music.addEventListener("pause", () => {
        updateMusicButton(false);
    });

    music.addEventListener("play", () => {
        updateMusicButton(true);
    });

    // ==================================
    // BIRTHDAY COUNTDOWN
    // ==================================

    function isBirthdayToday() {

        const now = new Date();

        return (
            now.getDate() === 28 &&
            now.getMonth() === 10
        );

    }

    function getNextBirthday() {

        const now = new Date();

        let year = now.getFullYear();

        let target = new Date(year, 10, 28, 0, 0, 0);

        if (now >= target && !isBirthdayToday()) {
            year++;
            target = new Date(year, 10, 28, 0, 0, 0);
        }

        return target;

    }

    const birthdayDate = getNextBirthday();

    function updateCountdown() {

        const now = new Date();
        const difference = birthdayDate - now;

        if (difference <= 0) {

            ["days", "hours", "minutes", "seconds"]
                .forEach(id => {
                    document.getElementById(id).textContent = "00";
                });

            document.getElementById("dateNote").textContent =
                "♡ Happy Birthday, Aira! ♡";

            return;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

        document.getElementById("dateNote").textContent =
            "♡ 28 November " + birthdayDate.getFullYear() + " ♡";

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==================================
    // FLOATING HEARTS
    // ==================================

    const floatingHearts =
        document.querySelector(".floating-hearts");

    function createHeart() {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            Math.random() > 0.5 ? "♡" : "♥";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (6 + Math.random() * 6) + "s";

        floatingHearts.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);

    }

    setInterval(createHeart, 800);

    // ==================================
    // CUSTOM CURSOR
    // ==================================

    const cursor = document.querySelector(".custom-cursor");
    const glow = document.querySelector(".cursor-glow");

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        document.addEventListener("mousemove", (event) => {

            cursor.style.left = event.clientX + "px";
            cursor.style.top = event.clientY + "px";

            glow.style.left = event.clientX + "px";
            glow.style.top = event.clientY + "px";

        });

        document.querySelectorAll("a, button, .polaroid")
            .forEach(element => {

                element.addEventListener("mouseenter", () => {
                    cursor.classList.add("active");
                });

                element.addEventListener("mouseleave", () => {
                    cursor.classList.remove("active");
                });

            });

    }

    // ==================================
    // SCROLL REVEAL
    // ==================================

    const revealElements = document.querySelectorAll(
        ".section, .wish-card, .ending-card, footer"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    // ==================================
    // FLOATING NAVIGATION
    // ==================================

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            nav.classList.add("visible");
        } else {
            nav.classList.remove("visible");
        }

    }, { passive: true });

    const navLinks = document.querySelectorAll(".floating-nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

    const observedSections = document.querySelectorAll(
        "#home, #countdown, #gallery, #gift"
    );

    if ("IntersectionObserver" in window) {

        const navObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            );

                        });

                    }

                });

            },
            {
                threshold: 0.4
            }
        );

        observedSections.forEach(section => {
            navObserver.observe(section);
        });

    }

    // ==================================
    // GALLERY LIGHTBOX
    // ==================================

    const galleryImages =
        document.querySelectorAll(".polaroid img");

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            lightboxImage.src = img.src;
            lightbox.classList.add("show");

        });

    });

    function hideLightbox() {
        lightbox.classList.remove("show");
    }

    closeLightbox.addEventListener("click", hideLightbox);

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            hideLightbox();
        }

    });

    // ==================================
    // SURPRISE GIFT
    // ==================================

    giftBox.addEventListener("click", () => {

        giftIcon.textContent = "💝";

        letter.classList.add("show");

        createConfetti();

    });

    function hideLetter() {
        letter.classList.remove("show");
    }

    closeLetter.addEventListener("click", hideLetter);

    letter.addEventListener("click", event => {

        if (event.target === letter) {
            hideLetter();
        }

    });

    // ==================================
    // BIRTHDAY CELEBRATION
    // ==================================

    closeCelebration.addEventListener("click", () => {

        celebration.classList.remove("show");

    });

    // ==================================
    // CONFETTI
    // ==================================

    function createConfetti() {

        const emojis = [
            "💗", "🎀", "✨",
            "💕", "🌸", "♡", "🎉"
        ];

        for (let i = 0; i < 55; i++) {

            const item = document.createElement("div");

            item.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            item.style.position = "fixed";
            item.style.left = Math.random() * 100 + "vw";
            item.style.top = "-30px";

            item.style.fontSize =
                (15 + Math.random() * 15) + "px";

            item.style.zIndex = "190";
            item.style.pointerEvents = "none";

            document.body.appendChild(item);

            const duration = 2000 + Math.random() * 2500;

            item.animate(
                [
                    {
                        transform: "translateY(0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform: "translateY(110vh) rotate(600deg)",
                        opacity: 0
                    }
                ],
                {
                    duration: duration,
                    easing: "ease-in"
                }
            );

            setTimeout(() => item.remove(), duration);

        }

    }
// ==================================
    // DIGITAL PHOTOBOOTH
    // ==================================

    const boothPhotos = [
        { src: "aira1.jpeg", caption: "Anak DP nie" },
        { src: "aira2.jpeg", caption: "Masa-masa MTS" },
        { src: "aira3.jpeg", caption: "Mirror" },
        { src: "aira4.jpeg", caption: "Little sunshine ☀" },
        { src: "aira5.jpeg", caption: "Candi Prambanan" },
        { src: "aira6.jpeg", caption: "hmmmmmmmm" }
    ];

    let boothIndex = 0;

    document.getElementById("nextBooth").addEventListener("click", () => {
        boothIndex = (boothIndex + 1) % boothPhotos.length;

        document.getElementById("boothImage").src =
            boothPhotos[boothIndex].src;

        document.getElementById("boothCaption").textContent =
            boothPhotos[boothIndex].caption;
    });

    // ==================================
    // BIRTHDAY TIME CAPSULE
    // ==================================

    const openCapsule = document.getElementById("openCapsule");
    const capsuleModal = document.getElementById("capsuleModal");

    function checkCapsuleDate() {
        const today = new Date();
        const unlockDate = new Date(2026, 10, 28);

        if (today >= unlockDate) {
            openCapsule.disabled = false;
            document.getElementById("capsuleTitle").textContent =
                "Your surprise is ready! 💗";
            document.getElementById("capsuleText").textContent =
                "The time has come. Open your little message!";
            openCapsule.textContent = "Open Your Message ♡";
        } else {
            openCapsule.disabled = true;
        }
    }

    checkCapsuleDate();

    openCapsule.addEventListener("click", () => {
        if (!openCapsule.disabled) {
            capsuleModal.classList.add("show");
            createConfetti();
        }
    });

    document.getElementById("closeCapsule").addEventListener("click", () => {
        capsuleModal.classList.remove("show");
    });

    capsuleModal.addEventListener("click", event => {
        if (event.target === capsuleModal) {
            capsuleModal.classList.remove("show");
        }
    });

    // ==================================
    // INTERACTIVE BIRTHDAY CAKE
    // ==================================

    let cakeBlown = false;

    document.getElementById("blowCandles").addEventListener("click", () => {
        const cake = document.getElementById("interactiveCake");
        const message = document.getElementById("cakeMessage");
        const button = document.getElementById("blowCandles");

        if (!cakeBlown) {
            cake.textContent = "🍰";
            cake.classList.add("blown");

            message.textContent =
                "DUARRR YAY! Your wish is on its way! 💗";

            button.textContent = "Make Another Wish ♡";

            createConfetti();
            cakeBlown = true;
        } else {
            cake.textContent = "🎂";
            cake.classList.remove("blown");

            message.textContent =
                "Your birthday cake is waiting!";

            button.textContent = "Potong Kue nyaa";

            cakeBlown = false;
        }
    });

    // ==================================
    // SECRET ROOM
    // ==================================

    const secretForm = document.getElementById("secretForm");

    secretForm.addEventListener("submit", event => {
        event.preventDefault();

        const password =
            document.getElementById("secretPassword").value.trim();

        const feedback =
            document.getElementById("secretFeedback");

        if (password.toUpperCase() === "AIRA28") {
            document.getElementById("secretLock").textContent = "🔓";

            document.getElementById("secretMessage")
                .classList.add("show");

            feedback.textContent = "Anjayy bener! Welcome, Aira";

            createConfetti();
        } else {
            feedback.textContent =
                "Hmm, kode rahasianya belum tepat. Coba lagi ya! 💗";
        }
    });

    // Close capsule with Escape too
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            capsuleModal.classList.remove("show");
        }
    });
    // ==================================
    // KEYBOARD ESCAPE
    // ==================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            hideLetter();
            hideLightbox();

            celebration.classList.remove("show");

        }

    });

});
