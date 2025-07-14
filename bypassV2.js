// ==UserScript==
// @name         BoxmineWorld - Bypass AdBlock + Auto‑Update
// @namespace    https://github.com/Elpapiema
// @version      1.3_Beta-3
// @description  Elimina bloqueos de AdBlock en el Panel de BoxmineWorld
// @author       Emma (Violet's Version)
// @icon         https://raw.githubusercontent.com/Elpapiema/API_Alya/refs/heads/main/web/icon.png
// @match        https://panel.boxmineworld.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_URL = 'https://raw.githubusercontent.com/Elpapiema/CharHub-Store/main/bypassV2.js';
    const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // comprobar cada 24h

    /* ————————————————————————— Styles to remove overlays ————————————————————————— */
    GM_addStyle(`
        body > div[style*="z-index"],
        .blocking-overlay, .adblock-modal, .modal-backdrop,
        .backdrop-blur, .blurred, .dimmed {
            display: none !important;
            pointer-events: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
        html, body, #app, [data-reactroot], main, section {
            pointer-events: auto !important;
            overflow: auto !important;
            filter: none !important;
        }
        * {
            filter: none !important;
            -webkit-filter: none !important;
        }
    `);

    /* ———————————————————————— Restore interactivity ———————————————————————— */
    function restore() {
        document.querySelectorAll('body > div, .blocking-overlay, .modal-backdrop')
            .forEach(el => {
                const s = getComputedStyle(el);
                if ((s.position === 'fixed' || s.position === 'absolute')
                 && (parseInt(s.zIndex) >= 999 || +s.opacity >= 0.5 || s.pointerEvents === 'none')) {
                    el.remove();
                }
            });

        ['body','html','#app','[data‑reactroot]','main','section']
            .forEach(sel => {
                const e = document.querySelector(sel);
                if (e) {
                    e.style.pointerEvents = 'auto';
                    e.style.overflow = 'auto';
                    e.style.filter = 'none';
                    e.style.webkitFilter = 'none';
                }
            });

        ['click','mousedown','mouseup','contextmenu']
            .forEach(ev => { document.body['on'+ev] = window['on'+ev] = null; });

        document.body.removeAttribute('onclick');
        document.body.removeAttribute('oncontextmenu');
    }

    /* ——————————————————————— Observe dynamic overlays ——————————————————————— */
    const observer = new MutationObserver(ms => {
        ms.forEach(m => {
            m.addedNodes.forEach(n => {
                if (n.nodeType === 1) {
                    const s = getComputedStyle(n);
                    if (s.position === 'fixed' && parseInt(s.zIndex) > 1000) n.remove();
                }
            });
        });
    });

    /* ——————————————————————— Initialize logic ——————————————————————— */
    function init() {
        restore();
        observer.observe(document.documentElement, { childList: true, subtree: true });
        const loop = () => {
            if (document.body?.style.pointerEvents === 'none') restore();
            requestAnimationFrame(loop);
        };
        loop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    GM_registerMenuCommand("🔓 Restaurar Interactividad", restore);

    console.log('[BoxmineWorld] ✅ Bypass activo (v1.4)');

    /* ——————————————— Auto‑update checker ——————————————— */
    async function checkUpdate() {
        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url: SCRIPT_URL + '?_=' + Date.now(),
                headers: { 'Cache-Control': 'no-cache' },
                onload: resp => {
                    const remoteCode = resp.responseText;
                    const remoteVer = remoteCode.match(/@version\s+([\d.]+)/);
                    const localVer = GM_getValue('version', '1.4');
                    if (remoteVer && remoteVer[1] !== localVer) {
                        GM_setValue('version', remoteVer[1]);
                        if (confirm(`Nueva versión ${remoteVer[1]} disponible. ¿Actualizar ahora?`)) {
                            window.location.href = SCRIPT_URL;
                        }
                    }
                }
            });
        } catch (e) {
            console.warn('[BoxmineWorld] Error checking update', e);
        }
        setTimeout(checkUpdate, CHECK_INTERVAL);
    }

    checkUpdate();

})();
