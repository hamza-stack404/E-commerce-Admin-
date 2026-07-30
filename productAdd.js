import { supabase } from './supabase-client.js' 

let param = new URLSearchParams(window.location.search)
let ID = param.get("id")


let Form = document.getElementById("product-form")

let reslt = await supabase.from("categories").select("*")

if (reslt.error) {
    console.log(reslt.error);
    
} else {
     let optionsHTML = ""

    reslt.data.forEach(category => {
        optionsHTML += `<option value="${category.id}">${category.name}</option>`;
    });

    document.getElementById("p-category").innerHTML = optionsHTML;
}


if (ID) {
    let existing = await supabase.from("products").select("*").eq("id", ID)

    if (existing.data && existing.data[0]) {
        let p = existing.data[0]

        document.getElementById("p-name").value = p.name
        document.getElementById("p-price").value = p.price
        document.getElementById("p-stock").value = p.stock
        document.getElementById("p-desc").value = p.description
        document.getElementById("p-category").value = p.category_id
    }
}

Form.addEventListener('submit', async function (stop) {
    stop.preventDefault()

    let Name = document.getElementById("p-name").value
    let Price = Number(document.getElementById("p-price").value)
    let Stock = Number(document.getElementById("p-stock").value)
    let Description = document.getElementById("p-desc").value
    let CategoryId = document.getElementById("p-category").value


    
    let imageUrl = null
    let file = document.getElementById("p-image").files[0]



  if (file) {
        let fileName = Date.now() + "-" + file.name
        let upload = await supabase.storage.from("product-images").upload(fileName, file)

        if (upload.error) {
            console.log(upload.error)
        } else {
            let urlResult = supabase.storage.from("product-images").getPublicUrl(fileName)
            imageUrl = urlResult.data.publicUrl
        }
    }





let result
    let productData = {
        name: Name,
        price: Price,
        stock: Stock,
        description: Description,
        category_id: CategoryId
    }

    if (imageUrl) {
        productData.image_url = imageUrl
    }

    if (ID) {
        result = await supabase.from("products").update(productData).eq("id", ID)
    } else {
        result = await supabase.from("products").insert(productData)
    }

    if (result.error) {
        console.log(result.error);
    } else {
        window.location.href = "product.html"
    }
})
