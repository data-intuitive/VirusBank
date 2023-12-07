const fs = require('fs')
const { Liquid } = require('liquidjs')
// const Exceljs = require('exceljs')

let data = fs.readFileSync('toolbox/toolbox.json')
let toolbox = JSON.parse(data)

// // ----

// function basicEncode(str) {
//   return str.toLowerCase().replace(/\ /g, "_")
// }

// function encodeTool(arr) {
//   return arr.map(tool => ({...tool, encoded: basicEncode(tool.name) }) )
// }

// // If a virus (virus_id or abbreviation in Excel file) is present in the annotations file,
// // return the object.
// // Returns 'undefined' when not present.
// function virusInfoOrUndefinedF(annotations_) {
//   return (virus_id) => annotations_.filter(v => v.virus_id.replace(/^'+|'+$/g, '') == virus_id || v.abbreviation == virus_id)[0]
// }

// // Simple true/false 
// function availableVirusInfoF(annotations_) {
//   return (virus_id) => virusInfoOrUndefinedF(annotations_)(virus_id) ? true : false
// }

// // If no tools are available yet, but the virus is important:
// function virusOfInterestF(annotations_) {
//   return (virus_id) =>
//       (availableVirusInfoF(annotations_)(virus_id))
//       ? virusInfoOrUndefinedF(annotations_)(virus_id).virus_of_interest == "Yes"
//       : false
// }
//  
// function availableToolsF(annotations_, toolbox_) {
//   return (virus_id) =>
//       (availableVirusInfoF(annotations_)(virus_id))
//       ? toolbox_.flatMap(tool => virusInfoOrUndefinedF(annotations_)(virus_id)[tool.encoded] ? tool.encoded : [] )
//       : []
// }

// function availableToolObjsF(annotations_, toolbox_) {
//   return (virus_id) =>
//       (availableVirusInfoF(annotations_)(virus_id))
//       ? toolbox_.flatMap(tool => virusInfoOrUndefinedF(annotations_)(virus_id)[tool.encoded] ? tool : [] )
//       : []
// }

// ----

// console.log(toolbox)

// const args = require('minimist')(process.argv.slice(2));

// console.log(">> -i argument " + args.i)
// console.log(">> -o argument " + args.o)
// const family = args.i.replace("/", "")
// const overwrite = args.o == "yes"
// console.log(">> Directory/family to process: " + family)
// console.log(">> Overwriting... " + overwrite )

const engine = new Liquid({
  root: ['toolbox/'],
  extname: ".template"
})

// let template = fs.readFileSync('toolbox/toolbox.template')

// _details.qmd
// const template =
//   '{% for tool in toolbox  %}' +
//   '<h2 id="{{tool.id}}-section">{{tool.name}}</h2>\n\n' +
//   '{{ tool.description }}\n\n' +
//   '{% endfor %}'

// const families = [ "alphaviruses" ]

// const annotations_ = families.map( async family => {

//   const wb = new Exceljs.Workbook()
//   const workbook = wb.xlsx.readFile(family + "/family.xlsx", { header: true })
//   return workbook.then(ws => {

//     // data
//     let titles = [];
//     let data = [];

//     // excel to json converter (only the first sheet)
//     ws.worksheets[0].eachRow((row, rowNumber) => {
//         // rowNumber 0 is empty
//         if (rowNumber > 0) {
//             // get values from row
//             let rowValues = row.values;
//             // remove first element (extra without reason)
//             rowValues.shift();
//             // titles row
//             if (rowNumber === 1) titles = rowValues;
//             // table data
//             else {
//                 // create object with the titles and the row values (if any)
//                 let rowObject = {}
//                 for (let i = 0; i < titles.length; i++) {
//                     let title = titles[i].trim();
//                     let value = rowValues[i] ? rowValues[i].trim() : '';
//                     rowObject[title] = value;
//                 }
//                 data.push(rowObject);
//             }
//         }
//     })

//     const filtered = data.filter(virus => virus.availability_in_toolbox == "Yes")
//     // console.log(filtered)
//     return filtered
//   })
// })

// annotationsP = Promise.all(annotations_)
//   .then( annotations => {

//     const all = annotations.flat()

//     // Call the factory functions to get specialized lookups
//     const virusInfoOrUndefined = virusInfoOrUndefinedF(annotations)
//     const availableVirusInfo = availableVirusInfoF(annotations)
//     const availableTools = availableToolsF(annotations, toolbox)
//     const virusOfInterest = virusOfInterestF(annotations)

//     console.log(tools)

//   })

  const result = engine
      .renderFileSync("toolbox", { toolbox: toolbox })

  // console.log(result)
  console.log(">> Writing " + "toolbox/toolbox_content.qmd")
  fs.writeFile("toolbox/toolbox_content.qmd", result, (err) => { if (err) throw err })

// Create a denormalized list of tools -> family -> virus
// denormalized_list = 
//   toolbox 
//     .flatMap(tool => {
//       annotations.flatMap(family => {
//         family.info.map( virus => {
//           const this_toolbox = (virus.toolbox != undefined) ? virus.toolbox: []
//           if (this_toolbox.filter(t => t == tool.id).length > 0) {
//             ({
//               family: family.family,
//               virus: virus.name,
//               virus_id: virus.id,
//               tool: tool.name,
//               tool_id: tool.id
//             })
//           }
//         })
//       })
//     })
//   .filter(el => el != undefined)


