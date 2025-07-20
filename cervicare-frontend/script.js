document.addEventListener('DOMContentLoaded', function () {
    
    // === PAGE NAVIGATION ===
    window.showSection = function(id) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.remove('hidden');
        }
    }
      showSection('landing'); 
     function extractBiopsyData(data) {
        return {
            Age: parseFloat(data.Age),
            Number_of_Pregnancies: parseInt(data.Number_of_Pregnancies),
            Smokes: parseInt(data.Smokes),
            Hormonal_Contraceptives: parseInt(data.Hormonal_Contraceptives),
            STDs: parseInt(data.STDs),
            HPV: parseInt(data.HPV),
            IUD: parseInt(data.IUD),
            STDs_Number: parseInt(data.STDs_Number),
            First_sexual_intercourse_age: parseFloat(data.First_sexual_intercourse_age),
            STDs_condylomatosis: parseInt(data.STDs_condylomatosis),
            STDs_cervical_condylomatosis: parseInt(data.STDs_cervical_condylomatosis),
            STDs_vaginal_condylomatosis: parseInt(data.STDs_vaginal_condylomatosis),
            STDs_vulvo_perineal_condylomatosis: parseInt(data.STDs_vulvo_perineal_condylomatosis),
            STDs_syphilis: parseInt(data.STDs_syphilis),
            STDs_pelvic_inflammatory_disease: parseInt(data.STDs_pelvic_inflammatory_disease),
            STDs_genital_herpes: parseInt(data.STDs_genital_herpes),
            STDs_molluscum_contagiosum: parseInt(data.STDs_molluscum_contagiosum),
            STDs_HIV: parseInt(data.STDs_HIV),
            STDs_Hepatitis_B: parseInt(data.STDs_Hepatitis_B),
            STDs_HPV: parseInt(data.STDs_HPV),
            Dx: parseInt(data.Dx),
            Dx_Cancer: parseInt(data.Dx_Cancer),
            Dx_CIN: parseInt(data.Dx_CIN),
            Smokes_years: parseFloat(data.Smokes_years),
Smokes_packs_per_year: parseFloat(data.Smokes_packs_per_year),
Hormonal_Contraceptives_years: parseFloat(data.Hormonal_Contraceptives_years),
IUD_years: parseFloat(data.IUD_years),
STDs_Time_since_first_diagnosis: parseFloat(data.STDs_Time_since_first_diagnosis),
STDs_Time_since_last_diagnosis: parseFloat(data.STDs_Time_since_last_diagnosis),
Hinselmann: parseInt(data.Hinselmann),
Schiller: parseInt(data.Schiller),
Citology: parseInt(data.Citology),

        };
    }

    function extractRecommendationData(data) {
        return {
            Age: parseInt(data.Age),
            Sexual_Partners: data.Sexual_Partners ? parseInt(data.Sexual_Partners) : null,
            First_Sexual_Activity_Age: data.First_Sexual_Activity_Age ? parseFloat(data.First_Sexual_Activity_Age) : null,
            HPV_Test_Result: data.HPV_Test_Result || null,
            Pap_Smear_Result: data.Pap_Smear_Result || null,
            Smoking_Status: data.Smoking_Status || null,
            STDs_History: data.STDs_History || null,
            Region: data.Region || null,
            Insurance_Covered: data.Insurance_Covered || null,
            Screening_Type_Last: data.Screening_Type_Last || null
        };
    }
      function showAssessmentPopup() {
        const popup = document.getElementById('assessment-popup');
        if (popup) popup.classList.remove('hidden');
    }
    // === Helper to set text safely ===
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
    // === ASSESSMENT FORM SUBMISSION ===
    const assessmentForm = document.getElementById('assessment-form');
if (assessmentForm) {
    assessmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const assessmentData = {};
        formData.forEach((value, key) => {
            assessmentData[key] = value;
        });

        setText('biopsy-risk', 'Loading...');
        setText('confidence', '...');
        setText('screening-recommendation', '...');

        fetch('http://localhost:8000/predict-full-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                biopsy_data: extractBiopsyData(assessmentData),
                recommendation_data: extractRecommendationData(assessmentData)
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.biopsy_risk) {
                setText('biopsy-risk', data.biopsy_risk.prediction === 1 ? "High Risk" : "Low Risk");
                setText('confidence', data.biopsy_risk.confidence);
            } else {
                setText('biopsy-risk', "Not Available");
                setText('confidence', "N/A");
            }

            setText('screening-recommendation', data.screening_recommendation);

            // ✅ Show the result popup
            const popup = document.getElementById('assessment-popup');
            if (popup) {
                popup.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error with the request.");
        });
    });
}

