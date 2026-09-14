"use strict";

const tabs = document.querySelectorAll("[data-page-target]");
const pages = document.querySelectorAll("[data-page]");
const profileToggle = document.querySelector("[data-profile-toggle]");
const profileDetails = document.querySelector("[data-profile-details]");
const year = document.querySelector("[data-current-year]");

function activatePage(pageName, updateUrl = true) {
  const selectedTab = document.querySelector(`[data-page-target="${pageName}"]`);
  const selectedPage = document.querySelector(`[data-page="${pageName}"]`);

  if (!selectedTab || !selectedPage) return;

  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  pages.forEach((page) => {
    const isSelected = page === selectedPage;
    page.classList.toggle("is-active", isSelected);
    page.hidden = !isSelected;
  });

  if (updateUrl) {
    window.history.replaceState(null, "", `#${pageName}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activatePage(tab.dataset.pageTarget));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activatePage(tabs[nextIndex].dataset.pageTarget);
  });
});

if (profileToggle && profileDetails) {
  profileToggle.addEventListener("click", () => {
    const isOpen = profileDetails.classList.toggle("is-open");
    profileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (year) {
  const locale = document.documentElement.lang === "fa" ? "fa-IR" : "en-US";
  year.textContent = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    new Date().getFullYear(),
  );
}

const initialPage = window.location.hash.slice(1);
if (initialPage === "about" || initialPage === "resume") {
  activatePage(initialPage, false);
}
