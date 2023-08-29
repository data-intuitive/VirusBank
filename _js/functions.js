export function basicEncode(str) {
  return str.toLowerCase().replace(/\ /g, "_")
}

export function encodeTool(tool) {
  return ({...tool, encoded: basicEncode(tool.name) })
}

export function encodeToolbox(arr) {
  return arr.map(tool => encodeTool(tool) )
}

// If a virus (virus_id or abbreviation in Excel file) is present in the annotations file,
// return the object.
// Returns 'undefined' when not present.
export function virusInfoOrUndefinedF(annotations_) {
  return (virus_id) => annotations_.filter(v => v.virus_id.replace(/^'+|'+$/g, '') == virus_id || v.abbreviation == virus_id)[0]
}

// Simple true/false 
export function availableVirusInfoF(annotations_) {
  return (virus_id) => virusInfoOrUndefinedF(annotations_)(virus_id) ? true : false
}

// If no tools are available yet, but the virus is important:
export function virusOfInterestF(annotations_) {
  return (virus_id) =>
      (availableVirusInfoF(annotations_)(virus_id))
      ? virusInfoOrUndefinedF(annotations_)(virus_id).virus_of_interest == "Yes"
      : false
}
 
export function availableToolsF(annotations_, toolbox_) {
  return (virus_id) =>
      (availableVirusInfoF(annotations_)(virus_id))
      ? toolbox_.flatMap(tool => virusInfoOrUndefinedF(annotations_)(virus_id)[tool.encoded] ? tool.encoded : [] )
      : []
}

export function availableToolObjsF(annotations_, toolbox_) {
  return (virus_id) =>
      (availableVirusInfoF(annotations_)(virus_id))
      ? toolbox_.flatMap(tool => virusInfoOrUndefinedF(annotations_)(virus_id)[tool.encoded] ? tool : [] )
      : []
}
