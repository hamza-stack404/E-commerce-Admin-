import { supabase } from './supabase-client.js' 

let allProducts = []


function RenderProducts(P_Array) {
    let rowsHTML = ""

    P_Array.forEach(product => {
        rowsHTML += `<tr>
            <td class="px-6 py-3.5 font-medium">${product.name}</td>
            <td class="px-6 py-3.5 text-slate-600">${product.categories ? product.categories.name : "—"}</td>
            <td class="px-6 py-3.5 text-slate-900">$${product.price}</td>
            <td class="px-6 py-3.5 text-slate-600">${product.stock}</td>
            <td class="px-6 py-3.5">${product.stock === 0 ? "Out of Stock" : (product.stock < 10 ? "Low Stock" : "In Stock")}</td>
            <td class="px-6 py-3.5 text-right">
            <a href="productAdd.html?id=${product.id}" class="text-indigo-600 hover:text-indigo-700 font-medium text-sm">Edit</a>
            <span class="text-slate-300 mx-1.5">|</span>
            <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button></td>
        </tr>`;
    });

    document.getElementById("products-table-body").innerHTML = rowsHTML;
}



let result = await supabase.from("products").select("*, categories(name)")
if (result.error) {
    console.log(result.error);

} else {
   allProducts = result.data
    RenderProducts(allProducts)

}

document.getElementById("product-search").addEventListener('input', function() {
    let searchItem = document.getElementById("product-search").value



    let Filtered = allProducts.filter(product => {
        return product.name.toLowerCase().includes(searchItem.toLowerCase())
    })

    RenderProducts(Filtered)
})


window.deleteProduct = async (id) => {
    let sure = confirm("Are you sure you want to delete this product?")
    
    if (sure) {
        let del = await supabase.from("products").delete().eq("id",id)

        if (del.error) {
            console.log(del.error);
            
        } else {
            location.reload()
        }
    }
}


