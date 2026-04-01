const fs = require("fs");
const path = require("path");

// Netlify injects its build plugin under `.netlify/plugins` before running
// the site's build command. Removing `.netlify` in `prebuild` deletes the
// plugin package while it's still needed for the current build.
const targets = [".next"];

for (const target of targets) {
  const fullPath = path.join(process.cwd(), target);

  if (!fs.existsSync(fullPath)) {
    continue;
  }

  fs.rmSync(fullPath, {
    force: true,
    recursive: true,
  });

  console.log(`Removed ${target}`);
}
