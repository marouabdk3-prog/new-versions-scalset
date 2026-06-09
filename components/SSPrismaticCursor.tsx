"use client";

import { useEffect } from "react";

export default function SSPrismaticCursor() {
  useEffect(() => {
    const cursor = document.getElementById("ss-cursor");
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    document.addEventListener("mousemove", onMouseMove);

    // Apply to elements initially and observe for DOM changes
    const applyHoverListeners = () => {
      const links = document.querySelectorAll("a, button, .service-card, .feature-item, .btn-shiny, .closer-card-wrapper");
      links.forEach((link) => {
        // Prevent duplicate listeners by removing then adding
        link.removeEventListener("mouseenter", addHover);
        link.removeEventListener("mouseleave", removeHover);
        link.addEventListener("mouseenter", addHover);
        link.addEventListener("mouseleave", removeHover);
      });
    };

    applyHoverListeners();

    // Setup MutationObserver to apply listeners to newly rendered elements
    const observer = new MutationObserver(() => {
        applyHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return <div id="ss-cursor" className="ss-cursor" />;
}