//   // Individual <virus>.qmd and _<virus>.qmd files
//   filteredData.forEach(virus => {

//     // <virus>.qmd
//     const virusTemplate = '---\n' +
//       'title: {{ virus.virus_name | replace: "\n", "" }} ({{ virus.abbreviation }})\n' +
//       'params:\n' +
//       '  family: ' + family + '\n' +
//       '---\n\n' +
//       '```{r}\n' +
//       '#| echo: false\n' +
//       'ojs_define(virusFamily = params$family)\n' +
//       '```\n\n' + 
//       '{% raw %}{{< include{% endraw %} _{{ virus.abbreviation }}{% raw %}.qmd >}}{% endraw %}\n\n' +
//       '{% raw %}{{< include{% endraw %} /_js/ojs_data.qmd {% raw %}>}}{% endraw %}\n\n'

//     const virusResult = engine
//     .parseAndRenderSync(virusTemplate, { virus: virus })

//     console.log(" >> Writing " + family + "/" + virus.abbreviation + ".qmd")
//     fs.writeFile(family + "/" + virus.abbreviation + ".qmd", virusResult, (err) => { if (err) throw err })

//     // _<virus>.qmd
//     const _virusTemplate = '::: {.panel-tabset}\n'  +
//       '\n' +
//       '## Symptoms\n' +
//       '\n' +
//       '::: {.text-center}\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-symptoms-fig.qmd >}} {% endraw %}\n' +
//       '\n' +
//       '&nbsp;\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-symptoms.qmd >}} {% endraw %}\n' +
//       '\n' +
//       ':::\n' +
//       '\n' +
//       '## Transmission\n' +
//       '\n' +
//       '::: {.text-center}\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-transmission-fig.qmd >}} {% endraw %}\n' +
//       '\n' +
//       '&nbsp;\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-transmission.qmd >}} {% endraw %}\n' +
//       '\n' +
//       ':::\n' +
//       '\n' +
//       '## Medical relevance\n' +
//       '\n' +
//       '::: {.text-center}\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-relevance-fig.qmd >}} {% endraw %}\n' +
//       '\n' +
//       '&nbsp;\n' +
//       '\n' +
//       '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-relevance.qmd >}} {% endraw %}\n' +
//       '\n' +
//       ':::\n' +
//       '\n' +
//       '## Toolbox\n' +
//       '\n' +
//       '```{ojs}\n' +
//       '//| output: none\n' +
//       '//| echo: false\n' +
//       '\n' +
//       'renderTools(toolsForVirus("{{ family }}", "{{ virus.abbreviation }}"))\n' +
//       '\n' +
//       '```' +
//       '\n' +
//       ':::'

//     const _virusResult = engine
//       .parseAndRenderSync(_virusTemplate, { virus: virus })

//     console.log(" >> Writing " + family + "/_" + virus.abbreviation + ".qmd")
//     fs.writeFile(family + "/_" + virus.abbreviation + ".qmd", _virusResult, (err) => { if (err) throw err })
//    
//     // Write out include files if they don't exist yet, text as well as figs
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-symptoms.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-symptoms.qmd")
//       const text = "Placeholder __text__ for symptoms related to " + virus.virus_name
//       fs.writeFile(family + "/_" + virus.abbreviation + "-symptoms.qmd", text, (err) => { if (err) throw err })
//     }
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-transmission.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-transmission.qmd")
//       const text = "" // should be empty for transmission, the figure is enough
//       fs.writeFile(family + "/_" + virus.abbreviation + "-transmission.qmd", text, (err) => { if (err) throw err })
//     }
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-relevance.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-relevance.qmd")
//       const text = "Placeholder __text__ for relevance related to " + virus.virus_name
//       fs.writeFile(family + "/_" + virus.abbreviation + "-relevance.qmd", text, (err) => { if (err) throw err })
//     }

//     console.log(" >> Write placeholder figures to be replaced")
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-symptoms-fig.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-symptoms-fig.qmd")
//       const text = "![Placeholder __caption__ for figure with symptoms related to " + virus.virus_name + "](/img/placeholder.jpg)"
//       fs.writeFile(family + "/_" + virus.abbreviation + "-symptoms-fig.qmd", text, (err) => { if (err) throw err })
//     }
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-transmission-fig.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-transmission-fig.qmd")
//       const text = "![Placeholder __caption__ for figure with transmission related to " + virus.virus_name + "](/img/placeholder.jpg)"
//       fs.writeFile(family + "/_" + virus.abbreviation + "-transmission-fig.qmd", text, (err) => { if (err) throw err })
//     }
//     if (!fs.existsSync(family + "/_" + virus.abbreviation + "-relevance-fig.qmd") || overwrite ) {
//     // if (true) {
//       console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-relevance-fig.qmd")
//       const text = "![Placeholder __caption__ for figure with relevance related to " + virus.virus_name + "](/img/placeholder.jpg)"
//       fs.writeFile(family + "/_" + virus.abbreviation + "-relevance-fig.qmd", text, (err) => { if (err) throw err })
//     }
//     

//   })

// })


