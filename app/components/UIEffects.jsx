"use client";

import { useEffect } from "react";

export default function UIEffects() {
  useEffect(() => {
    /* =====================
       Sticky Header
    ====================== */
    const updateScroll = () => {
      const header = document.querySelector(".sw-header");
      if (!header) return;

      if (window.scrollY >= 80) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", updateScroll);
    updateScroll();


    /* =====================
       Header Mega Menu
    ====================== */
    const megaMenus = document.querySelectorAll("li.megamenu");

    megaMenus.forEach((menu) => {
      menu.addEventListener("mouseenter", () => {
        menu.classList.add("hover");
      });
      menu.addEventListener("mouseleave", () => {
        menu.classList.remove("hover");
      });
    });


    /* =====================
       Background Images
    ====================== */
    document.querySelectorAll("[data-background]").forEach((el) => {
      const bg = el.getAttribute("data-background");
      if (bg) {
        el.style.backgroundImage = `url(${bg})`;
      }
    });


    /* =====================
       Back to Top Progress
    ====================== */
    const progressPath = document.querySelector(".progress-wrap path");
    const progressWrap = document.querySelector(".progress-wrap");

    if (progressPath && progressWrap) {
      const pathLength = progressPath.getTotalLength();

      progressPath.style.transition = "none";
      progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = "stroke-dashoffset 10ms linear";

      const updateProgress = () => {
        const scroll = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          pathLength - (scroll * pathLength) / height;

        progressPath.style.strokeDashoffset = progress;

        if (scroll > 50) {
          progressWrap.classList.add("active-progress");
        } else {
          progressWrap.classList.remove("active-progress");
        }
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress);

      progressWrap.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Cleanup
      return () => {
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("scroll", updateProgress);
      };
    }

    // Cleanup for menu hover
    return () => {
      window.removeEventListener("scroll", updateScroll);
      megaMenus.forEach((menu) => {
        menu.replaceWith(menu.cloneNode(true));
      });
    };
  }, []);

  return null;
}
