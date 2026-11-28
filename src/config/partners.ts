export interface PartnerSchool {
	slug: string;
	name: string;
	location: string;
	contactEmail: string;
	couponCode: string;
	discountPercent: number;
	processingFeePercent: number; // default: 4.0%
	active: boolean;
	tagline: string;
	description: string;
	accentColor?: string;
}

export const PARTNER_REGISTRY: Record<string, PartnerSchool> = {
	'kite-mallorca': {
		slug: 'kite-mallorca',
		name: 'Kite-Mallorca Watersports',
		location: 'Alcúdia / Pollença, Mallorca, Spain',
		contactEmail: 'station@kite-mallorca.com',
		couponCode: 'KM10',
		discountPercent: 10,
		processingFeePercent: 4.0,
		active: true,
		tagline: 'Offizielle Partner-Kiteschule & Eleveight Testcenter Mallorca',
		description:
			'Ehemalige Schüler und Stationsgäste von Kite-Mallorca profitieren von 10 % Schülerrabatt auf das gesamte Eleveight Sortiment. Deine Station kümmert sich persönlich um deine Beratung, Wunschausstattung und Auslieferung.',
		accentColor: '#0284c7', // sky-600
	},
};

export const getPartner = (slug?: string | null): PartnerSchool | null => {
	if (!slug) return null;
	const partner = PARTNER_REGISTRY[slug.toLowerCase().trim()];
	if (partner && partner.active) {
		return partner;
	}
	return null;
};
