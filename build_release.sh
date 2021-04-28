set -ex
mkdir -p build
cp -r extern build/
wasm-pack build --target web
npx ttsc -p .
cp -r pkg build/
# npx esbuild build/ts/worker/ai_worker.js --bundle --minify --outfile=ai_worker.js 
mkdir -p release_build/pkg
npx esbuild build/ts/entry.js --bundle --minify --outfile=release_build/entry.js --define:window.PRODUCTION=true
# cp ai_worker.js release_build/ai_worker.js
cp pkg/*.wasm release_build/pkg/
# cp -r res release_build/
sed "s/<script type=\"module\" src=\"\.\/build\/ts\/entry\.js\"><\/script>/<script src=\"\/entry.js\"><\/script>/" index.html > release_build/index.html
python3 -m http.server --directory release_build