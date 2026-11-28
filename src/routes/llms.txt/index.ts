import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ send }) => {
	const content = `# ALL FOR WIND

> Performance Shop for Kitesurfing, Wingfoiling, Hydrofoils, and Twintip Boards. Official Eleveight Partner.

## Main Collections
- [Foils](https://allforwind.com/collections/foils): Hydrodynamic precision carbon foils, front wings, stabilizers, and masts for early lift and high efficiency.
- [Foil Packages](https://allforwind.com/collections/foil-packages): Complete hydrofoil setups including mast, fuselage, front wing, and stabilizer for wings and kites.
- [Kitesurfing](https://allforwind.com/collections/kitesurfing): High performance freeride, big air, freestyle kites, control bars, and accessories by Eleveight.
- [Wingfoiling](https://allforwind.com/collections/wing-foiling): Lightweight performance wings, wing boards, and accessories for effortless flight above the water.

## Regional Storefronts & Localization
- [English Storefront (Default)](https://allforwind.com/): Official English global storefront.
- [German Storefront](https://allforwind.com/de/): Official German storefront.
- [Spanish Storefront](https://allforwind.com/es/): Official Spanish storefront.

## Company & Customer Support
- Operator: Kitesurf Mallorca SL (CIF: ES-B57774572, Carrer Greco 19, 07400 Alcúdia, Illes Balears, Spain)
- Certifications: Spanish Maritime Watersports School Registry, VDWS Licensed Center Since 2013, Official Eleveight Pro Partner & Testcenter
- [About Us](https://allforwind.com/about): Brand history, Eleveight partnership, and team.
- [Shipping & Delivery](https://allforwind.com/shipping): European delivery times, rates, free shipping over 499 EUR.
- [Returns & Cancellation](https://allforwind.com/returns): 30-day returns, statutory withdrawal right, warranty.
- [Contact & Support](https://allforwind.com/contact): Customer care and technical gear advice (support@allforwind.com).
- [FAQ](https://allforwind.com/faq): Frequently asked questions.
- [Imprint](https://allforwind.com/imprint): Legal notice and company details.
- [Privacy Policy](https://allforwind.com/privacy): GDPR-compliant privacy terms.
- [Terms & Conditions](https://allforwind.com/terms): General terms for online orders.

## Optional
- [Full LLM Knowledge Base](https://allforwind.com/llms-full.txt): Comprehensive product catalog, brand specifications, and technical details.
- [XML Sitemap](https://allforwind.com/sitemap.xml): Complete URL index of collections and products.
`;
	send(
		new Response(content, {
			status: 200,
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8',
				'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
			},
		})
	);
};
