async function fetchLiveAPI() {
  try {
    const res = await fetch("https://staffschedule.io/api/posts");
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response length:", text.length);
    console.log("Preview:", text.substring(0, 200));
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
fetchLiveAPI();
