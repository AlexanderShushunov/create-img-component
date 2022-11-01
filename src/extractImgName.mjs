export function extractImgName(nameFromArg) {
  return nameFromArg.split('/').at(-1).split('.').at(0)
}