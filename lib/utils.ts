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

export const isVisible = function (ele: HTMLElement, container: any) {
  const eleTop = ele.offsetTop;
  const eleBottom = eleTop + ele.clientHeight;

  const containerTop = container.scrollTop + container.offsetTop;
  const containerBottom = containerTop + container.clientHeight;

  return (
    // The element is fully visible in the container
    eleTop >= containerTop && eleBottom <= containerBottom
  );
};
