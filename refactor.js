const fs = require('fs');
const path = require('path');

const files = [
  'app/page.tsx',
  'app/overview/page.tsx',
  'app/upload/page.tsx',
  'app/analysis/page.tsx',
  'app/jobs/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Badge/Card Backgrounds (White)
  content = content.replace(/backgroundColor:\s*"(#fff|#ffffff)"/gi, 'backgroundColor: "transparent"');
  content = content.replace(/style={{[\s\S]*?backgroundColor:\s*"transparent"[\s\S]*?}}/g, (match) => {
    // If it's a style with transparent background, it originally had white.
    // Wait, this is hard to inject className.
    return match;
  });

  // A safer approach for string replacement that handles className injection:
  // We'll replace the full string of React JSX elements if they match standard patterns.
});