// Popup control functions
function closeAppointmentForm() {
    const popup = document.getElementById('appointment-popup');
    if (popup) popup.classList.add('hidden');
}
    function closeAssessmentPopup() {
        const popup = document.getElementById('assessment-popup');
        if (popup) popup.classList.add('hidden');
    }
    window.closeAssessmentPopup = closeAssessmentPopup;
    function openAppointmentForm() {
        const popup = document.getElementById('appointment-popup');
        if (popup) popup.classList.remove('hidden');
    }
    function closeAppointmentForm() {
        const popup = document.getElementById('appointment-popup');
        if (popup) popup.classList.add('hidden');
    }
    window.showAssessmentPopup = showAssessmentPopup;
    window.openAppointmentForm = openAppointmentForm;
    window.closeAppointmentForm = closeAppointmentForm;
    function triggerSaveAssessment() {
        const formData = new FormData(document.getElementById('assessment-form'));
        const assessmentData = {};
        formData.forEach((value, key) => {
            assessmentData[key] = value;
        });
        const payload = {
            ...assessmentData,
            biopsy_risk_prediction: document.getElementById('biopsy-risk')?.textContent === "High Risk" ? 1 : 0,
            confidence: document.getElementById('confidence')?.textContent,
            screening_recommendation: document.getElementById('screening-recommendation')?.textContent
        };

        fetch('http://localhost:5000/api/save-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(() => alert("Assessment saved."))
        .catch(err => {
            console.error("Save error", err);
            alert("Failed to save assessment.");
        });
    }
    window.triggerSaveAssessment = triggerSaveAssessment;
    document.getElementById("appointment-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    // Get values from form
    const patientName = document.getElementById("patientName").value;
    const contactInfo = document.getElementById("contactInfo").value;
    const date = document.getElementById("appointmentDate").value; // e.g., "2025-07-18"
    const time = document.getElementById("appointmentTime").value; // e.g., "14:30"
    const appointmentDateTime = `${date}T${time}`; // Combine to ISO-8601 format
    const purpose = document.getElementById("purpose").value;
    const region = document.getElementById("region").value;
    const hospital = document.getElementById("hospital").value;
   const email = localStorage.getItem("userEmail");

const appointmentData = {
    patientName: form.patientName.value,
    contactInfo: form.contactInfo.value,
    appointmentDateTime: `${form.appointmentDate.value}T${form.appointmentTime.value}`,
    purpose: form.purpose.value,
    region: form.region.value,
    hospital: form.hospital.value,
    userEmail: email
};

    try {
        const response = await fetch("http://localhost:8080/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        alert("Appointment booked successfully!");
        document.getElementById("appointment-form").reset();
    } catch (error) {
        console.error("Appointment booking failed", error);
        alert("Failed to book appointment. See console for details.");
    }
});
    // === CHATBOT TOGGLE ===
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');

  toggleBtn.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
});

    // === INVENTORY CRUD ===
    const inventoryForm = document.getElementById("inventory-form");
    if (inventoryForm) {
        inventoryForm.addEventListener("submit", function(e) {
            e.preventDefault();document.getElementById("item-id")?.value;
            const id = document.getElementById("itemId")?.value;
            const itemName = document.getElementById("itemName")?.value;
            const url = id
                ? `http://localhost:8083/api/hospitals/items/${id}`
                : 'http://localhost:8083/api/hospitals/items';
            const method = id ? 'PUT' : 'POST';
            const itemData = {
    region: document.getElementById("region")?.value,
    ward: document.getElementById("ward")?.value,
    facilityName: document.getElementById("facilityName")?.value,
    kephLevel: document.getElementById("kephLevel")?.value,
    owner: document.getElementById("owner")?.value,
    code: document.getElementById("code")?.value,
    item: document.getElementById("itemName")?.value,
    cost: parseFloat(document.getElementById("cost")?.value),
    availableStock: parseInt(document.getElementById("availableStock")?.value),
    price: parseFloat(document.getElementById("price")?.value),
};

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            })
            .then(response => response.json())
            .then(data => {
                alert(`Item ${id ? 'updated' : 'created'} successfully.`);
                inventoryForm.reset();
                getInventory();
            });
        });
    }
    window.getInventory = function () {
        fetch('http://localhost:8083/api/hospitals/items')
            .then(response => response.json())
            .then(data => {
                let html = '<table><tr><th>ID</th><th>Facility</th><th>Item</th><th>Stock</th><th>Cost</th><th>Actions</th></tr>';
                data.forEach(item => {
                    html += `<tr>
                        <td>${item.id}</td>
                        <td>${item.facilityName}</td>
                        <td>${item.item}</td>
                        <td>${item.availableStock}</td>
                        <td>${item.cost}</td>
                        <td>
                            <button onclick="editInventory(${item.id})">✏️ Edit</button>
                            <button onclick="deleteInventory(${item.id})">🗑️ Delete</button>
                        </td>
                    </tr>`;
                });
                html += '</table>';
                document.getElementById("inventory-results").innerHTML = html;
            });
    }
    window.editInventory = function (id) {
    fetch(`http://localhost:8083/api/hospitals/items/${id}`)
        .then(response => response.json())
        .then(item => {
           document.getElementById("item-id").value = item.id;          // changed itemId -> item-id
            document.getElementById("region").value = item.region;
            document.getElementById("ward").value = item.ward;
            document.getElementById("facilityName").value = item.facilityName;
            document.getElementById("kephLevel").value = item.kephLevel;
            document.getElementById("owner").value = item.owner;
            document.getElementById("code").value = item.code;
            document.getElementById("item").value = item.item;            // changed itemName -> item
            document.getElementById("cost").value = item.cost;
            document.getElementById("availableStock").value = item.availableStock;
            document.getElementById("price").value = item.price;
            // Show the popup for editing
            document.getElementById("popup-form").classList.remove("hidden");

        });
};

    window.deleteInventory = function (id) {
        if (confirm("Are you sure you want to delete this item?")) {
            fetch(`http://localhost:8083/api/hospitals/items/${id}`, {
                method: 'DELETE'
            }).then(() => {
                alert("Item deleted.");
                getInventory();
            });
        }
    }
    function showInventoryForm() {
  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup-form');
  if (overlay) overlay.classList.remove('hidden');
  if (popup) popup.classList.remove('hidden');
}
window.showInventoryForm = showInventoryForm;
    // Inventory form popup
   const popup = document.getElementById('inventory-popup');
