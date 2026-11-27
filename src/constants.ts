import { createContextId } from '@qwik.dev/core';
import type { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/homepage.webp';
export const DEFAULT_METADATA_URL = 'https://allforwind.com/';
export const DEFAULT_METADATA_TITLE = 'ALL FOR WIND — Kite, Wing & Foil Performance Shop';
export const DEFAULT_METADATA_DESCRIPTION =
	'Offizieller Eleveight Partner Shop für Kitesurfing, Wingfoiling, Hydrofoils und Twintip Boards.';
export const DEFAULT_METADATA_IMAGE = 'https://allforwind.com/social-image.jpg?v=2';
export const DEFAULT_LOCALE = 'en';

export const METADATA_BY_LOCALE = {
	de: {
		title: 'ALL FOR WIND — Kite, Wing & Foil Performance Shop',
		description:
			'Offizieller Eleveight Partner Shop für Kitesurfing, Wingfoiling, Hydrofoils und Twintip Boards.',
		ogLocale: 'de_DE',
	},
	en: {
		title: 'ALL FOR WIND — Kite, Wing & Foil Performance Shop',
		description:
			'Official Eleveight Partner Shop for Kitesurfing, Wingfoiling, Hydrofoils and Twintip Boards.',
		ogLocale: 'en_US',
	},
	es: {
		title: 'ALL FOR WIND — Tienda Especializada en Kite, Wing & Foil',
		description:
			'Tienda oficial Eleveight de kitesurf, wingfoil, hydrofoils y tablas twintip. Rendimiento y calidad sin concesiones.',
		ogLocale: 'es_ES',
	},
	it: {
		title: 'ALL FOR WIND — Negozio specializzato in Kite, Wing & Foil',
		description:
			'Negozio partner ufficiale Eleveight per kitesurf, wingfoil, hydrofoil e tavole twintip. Prestazioni e qualità senza compromessi.',
		ogLocale: 'it_IT',
	},
	fr: {
		title: 'ALL FOR WIND — Boutique spécialisée Kite, Wing & Foil',
		description:
			'Boutique partenaire officielle Eleveight pour le kitesurf, le wingfoil, les hydrofoils et les planches twintip. Performance et qualité sans compromis.',
		ogLocale: 'fr_FR',
	},
} as const;

export const DEV_API = import.meta.env.VITE_VENDURE_DEV_URL || 'https://vendure.allforwind.com';
export const PROD_API = import.meta.env.VITE_VENDURE_PROD_URL || 'https://vendure.allforwind.com';
export const LOCAL_API = import.meta.env.VITE_VENDURE_LOCAL_URL || 'http://localhost:3000';
