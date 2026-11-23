import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ send }) => {
	const content = `# ALL FOR WIND — Complete Knowledge Base

> Comprehensive specifications, product catalog, and store information for ALL FOR WIND (allforwind.com), official Eleveight partner for performance kitesurfing, wingfoiling, hydrofoils, and boards.

## About ALL FOR WIND
ALL FOR WIND is a premier online performance shop specializing in high-grade watersports equipment:
- Brand Partner: Official Eleveight Partner (Eleveight Kites, Wings, Boards, and Accessories).
- Core Disciplines: Kitesurfing, Wingfoiling, Hydrofoiling, Twintip Boards, and Foil Packages.
- Target Audience: Watersports enthusiasts ranging from ambitious beginners to seasoned pro riders seeking uncompromising performance, durability, and innovation.
- Store URL: https://allforwind.com
- Supported Currencies & Markets: European Union (EUR), Worldwide delivery.
- Languages: German (de), English (en), Spanish (es).

## Product Collections & Details

### 1. Foils
- Collection URL: https://allforwind.com/collections/foils
- Description: Advanced carbon and aluminum hydrofoils engineered for maximum gliding efficiency, ultra-low stall speeds, and responsive carving.
- Key Components:
  - Front Wings: High-aspect and mid-aspect wings optimized for pump-foiling, downwinders, wave riding, and freeride gliding.
  - Stabilizers / Rear Wings: Streamlined stabilizers designed for pitch stability and low drag.
  - Masts: Ultra-stiff high-modulus carbon and aircraft-grade aluminum masts ranging from 72cm to 90cm for optimal chop clearance.
  - Fuselages: CNC-milled fuselages providing rigid, play-free connections.

### 2. Foil Packages
- Collection URL: https://allforwind.com/collections/foil-packages
- Description: Fully assembled and modular hydrofoil packages ready to ride.
- Contents: Complete setup consisting of mast, fuselage, front wing, rear stabilizer, padded travel covers, and high-tensile titanium/stainless steel mounting hardware.
- Compatibility: Universal track-mount plate system compatible with all standard 90mm US foil tracks.

### 3. Kitesurfing
- Collection URL: https://allforwind.com/collections/kitesurfing
- Description: Industry-leading kiteboarding equipment engineered by Eleveight.
- Featured Models & Gear:
  - Eleveight RS / RS+: Versatile crossover / freeride delta-hybrid kite designed for massive hangtime, huge wind range, and fast turning.
  - Eleveight FS: High-performance freestyle and unhooked kite with direct steering feedback and explosive pop.
  - Eleveight XS: Dedicated Big Air kite built for extreme boosts and storm chasers.
  - Eleveight WS: Wave-specific kite offering drift stability and rapid pivot turning.
  - Eleveight CS Vary Control Bars: Single front-line safety flagout, ceramic bearings, quick-release auto-untwist, and variable bar length.

### 4. Wingfoiling
- Collection URL: https://allforwind.com/collections/wing-foiling
- Description: Modern inflatable wings and compact wing boards.
- Features:
  - Eleveight WFS & WFS Pro: Ergonomic rigid handles or carbon boom, lightweight canopy framing, quick acceleration, and neutral drift during wave riding.
  - Wing Boards: Compact shapes with double concave hulls for effortless early release and smooth water touchdowns.

### 5. Twintip Boards
- Description: High-performance twin-tip kiteboards.
- Key Models:
  - Commander: Pure carbon freestyle board for maximum pop and aggressive load-and-pop.
  - Master / Master C+: High-performance freeride / freestyle board featuring parabolic rail design and CNC Paulownia wood core.
  - Process / Process C+: Ultra-comfortable freeride twintip for effortless upwind riding and smooth chop eating.

## Customer Experience & Store Policies
- Shipping & Logistics: Fast insured shipping across Europe and international destinations with heavy-duty protective packaging.
- Customer Consultation: Expert advice from active kiters and foilers to choose the ideal kite size, mast length, and wing foil area.
- Warranty: Manufacturer warranty on all Eleveight products.
- Checkout & Security: Secure SSL-encrypted payment processing supporting credit/debit cards, PayPal, Klarna, and Apple Pay/Google Pay.

## Main Navigation & Index
- [Home](https://allforwind.com/): Storefront homepage featuring latest collections and seasonal highlights.
- [Foils Collection](https://allforwind.com/collections/foils): Hydrodynamic precision foils and carbon wings.
- [Foil Packages Collection](https://allforwind.com/collections/foil-packages): All-in-one hydrofoil packages.
- [Kitesurfing Collection](https://allforwind.com/collections/kitesurfing): Kites, bars, harnesses, and accessories.
- [Wingfoiling Collection](https://allforwind.com/collections/wing-foiling): Wings, boards, and wing foil packages.
- [Product Search](https://allforwind.com/search): Interactive catalog search with facet filtering.
- [German Storefront](https://allforwind.com/?lang=de): German language storefront.
- [English Storefront](https://allforwind.com/?lang=en): English language storefront.
- [Spanish Storefront](https://allforwind.com/?lang=es): Spanish language storefront.
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
