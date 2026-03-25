import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';
import { useAppSelector } from '../store/index';

const camelCaseToTitleCase = (str: any) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\w\S*/g, (txt:any) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export function handleDownloadExcel(
  data: any,
  fileName: string,
  userDateFormat: any,
  ignoreValues?: string[],
  keepTheSameNamingCase?: string[],
  replaceNaming?: any
) {
  // Assuming distributorList is not empty and contains objects with properties
  // return () => {
  // const userDateFormat = useAppSelector(state => state.auth.user?.dateFormat);

  console.log(userDateFormat, 'userDateFormat', data);

  // Guard against empty or invalid data
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('handleDownloadExcel: No data available to download.');
    return;
  }

  const firstItem = data[0];

  // Generate title case headers based on camel case property names
  // const titleCaseHeaders = Object.keys(firstItem).map(camelCaseToTitleCase);
  const titleCaseHeaders: string[] = [];
  const ignoreColumns: number[] = [];

  Object.keys(firstItem).forEach((item, index) => {
    let keyToPush = item;

    if (replaceNaming?.hasOwnProperty(item)) {
      keyToPush = replaceNaming[item];
    }

    if (ignoreValues?.includes(item)) {
      ignoreColumns.push(index);
    } else {
      if (keepTheSameNamingCase && keepTheSameNamingCase.length !== 0) {
        const matchingItem = keepTheSameNamingCase.find(value =>
          value.replace(/\s/g, '').toLowerCase().includes(keyToPush.replace(/\s/g, '').toLowerCase())
        );

        if (matchingItem) {
          titleCaseHeaders.push(matchingItem);
        } else {
          titleCaseHeaders.push(camelCaseToTitleCase(keyToPush));
        }
      } else {
        titleCaseHeaders.push(camelCaseToTitleCase(keyToPush));
      }
    }
  });

  // Map data to include title case headers
  const tableData = [
    titleCaseHeaders,
    ...data.map((item: any, index) => Object.values(item).filter((_, index) => !ignoreColumns.includes(index)))
  ];

  const worksheet = utils.aoa_to_sheet(tableData);

  // Set bold font for header row
  const boldHeaderFont = { bold: true };
  if (worksheet['!ref']) {
    const headerRange = utils.decode_range(worksheet['!ref']);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const headerCell = utils.encode_cell({ r: 0, c: col });
      if (!worksheet[headerCell].s) {
        worksheet[headerCell].s = {};
      }
      worksheet[headerCell].s.font = { ...worksheet[headerCell].s.font, ...boldHeaderFont };
    }
  }

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Data');
  const excelFileName = `${fileName}_${dayjs().format(`${userDateFormat}_HH-mm`)}.xlsx`;

  try {
    const blob = writeFile(workbook, excelFileName, {
      bookType: 'xlsx',
      type: 'blob' as 'string'
    });

    if (!blob) {
      console.error('Blob is null or undefined.');
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = excelFileName;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating or downloading Excel file:', error);
  }
}

// }
