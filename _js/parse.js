const Exceljs = require('exceljs')
const fs = require('fs')
const { Liquid } = require('liquidjs')
const args = require('minimist')(process.argv.slice(2));

console.log(">> -i argument " + args.i)
const family = args.i.replace("/", "")
console.log(">> Directory/family to process: " + family)

const wb = new Exceljs.Workbook()
const workbook = wb.xlsx.readFile(family + "/family.xlsx", { header: true })
 
workbook.then(ws => {

  // data
  let titles = [];
  let data = [];

  // excel to json converter (only the first sheet)
  ws.worksheets[0].eachRow((row, rowNumber) => {
      // rowNumber 0 is empty
      if (rowNumber > 0) {
          // get values from row
          let rowValues = row.values;
          // remove first element (extra without reason)
          rowValues.shift();
          // titles row
          if (rowNumber === 1) titles = rowValues;
          // table data
          else {
              // create object with the titles and the row values (if any)
              let rowObject = {}
              for (let i = 0; i < titles.length; i++) {
                  let title = titles[i];
                  let value = rowValues[i] ? rowValues[i] : '';
                  rowObject[title] = value;
              }
              data.push(rowObject);
          }
      }
  })

  filteredData = data.filter(virus => virus.availability_in_toolbox == "Yes")
  
  const engine = new Liquid()


  // _details.qmd
  const template =
    ':::: {.panel-tabset #vb-tabset}\n\n' +
    '{% for virus in data  %}' +
    '## {{ virus.virus_name }}\n\n' +
    '{% raw %}{{< include {% endraw %} _{{ virus.abbreviation }}{% raw %}.qmd >}}{% endraw %}\n\n' +
    ':::{ style="text-align:center;font-weight:500" }\n' + 
    '[open virus page](/{{ family }}/{{ virus.abbreviation }}.qmd) / [reload family page](/{{ family }}/)\n' +
    ':::\n\n' +
    '{% endfor %}' +
    '::::'

  const result = engine
      .parseAndRenderSync(template, { data: filteredData, family: "beta" })

  console.log(">> Writing " + family + "/_details.qmd")
  fs.writeFile(family + "/_details.qmd", result, (err) => { if (err) throw err })

  console.log(">> Writing Individual virus files")

  // Individual <virus>.qmd and _<virus>.qmd files
  filteredData.forEach(virus => {

    // <virus>.qmd
    const virusTemplate = '---\n' +
      'title: {{ virus.virus_name }} ({{ virus.abbreviation }})\n' +
      '---\n\n' +
      '{% raw %}{{< include{% endraw %} _{{ virus.abbreviation }}{% raw %}.qmd >}}{% endraw %}\n\n' +
      '{% raw %}{{< include{% endraw %} ojs_data.qmd {% raw %}>}}{% endraw %}\n\n'

    const virusResult = engine
    .parseAndRenderSync(virusTemplate, { virus: virus })

    console.log(" >> Writing " + family + "/" + virus.abbreviation + ".qmd")
    fs.writeFile(family + "/" + virus.abbreviation + ".qmd", virusResult, (err) => { if (err) throw err })

    // _<virus>.qmd
    const _virusTemplate = '::: {.panel-tabset}\n'  +
      '\n' +
      '## Symptoms\n' +
      '\n' +
      '::: {.grid}\n' +
      '\n' +
      '::: {.g-col-4}\n' +
      '\n' +
      '{% raw %} {{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-symptoms.qmd >}} {% endraw %}\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '::: {.g-col-8}\n' +
      '\n' +
      '![PLACEHOLDER for image](https://placehold.co/600x400)\n' +
      '\n' +
      ':::\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '## Transmission\n' +
      '\n' +
      '::: {.grid}\n' +
      '\n' +
      '::: {.g-col-4}\n' +
      '\n' +
      '{% raw %} {{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-transmission.qmd >}} {% endraw %}\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '::: {.g-col-8}\n' +
      '\n' +
      '![PLACEHOLDER for image](https://placehold.co/600x400)\n' +
      '\n' +
      ':::\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '## Medical relevance\n' +
      '\n' +
      '::: {.grid}\n' +
      '\n' +
      '::: {.g-col-6}\n' +
      '\n' +
      '{% raw %} {{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-relevance.qmd >}} {% endraw %}\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '::: {.g-col-6}\n' +
      '\n' +
      '![PLACEHOLDER for image](https://placehold.co/600x400)\n' +
      '\n' +
      ':::\n' +
      '\n' +
      ':::\n' +
      '\n' +
      '## Toolbox\n' +
      '\n' +
      '```{ojs}\n' +
      '//| output: none\n' +
      '//| echo: false\n' +
      '\n' +
      'virus_toolbox("alpha", "{{virus.abbreviation }}")\n' +
      '\n' +
      '```' +
      '\n' +
      ':::'

    const _virusResult = engine
      .parseAndRenderSync(_virusTemplate, { virus: virus })

    console.log(" >> Writing " + family + "/_" + virus.abbreviation + ".qmd")
    fs.writeFile(family + "/_" + virus.abbreviation + ".qmd", _virusResult, (err) => { if (err) throw err })
   
    // Write out include files if they don't exist yet
    // if (!fs.existsSync(family + "/_" + virus.abbreviation + "-symptoms.qmd")) {
    if (true) {
      console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-symptoms.qmd")
      const text = "Placeholder for symptoms related to " + virus.virus_name
      fs.writeFile(family + "/_" + virus.abbreviation + "-symptoms.qmd", text, (err) => { if (err) throw err })
    }
    // if (!fs.existsSync(family + "/_" + virus.abbreviation + "-transmission.qmd")) {
    if (true) {
      console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-transmission.qmd")
      const text = "Placeholder for transmission related to " + virus.virus_name
      fs.writeFile(family + "/_" + virus.abbreviation + "-transmission.qmd", text, (err) => { if (err) throw err })
    }
    // if (!fs.existsSync(family + "/_" + virus.abbreviation + "-relevance.qmd")) {
    if (true) {
      console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-relevance.qmd")
      const text = "Placeholder for relevance related to " + virus.virus_name
      fs.writeFile(family + "/_" + virus.abbreviation + "-relevance.qmd", text, (err) => { if (err) throw err })
    }
    

  })

})


