import { getLocale } from '@qwik.dev/core';
import { isBrowser } from '@qwik.dev/core/build';
import { server$ } from '@qwik.dev/router';
import type { DocumentNode } from 'graphql/index';
import { print } from 'graphql/index';
import { AUTH_TOKEN, DEV_API, HEADER_AUTH_TOKEN_KEY, PROD_API } from '~/constants';
import type { Options as RequesterOptions } from '~/graphql-wrapper';
import { getCookie, setCookie } from '.';

type ResponseProps<T> = { token: string; data: T };
type ExecuteProps<V> = { query: string; variables?: V };
type Options = { method: string; headers: Record<string, string>; body: string };

const baseUrl = import.meta.env.DEV ? DEV_API : PROD_API;
const shopApi = `${baseUrl}/shop-api`;

export const requester = async <R, V>(
	doc: DocumentNode,
	vars?: V,
	options: RequesterOptions = { token: '', apiUrl: shopApi, channelToken: '' }
): Promise<R> => {
	const rawLang = getLocale('en') || 'en';
	const lang = rawLang.split('_')[0].split('-')[0] || 'en';
	const targetUrl = options?.apiUrl ?? shopApi;
	options.apiUrl = targetUrl.includes('languageCode=')
		? targetUrl
		: `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}languageCode=${lang}`;
	return execute<R, V>({ query: print(doc), variables: vars }, options);
};

const execute = async <R, V = Record<string, any>>(
	body: ExecuteProps<V>,
	options: RequesterOptions
): Promise<R> => {
	const requestOptions = {
		method: 'POST',
		headers: createHeaders(),
		body: JSON.stringify(body),
	};
	if (options.token) {
		requestOptions.headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${options.token ?? ''}`,
		};
	}
	if (options.channelToken) {
		requestOptions.headers['vendure-token'] = options.channelToken;
	}

	const response: ResponseProps<R> =
		isBrowser && !import.meta.env.DEV
			? await executeOnTheServer(requestOptions, options.apiUrl!)
			: await executeRequest(requestOptions, options.apiUrl!);

	if (isBrowser && response.token) {
		setCookie(AUTH_TOKEN, response.token, 365);
	}

	return response.data;
};

const createHeaders = () => {
	let headers: Record<string, string> = { 'Content-Type': 'application/json' };
	if (isBrowser) {
		const token = getCookie(AUTH_TOKEN);
		headers = { ...headers, Authorization: `Bearer ${token}` };
	}
	return headers;
};

const executeOnTheServer = server$(async (options: Options, apiUrl: string) =>
	executeRequest(options, apiUrl)
);

const executeRequest = async (options: Options, apiUrl: string): Promise<ResponseProps<any>> => {
	const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
	const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

	let httpResponse: Response | null = null;
	try {
		httpResponse = await fetch(apiUrl, {
			...options,
			signal: controller?.signal,
		});
	} catch (error: any) {
		if (error?.name === 'AbortError') {
			console.error(`Request to ${apiUrl} timed out after 6000ms`);
		} else {
			console.error(`Could not fetch from ${apiUrl}. Reason:`, error);
		}
		return { token: '', data: {} };
	} finally {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	}

	if (!httpResponse) {
		return { token: '', data: {} };
	}

	return await extractTokenAndData(httpResponse, apiUrl);
};

const extractTokenAndData = async (
	response: Response,
	apiUrl: string
): Promise<ResponseProps<any>> => {
	try {
		const token = response.headers.get(HEADER_AUTH_TOKEN_KEY) || '';

		if (!response.ok) {
			const errorText = await response.text().catch(() => '');
			console.error(
				`HTTP error ${response.status} (${response.statusText}) from ${apiUrl}. Response preview: ${errorText.slice(0, 200)}`
			);
			return { token, data: {} };
		}

		const text = await response.text().catch(() => '');
		if (!text || !text.trim()) {
			console.warn(`Empty response body from ${apiUrl}`);
			return { token, data: {} };
		}

		let json: any;
		try {
			json = JSON.parse(text);
		} catch (parseErr) {
			console.error(
				`Failed to parse JSON from ${apiUrl}. Body preview: ${text.slice(0, 200)}`,
				parseErr
			);
			return { token, data: {} };
		}

		const { data, errors } = json || {};
		if (errors && errors.length > 0) {
			console.error(`GraphQL errors from ${apiUrl}:`, errors);
			return { token, data: data || {} };
		}

		return { token, data: data || {} };
	} catch (err) {
		console.error(`Unexpected error in extractTokenAndData from ${apiUrl}:`, err);
		return { token: '', data: {} };
	}
};
