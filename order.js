import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)

let result = await supabase.from("orders")
    .select("*, order_items(count)")
    .order("created_at", { ascending: false })


let allOrders = []


function RenderOrders(O_Array) {
    let rowsHTML = ""
    O_Array.forEach(function (order) {
        rowsHTML += `<tr>
            <td class="px-6 py-3.5 font-medium">#${order.id.slice(0, 8)}</td>
            <td class="px-6 py-3.5 text-slate-600">${order.user_id.slice(0, 8)}</td>
            <td class="px-6 py-3.5 text-slate-600">${new Date(order.created_at).toLocaleDateString()}</td>
            <td class="px-6 py-3.5 text-slate-600">${order.order_items[0].count}</td>
            <td class="px-6 py-3.5 text-slate-900">$${order.total}</td>
            <td class="px-6 py-3.5"><span class="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">${order.status}</span></td>
            <td class="px-6 py-3.5 text-right"><button class="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View</button></td>
        </tr>`
    })
    document.getElementById("orders-table-body").innerHTML = rowsHTML
}

allOrders = result.data
RenderOrders(allOrders)



function applyFilters() {
    let searchTerm = document.getElementById("order-search").value
    let statusValue = document.getElementById("order-status-filter").value

    let filtered = allOrders.filter(function (order) {
        let matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
        let matchesStatus = statusValue === "all" || order.status === statusValue
        return matchesSearch && matchesStatus
    })

    RenderOrders(filtered)
}

document.getElementById("order-search").addEventListener("input", applyFilters)
document.getElementById("order-status-filter").addEventListener("change", applyFilters)