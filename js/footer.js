// footer.js
async function loadFooter() {
  try {
    const response = await fetch("/html/footer.html");
    const footerHTML = await response.text();

    document.getElementById("footer").innerHTML = footerHTML;
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

loadFooter();
