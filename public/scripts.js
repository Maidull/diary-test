function openEdit(id, title, content) {
  const modal = document.getElementById("editModal");
  const form = document.getElementById("editForm");
  document.getElementById("editTitle").value = title || "";
  document.getElementById("editContent").value = content || "";
  form.action = `/edit/${id}`;
  modal.style.display = "flex";
}

function closeEdit() {
  document.getElementById("editModal").style.display = "none";
}

function openView(title, content, image) {
  document.getElementById("viewTitle").innerText = title;
  document.getElementById("viewContent").innerText = content;
  const imgEl = document.getElementById("viewImage");
  if (image) {
    imgEl.src = image;
    imgEl.style.display = "block";
  } else {
    imgEl.style.display = "none";
  }
  document.getElementById("viewModal").style.display = "flex";
}

function closeView() {
  document.getElementById("viewModal").style.display = "none";
}

// Bấm ra ngoài thì tắt modal
window.addEventListener("click", (e) => {
  const editModal = document.getElementById("editModal");
  const viewModal = document.getElementById("viewModal");
  if (e.target === editModal) editModal.style.display = "none";
  if (e.target === viewModal) viewModal.style.display = "none";
});

// Sự kiện nút “Sửa”
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    const content = e.target.dataset.content;
    openEdit(id, title, content);
  }
});

// Sự kiện click vào card để xem chi tiết
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card && !e.target.classList.contains("edit-btn") && !e.target.classList.contains("delete")) {
    const title = card.dataset.title;
    const content = card.dataset.content;
    const image = card.dataset.image;
    openView(title, content, image);
  }
});