if (popup) popup.classList.remove('hidden');

    window.closePopup = function () {
        document.getElementById('popup-overlay').style.display = 'none';
        document.getElementById('popup-form').style.display = 'none';
    }
    function closePopupinventory() {
    const overlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup-form');
    if (overlay) overlay.classList.add('hidden');
    if (popup) popup.classList.add('hidden');
}
window.closePopupinventory = closePopupinventory;
// Fetch and display all appointments
window.getAppointments = function () {
    const email = localStorage.getItem("userEmail"); // or get from login form
    if (!email) {
        alert("User email not found. Please log in.");
        return;
    }

    fetch(`http://localhost:8080/api/appointments/user?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch appointments.");
            return response.json();
        })
        .then(data => {
            let html = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Purpose</th>
                        <th>Hospital</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>`;
            data.forEach(app => {
                html += `
                    <tr>
                        <td>${app.id}</td>
                        <td>${app.patientName}</td>
                        <td>${app.contactInfo}</td>
                        <td>${new Date(app.appointmentDateTime).toLocaleString()}</td>
                        <td>${app.purpose}</td>
                        <td>${app.hospital}</td>
                        <td>${app.region}</td>
                        <td>
                            <button onclick="editAppointment(${app.id})">✏️ Edit</button>
                            <button onclick="deleteAppointment(${app.id})">🗑️ Delete</button>
                        </td>
                    </tr>`;
            });
            html += '</table>';
            document.getElementById("appointments-results").innerHTML = html;
        })
        .catch(err => {
            console.error("Error fetching appointments by email:", err);
            alert("Could not load appointments.");
        });
};
    // Fetch appointment data
    fetch(`http://localhost:8080/api/appointments/${id}`)
        .then(res => res.json())
        .then(app => {
            // Pre-fill the form with existing data
            document.getElementById("patientName").value = app.patientName;
            document.getElementById("contactInfo").value = app.contactInfo;

            const [date, time] = app.appointmentDateTime.split("T");
            document.getElementById("appointmentDate").value = date;
            document.getElementById("appointmentTime").value = time;

            document.getElementById("purpose").value = app.purpose;
            document.getElementById("region").value = app.region;
            document.getElementById("hospital").value = app.hospital;

            openAppointmentForm();

            // Override form submission to update
            const form = document.getElementById("appointment-form");
            form.onsubmit = async function (e) {
                e.preventDefault();
                const updatedData = {
                    patientName: form.patientName.value,
                    contactInfo: form.contactInfo.value,
                    appointmentDateTime: `${form.appointmentDate.value}T${form.appointmentTime.value}`,
                    purpose: form.purpose.value,
                    region: form.region.value,
                    hospital: form.hospital.value,
                };

                const response = await fetch(`http://localhost:8080/api/appointments/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                });

                if (response.ok) {
                    alert("Appointment updated!");
                    closeAppointmentForm();
                    form.reset();
                } else {
                    alert("Update failed.");
                }

                // Reset back to create
                form.onsubmit = defaultCreateAppointment;
            };
        });

// Default submit handler for new appointments
const defaultCreateAppointment = async function (e) {
    e.preventDefault();
    const form = e.target;
 const email = localStorage.getItem("userEmail");

const appointmentData = {
    patientName: form.patientName.value,
    contactInfo: form.contactInfo.value,
    appointmentDateTime: `${form.appointmentDate.value}T${form.appointmentTime.value}`,
    purpose: form.purpose.value,
    region: form.region.value,
    hospital: form.hospital.value,
    userEmail: email
};

    try {
        const response = await fetch("http://localhost:8080/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData),
        });

        if (!response.ok) throw new Error("Booking failed");
        alert("Appointment booked successfully!");
        form.reset();
    } catch (error) {
        alert("Error: " + error.message);
    }
};
// Delete appointment
window.startDeleteAppointment = function (id) {
    if (!id) return;

    if (confirm("Are you sure you want to delete appointment ID " + id + "?")) {
        fetch(`http://localhost:8080/api/appointments/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Appointment deleted.");
            getAppointments(); // refresh the table
        })
        .catch(err => {
            alert("Error deleting.");
            console.error(err);
        });
    }
};
document.getElementById("btn-get-appointments").addEventListener("click", getAppointments);
function getAppointments() {
    fetch("http://localhost:8080/api/appointments")
        .then(response => response.json())
        .then(data => {
            let html = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Purpose</th>
                        <th>Hospital</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>`;
            data.forEach(app => {
                html += `
                    <tr>
                        <td>${app.id}</td>
                        <td>${app.patientName}</td>
                        <td>${app.contactInfo}</td>
                        <td>${new Date(app.appointmentDateTime).toLocaleString()}</td>
                        <td>${app.purpose}</td>
                        <td>${app.hospital}</td>
                        <td>${app.region}</td>
                        <td>
                            <button onclick="editAppointment(${app.id})">✏️ Edit</button>
                            <button onclick="deleteAppointment(${app.id})">🗑️ Delete</button>
                        </td>
                    </tr>`;
            });
            html += '</table>';
            document.getElementById("appointments-results").innerHTML = html;
        })
        .catch(err => {
            console.error("Failed to load appointments", err);
            alert("Could not load appointments. See console for details.");
        });
}
window.editAppointment = function (id) {
    fetch(`http://localhost:8080/api/appointments/${id}`)
        .then(response => response.json())
        .then(app => {
            document.getElementById("edit-appointment-id").value = app.id;
            document.getElementById("edit-patientName").value = app.patientName;
            document.getElementById("edit-contactInfo").value = app.contactInfo;

            const dateTime = new Date(app.appointmentDateTime);
            document.getElementById("edit-appointmentDate").value = dateTime.toISOString().split('T')[0];
            document.getElementById("edit-appointmentTime").value = dateTime.toTimeString().slice(0, 5);
            document.getElementById("edit-purpose").value = app.purpose;
            document.getElementById("edit-region").value = app.region;
            document.getElementById("edit-hospital").value = app.hospital;

            document.getElementById("edit-appointment-popup").classList.remove("hidden");
        });
};
document.getElementById("edit-appointment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("edit-appointment-id").value;
    const updatedAppointment = {
        patientName: document.getElementById("edit-patientName").value,
        contactInfo: document.getElementById("edit-contactInfo").value,
        appointmentDateTime: new Date(
            document.getElementById("edit-appointmentDate").value + "T" +
            document.getElementById("edit-appointmentTime").value
        ).toISOString(),
        purpose: document.getElementById("edit-purpose").value,
        region: document.getElementById("edit-region").value,
        hospital: document.getElementById("edit-hospital").value
    };

    fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAppointment)
    })
    .then(response => {
        if (!response.ok) throw new Error("Update failed");
        return response.json();
    })
    .then(data => {
        alert("Appointment updated successfully!");
        document.getElementById("edit-appointment-popup").classList.add("hidden");
        if (typeof getAppointments === "function") getAppointments(); // refresh list
    })
    .catch(error => {
        console.error("Error updating appointment:", error);
        alert("Failed to update appointment.");
    });
});

