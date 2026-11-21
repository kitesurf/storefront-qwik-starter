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
export const DEFAULT_METADATA_IMAGE = 'https://allforwind.com/social-image.png';
export const DEFAULT_LOCALE = 'de';
export const DEV_API = import.meta.env.VITE_VENDURE_DEV_URL || 'https://vendure.allforwind.com';
export const PROD_API = import.meta.env.VITE_VENDURE_PROD_URL || 'https://vendure.allforwind.com';
export const LOCAL_API = import.meta.env.VITE_VENDURE_LOCAL_URL || 'http://localhost:3000';
