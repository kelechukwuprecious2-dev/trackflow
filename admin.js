function generateTracking() {
  return "TRK" + Date.now();
}

function createShipment() {
  let senderName = document.getElementById("senderName").value;
  let senderAddress = document.getElementById("senderAddress").value;

  let receiverName = document.getElementById("receiverName").value;
  let receiverAddress = document.getElementById("receiverAddress").value;
  let receiverPhone = document.getElementById("receiverPhone").value;

  let packageDetails = document.getElementById("packageDetails").value;
  let notes = document.getElementById("notes").value;

  if (!senderName || !senderAddress || !receiverName || !receiverAddress || !receiverPhone) {
    alert("Please fill all required fields");
    return;
  }

  let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

  let tracking = generateTracking();

  let newShipment = {
    trackingNumber: tracking,
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    receiverPhone,
    packageDetails,
    status: "Pending",
    notes: notes
  };

  shipments.push(newShipment);
  localStorage.setItem("shipments", JSON.stringify(shipments));

  alert("Shipment Created! Tracking No: " + tracking);

  // Clear inputs
  document.getElementById("senderName").value = "";
  document.getElementById("senderAddress").value = "";
  document.getElementById("receiverName").value = "";
  document.getElementById("receiverAddress").value = "";
  document.getElementById("receiverPhone").value = "";
  document.getElementById("packageDetails").value = "";
  document.getElementById("notes").value = "";

  displayShipments();
}

function displayShipments() {
  let shipments = JSON.parse(localStorage.getItem("shipments")) || [];
  let list = document.getElementById("adminList");

  if (shipments.length === 0) {
    list.innerHTML = "<p>No shipments yet</p>";
    return;
  }

  list.innerHTML = shipments.map(s => `
    <div class="card">
      <p><b>${s.trackingNumber}</b></p>

      <p><b>Sender:</b> ${s.senderName}</p>
      <p><b>Address:</b> ${s.senderAddress}</p>

      <p><b>Receiver:</b> ${s.receiverName}</p>
      <p><b>Address:</b> ${s.receiverAddress}</p>
      <p><b>Phone:</b> ${s.receiverPhone}</p>

      <p><b>Package:</b> ${s.packageDetails || "N/A"}</p>

      <p class="${s.status === 'Delivered' ? 'delivered' : 'pending'}">
        Status: ${s.status}
      </p>

      <p><b>Notes:</b> ${s.notes || "None"}</p>

      <button onclick="markDelivered('${s.trackingNumber}')">
        Mark Delivered
      </button>
    </div>
  `).join("");
}

function markDelivered(tracking) {
  let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

  shipments = shipments.map(s => {
    if (s.trackingNumber === tracking) {
      s.status = "Delivered";
    }
    return s;
  });

  localStorage.setItem("shipments", JSON.stringify(shipments));
  displayShipments();
}

// Load on page start
displayShipments();