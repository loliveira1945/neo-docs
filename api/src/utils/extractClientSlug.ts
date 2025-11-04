export function extractClientSlug(url: string): string | null {
  try {
    const hostname = new URL(url).hostname; // "comercial.neoassist.com"
    const slug = hostname.split(".")[0];    // "comercial"
    return `http://${slug}.neoassist.com/?th=manual`;
  } catch {
    return null;
  }
}