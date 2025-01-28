import * as XLSX from "xlsx"

export const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "QC Report")

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })

  // Save the file
  saveAsExcelFile(excelBuffer, fileName)
}

const saveAsExcelFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  const link = document.createElement("a")
  link.href = window.URL.createObjectURL(data)
  link.download = `${fileName}.xlsx`
  link.click()
}

