import { supabaseClient } from "./supabase-client.js";

const welcomeMsg = document.getElementById("welcome-msg");
const logoutBtn = document.getElementById("logout-btn");

async function loadDashboard() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = "login.html";
        return;
    }
    const { data: profile, error } = await supabaseClient
        .from("profiles")
        .select("full_name")
        .eq("id", session.user.id)
        .single();
    welcomeMsg.textContent = error ? "Welcome!" : `Welcome, ${profile.full_name}!`;
}

logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
});

loadDashboard();