function openEdit(id, title, content, image) {
  const modal = document.getElementById("editModal");
  const form = document.getElementById("editForm");

  // Gán giá trị
  document.getElementById("editTitle").value = title || "";
  document.getElementById("editContent").value = content || "";
  form.action = `/edit/${id}`;

  // Hiển thị hình ảnh hiện tại nếu có
  const imgPreview = document.getElementById("editImagePreview");
  if (image) {
    imgPreview.src = image;
    imgPreview.style.display = "block";
  } else {
    imgPreview.style.display = "none";
  }

  modal.style.display = "flex";
}

function closeEdit() {
  document.getElementById("editModal").style.display = "none";
}

// Khi chọn hình mới → hiển thị preview ngay
document.addEventListener("change", (e) => {
  if (e.target.id === "editImage") {
    const file = e.target.files[0];
    const preview = document.getElementById("editImagePreview");
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  }
});
