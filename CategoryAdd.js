import { supabase } from './supabase-client.js' 

let param = new URLSearchParams(window.location.search)
let ID = param.get("id")

let Form = document.getElementById("category-form")


if (ID) {
    let existing = await supabase.from("categories").select("*").eq("id", ID)
    
    if (existing.data && existing.data[0]) {
        let p = existing.data[0]

        document.getElementById("c-name").value = p.name
        document.getElementById("c-desc").value = p.description
        document.getElementById("c-visible").checked = p.is_visible
    }

}

Form.addEventListener('submit', async function (stop) {
    stop.preventDefault()


    let Name = document.getElementById("c-name").value
    let Description = document.getElementById("c-desc").value
    let visible = document.getElementById("c-visible").checked


    let imageUrl = null
    let file = document.getElementById("c-image").files[0]


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
    let categoryAdd = {
        name: Name,
        description: Description,
        is_visible: visible

    }

    if (imageUrl) {
        categoryAdd.image_url = imageUrl
    }

if (ID) {
        result = await supabase.from("categories").update(categoryAdd).eq("id", ID)
} else {
        result = await supabase.from("categories").insert(categoryAdd)
}




    if (result.error) {
        console.log(result.error);
        
    } else {
        window.location.href = "Category.html"
    }



})