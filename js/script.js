// Logika Interaktif Manupi Website
let allLeaderboardData = [];

// Fungsi Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    // Implementasi toggle menu jika diperlukan di masa depan
}

// Fungsi Leaderboard (Khusus Index)
async function fetchLeaderboard() {
    const listContainer = document.getElementById('leaderboard-list');
    if (!listContainer) return;

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby5POn6_vL6-2009O_7C87_eS_9-u_0-S_0/exec');
        const data = await response.json();
        allLeaderboardData = data;
        renderLeaderboard(data);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

function renderLeaderboard(data) {
    const listContainer = document.getElementById('leaderboard-list');
    if (!listContainer) return;

    let listHTML = '';
    data.forEach(item => {
        listHTML += `
          <div class="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors group">
            <div class="flex items-center gap-4">
              <span class="w-6 font-serif italic text-stone-400 group-hover:text-emerald-900 transition-colors text-center">${item.rank}</span>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-stone-100 overflow-hidden">
                  <img alt="User" class="w-full h-full object-cover" src="${item.imageUrl}" />
                </div>
                <h5 class="font-bold text-emerald-900 dark:text-emerald-100 text-sm truncate max-w-[150px]">${item.name}</h5>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald-900 dark:text-emerald-400">${item.visits} visits</span>
          </div>`;
    });
    listContainer.innerHTML = listHTML;
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    fetchLeaderboard();

    const searchInput = document.getElementById('search-member');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = allLeaderboardData.filter(m => m.name.toLowerCase().includes(keyword));
            renderLeaderboard(filtered);
        });
    }
});
