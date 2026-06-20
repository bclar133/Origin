import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const rows = [
  [1, "Darren Lockyer", 1998, "Brisbane", "FB/Half", "electric ball-player", 26, 26, 94, 95, 82, 86, 88, 55, 94],
  [2, "Allan Langer", 1998, "Brisbane", "Half", "scheming halfback", 28, 28, 92, 91, 80, 87, 92, 32, 95],
  [3, "Gorden Tallis", 1998, "Brisbane", "Edge/Mid", "rampaging forward", 25, 25, 91, 87, 88, 91, 24, 10, 94],
  [4, "Anthony Minichiello", 2004, "Sydney Roosters", "FB/Wing", "regular fullback", 25, 25, 91, 96, 91, 94, 50, 61, 96],
  [5, "Andrew Johns", 2001, "Newcastle", "Half", "all-time halfback", 21, 21, 98, 97, 86, 91, 98, 88, 99],
  [6, "Danny Buderus", 2004, "Newcastle", "Hooker", "regular hooker", 22, 22, 83, 85, 87, 90, 69, 18, 86],
  [7, "Cameron Smith", 2007, "Melbourne", "Hooker/Half", "elite controller", 24, 24, 94, 90, 91, 95, 88, 90, 95],
  [8, "Billy Slater", 2008, "Melbourne", "FB", "regular fullback", 25, 25, 89, 94, 89, 92, 50, 61, 93],
  [9, "Greg Inglis", 2009, "Melbourne", "Centre/FB", "regular centre", 23, 23, 88, 91, 89, 91, 86, 66, 92],
  [10, "Johnathan Thurston", 2015, "North Queensland", "Half", "premiership halfback", 25, 25, 98, 97, 79, 88, 97, 95, 99],
  [11, "Cooper Cronk", 2012, "Melbourne", "Half", "regular playmaker", 26, 26, 91, 93, 91, 94, 87, 66, 96],
  [12, "Benji Marshall", 2005, "Wests Tigers", "Half/Centre", "spark five-eighth", 27, 26, 91, 94, 69, 83, 84, 42, 94],
  [13, "Jarryd Hayne", 2009, "Parramatta", "FB/Wing", "runaway fullback", 26, 26, 96, 98, 78, 88, 70, 65, 97],
  [14, "James Tedesco", 2019, "Sydney Roosters", "FB", "regular fullback", 25, 25, 91, 96, 91, 94, 50, 61, 96],
  [15, "Nathan Cleary", 2023, "Penrith", "Half", "regular playmaker", 23, 23, 91, 93, 91, 94, 86, 66, 96],
  [16, "Isaah Yeo", 2022, "Penrith", "Lock/Edge/Mid", "regular lock forward", 23, 23, 91, 91, 95, 97, 57, 18, 95],
  [17, "Payne Haas", 2023, "Brisbane", "Mid/Lock", "elite prop", 23, 23, 93, 86, 90, 96, 12, 10, 92],
  [18, "Cameron Munster", 2020, "Melbourne", "Half/FB", "regular playmaker", 18, 18, 90, 92, 90, 93, 85, 66, 94],
  [19, "Roger Tuivasa-Sheck", 2018, "Warriors", "FB/Wing", "regular fullback", 23, 23, 86, 91, 86, 89, 50, 61, 90],
  [20, "Tom Trbojevic", 2021, "Manly Warringah", "FB/Wing", "regular fullback", 18, 18, 86, 91, 86, 89, 49, 61, 90],
  [21, "Brian To'o", 2021, "Penrith", "Wing", "regular winger", 21, 21, 89, 92, 85, 92, 49, 18, 93],
  [22, "Josh Addo-Carr", 2017, "Melbourne", "Wing", "speed winger", 27, 27, 86, 89, 73, 82, 18, 10, 86],
  [23, "Jamie Lyon", 2011, "Manly Warringah", "Centre/Half", "regular centre", 25, 25, 90, 93, 91, 93, 50, 48, 95],
  [24, "Justin Hodges", 2006, "Brisbane", "Centre/FB", "power centre", 20, 20, 90, 91, 80, 85, 24, 10, 91],
  [25, "Matt Bowen", 2005, "North Queensland", "FB/Half", "regular fullback", 25, 25, 87, 92, 87, 90, 50, 61, 91],
  [26, "Preston Campbell", 2001, "Sharks", "Half/FB", "regular playmaker", 29, 29, 91, 93, 91, 94, 87, 66, 95],
  [27, "Nathan Hindmarsh", 2005, "Parramatta", "Edge/Mid", "regular edge forward", 21, 19, 84, 84, 88, 91, 49, 18, 87],
  [28, "Luke Priddis", 2003, "Penrith", "Hooker", "finals hooker", 26, 26, 88, 84, 84, 91, 66, 42, 92],
  [29, "Paul Gallen", 2016, "Cronulla-Sutherland", "Lock/Mid", "workload lock", 20, 19, 90, 82, 90, 96, 16, 10, 91],
  [30, "Jason Taumalolo", 2016, "North Queensland", "Lock/Mid", "regular lock forward", 28, 28, 89, 89, 93, 96, 58, 18, 93],
  [31, "Sam Burgess", 2014, "South Sydney", "Edge/Mid/Lock", "dominant forward", 26, 26, 94, 88, 91, 95, 18, 10, 97],
  [32, "Fuifui Moimoi", 2009, "Parramatta", "Mid", "impact prop", 28, 25, 87, 83, 82, 86, 12, 10, 88],
  [33, "Mark Riddell", 2004, "St George Illawarra", "Hooker", "regular hooker", 24, 23, 87, 89, 91, 94, 69, 18, 91],
  [34, "Shaun Johnson", 2014, "Warriors", "Half", "regular playmaker", 21, 21, 85, 87, 85, 88, 85, 66, 88],
  [35, "Daly Cherry-Evans", 2013, "Manly Warringah", "Half", "regular playmaker", 27, 27, 90, 92, 90, 93, 87, 66, 94],
  [36, "Adam Blair", 2010, "Melbourne", "Mid/Edge/Lock", "regular middle forward", 23, 22, 86, 86, 90, 93, 57, 18, 89],
  [37, "Darius Boyd", 2010, "St George Illawarra", "FB/Wing/Centre", "defensive fullback", 25, 25, 90, 88, 86, 86, 52, 18, 92],
  [38, "Bryce Cartwright", 2016, "Penrith", "Edge/Half", "regular edge forward", 26, 25, 89, 91, 89, 92, 87, 66, 93],
  [39, "Tyrone May", 2020, "Penrith", "Utility", "bench utility", 16, 8, 79, 78, 75, 82, 64, 16, 80],
  [40, "Zeb Taia", 2006, "Parramatta", "Edge/Lock", "depth edge forward", 3, 1, 64, 64, 68, 70, 45, 18, 64]
];

