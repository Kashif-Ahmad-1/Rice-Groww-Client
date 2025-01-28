import { jsPDF } from "jspdf"
import "jspdf-autotable"

export const generatePDF = ({ formData, parameters, directPacking, totalOutput }) => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("Sortex Output", 105, 15, { align: "center" })

  // Add header information
  doc.setFontSize(12)
  doc.text(`Input Item Name: ${formData.itemName}`, 15, 30)
  doc.text(`Rice Input: ${formData.quantity}`, 15, 37)
  doc.text(`Sortex No: ${formData.sortexNo}`, 120, 30)
  doc.text(`Lot No: ${formData.lotNo}`, 120, 37)

  // Add parameters table
  doc.autoTable({
    startY: 45,
    head: [["Parameters", "Qty Mt."]],
    body: parameters.map((item) => [item.name, item.value]),
    headStyles: { fillColor: [136, 0, 0] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  // Add total output
  const finalY = doc.lastAutoTable.finalY || 45
  doc.setFontSize(14)
  doc.setTextColor(136, 0, 0)
  doc.text(`Total Output Sortex: ${totalOutput}`, 15, finalY + 10)

  // Add direct packing table
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text("Direct Packing after sortex 4", 15, finalY + 20)

  doc.autoTable({
    startY: finalY + 25,
    body: directPacking.map((item) => [item.name, item.value]),
    theme: "plain",
  })

  // Save the PDF
  doc.save("sortex-output.pdf")
}

