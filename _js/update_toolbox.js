const fs = require('fs')
const { Liquid } = require('liquidjs')

let data = fs.readFileSync('toolbox/toolbox.json')
let toolbox = JSON.parse(data)

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

const result = engine
    .renderFileSync("toolbox", { toolbox: toolbox })

// console.log(result)
console.log(">> Writing " + "toolbox/toolbox_content.qmd")
fs.writeFile("toolbox/toolbox_content.qmd", result, (err) => { if (err) throw err })

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


