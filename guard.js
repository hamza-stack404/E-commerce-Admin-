import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)


const result = await supabase.auth.getSession()

if (result.data.session === null) {
    window.location.href = "index.html"

} else {
    if (result.data.session.user.email !== "hamzasajjad2032009@gmail.com") {
        window.location.href = "login.html"
    }
}