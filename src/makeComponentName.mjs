export function makeComponentName(imgName) {
  return capitalize(kebabCaseToCamelCase(imgName));
}

function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z,0-9])/g, (g) => g[1].toUpperCase());
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
