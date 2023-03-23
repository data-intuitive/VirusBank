[
  {
    "id": "cpe",
    "name": "CPE reduction assay",
    "description": "This antiviral assay measures the ability of a tested compound to protect infected cells from virus-induced cytopathic effects (mostly virus-induced cell death). The cell viability can be determined in a colorimetric assay using MTS/PMS method.",
    "available": [ "CHIKV", "RRV", "MAYV" ],
    "optimization": [ "SINV", "SFV" ]
  },
  {
    "id": "yield",
    "name": "Virus yield assay",
    "description": "This antiviral assay measures the ability of a tested compound to inhibit the viral replication in an infected cell culture through quantifying the viral RNA and the infectious virus loads released in the supernatant. This assay can be used for validation of compounds that show efficacy in CPE-reduction assays and to confirm that the compounds have direct effect on viral replication (not only cytoprotective).",
    "available": [ "CHIKV", "MAYV" ],
    "optimization": [ "RRV", "SINV", "SFV" ]
  },
  {
    "id": "delay",
    "name": "Delay of Treatment assay",
    "description": "This a test to determine the stage(s) of the viral replication cycle at which the compound exerts its antiviral effect. Briefly, cells are treated with the compound at different time points prior or after the infection with the virus then cells are incubated for example until the end of one or 2 replication cycles. At the end of incubation, the intracellular and extracellular viral RNA loads at each time point are quantified by qRT-PCR to determine at which stage(s) the compound is still effective and when it loses its antiviral efficacy.",
    "available": [ "CHIKV", "MAYV"],
    "optimization": []
  },
  {
    "id": "qrt-pcr",
    "name": "Quantitatie reverse-transcriptase PCR (qRT-PCR)",
    "description": "This technique is used for quantification of genome copies for RNA viruses in samples of interest for e.g. virus stock, clinical samples, compound-treated cells or tissues. First, a targeted region of the viral RNA is transcribed into complementary DNA (cDNA) by reverse transcriptase from total RNA. The cDNA is then used as the template for the quantitative PCR reaction where DNA binding fluorescent dye such as SYBR green or a labelled virus specific probe such as TaqMan® probes is used to detect the DNA amplification and hence enable quantification of the genome copies in the original samples (by including serial dilutions of a standard material with known genome copies in the same run).",
    "available": [ "CHIKV", "RRV", "SINV", "SFV", "MAYV"],
    "optimization": []
  },
  {
    "id": "animal",
    "name": "Animal models",
    "description": "",
    "available": [ "CHIKV", "RRV" ],
    "models": [
      {
        "id": "AG129",
        "species": "mice",
        "name": "Lethal model (with neurological symptoms)"
      },
      {
        "id": "C57BL/6",
        "species": "mice",
        "name": "Footpad arthritis model"
      }
    ]
  }
]
