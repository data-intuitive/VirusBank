const Exceljs = require('exceljs')
const fs = require('fs')
const { Liquid } = require('liquidjs')
const args = require('minimist')(process.argv.slice(2));

function main() {

  console.log(">> -i argument " + args.i)
  console.log(">> -o argument " + args.o)
  const family = args.i.replace("/", "")
  const overwrite = args.o == "yes"
  console.log(">> Directory/family to process: " + family)
  console.log(">> Overwriting... " + overwrite )

  update_family(family, overwrite)
}

if (require.main === module) {
  main()
}

function update_family(family, overwrite) {

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
                    let title = titles[i].trim();
                    let value = rowValues[i] ? rowValues[i].trim() : '';
                    rowObject[title] = value;
                }
                data.push(rowObject);
            }
        }
    })

    filteredData = data
      .filter(virus => virus.availability_in_toolbox == "Yes")
      // Handle grouping
      .map(virus => {
        if (typeof virus.group_abbreviation !== "undefined" && virus.group_abbreviation !== "") {
          console.log(">>> Virus " + virus.abbreviation + " belongs to group " + virus.group_abbreviation)
          return ({... virus, abbreviation: virus.group_abbreviation, virus_name: virus.group_virus_name })
        } else {
          console.log(">>> Virus " + virus.abbreviation)
          return virus
        }
      }).filter((value, index, self) => {
        return self.findIndex(v => v.abbreviation === value.abbreviation) === index;
      })

    // 
    const engine = new Liquid()


    // _details.qmd
    const template =
      ':::: {.panel-tabset #vb-tabset}\n\n' +
      '{% for virus in data  %}' +
      '## {{ virus.abbreviation }}\n\n' +
      '{% raw %}{{< include {% endraw %} _{{ virus.abbreviation }}{% raw %}.qmd >}}{% endraw %}\n\n' +
      ':::{ style="text-align:center;font-weight:500" }\n' + 
      '[open virus page](/{{ family }}/{{ virus.abbreviation }}.qmd) / [reload family page](/{{ family }}/)\n' +
      ':::\n\n' +
      '{% endfor %}' +
      '::::'

    const result = engine
        .parseAndRenderSync(template, { data: filteredData, family: family })

    console.log(">> Writing " + family + "/_details.qmd")
    fs.writeFile(family + "/_details.qmd", result, (err) => { if (err) throw err })

    console.log(">> Writing Individual virus files")

    // Individual <virus>.qmd and _<virus>.qmd files
    filteredData.forEach(virus => {

      // <virus>.qmd
      const virusTemplate = '---\n' +
        'params:\n' +
        '  family: ' + family + '\n' +
        '  virus: {{ virus.virus_name | replace: "\n", "" }} ({{ virus.abbreviation }})\n' +
        '---\n\n' +
        '```{r}\n' +
        '#| echo: false\n' +
        'ojs_define(virusFamily = params$family)\n' +
        'ojs_define(virus = params$virus)\n' +
        '```\n\n' + 
        '{% raw %}{{< include{% endraw %} /_js/virus-breadcrumb.qmd {% raw %}>}}{% endraw %}\n\n' +
        '{% raw %}{{< include{% endraw %} _{{ virus.abbreviation }}{% raw %}.qmd >}}{% endraw %}\n\n' +
        '{% raw %}{{< include{% endraw %} /_js/_ojs_data.qmd {% raw %}>}}{% endraw %}\n' +
        '{% raw %}{{< include{% endraw %} /_js/_ojs_family.qmd {% raw %}>}}{% endraw %}\n\n'

      const virusResult = engine
      .parseAndRenderSync(virusTemplate, { virus: virus })

      console.log(" >> Writing " + family + "/" + virus.abbreviation + ".qmd")
      fs.writeFile(family + "/" + virus.abbreviation + ".qmd", virusResult, (err) => { if (err) throw err })

      // _<virus>.qmd
      const _virusTemplate = '::: {.panel-tabset}\n'  +
        '\n' +
        '## Symptoms\n' +
        '\n' +
        '::: {.virus-figure}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-symptoms-fig.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '::: {.virus-text}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-symptoms.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '## Transmission\n' +
        '\n' +
        '::: {.virus-figure}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-transmission-fig.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '::: {.virus-text}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-transmission.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '## Medical relevance\n' +
        '\n' +
        '::: {.virus-figure}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-relevance-fig.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '::: {.virus-text}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-relevance.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '## Toolbox\n' +
        '\n' +
        '::: {.virus-toolbox}\n' +
        '\n' +
        '{% raw %}{{< include _{% endraw %}{{ virus.abbreviation }}{% raw %}-toolbox.qmd >}} {% endraw %}\n' +
        '\n' +
        ':::\n' +
        '\n' +
        '```{ojs}\n' +
        '//| output: none\n' +
        '//| echo: false\n' +
        '\n' +
        'renderVirusToolbox("' + family + '", "{{ virus.abbreviation }}")\n' +
        '\n' +
        '```' +
        '\n' +
        ':::'

      const _virusResult = engine
        .parseAndRenderSync(_virusTemplate, { virus: virus })

      console.log(" >> Writing " + family + "/_" + virus.abbreviation + ".qmd")
      fs.writeFile(family + "/_" + virus.abbreviation + ".qmd", _virusResult, (err) => { if (err) throw err })
     
      // Write out include files if they don't exist yet, text as well as figs
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-symptoms.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-symptoms.qmd")
        const text = "Placeholder __text__ for symptoms related to " + virus.virus_name
        fs.writeFile(family + "/_" + virus.abbreviation + "-symptoms.qmd", text, (err) => { if (err) throw err })
      }
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-transmission.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-transmission.qmd")
        const text = "" // should be empty for transmission, the figure is enough
        fs.writeFile(family + "/_" + virus.abbreviation + "-transmission.qmd", text, (err) => { if (err) throw err })
      }
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-relevance.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-relevance.qmd")
        const text = "Placeholder __text__ for relevance related to " + virus.virus_name
        fs.writeFile(family + "/_" + virus.abbreviation + "-relevance.qmd", text, (err) => { if (err) throw err })
      }

      console.log(" >> Write placeholder figures to be replaced")
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-symptoms-fig.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-symptoms-fig.qmd")
        const text = "![Placeholder __caption__ for figure with symptoms related to " + virus.virus_name + "](/img/placeholder.jpg)"
        fs.writeFile(family + "/_" + virus.abbreviation + "-symptoms-fig.qmd", text, (err) => { if (err) throw err })
      }
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-transmission-fig.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-transmission-fig.qmd")
        const text = "![Placeholder __caption__ for figure with transmission related to " + virus.virus_name + "](/img/placeholder.jpg)"
        fs.writeFile(family + "/_" + virus.abbreviation + "-transmission-fig.qmd", text, (err) => { if (err) throw err })
      }
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-relevance-fig.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-relevance-fig.qmd")
        const text = "![Placeholder __caption__ for figure with relevance related to " + virus.virus_name + "](/img/placeholder.jpg)"
        fs.writeFile(family + "/_" + virus.abbreviation + "-relevance-fig.qmd", text, (err) => { if (err) throw err })
      }
      if (!fs.existsSync(family + "/_" + virus.abbreviation + "-toolbox.qmd") || overwrite ) {
      // if (true) {
        console.log(" >> Writing " + family + "/_" + virus.abbreviation + "-toolbox.qmd")
        const text = ""
        fs.writeFile(family + "/_" + virus.abbreviation + "-toolbox.qmd", text, (err) => { if (err) throw err })
      }
      

    })

  })

}

module.exports = update_family
