window.showSection = function(id) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.remove('hidden');
        }
    };
document.addEventListener('DOMContentLoaded', function () {
    const id = localStorage.getItem("userId");
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
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
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
            fetch('https://web-production-25934.up.railway.app/predict-full-assessment', {
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

                const popup = document.getElementById('assessment-popup');
                if (popup) popup.classList.remove('hidden');
            })
            .catch(error => {
                console.error("Error:", error);
                alert("There was an error with the request.");
            });
        });
    }
    window.triggerSaveAssessment = function () {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            alert("Please log in to save your assessment.");
            return;
        }
        const result = {
            risk: document.getElementById("biopsy-risk")?.textContent || "N/A",
            confidence: document.getElementById("confidence")?.textContent || "N/A",
            recommendation: document.getElementById("screening-recommendation")?.textContent || "N/A",
            email
        };
        fetch('https://your-api-url.com/save-assessment', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result)
        })
        .then(response => {
            if (!response.ok) throw new Error("Save failed");
            alert("Assessment saved successfully.");
        })
        .catch(err => {
            console.error(err);
            alert("Failed to save assessment.");
        });
    };
    window.closePopup = function () {
        const popup = document.getElementById('assessment-popup');
        if (popup) popup.classList.add('hidden');
    };
    window.closePopupinventory = function () {
        const popup = document.getElementById('inventory-popup');
        if (popup) popup.classList.add('hidden');
    };
    function closeInventoryForm() {
        const overlay = document.getElementById('popup-overlay');
        if (overlay) overlay.classList.add('hidden');
    }
    window.getAppointments = function () {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            alert("User email not found. Please log in.");
            return;
        }
        fetch(`https://appointment-mknk.onrender.com/user?email=${encodeURIComponent(email)}`)
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
                console.error("Error fetching appointments:", err);
                alert("Could not load appointments.");
            });
    };
    window.editAppointment = function (id) {
        fetch(`https://appointment-mknk.onrender.com/${id}`)
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
    document.getElementById("edit-appointment-form")?.addEventListener("submit", function (e) {
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
        fetch(`https://appointment-mknk.onrender.com/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAppointment)
        })
        .then(response => {
            if (!response.ok) throw new Error("Update failed");
            return response.json();
        })
        .then(() => {
            alert("Appointment updated successfully!");
            document.getElementById("edit-appointment-popup").classList.add("hidden");
            getAppointments();
        })
        .catch(err => {
            console.error("Error updating appointment:", err);
            alert("Failed to update appointment.");
        });
    });
window.deleteAppointment = function (id) {
    if (!id) return;
    if (confirm("Are you sure you want to delete this appointment?")) {
        fetch(`https://appointment-mknk.onrender.com/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Delete failed");
            alert("Appointment deleted.");
            getAppointments();
        })
        .catch(err => {
            console.error("Error deleting appointment:", err);
            alert("Failed to delete appointment.");
        });
    }
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
    container.style.display = 'block';
    container.innerText = `🔄 Searching for "${itemOrService}" in "${region}"...`;
    const url = `https://hospital-recommender-service-mknk.onrender.com/recommendations/region/${region}/item/${encodeURIComponent(itemOrService)}?insurance=${encodeURIComponent(insurance)}&maxBudget=${encodeURIComponent(budget)}`;
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
                    <tbody>`;
            for (const entry of data) {
                html += `
                    <tr>
                        <td>${entry.facilityName}</td>
                        <td>${entry.item || entry.service || '-'}</td>
                        <td>${entry.category || '-'}</td>
                        <td>KES ${entry.price || entry.baseCost || entry.cost || '-'}</td>
                        <td>${entry.availableStock !== undefined ? entry.availableStock : '-'}</td>
                    </tr>`;
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
    fetch(`https://hospital-recommender-service-mknk.onrender.com/stock/region/${region}/item/${encodeURIComponent(item)}`)
        .then(response => {
            if (!response.ok) throw new Error("Server error: " + response.status);
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                resultsDiv.innerText = "⚠️ No matching facilities found.";
                return;
            }
            let html = `
                <h3>Stock Availability</h3>
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
                    <tbody>`;
            for (const facility of data) {
                html += `
                    <tr>
                        <td>${facility.facilityName}</td>
                        <td>${facility.category}</td>
                        <td>${facility.itemOrService}</td>
                        <td>KES ${facility.cost}</td>
                        <td>${facility.availableStock !== null ? facility.availableStock : '-'}</td>
                    </tr>`;
            }
            html += '</tbody></table>';
            resultsDiv.innerHTML = html;
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
window.closePopup = function () {
    const popup = document.getElementById('inventory-popup');
    if (popup) popup.classList.add('hidden');
};

function closeInventoryForm() {
    const overlay = document.getElementById('popup-overlay');
    if (overlay) overlay.classList.add('hidden');
}
function renderRecommendationTable(data) {
    const container = document.getElementById('recommender-results');
    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "No recommendations found.";
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
                <td>${facility.category || '-'}</td>
                <td>${facility.itemOrService || '-'}</td>
                <td>KES ${facility.cost || '-'}</td>
                <td>${facility.availableStock !== null && facility.availableStock !== undefined ? facility.availableStock : '-'}</td>
            </tr>
        `;
    }
    html += '</tbody></table>';
    container.innerHTML = html;
}
window.getRecommendations = function () {
    const region = document.getElementById('recommender-region')?.value;
    if (!region) return alert("Please enter a region.");

    fetch(`https://hospital-recommender-service-mknk.onrender.com/recommendations/region/${region}`)
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
    fetch(`https://hospital-recommender-service-mknk.onrender.com/recommendations/region/${region}/item/${encodeURIComponent(item)}`)
        .then(response => response.json())
        .then(data => renderRecommendationTable(data))
        .catch(err => {
            console.error("Error fetching item-based recommendations:", err);
            document.getElementById('recommender-results').innerText = 'Error fetching item-based recommendations.';
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
    fetch(`https://hospital-recommender-service-mknk.onrender.com/stock/region/${region}/item/${encodeURIComponent(item)}`)
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                resultsDiv.innerText = "⚠️ No matching facilities found.";
                return;
            }
            let html = `
                <h3>Stock Availability</h3>
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
                        <td>${facility.category || '-'}</td>
                        <td>${facility.itemOrService || '-'}</td>
                        <td>KES ${facility.cost || '-'}</td>
                        <td>${facility.availableStock !== null && facility.availableStock !== undefined ? facility.availableStock : '-'}</td>
                    </tr>
                `;
            }

            html += '</tbody></table>';
            resultsDiv.innerHTML = html;
        })
        .catch(err => {
            console.error("Error fetching stock data:", err);
            resultsDiv.innerText = '❌ Error fetching stock data.';
        });
};
const defaultCreateAppointment = async function (e) {
    e.preventDefault();
    const form = e.target;
    const email = localStorage.getItem("userEmail");
    if (!email) {
        alert("User not logged in. Please login first.");
        return;
    }
    const appointmentData = {
        patientName: form.patientName.value.trim(),
        contactInfo: form.contactInfo.value.trim(),
        appointmentDateTime: `${form.appointmentDate.value}T${form.appointmentTime.value}`,
        purpose: form.purpose.value.trim(),
        region: form.region.value.trim(),
        hospital: form.hospital.value.trim(),
        email: email,
    };
    try {
        const response = await fetch("https://appointment-mknk.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointmentData),
        });

        if (!response.ok) throw new Error("Booking failed");

        alert("Appointment booked successfully!");
        form.reset();
        if (typeof getAppointments === "function") getAppointments(); // refresh list
    } catch (error) {
        alert("Error: " + error.message);
    }
};
function openAppointmentForm() {
    const popup = document.getElementById('appointment-form-popup');
    if (popup) popup.classList.remove('hidden');
}
function closeAppointmentForm() {
    const popup = document.getElementById('appointment-form-popup');
    if (popup) popup.classList.add('hidden');
    const form = document.getElementById('appointment-form');
    if (form) {
        form.reset();
        form.onsubmit = defaultCreateAppointment;
    }
}
window.openAppointmentForm = openAppointmentForm;
window.closeAppointmentForm = closeAppointmentForm;
document.getElementById('appointment-form').onsubmit = defaultCreateAppointment;
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
form.addEventListener("click", (e) => {
    if (e.target.matches(".next-btn")) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        } else {
            alert("Please fill out all required fields in this step.");
        }
    } else if (e.target.matches(".prev-btn")) {
        e.preventDefault();
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar li').forEach(li => {
        li.addEventListener('click', () => {
            const section = li.getAttribute('onclick').match(/showSection\('([^']+)'\)/)[1];
            showSection(section);
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    // Replace data-section
    document.querySelectorAll("[data-section]").forEach(el => {
        el.addEventListener("click", () => {
            const target = el.getAttribute("data-section");
            if (target) showSection(target);
        });
    });

    // Replace data-action
    document.querySelectorAll("[data-action]").forEach(el => {
        el.addEventListener("click", () => {
            const fn = window[el.getAttribute("data-action")];
            if (typeof fn === "function") fn();
        });
    });

    // Replace data-print
    document.querySelectorAll("[data-print]").forEach(el => {
        el.addEventListener("click", () => window.print());
    });

    // Replace data-save-assessment
    document.querySelectorAll("[data-save-assessment]").forEach(el => {
        el.addEventListener("click", () => triggerSaveAssessment());
    });
});