const headers = [
  "#",
  "Player",
  "Season",
  "Club",
  "Positions",
  "Role",
  "Apps",
  "Starts",
  "Current Overall",
  "ATT",
  "DEF",
  "WORK",
  "KICK",
  "Goal Kick",
  "Big Game",
  "Your Overall",
  "Your Tier",
  "Notes"
];

const outputDir = "outputs/rating-calibration";
const outputPath = `${outputDir}/nrl-invincible-rating-calibration-batch-1.xlsx`;

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Batch 1");
const scale = workbook.worksheets.add("Rating Scale");

sheet.showGridLines = false;
scale.showGridLines = false;

sheet.getRange("A1:R1").merge();
sheet.getRange("A1").values = [["NRL Invincible Rating Calibration - Batch 1"]];
sheet.getRange("A2:R2").merge();
sheet.getRange("A2").values = [["Fill in Your Overall and, if useful, Your Tier/Notes. Please rate the specific player-season, not career reputation."]];
sheet.getRange("A4:R4").values = [headers];
sheet.getRange(`A5:R${rows.length + 4}`).values = rows.map((row) => [...row, "", "", ""]);

sheet.getRange("A1:R1").format = {
  fill: "#101311",
  font: { bold: true, color: "#B7EF5D", size: 18 },
  horizontalAlignment: "left"
};
sheet.getRange("A2:R2").format = {
  fill: "#17251C",
  font: { color: "#D8DECE", size: 11 },
  horizontalAlignment: "left"
};
sheet.getRange("A4:R4").format = {
  fill: "#1F6B43",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  wrapText: true
};
sheet.getRange(`A5:R${rows.length + 4}`).format = {
  borders: { preset: "all", style: "thin", color: "#D9E2D4" },
  verticalAlignment: "top"
};
sheet.getRange(`I5:O${rows.length + 4}`).format = { horizontalAlignment: "center" };
sheet.getRange(`P5:P${rows.length + 4}`).format = {
  fill: "#FFF7CC",
  horizontalAlignment: "center"
};
sheet.getRange(`Q5:R${rows.length + 4}`).format = {
  fill: "#F8FBF5",
  wrapText: true
};
sheet.getRange(`A5:A${rows.length + 4}`).format = { horizontalAlignment: "center" };
sheet.getRange(`C5:C${rows.length + 4}`).format = { horizontalAlignment: "center" };
sheet.getRange(`G5:O${rows.length + 4}`).format.numberFormat = "0";
sheet.getRange(`P5:P${rows.length + 4}`).format.numberFormat = "0";
sheet.getRange(`P5:P${rows.length + 4}`).dataValidation = {
  rule: { type: "whole", operator: "between", formula1: 1, formula2: 100 }
};
sheet.getRange(`Q5:Q${rows.length + 4}`).dataValidation = {
  rule: {
    type: "list",
    values: [
      "100 Immortal",
      "96-99 Generational",
      "92-95 Elite",
      "88-91 Star",
      "84-87 Strong regular",
      "78-83 Regular",
      "70-77 Depth",
      "<70 Fringe"
    ]
  }
};

