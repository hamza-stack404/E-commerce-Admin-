import { supabase } from './supabase-client.js' 


let allCategory = []


function RenderCategory(C_array) {
    let rowsHTML = ""

   C_array.forEach(category => {
        rowsHTML += `<tr>
            <td class="px-6 py-3.5 font-medium">${category.name}</td>
            <td class="px-6 py-3.5 text-slate-900">${category.description}</td>
            <td class="px-6 py-3.5 text-slate-600">${category.products[0].count}</td>
            <td class="px-6 py-3.5 text-slate-600">${category.is_visible ? "Active" : "Hidden"}</td>
            <td class="px-6 py-3.5 text-right">
            <a href="CategoryAdd.html?id=${category.id}" class="text-indigo-600 hover:text-indigo-700 font-medium text-sm">Edit</a>
            <span class="text-slate-300 mx-1.5">|</span>
            <button onclick="deleteCategory('${category.id}')" class="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button></td>
        </tr>`;
    });

    document.getElementById("categories-table-body").innerHTML = rowsHTML;
}



let result = await supabase.from("categories").select("*, products(count)")

if (result.error) {
    console.log(result.error);

} else {
    allCategory = result.data
    RenderCategory(allCategory)

}

document.getElementById("category-search").addEventListener('input', function () {
    let searchItem = this.value


    let filtered = allCategory.filter(category =>{
        return category.name.toLowerCase().includes(searchItem.toLowerCase())
    })

    RenderCategory(filtered)
    
})



window.deleteCategory = async (id) => {
    let sure = confirm("Are you sure you want to delete this product?")


    if (sure) {
        let del = await supabase.from("categories").delete().eq("id",id)

        if (del.error) {
            console.log(del.error);
            
        } else {
            location.reload()
        }
    }
}



