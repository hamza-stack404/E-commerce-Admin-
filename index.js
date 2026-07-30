import { supabase } from './supabase-client.js' 


let Form = document.getElementById("form")

Form.addEventListener('submit', async function (stop) {
    stop.preventDefault();

    let Email = document.getElementById("email").value
    let Password = document.getElementById("password").value



    const result = await supabase.auth.signInWithPassword({
        email: Email, 
        password: Password
    })


    if (result.error) {
        document.getElementById("login-error").classList.remove("hidden")
        
    } else {
        if (result.data.user.email === "hamzasajjad2032009@gmail.com") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-error").classList.remove('hidden');
  }
    }

})

  



