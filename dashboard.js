import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)



let data = await supabase.from("products").select("*", {count: "exact", head: true})

if (data.error) {
    console.log(data.error);
    
} else {
    document.getElementById("products-count").innerHTML = data.count
}


// Total Orders
let ordersCountResult = await supabase.from("orders").select("*", { count: "exact", head: true })
document.getElementById("total-orders").innerHTML = ordersCountResult.count

// Pending Orders
let pendingResult = await supabase.from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")
document.getElementById("pending-orders").innerHTML = pendingResult.count

// Revenue (sum all order totals)
let allOrdersResult = await supabase.from("orders").select("total")
let revenue = 0
allOrdersResult.data.forEach(function (order) {
    revenue = revenue + order.total
})
document.getElementById("revenue").innerHTML = "$" + revenue.toFixed(2)

// Recent Orders (latest 5)
let recentResult = await supabase.from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

let rowsHTML = ""
recentResult.data.forEach(function (order) {
    rowsHTML += `<tr>
        <td class="px-6 py-3.5 font-medium">#${order.id.slice(0, 8)}</td>
        <td class="px-6 py-3.5 text-slate-600">${order.user_id.slice(0, 8)}</td>
        <td class="px-6 py-3.5 text-slate-600">${new Date(order.created_at).toLocaleDateString()}</td>
        <td class="px-6 py-3.5 text-slate-900">$${order.total}</td>
        <td class="px-6 py-3.5"><span class="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">${order.status}</span></td>
    </tr>`
})
document.getElementById("recent-orders-body").innerHTML = rowsHTML