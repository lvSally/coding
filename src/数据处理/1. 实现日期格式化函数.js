dateFormat(new Date('2020-12-10'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2021-11-10'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2022-4-26'), 'yyyy年MM月dd日') // 2020年04月01日

function dateFormat(data, str) {
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  const res = str.replace('yyyy', year).replace('MM', month).replace('dd', day)
  console.log(res)
  return res
}