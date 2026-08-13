(function () {
  var scrollAnimationFrame;

  function setMenuOpen(isOpen) {
    var links = document.getElementById("myLinks");
    var toggle = document.querySelector(".topnav .icon");

    if (isOpen) {
      links.style.setProperty("--topnav-menu-height", links.scrollHeight + "px");
    }

    links.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  function toggleNavigationMenu() {
    var links = document.getElementById("myLinks");
    setMenuOpen(!links.classList.contains("is-open"));
  }

  function navigationOffset() {
    return document.querySelector(".topnav").getBoundingClientRect().bottom;
  }

  function collapsedNavigationOffset() {
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

  window.addEventListener("load", function () {
    var target = document.getElementById(window.location.hash.slice(1));

    if (window.location.hash && target) {
      requestAnimationFrame(function () {
        scrollToTarget(target, navigationOffset(), false);
      });
    }

    window.addEventListener("scroll", function () {
      if (window.scrollY <= 1 && window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, { passive: true });
  });

  document.querySelector(".topnav .icon").addEventListener("click", toggleNavigationMenu);

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
      scrollToTarget(target, collapsedNavigationOffset(), false);
    } else {
      scrollToTarget(target, collapsedNavigationOffset(), true);
    }
    history.pushState(null, "", link.hash);
  });
})();
