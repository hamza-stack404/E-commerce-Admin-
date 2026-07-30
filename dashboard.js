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