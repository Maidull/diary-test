function openEdit(id, title, content) {
  const modal = document.getElementById("editModal");
  const form = document.getElementById("editForm");
  const titleInput = document.getElementById("editTitle");
  const contentInput = document.getElementById("editContent");

  // Gán giá trị hiện tại
  titleInput.value = title || "";
  contentInput.value = content || "";

  // Cập nhật action của form
  form.action = `/edit/${id}`;

  // Hiển thị modal
  modal.style.display = "flex";
}

function closeEdit() {
  document.getElementById("editModal").style.display = "none";
}

// Bấm ra ngoài thì tắt
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal");
  if (e.target === modal) modal.style.display = "none";
});

// Gán sự kiện vào nút “Sửa”
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    const content = e.target.dataset.content;
    openEdit(id, title, content);
  }
});
