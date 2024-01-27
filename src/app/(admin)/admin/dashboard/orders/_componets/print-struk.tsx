"use client"

import { Button } from "@/components/ui/button"

export const PrintStruk = ({
  name,
  qty,
  price,
  total,
}: {
  name: string
  qty: number
  price: number
  total: number
}) => {
  function printStruk() {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return alert("Failed to print...")

    printWindow.document.write(
      "<html><head><title>Struk Energy Laundry</title><style>th,td{padding:4px}</style></head><body>"
    )
    printWindow.document.write(`
    <div style="text-align:center;margin-top:16px;max-width:300px;width:100%;margin-inline:auto;">
        <img src="/home.png" style="width:300px;margin-bottom:-64px"/>
        <div style="position:relative">
          <div style="z-index:1;opacity:0.1;position:absolute;top:0;left:0;right:0;bottom:0;background-image:url(/home.png);background-size:cover;background-position:center center;background-repeat:no-repeat;"></div>
          <div style="z-index:2">
            <h2>Energy Laundry</h2>
            <p>Jl. Esa Unggul</p>
            <hr>

            <table>
                <thead style="text-align:left">
                    <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Harga/kg</th>
                        <th>Harga total</th>
                    </tr>
                </thead>
                <tbody style="text-align:right">
                    <tr>
                        <td>${qty}</td>
                        <td style="text-align:left">${name}</td>
                        <td>${price}</td>
                        <td>${total}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td colspan="2" style="text-align:right">IDR ${total}</td>
                    </tr>
                </tfoot>
            </table>
            
            <hr>
            <p>Terima kasih</p>
          </div>
        </div>
    </div>
    `)
    printWindow.document.write("</body></html>")
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Button size="sm" onClick={printStruk}>
      Print struk
    </Button>
  )
}
