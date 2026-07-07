const SUPABASE_URL = "https://jpnegsanadsfubezkhor.supabase.co/rest/v1/":
const SUPABASE_KEY = "sb_publishable_yPNbrP9E2Wt3sefEjiHZaw_7YAU42au";
// --- 1. KONEKSI KE SUPABASE ---
// Fungsi pembantu untuk mempermudah request ke API Supabase lewat HP
async function supabaseFetch(endpoint, method = 'GET', body = null) {
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
    };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(`${SUPABASE_URL}/${endpoint}`, options);
    return await response.json();
}

// --- 2. FUNGSI TOMBOL BELI (KIRIM KE DATABASE) ---
async function handleBuy(productName, productPrice) {
    // Beri tahu pembeli bahwa sistem sedang memproses
    alert("Sedang memproses pesananmu ke sistem...");

    // Mintalah nama pembeli lewat pop-up box di HP
    const namaPembeli = prompt("Masukkan nama kamu untuk konfirmasi pesanan:");
    if (!namaPembeli) {
        alert("Pesanan dibatalkan karena nama tidak diisi.");
        return;
    }

    try {
        // Proses mengirim data ke tabel 'orders' di Supabase
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                product_name: productName,
                price: productPrice,
                buyer_name: namaPembeli
            })
        });

        if (!response.ok) {
            throw new Error("Gagal menyimpan ke database");
        }

        // Jika berhasil
        alert(`Terima kasih ${namaPembeli}! Pesanan untuk "${productName}" berhasil disimpan di database kami.`);
        
    } catch (error) {
        console.error("Error:", error);
        alert("Waduh, koneksi gagal. Pesanan gagal tersimpan: " + error.message);
    }
}

// --- 3. LOGIKA TOMBOL BELI ---
function handleBuy(productName, productPrice) {
    // Sinyal tes: kalau ini muncul, berarti tombol sudah terhubung ke JS!
    alert("Sistem mendeteksi klik pada: " + productName);
    
    const session = localStorage.getItem('supabase_session');
    
    if (!session) {
        alert('Ups! Kamu harus Login terlebih dahulu untuk melakukan pembelian.');
        const authSection = document.getElementById('auth-section');
        if (authSection) {
            authSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Menu login belum terpasang di halaman ini.');
        }
    } else {
        const nomorWA = "628xxxxxxxxxx"; // <--- Pastikan ini nomor WA kamu
        const pesan = `Halo Admin QHUF APPAREL, saya ingin membeli:\n\nNama Produk: ${productName}\nHarga: Rp ${Number(productPrice).toLocaleString('id-ID')}`;
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
    }
}

// JALANKAN FUNGSI SAAT HALAMAN WEB DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