sheet.freezePanes.freezeRows(4);
sheet.freezePanes.freezeColumns(2);

const widths = [44, 172, 68, 150, 116, 170, 58, 58, 94, 50, 50, 58, 56, 74, 74, 94, 150, 260];
for (let i = 0; i < widths.length; i += 1) {
  sheet.getRangeByIndexes(0, i, 1, 1).format.columnWidthPx = widths[i];
}
sheet.getRange("A1:A1").format.rowHeightPx = 30;
sheet.getRange("A4:R4").format.rowHeightPx = 36;
sheet.getRange(`A5:R${rows.length + 4}`).format.rowHeightPx = 24;

scale.getRange("A1:D1").merge();
scale.getRange("A1").values = [["Suggested Overall Rating Scale"]];
scale.getRange("A3:D11").values = [
  ["Band", "Meaning", "Example use", "Notes"],
  ["100", "Immortal/all-time special", "Rare, mostly Immortals", "Use sparingly"],
  ["96-99", "Generational peak season", "Best player in comp level", "Dally M / historic peak"],
  ["92-95", "Elite", "Rep star / premiership spine / elite forward", "Would anchor most teams"],
  ["88-91", "Star", "High-end club star", "Consistently decisive"],
  ["84-87", "Strong regular", "Good first-grader", "Clearly above average"],
  ["78-83", "Regular", "Solid role player", "Useful but not a star"],
  ["70-77", "Depth", "Bench/fringe/depth option", "Limited role or short sample"],
  ["<70", "Fringe", "Very limited first grade sample", "Rarely chosen unless desperate"]
];
scale.getRange("A1:D1").format = {
  fill: "#101311",
  font: { bold: true, color: "#B7EF5D", size: 18 }
};
scale.getRange("A3:D3").format = {
  fill: "#1F6B43",
  font: { bold: true, color: "#FFFFFF" }
};
scale.getRange("A3:D11").format = {
  borders: { preset: "all", style: "thin", color: "#D9E2D4" },
  wrapText: true,
  verticalAlignment: "top"
};
scale.getRange("A:A").format.columnWidthPx = 110;
scale.getRange("B:B").format.columnWidthPx = 190;
scale.getRange("C:C").format.columnWidthPx = 250;
scale.getRange("D:D").format.columnWidthPx = 260;
scale.freezePanes.freezeRows(3);

const preview = await workbook.render({
  sheetName: "Batch 1",
  range: "A1:R18",
  scale: 1,
  format: "png"
});
await fs.writeFile(`${outputDir}/rating-calibration-preview.png`, new Uint8Array(await preview.arrayBuffer()));

const inspect = await workbook.inspect({
  kind: "table",
  range: "Batch 1!A1:R10",
  include: "values",
  tableMaxRows: 10,
  tableMaxCols: 18
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan"
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
