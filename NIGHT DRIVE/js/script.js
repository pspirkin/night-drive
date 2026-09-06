/* =========================================
   NIGHT DRIVE
   Main JavaScript
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

    });


    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";

const navigationLinks =
    document.querySelectorAll(".nav-link");

navigationLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(".header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================
   CAR FILTERING + SEARCH
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const carCards =
    document.querySelectorAll(".catalog-card");

const searchInput =
    document.querySelector("#carSearch");

const noResults =
    document.querySelector("#noResults");


let currentFilter = "all";


function filterCars() {

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    let visibleCars = 0;


    carCards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name;


        const matchesCategory =
            currentFilter === "all" ||
            category === currentFilter;


        const matchesSearch =
            name.includes(searchText);


        if (
            matchesCategory &&
            matchesSearch
        ) {

            card.style.display = "";

            visibleCars++;

        } else {

            card.style.display = "none";

        }

    });


    if (noResults) {

        if (visibleCars === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }

}


/* FILTER BUTTONS */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        filterCars();

    });

});


/* SEARCH */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterCars
    );

}


/* =========================================
   CAR MODAL
========================================= */

const modal =
    document.querySelector("#carModal");

const modalClose =
    document.querySelector(".modal-close");

const modalTitle =
    document.querySelector("#modalTitle");

const modalDescription =
    document.querySelector("#modalDescription");

const modalSpeed =
    document.querySelector("#modalSpeed");

const modalPower =
    document.querySelector("#modalPower");


const detailButtons =
    document.querySelectorAll(
        ".text-button, .catalog-view"
    );


function openCarModal(button) {

    if (!modal) return;


    const carName =
        button.dataset.car;

    const description =
        button.dataset.description;

    const speed =
        button.dataset.speed;

    const power =
        button.dataset.power;


    modalTitle.textContent =
        carName;

    modalDescription.textContent =
        description;

    modalSpeed.textContent =
        speed;

    modalPower.textContent =
        power;


    modal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

}


detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        openCarModal(button);

    });

});


function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modal) {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeModal();

        }

    });

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);


/* =========================================
   ANIMATED STATISTICS
========================================= */

const counters =
    document.querySelectorAll(".counter");


function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    let current = 0;

    const duration = 1500;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        current =
            Math.floor(
                progress * target
            );


        counter.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target + "+";

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =========================================
   CONTACT FORM VALIDATION
========================================= */

const contactForm =
    document.querySelector("#contactForm");


if (contactForm) {


    const nameInput =
        document.querySelector("#name");

    const emailInput =
        document.querySelector("#email");

    const phoneInput =
        document.querySelector("#phone");

    const messageInput =
        document.querySelector("#message");


    const nameError =
        document.querySelector("#nameError");

    const emailError =
        document.querySelector("#emailError");

    const messageError =
        document.querySelector("#messageError");


    const successMessage =
        document.querySelector(
            "#successMessage"
        );


    function showError(
        input,
        errorElement,
        message
    ) {

        input
            .closest(".form-group")
            .classList.add("error");

        errorElement.textContent =
            message;

    }


    function clearError(
        input,
        errorElement
    ) {

        input
            .closest(".form-group")
            .classList.remove("error");

        errorElement.textContent = "";

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let isValid = true;


            /* NAME */

            if (
                nameInput.value.trim() === ""
            ) {

                showError(
                    nameInput,
                    nameError,
                    "Please enter your name."
                );

                isValid = false;

            } else {

                clearError(
                    nameInput,
                    nameError
                );

            }


            /* EMAIL */

            if (
                emailInput.value.trim() === ""
            ) {

                showError(
                    emailInput,
                    emailError,
                    "Please enter your email."
                );

                isValid = false;

            } else if (
                !isValidEmail(
                    emailInput.value.trim()
                )
            ) {

                showError(
                    emailInput,
                    emailError,
                    "Please enter a valid email."
                );

                isValid = false;

            } else {

                clearError(
                    emailInput,
                    emailError
                );

            }


            /* MESSAGE */

            if (
                messageInput.value.trim() === ""
            ) {

                showError(
                    messageInput,
                    messageError,
                    "Please enter your message."
                );

                isValid = false;

            } else {

                clearError(
                    messageInput,
                    messageError
                );

            }


            /* SUCCESS */

            if (isValid) {

                successMessage.classList.add(
                    "show"
                );

                contactForm.reset();


                setTimeout(() => {

                    successMessage.classList.remove(
                        "show"
                    );

                }, 5000);

            }

        }
    );


    /* LIVE ERROR REMOVAL */

    nameInput.addEventListener(
        "input",
        () => {

            if (
                nameInput.value.trim() !== ""
            ) {

                clearError(
                    nameInput,
                    nameError
                );

            }

        }
    );


    emailInput.addEventListener(
        "input",
        () => {

            if (
                isValidEmail(
                    emailInput.value.trim()
                )
            ) {

                clearError(
                    emailInput,
                    emailError
                );

            }

        }
    );


    messageInput.addEventListener(
        "input",
        () => {

            if (
                messageInput.value.trim() !== ""
            ) {

                clearError(
                    messageInput,
                    messageError
                );

            }

        }
    );

}


/* =========================================
   INITIAL CATALOG FILTER
========================================= */

if (carCards.length > 0) {

    filterCars();

}