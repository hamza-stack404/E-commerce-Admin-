import { supabase } from './supabase-client.js'


const result = await supabase.auth.getSession()

if (result.data.session === null) {
    window.location.href = "index.html"

} else {
    if (result.data.session.user.email !== "hamzasajjad2032009@gmail.com") {
        window.location.href = "login.html"
    }
}