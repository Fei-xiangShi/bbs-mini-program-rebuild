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
};

const expandSchedule = (ranges: string[]): number[] => {
  const result: number[] = [];

  for (const range of ranges) {
    const [startStr, endStr] = range.split("-");
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
};

const formatClassTable = () => {
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
    let newItem: any = {};
    neededList.forEach((key) => {
      newItem[key] = item[key];
    });
    item = newItem;
    item["zcd"] = item["zcd"].replace(/周/g, "").split(",");
    item["zcd"] = expandRanges(item["zcd"]);
    let weeks = item["zcd"];
    console.log(weeks);
    item["jc"] = expandSchedule(item["jc"].replace(/节/g, "").split(","));
    let day = item["xqj"];
    console.log(day);
    for (let week = 0; week < weeks.length; week++) {
      if (!courseByWeeks[weeks[week]]) {
        courseByWeeks[weeks[week]] = {};
      }
      if (!courseByWeeks[weeks[week]][day]) {
        courseByWeeks[weeks[week]][day] = [];
      }
      courseByWeeks[weeks[week]][day].push(item);
    }
  });
  uni.setStorageSync("courseByWeeks", courseByWeeks);
  return courseByWeeks;
};

export default formatClassTable;
