import type { RequestHandler } from '@qwik.dev/router';

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="afw_g1" x1="8" y1="10" x2="56" y2="38" gradientUnits="userSpaceOnUse">
      <stop stop-color="#67e8f9" />
      <stop offset="1" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="afw_bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#082f49" />
      <stop offset="1" stop-color="#021424" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#afw_bg)" />
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="15.25" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" />
  <path d="M9 30C17 13 39 9 55 17C45 21 34 27 26 38C20 32 15 30 9 30Z" fill="url(#afw_g1)" />
  <path d="M13 45C22 45 28 34 40 34C46 34 51 38 55 42C49 47 41 51 32 51C22 51 17 48 13 45Z" fill="#67e8f9" fill-opacity="0.9" />
  <path d="M18 36C28 24 42 20 54 23" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
</svg>`;

export const onGet: RequestHandler = ({ send, headers }) => {
	headers.set('Content-Type', 'image/svg+xml; charset=utf-8');
	headers.set('Cache-Control', 'public, max-age=604800, immutable');
	send(200, FAVICON_SVG);
};
