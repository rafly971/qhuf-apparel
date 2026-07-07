// Memastikan semua elemen HTML termuat dengan sempurna sebelum script berjalan
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logika Klik Tombol Hero CTA
    const heroButton = document.getElementById("cta-hero");
    if (heroButton) {
        heroButton.addEventListener("click", () => {
            alert("Terima kasih! Kamu akan diarahkan ke toko Shopee QHUF APPAREL.");
            // Jika ingin mengarahkan ke link shopee asli, hilangkan tanda komen dibawah ini:
            // window.location.href = "https://shopee.co.id/your-shop-link";
        });
    }

    // 2. Logika Klik Tombol Discover di Card Produk
    const discoverButtons = document.querySelectorAll(".btn-discover");
    discoverButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            alert(`Membuka detail untuk Produk ke-${index + 1}`);
        });
    });

    console.log("QHUF APPAREL Frontend Engine is successfully running.");
});