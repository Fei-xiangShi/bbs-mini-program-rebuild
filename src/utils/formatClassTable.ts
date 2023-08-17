const expandRanges = (ranges: string[]): number[] => {
  const result: number[] = [];

  for (const range of ranges) {
    const [rangeStr, parity] = range.split("(");
    const [startStr, endStr] = rangeStr.split("-");
    if (!endStr) {
      result.push(parseInt(rangeStr));
      continue;
    }
    const start = parseInt(startStr);
    const end = parseInt(endStr);

    for (let i = start; i <= end; i++) {
      if (
        !parity ||
        (parity === "单)" && i % 2 === 1) ||
        (parity === "双)" && i % 2 === 0)
      ) {
        result.push(i);
      }
    }
  }
  return result;
}

const expandSchedule = (ranges: string[]): number[] => {
  const result: number[] = [];

  for (const range of ranges) {
      const [startStr, endStr] = range.split('-');
      if (!endStr) {
          result.push(parseInt(range));
          continue;
      }
      const start = parseInt(startStr);
      const end = parseInt(endStr);

      for (let i = start; i <= end; i++) {
          result.push(i);
      }
  }

  return result;
}


const formatClassTable = () => {
  const briefList: any = [];

  let classTable = uni.getStorageSync("classTable");

  classTable.value = uni.getStorageSync("classTable");
  classTable.value = classTable.value.kbList;
  const neededList = [
    "kcmc",
    "cdmc",
    "kclb",
    "kcxz",
    "xm",
    "xf",
    "jc",
    "xqj",
    "zcd",
  ];
  let courseByWeeks: any = {};
  classTable.value.forEach((item: any) => {
    const brief: any = [];

    neededList.forEach((key: string) => {
      if (key === "zcd") {
        item[key] = item[key].replace(/周/g, "").split(",");
        item[key] = expandRanges(item[key]);
        for (let i = 0; i < item[key].length; i++) {
          if (!courseByWeeks[item[key][i]]) {
            courseByWeeks[item[key][i]] = [];
          }
          courseByWeeks[item[key][i]].push(brief);
        }
      }
      if (key === "xqj") {
        item[key] = parseInt(item[key]);
      }
      if (key === "jc") {
        item[key] = expandSchedule(item[key].replace(/节/g, "").split(","));
      }
      brief.push(item[key]);
    });
    briefList.push(brief);
  });
  uni.setStorageSync("courseByWeeks", courseByWeeks);
  return courseByWeeks;
};

export default formatClassTable;
