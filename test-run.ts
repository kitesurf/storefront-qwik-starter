import { getCollectionBySlug } from './src/providers/shop/collections/collections';
async function run() {
	const c = await getCollectionBySlug('foil-packages', 'es');
	console.log('RESULT ES:', c?.name);
	const cDe = await getCollectionBySlug('foil-packages', 'de');
	console.log('RESULT DE:', cDe?.name);
}
run();
