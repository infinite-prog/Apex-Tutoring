import { supabaseClient } from "./supabase-client.js";

const form = document.getElementById("signup-form");
const message = document.getElementById("signup-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "Creating account...";

    const full_name = document.getElementById("full_name").value;
    const grade = document.getElementById("grade").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Step 1: create the auth user
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
    });

    if (error) {
        message.textContent = "Error: " + error.message;
        return;
    }

    // Step 2: create the matching profiles row
    const userId = data.user.id;

    const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert({
            id: userId,
            full_name,
            grade: parseInt(grade),
            role: "learner",
        });

    if (profileError) {
        message.textContent = "Account created, but profile failed: " + profileError.message;
        return;
    }

    message.textContent = "Success! Your account has been created.";
});