"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClientSlug = extractClientSlug;
function extractClientSlug(url) {
    try {
        const hostname = new URL(url).hostname; // "comercial.neoassist.com"
        const slug = hostname.split(".")[0]; // "comercial"
        return `http://${slug}.neoassist.com/?th=manual`;
    }
    catch {
        return null;
    }
}
