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

// --- 2. MENAMPILKAN PRODUK DARI DATABASE ---
async function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    try {
        // Mengambil data dari tabel 'products' yang kamu buat tadi
        const products = await supabaseFetch('rest/v1/products?select=*');
        
        // Bersihkan isi grid bawaan HTML
        productGrid.innerHTML = '';

        // Looping untuk memunculkan produk secara otomatis
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">Rp ${Number(product.price).toLocaleString('id-ID')}</p>
                    <button class="btn-buy" onclick="handleBuy('${product.name}', ${product.price})">Beli Sekarang</button>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Gagal memuat produk:', error);
    }
}

// --- 3. LOGIKA TOMBOL BELI (AUTH CHECK) ---
function handleBuy(productName, productPrice) {
    // Cek apakah token user tersimpan di local storage HP
    const session = localStorage.getItem('supabase_session');
    
    if (!session) {
        alert('Ups! Kamu harus Login terlebih dahulu untuk melakukan pembelian.');
        // Munculkan form login/register (bisa diarahkan ke section auth)
        document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Jika sudah login, langsung arahkan ke WhatsApp Admin untuk transaksi
        const nomorWA = "628xxxxxxxxxx"; // <--- GANTI dengan nomor WhatsApp tokomu nanti
        const pesan = `Halo Admin QHUF APPAREL, saya ingin membeli:\n\nNama Produk: ${productName}\nHarga: Rp ${Number(productPrice).toLocaleString('id-ID')}\n\nMohon diproses ya!`;
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
    }
}

// JALANKAN FUNGSI SAAT HALAMAN WEB DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
