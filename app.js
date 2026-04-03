function trackShipment() {
  let input = document.getElementById("trackInput").value;
  let result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "<p>Please enter a tracking number</p>";
    return;
  }

  let shipments = JSON.parse(localStorage.getItem("shipments")) || [];

  let found = shipments.find(s => s.trackingNumber === input);

  if (found) {
    result.innerHTML = `
      <div class="card">
        <p><b>Tracking No:</b> ${found.trackingNumber}</p>

        <p><b>Sender:</b> ${found.senderName}</p>
        <p><b>Sender Address:</b> ${found.senderAddress}</p>

        <p><b>Receiver:</b> ${found.receiverName}</p>
        <p><b>Receiver Address:</b> ${found.receiverAddress}</p>
        <p><b>Phone:</b> ${found.receiverPhone}</p>

        <p><b>Package:</b> ${found.packageDetails || "N/A"}</p>

        <p class="${found.status === 'Delivered' ? 'delivered' : 'pending'}">
          Status: ${found.status}
        </p>

        <p><b>Notes:</b> ${found.notes || "None"}</p>
      </div>
    `;
  } else {
    result.innerHTML = "<p>Shipment not found</p>";
  }
}