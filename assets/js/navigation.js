(function () {
  var scrollAnimationFrame;

  function setMenuOpen(isOpen) {
    var menu = document.getElementById("nav-menu");
    var toggle = document.querySelector(".topnav .icon");

    if (isOpen) {
      menu.style.setProperty("--topnav-menu-height", menu.scrollHeight + "px");
    }

    menu.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    setMenuOpen(!menu.classList.contains("is-open"));
  }

  function closeMenu() {
    var menu = document.getElementById("nav-menu");
    if (menu.classList.contains("is-open")) setMenuOpen(false);
  }

  function getNavOffset() {
    return document.querySelector(".topnav").getBoundingClientRect().bottom;
  }

  function getCollapsedNavOffset() {
    var styles = getComputedStyle(document.documentElement);

    return parseFloat(styles.getPropertyValue("--topnav-bar-height")) +
      parseFloat(styles.getPropertyValue("--topnav-inset"));
  }

  function scrollToTarget(target, offset, animate) {
    var startY = window.scrollY;
    var targetY = startY + target.getBoundingClientRect().top - offset;

    if (!animate) {
      window.scrollTo(0, targetY);
      return;
    }

    var distance = targetY - startY;
    var duration = 500;
    var startTime;

    cancelAnimationFrame(scrollAnimationFrame);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easedProgress = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(0, startY + distance * easedProgress);
      if (progress < 1) scrollAnimationFrame = requestAnimationFrame(step);
    }

    scrollAnimationFrame = requestAnimationFrame(step);
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) setMenuOpen(false);
  });

  window.addEventListener("scroll", function () {
    closeMenu();

    if (window.scrollY <= 1 && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, { passive: true });

  window.addEventListener("wheel", closeMenu, { passive: true });
  window.addEventListener("touchmove", closeMenu, { passive: true });

  window.addEventListener("load", function () {
    var target = document.getElementById(window.location.hash.slice(1));

    if (window.location.hash && target) {
      requestAnimationFrame(function () {
        scrollToTarget(target, getNavOffset(), false);
      });
    }
  });

  document.querySelector(".topnav .icon").addEventListener("click", toggleMenu);

  document.addEventListener("click", function (event) {
    var link = event.target.closest(".topnav a.normal");
    if (!link || !link.hash || link.origin !== window.location.origin ||
        event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;

    var target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollToTarget(target, getCollapsedNavOffset(), false);
    } else {
      scrollToTarget(target, getCollapsedNavOffset(), true);
    }
    history.pushState(null, "", link.hash);
  });
})();
