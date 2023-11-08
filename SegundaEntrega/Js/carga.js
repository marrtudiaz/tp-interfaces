document.addEventListener("DOMContentLoaded", function () {
    const loadingBar = document.querySelector(".loading-bar");
    const loadingText = document.querySelector(".loading-text");
    let progress = 0;

    const interval = setInterval(function () {
        if (progress >= 100) {
            clearInterval(interval);
            // Una vez que el progreso llega al 100%, oculta el elemento de carga
            const loadingContainer = document.querySelector(".loading-container");
            loadingContainer.style.display = "none";
        } else {
            progress += 1;
            loadingBar.style.width = progress + "%";
            loadingText.innerText =   progress + "%";
        }
    }, 50);
});
