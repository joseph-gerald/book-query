const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const loadingCard = document.querySelector(".loading-card");
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// event listener for clicking on toggle button
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode; // toggle logic

    themeIcon.fill = isDarkMode ? '#303030' : '#F3F3F3';
    updateColorScheme(); // update colour scheme
});

function updateColorScheme() {
    const root = document.documentElement;
    localStorage.setItem('darkMode', isDarkMode);

    // create object with colour properties
    const colorScheme = {
        "--main-text-color": isDarkMode ? "white" : "black",
        "--main-bg-color": isDarkMode ? "#141414" : "#f5f5f7",
        "--main-shadow-color": isDarkMode ? "rgba(10, 10, 10, 0.3)" : "rgba(202, 202, 202, 0.4)",
        "--main-border-color": isDarkMode ? "#444" : "#e6e6e6",
        "--main-border-color-focused": isDarkMode ? "rgba(100, 100, 180, 0.3)" : "rgba(50, 50, 150, 0.3)",
        "--primary-button-color": isDarkMode ? "rgb(80, 100, 200)" : "rgb(80, 100, 200)",
        "--primary-button-hover": isDarkMode ? "rgb(60, 75, 150)" : "rgb(60, 75, 150)",
        "--primary-textbox-color": isDarkMode ? "rgb(25,25,25)" : "white",
        "--main-textbox-text-color": isDarkMode ? "white" : "black",
        "--theme-button-bg-color": isDarkMode ? "rgb(30,30,30)" : "white",
        "--theme-button-border-color": isDarkMode ? "rgb(20,20,20)" : "rgb(200,200,200)",
        "--main-glow-opacity": isDarkMode ? "30%" : "60%",
        "--secondary-bg-color": isDarkMode ? "#202020" : "#dadada",
    };

    // set loading screen background colour
    loadingCard.style.backgroundColor = isDarkMode ? "#141414" : "#f5f5f7";

    // set css colour properties to ones in  colorScheme
    for (const [variable, value] of Object.entries(colorScheme)) {
        root.style.setProperty(variable, value);
    }
}

// remove loading screen
window.addEventListener('load', () => {
    loadingCard.classList.add("slide-out");
    setTimeout(function () {
        loadingCard.remove();
    }, 750);
});

// update colour scheme to the last saved state (default light mode)
updateColorScheme();