window.deleteAppointment = function (id) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        fetch(`http://localhost:8080/api/appointments/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Appointment deleted.");
            getAppointments();
        });
    }
}


window.closePopup = function () {
    const popup = document.getElementById('inventory-popup');
    if (popup) popup.classList.add('hidden');
}

function closeInventoryForm() {
    document.getElementById('inventory-popup').classList.add('hidden');
}
function renderRecommendationTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
        document.getElementById('recommender-results').innerHTML = "No recommendations found.";
        return;
    }

    let html = '<table><thead><tr>' +
        '<th>ID</th><th>Region</th><th>Ward</th><th>Facility</th>' +
        '<th>KEPH Level</th><th>Owner</th><th>Code</th>' +
        '<th>Item</th><th>Cost</th><th>Stock</th><th>Price</th>' +
        '</tr></thead><tbody>';

    data.forEach(hospital => {
        html += `<tr>
            <td>${hospital.id}</td>
            <td>${hospital.region}</td>
            <td>${hospital.ward}</td>
            <td>${hospital.facilityName}</td>
            <td>${hospital.kephLevel}</td>
            <td>${hospital.owner}</td>
            <td>${hospital.code}</td>
            <td>${hospital.item}</td>
            <td>${hospital.cost}</td>
            <td>${hospital.availableStock}</td>
            <td>${hospital.price}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    document.getElementById('recommender-results').innerHTML = html;
}
function renderRecommendationTable(data) {
    if (!Array.isArray(data) || data.length === 0) {
        document.getElementById('recommender-results').innerHTML = "No recommendations found.";
        return;
    }

    let html = '<table><thead><tr>' +
        '<th>ID</th><th>Region</th><th>Ward</th><th>Facility</th>' +
        '<th>KEPH Level</th><th>Owner</th><th>Code</th>' +
        '<th>Item</th><th>Cost</th><th>Stock</th><th>Price</th>' +
        '</tr></thead><tbody>';

    data.forEach(hospital => {
        html += `<tr>
            <td>${hospital.id}</td>
            <td>${hospital.region}</td>
            <td>${hospital.ward}</td>
            <td>${hospital.facilityName}</td>
            <td>${hospital.kephLevel}</td>
            <td>${hospital.owner}</td>
            <td>${hospital.code}</td>
            <td>${hospital.item}</td>
            <td>${hospital.cost}</td>
            <td>${hospital.availableStock}</td>
            <td>${hospital.price}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    document.getElementById('recommender-results').innerHTML = html;
}

window.getRecommendations = function () {
    const region = document.getElementById('recommender-region')?.value;
    if (!region) return alert("Please enter a region.");

    fetch(`http://localhost:8083/api/hospitals/recommendations/region/${region}`)
        .then(response => response.json())
        .then(data => renderRecommendationTable(data))
        .catch(err => {
            console.error("Error fetching recommendations:", err);
            document.getElementById('recommender-results').innerText = 'Error fetching recommendations.';
        });
};

window.getRecommendationsByItem = function () {
    const region = document.getElementById('recommender-region')?.value;
    const item = document.getElementById('recommender-item')?.value;
    if (!region || !item) return alert("Please enter both region and item name.");

    fetch(`http://localhost:8083/api/hospitals/recommendations/region/${region}/item/${item}`)
        .then(response => response.json())
        .then(data => renderRecommendationTable(data))
        .catch(err => {
            console.error("Error fetching item-based recommendations:", err);
            document.getElementById('recommender-results').innerText = 'Error fetching item-based recommendations.';
        });
};
window.getEnhancedRecommendations = function () {
    const region = document.getElementById('recommender-region')?.value.trim();
    const itemOrService = document.getElementById('recommender-item')?.value.trim();
    const budget = document.getElementById('recommender-budget')?.value.trim();
    const insurance = document.getElementById('recommender-insurance')?.value.trim();

    const container = document.getElementById('recommender-results');

    if (!region || !itemOrService) {
        container.style.display = 'block';
        container.innerText = "❌ Please enter both region and keyword (item / service / category).";
        return;
    }

    container.style.display = 'block';  // Show results container now
    container.innerText = `🔄 Searching for "${itemOrService}" in "${region}"...`;

    const url = `http://localhost:8083/api/hospitals/recommendations/region/${region}/item/${encodeURIComponent(itemOrService)}?insurance=${encodeURIComponent(insurance)}&maxBudget=${encodeURIComponent(budget)}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Server error: " + res.status);
            return res.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                container.innerText = "⚠️ No matching facilities found.";
                return;
            }

            let html = `
                <h3>Recommended Facilities</h3>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Facility</th>
                            <th>Item / Service</th>
                            <th>Category</th>
                            <th>Cost (KES)</th>
                            <th>Available Stock</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (const entry of data) {
                html += `
                    <tr>
                        <td>${entry.facilityName}</td>
                        <td>${entry.item || entry.service || '-'}</td>
                        <td>${entry.category || '-'}</td>
                        <td>KES ${entry.price || entry.baseCost || entry.cost}</td>
                        <td>${entry.availableStock !== undefined ? entry.availableStock : '-'}</td>
                    </tr>
                `;
            }

            html += '</tbody></table>';
            container.innerHTML = html;
        })
        .catch(err => {
            console.error("Error fetching recommendations:", err);
            container.innerText = "❌ Failed to fetch recommendations.";
        });
};

