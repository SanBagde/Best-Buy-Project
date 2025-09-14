let items = [];
let editIndex = null;

// DOM Elements
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const addBtn = document.getElementById("addBtn");
const itemTable = document.getElementById("itemTable");
const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const editItemName = document.getElementById("editItemName");
const editItemPrice = document.getElementById("editItemPrice");
const saveEditBtn = document.getElementById("saveEditBtn");
const logoutBtn = document.getElementById("logoutBtn");

function renderTable() {
  itemTable.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editItem(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    itemTable.appendChild(row);
  });
}

// Add item
addBtn.addEventListener("click", () => {
  const name = itemNameInput.value.trim();
  const price = itemPriceInput.value.trim();

  if (name && price) {
    items.push({ name, price });
    renderTable();
    itemNameInput.value = "";
    itemPriceInput.value = "";
  } else {
    alert("Please fill all fields!");
  }
});

// Edit item
window.editItem = (index) => {
  editIndex = index;
  editItemName.value = items[index].name;
  editItemPrice.value = items[index].price;
  editModal.style.display = "flex";
};

// Save changes
saveEditBtn.addEventListener("click", () => {
  if (editIndex !== null) {
    items[editIndex].name = editItemName.value;
    items[editIndex].price = editItemPrice.value;
    renderTable();
    editModal.style.display = "none";
  }
});

// Delete item
window.deleteItem = (index) => {
  if (confirm("Are you sure you want to delete this item?")) {
    items.splice(index, 1);
    renderTable();
  }
};

// Close modal
closeEditModal.addEventListener("click", () => {
  editModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});
