(function () {
  // + Define +
  // Function to toggle between light and dark mode
  function toggleMode(mode) {
    // Elements
    const elements = document.querySelectorAll("[data-dark-mode-src]");
    // Values
    const dataModeAttr = `data-${mode == "light" ? "light" : "dark"}-mode-src`;
    // Loop
    elements.forEach((element) => {
      // Is lottie or image
      const srcAttribute = element.hasAttribute("data-src")
        ? "data-src"
        : "src";
      // Src set logic
      if (srcAttribute == "src" && mode != "light")
        element.removeAttribute("srcset");
      // Mode logic
      element.setAttribute(srcAttribute, element.getAttribute(dataModeAttr));
    });
  }
  // Function to toggle CSS link and mode
  function toggleCSSLink() {
    var existingLink = document.querySelector(
      'link[href="https://cdn.jsdelivr.net/gh/muzammilkmx/muzammilkmx@main/dark-mode/v1/darkmodev1.04.css"]'
    );
    var currentUrl = window.location.pathname;
    if (existingLink && currentUrl !== "/form") {
      // If the link already exists and the current URL is not /form, remove it
      existingLink.parentNode.removeChild(existingLink);
      // Update local storage preference
      localStorage.setItem("darkModeEnabled", "false");
      // Update text content to in-active
      document
        .querySelectorAll(".menu_card-content-top-active-tag-text")
        .forEach(function (element) {
          element.textContent = "Inactive";
        });
      // Change favicon to light mode
      document.querySelector('link[rel="shortcut icon"]').href =
        "https://uploads-ssl.webflow.com/65af89128fe741c3b20ba1dd/65fb6dd67f8c01bb3e8354f2_Light%20Mode%20Favicon.jpg";
      // Toggle assets to light mode
      awaitDomContentLoaded(toggleMode, "light");
    } else if (!existingLink && currentUrl !== "/form") {
      // If the link does not exist and the current URL is not /form, append it
      var linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href =
        "https://cdn.jsdelivr.net/gh/muzammilkmx/muzammilkmx@main/dark-mode/v1/darkmodev1.04.css";
      document.head.appendChild(linkElement);
      // Update local storage preference
      localStorage.setItem("darkModeEnabled", "true");
      // Update text content to active
      document
        .querySelectorAll(".menu_card-content-top-active-tag-text")
        .forEach(function (element) {
          element.textContent = "Active";
        });
      // Change favicon to dark mode
      document.querySelector('link[rel="shortcut icon"]').href =
        "https://uploads-ssl.webflow.com/65af89128fe741c3b20ba1dd/65fb6dd604ab2d5d49438340_Dark%20Mode%20Favicon.jpg";
      // Toggle assets to dark mode
      awaitDomContentLoaded(toggleMode, "dark");
    }
  }
  // - Helper -
  // Fire on DOMContentLoaded
  function awaitDomContentLoaded(callback, ...args) {
    // Logic
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        callback(...args);
      });
    } else {
      callback(...args);
    }
  }
  // + Onload logic +
  // Add click event listener
  awaitDomContentLoaded(function () {
    // Event listener for dark mode button
    document
      .getElementById("dark-mode-button")
      ?.addEventListener("click", toggleCSSLink);
    // Auto create light mode sources
    document.querySelectorAll("[data-dark-mode-src]").forEach((element) => {
      // Values
      const lightModeSrc =
        element.getAttribute("data-src") || element.getAttribute("src");
      // Set attribute
      element.setAttribute("data-light-mode-src", lightModeSrc);
    });
    
    // Check and update active state based on mode
    const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
    updateActiveState(darkModeEnabled);
  });

  // Function to update active state based on mode
  function updateActiveState(isDarkMode) {
    const activeText = isDarkMode ? "Active" : "Inactive";
    document
      .querySelectorAll(".menu_card-content-top-active-tag-text")
      .forEach(function (element) {
        element.textContent = activeText;
      });
  }

  // Check local storage preference on page load
  const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
  if (darkModeEnabled) {
    toggleCSSLink(); // Apply dark mode CSS if preference is true
  } else {
    // Remove dark mode assets during initial load if light mode is enabled
    awaitDomContentLoaded(removeAssetsByMode, "dark");
  }
})();
