const fs = require('fs');
const path = require('path');

function patchFile(filePath) {
	if (!fs.existsSync(filePath)) return;
	let content = fs.readFileSync(filePath, 'utf8');
	if (content.includes('// Patch: Qwik 2')) return;

	const target = 'const key = JSON.parse(argExprs.shift());';
	const replacement = `// Patch: Qwik 2 rc optimizer
    const rawArg = argExprs.shift();
    let key;
    try {
      key = JSON.parse(rawArg);
    } catch {
      key = rawArg.replace(/^[\`"]+|[\`"]+$/g, "");
    }`;

	if (content.includes(target)) {
		content = content.replace(target, replacement);
		fs.writeFileSync(filePath, content, 'utf8');
		console.log('Successfully patched:', filePath);
	}
}

function findAndPatch(dir) {
	if (!fs.existsSync(dir)) return;
	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (entry.name !== '.git') findAndPatch(fullPath);
			} else if (entry.name === 'transform-localize.mjs') {
				patchFile(fullPath);
			}
		}
	} catch (e) {
		// ignore
	}
}

findAndPatch(path.join(__dirname, '../node_modules'));
