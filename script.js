
// Highlight the current page in the navigation
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navigationLinks = document.querySelectorAll(".navigation a");

navigationLinks.forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("nav-active");
    }
});

// Copy email address on the Contact page
const copyButton = document.getElementById("copyEmail");
const emailText = document.getElementById("emailAddress");
const copyMessage = document.getElementById("copyMessage");

if (copyButton && emailText && copyMessage) {
    copyButton.addEventListener("click", function() {
        const email = emailText.textContent.trim();

        if (email === "your.email@example.com") {
            copyMessage.textContent = "Please replace the sample email with your own email first.";
            return;
        }

        navigator.clipboard.writeText(email).then(function() {
            copyMessage.textContent = "Email address copied!";
        }).catch(function() {
            copyMessage.textContent = "Unable to copy. Please copy the email manually.";
        });
    });
}


/* Projects Infinite Carousel */
const projectsTrack = document.getElementById("projectsTrack");

if (projectsTrack) {
    const originalCards = Array.from(projectsTrack.children);

    // Clone the first and last cards for seamless looping
    const firstClone = originalCards[0].cloneNode(true);
    const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

    projectsTrack.appendChild(firstClone);
    projectsTrack.insertBefore(lastClone, originalCards[0]);

    let projectIndex = 1;
    let isMoving = false;

    function getProjectWidth() {
        const card = projectsTrack.querySelector(".project-card");
        const gap = parseFloat(getComputedStyle(projectsTrack).gap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function updateProjects(animate = true) {
        projectsTrack.style.transition = animate
            ? "transform 0.5s ease"
            : "none";

        projectsTrack.style.transform =
            `translateX(-${projectIndex * getProjectWidth()}px)`;
    }

    window.moveProjects = function(direction) {
        if (isMoving) return;

        isMoving = true;
        projectIndex += direction;

        updateProjects(true);
    };

    projectsTrack.addEventListener("transitionend", function() {
        if (projectIndex === originalCards.length + 1) {
            projectIndex = 1;
            updateProjects(false);
        }

        if (projectIndex === 0) {
            projectIndex = originalCards.length;
            updateProjects(false);
        }

        isMoving = false;
    });

    window.addEventListener("resize", function() {
        updateProjects(false);
    });

    updateProjects(false);
}
