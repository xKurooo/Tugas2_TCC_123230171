// =============================================
// Notes App - Frontend JavaScript
// =============================================

const API_URL = 'https://be-tugas3-tcc-171-325409493725.us-central1.run.app/api/catatan';

// Card color classes (cycle through pastel colors)
const CARD_COLORS = [
    'color-pink',
    'color-yellow',
    'color-blue',
    'color-green',
    'color-purple',
    'color-orange'
];

let allNotes = [];
let deleteTargetId = null;

// =============================================
// Initialization
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
});

// =============================================
// API Functions
// =============================================
async function fetchNotes() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
            allNotes = result.data;
            renderNotes(allNotes);
        } else {
            showToast('❌', 'Gagal memuat catatan');
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
        showToast('❌', 'Tidak dapat terhubung ke server');
    } finally {
        showLoading(false);
    }
}

async function createNote(judul, isi) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });
        const result = await response.json();

        if (result.success) {
            showToast('✅', 'Catatan berhasil ditambahkan');
            fetchNotes();
            return true;
        } else {
            showToast('❌', result.message || 'Gagal menambah catatan');
            return false;
        }
    } catch (error) {
        console.error('Error creating note:', error);
        showToast('❌', 'Gagal menambah catatan');
        return false;
    }
}

async function updateNote(id, judul, isi) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });
        const result = await response.json();

        if (result.success) {
            showToast('✅', 'Catatan berhasil diupdate');
            fetchNotes();
            return true;
        } else {
            showToast('❌', result.message || 'Gagal mengedit catatan');
            return false;
        }
    } catch (error) {
        console.error('Error updating note:', error);
        showToast('❌', 'Gagal mengedit catatan');
        return false;
    }
}

async function deleteNote(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (result.success) {
            showToast('🗑️', 'Catatan berhasil dihapus');
            fetchNotes();
            return true;
        } else {
            showToast('❌', result.message || 'Gagal menghapus catatan');
            return false;
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        showToast('❌', 'Gagal menghapus catatan');
        return false;
    }
}

// =============================================
// Rendering
// =============================================
function renderNotes(notes) {
    const grid = document.getElementById('notesGrid');
    const emptyState = document.getElementById('emptyState');

    // Update note count
    document.getElementById('noteCount').textContent = allNotes.length;

    if (notes.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = notes.map((note, index) => {
        const colorClass = CARD_COLORS[index % CARD_COLORS.length];
        const dateStr = formatDate(note.tanggal_dibuat);
        const timeStr = formatTime(note.tanggal_dibuat);

        return `
            <div class="note-card ${colorClass}" data-id="${note.id}">
                <div class="note-date">
                    <span>${dateStr}</span>
                </div>
                <div class="note-title">
                    <span>${escapeHtml(note.judul)}</span>
                    <div class="note-actions">
                        <button class="note-btn edit-btn" onclick="openEditModal(${note.id})" title="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="note-btn delete-btn" onclick="openDeleteModal(${note.id})" title="Hapus">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="note-content">${escapeHtml(note.isi)}</div>
                <div class="note-footer">
                    <span class="note-time">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${timeStr}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

// =============================================
// Modal Handlers
// =============================================
function openModal() {
    document.getElementById('modalTitle').textContent = 'Tambah Catatan Baru';
    document.getElementById('btnSave').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
        Simpan
    `;
    document.getElementById('noteId').value = '';
    document.getElementById('noteJudul').value = '';
    document.getElementById('noteIsi').value = '';
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('noteJudul').focus();
}

function openEditModal(id) {
    const note = allNotes.find(n => n.id === id);
    if (!note) return;

    document.getElementById('modalTitle').textContent = 'Edit Catatan';
    document.getElementById('btnSave').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
        Update
    `;
    document.getElementById('noteId').value = note.id;
    document.getElementById('noteJudul').value = note.judul;
    document.getElementById('noteIsi').value = note.isi;
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('noteJudul').focus();
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('noteForm').reset();
}

function openDeleteModal(id) {
    deleteTargetId = id;
    document.getElementById('deleteModalOverlay').classList.add('active');
    document.getElementById('btnDeleteConfirm').onclick = async () => {
        await deleteNote(deleteTargetId);
        closeDeleteModal();
    };
}

function closeDeleteModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('deleteModalOverlay').classList.remove('active');
    deleteTargetId = null;
}

// =============================================
// Form Handling
// =============================================
async function handleSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('noteId').value;
    const judul = document.getElementById('noteJudul').value.trim();
    const isi = document.getElementById('noteIsi').value.trim();

    if (!judul || !isi) {
        showToast('⚠️', 'Judul dan isi catatan wajib diisi');
        return;
    }

    let success;
    if (id) {
        success = await updateNote(id, judul, isi);
    } else {
        success = await createNote(judul, isi);
    }

    if (success) {
        closeModal();
    }
}

// =============================================
// Search
// =============================================
function searchNotes() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!query) {
        renderNotes(allNotes);
        return;
    }

    const filtered = allNotes.filter(note =>
        note.judul.toLowerCase().includes(query) ||
        note.isi.toLowerCase().includes(query)
    );

    renderNotes(filtered);
}

// =============================================
// Sidebar Toggle (Mobile)
// =============================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');

    // Handle overlay
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        };
        document.body.appendChild(overlay);
    }

    if (sidebar.classList.contains('open')) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// =============================================
// Utility Functions
// =============================================
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return `${hours}:${minutes}, ${days[date.getDay()]}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    const notesGrid = document.getElementById('notesGrid');
    const emptyState = document.getElementById('emptyState');

    if (show) {
        loadingState.style.display = 'flex';
        notesGrid.style.display = 'none';
        emptyState.style.display = 'none';
    } else {
        loadingState.style.display = 'none';
    }
}

function showToast(icon, message) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    toastIcon.textContent = icon;
    toastMessage.textContent = message;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalOverlay');
        const deleteModal = document.getElementById('deleteModalOverlay');

        if (modal.classList.contains('active')) {
            closeModal();
        }
        if (deleteModal.classList.contains('active')) {
            closeDeleteModal();
        }
    }
});
