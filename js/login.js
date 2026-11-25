import { supabaseClient } from "./supabase-client.js";

const form = document.getElementById("login-form");
const message = document.getElementById("login-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "Logging in...";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Step 1: log in
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        message.textContent = "Error: " + error.message;
        return;
    }

    // Step 2: look up role
    const { data: profile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

    if (profileError) {
        message.textContent = "Logged in, but couldn't load profile: " + profileError.message;
        return;
    }

    // Step 3: redirect by role
    if (profile.role === "learner") {
        window.location.href = "learner-dashboard.html";
    } else if (profile.role === "tutor") {
        window.location.href = "tutor-dashboard.html";
    } else if (profile.role === "admin") {
        window.location.href = "admin-dashboard.html";
    }
});