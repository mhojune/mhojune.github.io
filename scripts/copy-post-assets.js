const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "src", "content", "posts");
const publicPostsDir = path.join(__dirname, "..", "public", "posts");

function copyPostAssets(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyPostAssets(srcPath, destPath);
      continue;
    }

    if (!entry.name.endsWith(".md")) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(postsDir)) {
  process.exit(0);
}

if (fs.existsSync(publicPostsDir)) {
  fs.rmSync(publicPostsDir, { recursive: true, force: true });
}

for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const srcFolder = path.join(postsDir, entry.name);
  const destFolder = path.join(publicPostsDir, entry.name);
  copyPostAssets(srcFolder, destFolder);
}

console.log("Post assets copied to public/posts/");