window.searchStock = function () {
    const region = document.getElementById('stock-region')?.value.trim();
    const item = document.getElementById('stock-item')?.value.trim();
    const resultsDiv = document.getElementById('stock-results');

    if (!region || !item) {
        resultsDiv.innerText = "Please enter both region and item name.";
        return;
    }

    resultsDiv.innerText = `Searching for "${item}" in region "${region}"...`;

    fetch(`http://localhost:8083/api/hospitals/stock/region/${region}/item/${item}`)
        .then(response => response.json())
        .then(data => {
    if (!data || data.length === 0) {
        container.innerText = "⚠️ No matching facilities found.";
        return;
    }

    let html = `
        <h3>Recommended Facilities</h3>
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>Facility</th>
                    <th>Category</th>
                    <th>Item / Service</th>
                    <th>Cost (KES)</th>
                    <th>Available Stock</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const facility of data) {
        html += `
            <tr>
                <td>${facility.facilityName}</td>
                <td>${facility.category}</td>
                <td>${facility.itemOrService}</td>
                <td>KES ${facility.cost}</td>
                <td>${facility.availableStock !== null ? facility.availableStock : '-'}</td>
            </tr>
        `;
    }

    html += '</tbody></table>';
    container.innerHTML = html;
})
        .catch(err => {
            console.error("Error fetching stock data:", err);
            resultsDiv.innerText = '❌ Error fetching stock data.';
        });
};
  const form = document.getElementById("assessment-form");
  const formSteps = form.querySelectorAll(".form-step");
  const progress = document.getElementById("progress");
  let currentStep = 0;

  // Show the initial step and update progress bar
  function showStep(step) {
    formSteps.forEach((formStep, index) => {
      if (index === step) {
        formStep.classList.add("active");
      } else {
        formStep.classList.remove("active");
      }
    });
    const progressPercent = ((step + 1) / formSteps.length) * 100;
    progress.style.width = progressPercent + "%";
  }

  // Validate current step inputs (simple required validation)
  function validateStep(step) {
    const inputs = formSteps[step].querySelectorAll("input[required]");
    for (let input of inputs) {
      if (input.type === "radio") {
        const name = input.name;
        const checked = formSteps[step].querySelector(`input[name="${name}"]:checked`);
        if (!checked) return false;
      } else {
        if (!input.value.trim()) return false;
      }
    }
    return true;
  }

  // Event delegation for buttons in form steps
  form.addEventListener("click", (e) => {
    if (e.target.matches("#next-btn")) {
      e.preventDefault();
      if (validateStep(currentStep)) {
        if (currentStep < formSteps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      } else {
        alert("Please fill out all required fields in this step.");
      }
    } else if (e.target.matches("#prev-btn")) {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  });
  showStep(currentStep);
});
