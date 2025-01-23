function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
}
function filterGames() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach((card) => {
      const gameTitle = card.querySelector("h2").textContent.toLowerCase();
      if (gameTitle.includes(searchInput)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }