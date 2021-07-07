export function convertToCSV(arr: any) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}

export function downloadCSV(csvContent: string) {
  var element = document.createElement("a");
  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
  element.target = "_blank";
  element.download = "export.csv";
  element.click();
}
