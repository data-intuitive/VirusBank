export function basicEncode(str) {
  return str.toLowerCase().replace(/\ /g, "_")
}

export function encodeTool(arr) {
  return arr.map(tool => ({...tool, encoded: basicEncode(tool.name) }) )
}
