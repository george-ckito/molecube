export default 'const glob = require("glob");\n' +
  'const {promisify} = require("util");\n' +
  "const proGlob = promisify(glob);\n" +
  "\n" +
  "async function loadFiles(dirName) {\n" +
  "  const Files = await proGlob(\n" +
  '    `${process.cwd().replace(/\\\\/g, "/")}/${dirName}/**/*.js`\n' +
  "  );\n" +
  "  Files.forEach((file) => delete require.cache[require.resolve(file)]);\n" +
  "  return Files;\n" +
  "}\n" +
  "\n" +
  "module.exports = { loadFiles };\n";
