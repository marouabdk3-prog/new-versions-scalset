const fs = require('fs');
const htmlRaw = fs.readFileSync('rdepo/SSPrismatic/index.html', 'utf8');
let bodyContent = htmlRaw.match(/<body.*?>([\s\S]*?)<script/i)[1];
bodyContent = bodyContent.replace(/<section id="hero-section"[\s\S]*?<\/section>/i, '');
bodyContent = bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

let jsRaw = fs.readFileSync('rdepo/SSPrismatic/main.js', 'utf8');
jsRaw = jsRaw.replace(/import.*?gsap.*?;\n/g, '');
jsRaw = jsRaw.replace(/gsap\.registerPlugin\(ScrollTrigger\);/g, '');
jsRaw = jsRaw.replace(/if \(document\.readyState === 'loading'\)[\s\S]*?initAnimations\(\);\n}/g, 'initAnimations();');

const reactComponent = `"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SSPrismaticIntegration() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        let ctx = gsap.context(() => {
            ${jsRaw}
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const htmlContent = \`${bodyContent}\`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}`;

fs.writeFileSync('components/SSPrismaticIntegration.tsx', reactComponent);
console.log("Successfully created components/SSPrismaticIntegration.tsx");
