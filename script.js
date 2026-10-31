/**
 * CarePulse - Doctor Appointment Booking System
 * Interactive Multi-Step Scheduling Application Logic
 */

// ==========================================
// 1. DOCTORS DATA STORE
// ==========================================
const DOCTORS_DATA = [
  {
    id: "doc-1",
    name: "Dr. Ananya Roy",
    qualification: "MD, DM (Cardiology), AIIMS",
    specialty: "Cardiology",
    experience: "14+ Yrs Exp",
    hospital: "CarePulse Heart Institute, Delhi",
    room: "Cardiology Suite, Room 402",
    rating: "4.9",
    reviewsCount: "1.4k+",
    fee: 1200,
    avatar: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Bengali",
    about: "Senior Consultant Cardiologist specializing in interventional cardiology, hypertension, and preventive cardiac wellness."
  },
  {
    id: "doc-2",
    name: "Dr. Vikram Malhotra",
    qualification: "MS (Orthopaedics), M.Ch (UK)",
    specialty: "Orthopedics",
    experience: "16+ Yrs Exp",
    hospital: "CarePulse Joint & Spine Center",
    room: "Orthopedics Wing, Room 208",
    rating: "4.8",
    reviewsCount: "1.1k+",
    fee: 1000,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Punjabi",
    about: "Specialized in robotic joint replacements, sports injuries, and advanced arthroscopic procedures."
  },
  {
    id: "doc-3",
    name: "Dr. Priya Nair",
    qualification: "MD (Dermatology, Venereology & Leprosy)",
    specialty: "Dermatology",
    experience: "11+ Yrs Exp",
    hospital: "CarePulse Skin & Laser Clinic",
    room: "Aesthetics Wing, Room 105",
    rating: "4.9",
    reviewsCount: "2.3k+",
    fee: 900,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Malayalam",
    about: "Renowned clinical and aesthetic dermatologist with expertise in acne treatments, eczema, and skin rejuvenation."
  },
  {
    id: "doc-4",
    name: "Dr. Aarav Patel",
    qualification: "MD (Pediatrics), Fellowship Pediatric Critical Care",
    specialty: "Pediatrics",
    experience: "12+ Yrs Exp",
    hospital: "CarePulse Children's Clinic",
    room: "Pediatrics Wing, Room 301",
    rating: "4.9",
    reviewsCount: "1.8k+",
    fee: 800,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Gujarati",
    about: "Compassionate child healthcare specialist dedicated to infant nutrition, immunization, and growth monitoring."
  },
  {
    id: "doc-5",
    name: "Dr. Rajesh Khanna",
    qualification: "DM (Neurology), NIMHANS",
    specialty: "Neurology",
    experience: "18+ Yrs Exp",
    hospital: "CarePulse Neuro Science Institute",
    room: "Neuro Wing, Room 510",
    rating: "4.8",
    reviewsCount: "980+",
    fee: 1500,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi",
    about: "Specialist in migraine management, stroke rehabilitation, movement disorders, and comprehensive neurological care."
  },
  {
    id: "doc-6",
    name: "Dr. Neha Sengupta",
    qualification: "MBBS, MD (General Medicine)",
    specialty: "General Physician",
    experience: "9+ Yrs Exp",
    hospital: "CarePulse Primary Care Center",
    room: "OPD Complex, Room 101",
    rating: "4.7",
    reviewsCount: "3.2k+",
    fee: 650,
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Bengali",
    about: "Expert in seasonal infectious diseases, lifestyle disorder management, diabetes, and preventive medicine."
  },
  {
    id: "doc-7",
    name: "Dr. Siddharth Verma",
    qualification: "BDS, MDS (Prosthodontics & Implantology)",
    specialty: "Dentistry",
    experience: "13+ Yrs Exp",
    hospital: "CarePulse Dental Excellence Suite",
    room: "Dental Suite, Room 204",
    rating: "4.9",
    reviewsCount: "1.6k+",
    fee: 750,
    avatar: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi",
    about: "Painless root canals, advanced dental implants, smile makeovers, and full-mouth rehabilitation."
  },
  {
    id: "doc-8",
    name: "Dr. Kavita Joshi",
    qualification: "MD (Medicine), Fellowship in Clinical Cardiology",
    specialty: "Cardiology",
    experience: "10+ Yrs Exp",
    hospital: "CarePulse Heart Institute",
    room: "Cardiology Suite, Room 405",
    rating: "4.8",
    reviewsCount: "820+",
    fee: 1100,
    avatar: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&auto=format&fit=crop&q=80",
    languages: "English, Hindi, Marathi",
    about: "Dedicated non-invasive cardiologist focusing on lipid management, echocardiography, and preventive care."
  }
];

// Time Slot Templates
const TIME_SLOTS = {
  morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["12:30 PM", "01:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"],
  evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
};

// ==========================================
// 2. APPLICATION STATE
// ==========================================
const bookingState = {
  currentStep: 1,
  selectedDoctor: null,
  consultationMode: "In-Clinic Visit",
  selectedDate: null,
  selectedDateObj: null,
  selectedTimeSlot: null,
  patientDetails: {
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "Not Specified",
    isNewPatient: "No",
    symptoms: ""
  },
  paymentMethod: "Pay at Hospital",
  lastConfirmedBooking: null
};

// ==========================================
// 3. DOM ELEMENT REFERENCES
// ==========================================
const DOM = {
  // Navigation Steps & Cards
  stepItems: document.querySelectorAll(".stepper-wrapper .step-item"),
  stepSections: document.querySelectorAll(".form-card .step-content"),

  // Step 1 Elements
  specialtyFilters: document.getElementById("specialtyFilters"),
  doctorSearch: document.getElementById("doctorSearch"),
  doctorsContainer: document.getElementById("doctorsContainer"),
  doctorPreviewText: document.getElementById("doctorPreviewText"),
  step1NextBtn: document.getElementById("step1NextBtn"),

  // Step 2 Elements
  step2DoctorBanner: document.getElementById("step2DoctorBanner"),
  consultationModeInputs: document.querySelectorAll('input[name="consultationMode"]'),
  modeCards: document.querySelectorAll(".consultation-modes .mode-card"),
  datePickerContainer: document.getElementById("datePickerContainer"),
  selectedDateDisplay: document.getElementById("selectedDateDisplay"),
  morningSlots: document.getElementById("morningSlots"),
  afternoonSlots: document.getElementById("afternoonSlots"),
  eveningSlots: document.getElementById("eveningSlots"),
  step2BackBtn: document.getElementById("step2BackBtn"),
  step2NextBtn: document.getElementById("step2NextBtn"),

  // Step 3 Elements
  patientForm: document.getElementById("patientForm"),
  patientName: document.getElementById("patientName"),
  patientPhone: document.getElementById("patientPhone"),
  patientEmail: document.getElementById("patientEmail"),
  patientAge: document.getElementById("patientAge"),
  patientGender: document.getElementById("patientGender"),
  bloodGroup: document.getElementById("bloodGroup"),
  isNewPatientInputs: document.querySelectorAll('input[name="isNewPatient"]'),
  symptoms: document.getElementById("symptoms"),
  nameError: document.getElementById("nameError"),
  phoneError: document.getElementById("phoneError"),
  emailError: document.getElementById("emailError"),
  symptomsError: document.getElementById("symptomsError"),
  step3BackBtn: document.getElementById("step3BackBtn"),
  step3NextBtn: document.getElementById("step3NextBtn"),

  // Step 4 Elements
  reviewDoctorDetails: document.getElementById("reviewDoctorDetails"),
  reviewDate: document.getElementById("reviewDate"),
  reviewTime: document.getElementById("reviewTime"),
  reviewMode: document.getElementById("reviewMode"),
  reviewName: document.getElementById("reviewName"),
  reviewPhone: document.getElementById("reviewPhone"),
  reviewEmail: document.getElementById("reviewEmail"),
  reviewAgeGender: document.getElementById("reviewAgeGender"),
  reviewSymptoms: document.getElementById("reviewSymptoms"),
  billDoctorFee: document.getElementById("billDoctorFee"),
  billTotalAmount: document.getElementById("billTotalAmount"),
  paymentMethodInputs: document.querySelectorAll('input[name="paymentMethod"]'),
  paymentCards: document.querySelectorAll(".payment-selection .pay-option"),
  confirmBookingBtn: document.getElementById("confirmBookingBtn"),
  step4BackBtn: document.getElementById("step4BackBtn"),

  // Success Modal Elements
  successModal: document.getElementById("successModal"),
  receiptBookingId: document.getElementById("receiptBookingId"),
  receiptPatientName: document.getElementById("receiptPatientName"),
  receiptDoctorName: document.getElementById("receiptDoctorName"),
  receiptSpecialty: document.getElementById("receiptSpecialty"),
  receiptDateTime: document.getElementById("receiptDateTime"),
  receiptMode: document.getElementById("receiptMode"),
  receiptLocation: document.getElementById("receiptLocation"),
  printSlipBtn: document.getElementById("printSlipBtn"),
  addToCalBtn: document.getElementById("addToCalBtn"),
  bookAnotherBtn: document.getElementById("bookAnotherBtn"),

  // My Bookings Modal Elements
  myBookingsBtn: document.getElementById("myBookingsBtn"),
  myBookingsModal: document.getElementById("myBookingsModal"),
  bookingsBadge: document.getElementById("bookingsBadge"),
  modalBookingsCount: document.getElementById("modalBookingsCount"),
  closeBookingsModal: document.getElementById("closeBookingsModal"),
  bookingsListContainer: document.getElementById("bookingsListContainer"),

  // Global Elements
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  toastContainer: document.getElementById("toastContainer")
};

// ==========================================
// 4. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderDoctors("all", "");
  initStepNavigation();
  initStep1Events();
  initStep2Events();
  initStep3Events();
  initStep4Events();
  initModals();
  updateBookingsBadge();

  // Make goToStep accessible globally for inline buttons
  window.goToStep = goToStep;
});

// ==========================================
// 5. THEME TOGGLER
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem("carepulse_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  DOM.themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("carepulse_theme", newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`, "info");
  });
}

function updateThemeIcon(theme) {
  const icon = DOM.themeToggleBtn.querySelector("i");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

// ==========================================
// 6. STEPPER LOGIC
// ==========================================
function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 4) return;

  // Validation checks when advancing forward
  if (stepNumber > 1 && !bookingState.selectedDoctor) {
    showToast("Please select a doctor to continue", "error");
    goToStep(1);
    return;
  }

  if (stepNumber > 2 && (!bookingState.selectedDate || !bookingState.selectedTimeSlot)) {
    showToast("Please select both a date and time slot", "error");
    goToStep(2);
    return;
  }

  if (stepNumber > 3 && !validatePatientForm(false)) {
    goToStep(3);
    return;
  }

  bookingState.currentStep = stepNumber;

  // Update Stepper Navigation visuals
  DOM.stepItems.forEach(item => {
    const itemStep = parseInt(item.getAttribute("data-step"), 10);
    item.classList.remove("active", "completed");
    if (itemStep === stepNumber) {
      item.classList.add("active");
    } else if (itemStep < stepNumber) {
      item.classList.add("completed");
    }
  });

  // Switch Active Section View
  DOM.stepSections.forEach(sec => sec.classList.remove("active"));
  const activeSection = document.getElementById(`step${stepNumber}`);
  if (activeSection) {
    activeSection.classList.add("active");
  }

  // Hook Step-specific setups
  if (stepNumber === 2) {
    setupStep2View();
  } else if (stepNumber === 4) {
    setupStep4ReviewView();
  }

  // Smooth scroll to container top
  const container = document.getElementById("bookingSection");
  if (container) {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function initStepNavigation() {
  // Step 1 Next
  DOM.step1NextBtn.addEventListener("click", () => {
    if (bookingState.selectedDoctor) {
      goToStep(2);
    }
  });

  // Step 2 Buttons
  DOM.step2BackBtn.addEventListener("click", () => goToStep(1));
  DOM.step2NextBtn.addEventListener("click", () => {
    if (bookingState.selectedDate && bookingState.selectedTimeSlot) {
      goToStep(3);
    }
  });

  // Step 3 Buttons
  DOM.step3BackBtn.addEventListener("click", () => goToStep(2));
  DOM.step3NextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validatePatientForm(true)) {
      extractPatientFormData();
      goToStep(4);
    }
  });

  // Step 4 Buttons
  DOM.step4BackBtn.addEventListener("click", () => goToStep(3));
}

// ==========================================
// 7. STEP 1: DOCTORS SELECTION & SEARCH
// ==========================================
let currentFilterSpecialty = "all";
let currentSearchQuery = "";

function initStep1Events() {
  // Specialty chips click
  DOM.specialtyFilters.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    DOM.specialtyFilters.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    currentFilterSpecialty = chip.getAttribute("data-specialty") || "all";
    renderDoctors(currentFilterSpecialty, currentSearchQuery);
  });

  // Doctor search input
  DOM.doctorSearch.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value.trim().toLowerCase();
    renderDoctors(currentFilterSpecialty, currentSearchQuery);
  });
}

function renderDoctors(specialtyFilter, searchQuery) {
  DOM.doctorsContainer.innerHTML = "";

  const filtered = DOCTORS_DATA.filter(doc => {
    const matchesSpecialty = (specialtyFilter === "all" || doc.specialty.toLowerCase() === specialtyFilter.toLowerCase());
    const matchesSearch = !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery) ||
      doc.specialty.toLowerCase().includes(searchQuery) ||
      doc.hospital.toLowerCase().includes(searchQuery) ||
      doc.qualification.toLowerCase().includes(searchQuery);

    return matchesSpecialty && matchesSearch;
  });

  if (filtered.length === 0) {
    DOM.doctorsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-user-doctor" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-light);"></i>
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.25rem;">No doctors found</h4>
        <p style="font-size: 0.88rem;">Try adjusting your search criteria or clearing your filters.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(doc => {
    const isSelected = bookingState.selectedDoctor && bookingState.selectedDoctor.id === doc.id;
    const card = document.createElement("div");
    card.className = `doctor-card ${isSelected ? "selected" : ""}`;
    card.setAttribute("data-doc-id", doc.id);

    card.innerHTML = `
      <div class="doctor-card-top">
        <div class="doc-avatar-wrap">
          <img src="${doc.avatar}" alt="${doc.name}" class="doc-avatar" loading="lazy" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0284c7&color=fff&bold=true'">
          <span class="doc-online-badge" title="Available for appointments"></span>
        </div>
        <div class="doc-info">
          <h3 class="doc-name">${doc.name}</h3>
          <p class="doc-dept">${doc.specialty}</p>
          <div class="doc-rating">
            <i class="fa-solid fa-star"></i>
            <span>${doc.rating}</span>
            <small style="color: inherit; opacity: 0.85;">(${doc.reviewsCount})</small>
          </div>
        </div>
      </div>

      <div class="doc-meta">
        <div class="doc-meta-item">
          <i class="fa-solid fa-award"></i>
          <span>${doc.experience}</span>
        </div>
        <div class="doc-meta-item">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>${doc.qualification.split(',')[0]}</span>
        </div>
        <div class="doc-meta-item" style="grid-column: 1/-1;">
          <i class="fa-solid fa-location-dot"></i>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${doc.hospital}</span>
        </div>
      </div>

      <div class="doc-footer">
        <div class="doc-fee">
          <span>Consultation Fee</span>
          <strong>₹${doc.fee.toLocaleString("en-IN")}</strong>
        </div>
        <button type="button" class="doc-select-btn">
          ${isSelected ? '<i class="fa-solid fa-check"></i> Selected' : 'Select Doctor'}
        </button>
      </div>
    `;

    card.addEventListener("click", () => selectDoctor(doc));
    DOM.doctorsContainer.appendChild(card);
  });
}

function selectDoctor(doc) {
  bookingState.selectedDoctor = doc;

  // Refresh active cards state
  const cards = DOM.doctorsContainer.querySelectorAll(".doctor-card");
  cards.forEach(c => {
    const isThis = c.getAttribute("data-doc-id") === doc.id;
    c.classList.toggle("selected", isThis);
    const btn = c.querySelector(".doc-select-btn");
    if (btn) {
      btn.innerHTML = isThis ? '<i class="fa-solid fa-check"></i> Selected' : 'Select Doctor';
    }
  });

  // Enable step 1 Next button and update preview helper
  DOM.step1NextBtn.removeAttribute("disabled");
  DOM.doctorPreviewText.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--emerald);"></i>
    <span>Selected: <strong>${doc.name}</strong> (${doc.specialty}) • ₹${doc.fee}</span>
  `;

  showToast(`Selected ${doc.name}`, "success");
}

// ==========================================
// 8. STEP 2: SCHEDULE & TIME SELECTION
// ==========================================
function initStep2Events() {
  // Consultation mode selection
  DOM.modeCards.forEach(card => {
    card.addEventListener("click", () => {
      DOM.modeCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        bookingState.consultationMode = radio.value;
      }
    });
  });
}

function setupStep2View() {
  const doc = bookingState.selectedDoctor;
  if (!doc) return;

  // Render Top Doctor Banner
  DOM.step2DoctorBanner.innerHTML = `
    <div class="banner-left">
      <img src="${doc.avatar}" alt="${doc.name}" class="banner-avatar" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0284c7&color=fff&bold=true'">
      <div class="banner-info">
        <h4>${doc.name}</h4>
        <p>${doc.specialty} • ${doc.hospital} • ₹${doc.fee}</p>
      </div>
    </div>
    <button class="change-doc-btn" onclick="goToStep(1)">
      <i class="fa-solid fa-repeat"></i> Change
    </button>
  `;

  // Generate Date Picker Carousel (Next 14 Days)
  generateDateCarousel();

  // Validate step 2 progression button
  checkStep2Completion();
}

function generateDateCarousel() {
  DOM.datePickerContainer.innerHTML = "";
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const today = new Date();
  let defaultSelected = false;

  for (let i = 0; i < 14; i++) {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + i);

    const dayName = i === 0 ? "TODAY" : i === 1 ? "TOMORROW" : days[targetDate.getDay()];
    const dayNum = String(targetDate.getDate()).padStart(2, "0");
    const monthName = months[targetDate.getMonth()];
    const isoString = targetDate.toISOString().split("T")[0];

    const isMatch = bookingState.selectedDate === isoString || (!bookingState.selectedDate && i === 0);

    const card = document.createElement("div");
    card.className = `date-card ${isMatch ? "selected" : ""}`;
    card.setAttribute("data-date-iso", isoString);

    card.innerHTML = `
      <span class="day-name">${dayName}</span>
      <span class="day-num">${dayNum}</span>
      <span class="month-name">${monthName}</span>
    `;

    card.addEventListener("click", () => {
      selectDate(isoString, targetDate, card);
    });

    DOM.datePickerContainer.appendChild(card);

    if (isMatch && !defaultSelected) {
      bookingState.selectedDate = isoString;
      bookingState.selectedDateObj = targetDate;
      defaultSelected = true;
      updateSelectedDateDisplay(targetDate);
    }
  }

  // Populate time slots for selected date
  renderTimeSlots();
}

function selectDate(isoString, dateObj, cardElement) {
  bookingState.selectedDate = isoString;
  bookingState.selectedDateObj = dateObj;

  DOM.datePickerContainer.querySelectorAll(".date-card").forEach(c => c.classList.remove("selected"));
  cardElement.classList.add("selected");

  updateSelectedDateDisplay(dateObj);
  // Reset selected time slot when date changes
  bookingState.selectedTimeSlot = null;
  renderTimeSlots();
  checkStep2Completion();
}

function updateSelectedDateDisplay(dateObj) {
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  DOM.selectedDateDisplay.textContent = dateObj.toLocaleDateString('en-US', options);
}

function renderTimeSlots() {
  DOM.morningSlots.innerHTML = "";
  DOM.afternoonSlots.innerHTML = "";
  DOM.eveningSlots.innerHTML = "";

  const docId = bookingState.selectedDoctor ? bookingState.selectedDoctor.id : "doc-1";
  const dateStr = bookingState.selectedDate || "2026-11-01";

  // Pseudo-deterministic booked slots simulation based on doctor + date string
  const isSlotBooked = (slot) => {
    let hash = 0;
    const key = docId + dateStr + slot;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 4 === 0; // ~25% slots booked realistically
  };

  const populateGroup = (container, slots) => {
    slots.forEach(slot => {
      const booked = isSlotBooked(slot);
      const isSelected = bookingState.selectedTimeSlot === slot;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `time-slot ${booked ? "booked" : ""} ${isSelected ? "selected" : ""}`;
      btn.textContent = slot;

      if (booked) {
        btn.disabled = true;
        btn.title = "This slot is already booked";
      } else {
        btn.addEventListener("click", () => {
          selectTimeSlot(slot);
        });
      }

      container.appendChild(btn);
    });
  };

  populateGroup(DOM.morningSlots, TIME_SLOTS.morning);
  populateGroup(DOM.afternoonSlots, TIME_SLOTS.afternoon);
  populateGroup(DOM.eveningSlots, TIME_SLOTS.evening);
}

function selectTimeSlot(slot) {
  bookingState.selectedTimeSlot = slot;

  document.querySelectorAll(".time-slot").forEach(btn => {
    btn.classList.toggle("selected", btn.textContent === slot && !btn.classList.contains("booked"));
  });

  checkStep2Completion();
  showToast(`Selected time slot: ${slot}`, "info");
}

function checkStep2Completion() {
  if (bookingState.selectedDate && bookingState.selectedTimeSlot) {
    DOM.step2NextBtn.removeAttribute("disabled");
  } else {
    DOM.step2NextBtn.setAttribute("disabled", "true");
  }
}

// ==========================================
// 9. STEP 3: PATIENT INFORMATION & VALIDATION
// ==========================================
function initStep3Events() {
  // Real-time inline field validations
  DOM.patientName.addEventListener("input", () => validateField(DOM.patientName, DOM.nameError, v => v.length >= 3));
  DOM.patientPhone.addEventListener("input", () => {
    DOM.patientPhone.value = DOM.patientPhone.value.replace(/\D/g, '').slice(0, 10);
    validateField(DOM.patientPhone, DOM.phoneError, v => /^[6-9]\d{9}$/.test(v));
  });
  DOM.patientEmail.addEventListener("input", () => {
    validateField(DOM.patientEmail, DOM.emailError, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  });
  DOM.symptoms.addEventListener("input", () => {
    validateField(DOM.symptoms, DOM.symptomsError, v => v.trim().length >= 5);
  });
}

function validateField(inputElement, errorElement, validationFn) {
  const isValid = validationFn(inputElement.value.trim());
  if (isValid) {
    errorElement.style.display = "none";
    inputElement.style.borderColor = "var(--border-color)";
  } else {
    errorElement.style.display = "block";
    inputElement.style.borderColor = "var(--rose)";
  }
  return isValid;
}

function validatePatientForm(showErrors = true) {
  const isNameValid = DOM.patientName.value.trim().length >= 3;
  const isPhoneValid = /^[6-9]\d{9}$/.test(DOM.patientPhone.value.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(DOM.patientEmail.value.trim());
  const isAgeValid = parseInt(DOM.patientAge.value, 10) > 0 && parseInt(DOM.patientAge.value, 10) <= 120;
  const isGenderValid = DOM.patientGender.value !== "";
  const isSymptomsValid = DOM.symptoms.value.trim().length >= 5;

  if (showErrors) {
    DOM.nameError.style.display = isNameValid ? "none" : "block";
    DOM.phoneError.style.display = isPhoneValid ? "none" : "block";
    DOM.emailError.style.display = isEmailValid ? "none" : "block";
    DOM.symptomsError.style.display = isSymptomsValid ? "none" : "block";

    if (!isNameValid) DOM.patientName.focus();
    else if (!isPhoneValid) DOM.patientPhone.focus();
    else if (!isEmailValid) DOM.patientEmail.focus();
    else if (!isAgeValid) DOM.patientAge.focus();
    else if (!isGenderValid) DOM.patientGender.focus();
    else if (!isSymptomsValid) DOM.symptoms.focus();

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isAgeValid || !isGenderValid || !isSymptomsValid) {
      showToast("Please fill in all required fields accurately", "error");
    }
  }

  return isNameValid && isPhoneValid && isEmailValid && isAgeValid && isGenderValid && isSymptomsValid;
}

function extractPatientFormData() {
  const isNewRadio = document.querySelector('input[name="isNewPatient"]:checked');

  bookingState.patientDetails = {
    fullName: DOM.patientName.value.trim(),
    phone: DOM.patientPhone.value.trim(),
    email: DOM.patientEmail.value.trim(),
    age: DOM.patientAge.value.trim(),
    gender: DOM.patientGender.value,
    bloodGroup: DOM.bloodGroup.value || "Not Specified",
    isNewPatient: isNewRadio ? isNewRadio.value : "No",
    symptoms: DOM.symptoms.value.trim()
  };
}

// ==========================================
// 10. STEP 4: REVIEW & PAYMENT CONFIRMATION
// ==========================================
function initStep4Events() {
  // Payment option toggles
  DOM.paymentCards.forEach(card => {
    card.addEventListener("click", () => {
      DOM.paymentCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        bookingState.paymentMethod = radio.value;
      }
    });
  });

  // Final Confirmation Button
  DOM.confirmBookingBtn.addEventListener("click", handleBookingConfirmation);
}

function setupStep4ReviewView() {
  const doc = bookingState.selectedDoctor;
  const p = bookingState.patientDetails;
  if (!doc) return;

  // 1. Doctor Details Card
  DOM.reviewDoctorDetails.innerHTML = `
    <img src="${doc.avatar}" alt="${doc.name}" class="rev-avatar" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0284c7&color=fff&bold=true'">
    <div class="rev-info">
      <h4>${doc.name}</h4>
      <p>${doc.specialty} • ${doc.qualification.split(',')[0]}</p>
      <small><i class="fa-solid fa-location-dot"></i> ${doc.hospital} (${doc.room})</small>
    </div>
  `;

  // 2. Schedule & Mode
  const dateFormatted = bookingState.selectedDateObj
    ? bookingState.selectedDateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : bookingState.selectedDate;

  DOM.reviewDate.textContent = dateFormatted;
  DOM.reviewTime.textContent = bookingState.selectedTimeSlot;
  DOM.reviewMode.innerHTML = `
    <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
      <i class="fa-solid ${bookingState.consultationMode === 'Video Consultation' ? 'fa-video' : 'fa-hospital-user'}"></i>
      ${bookingState.consultationMode}
    </span>
  `;

  // 3. Patient Details
  DOM.reviewName.textContent = p.fullName;
  DOM.reviewPhone.textContent = `+91 ${p.phone}`;
  DOM.reviewEmail.textContent = p.email;
  DOM.reviewAgeGender.textContent = `${p.age} Yrs / ${p.gender} / Blood: ${p.bloodGroup}`;
  DOM.reviewSymptoms.textContent = p.symptoms;

  // 4. Billing Summary
  const feeFormatted = `₹${doc.fee.toLocaleString("en-IN")}`;
  DOM.billDoctorFee.textContent = feeFormatted;
  DOM.billTotalAmount.textContent = feeFormatted;
}

function handleBookingConfirmation() {
  DOM.confirmBookingBtn.setAttribute("disabled", "true");
  DOM.confirmBookingBtn.innerHTML = `
    <i class="fa-solid fa-circle-notch fa-spin"></i> Confirming Appointment...
  `;

  setTimeout(() => {
    // Generate Booking Record
    const bookingId = "CP-" + Math.floor(10000 + Math.random() * 90000);
    const dateFormatted = bookingState.selectedDateObj
      ? bookingState.selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : bookingState.selectedDate;

    const confirmedRecord = {
      id: bookingId,
      doctor: bookingState.selectedDoctor,
      patient: bookingState.patientDetails,
      date: dateFormatted,
      time: bookingState.selectedTimeSlot,
      mode: bookingState.consultationMode,
      paymentMethod: bookingState.paymentMethod,
      totalAmount: bookingState.selectedDoctor.fee,
      createdAt: new Date().toISOString(),
      status: "Confirmed"
    };

    bookingState.lastConfirmedBooking = confirmedRecord;

    // Save to Local Storage
    saveBookingToStorage(confirmedRecord);
    updateBookingsBadge();

    // Populate Success Modal Slip
    DOM.receiptBookingId.textContent = bookingId;
    DOM.receiptPatientName.textContent = confirmedRecord.patient.fullName;
    DOM.receiptDoctorName.textContent = confirmedRecord.doctor.name;
    DOM.receiptSpecialty.textContent = confirmedRecord.doctor.specialty;
    DOM.receiptDateTime.textContent = `${confirmedRecord.date} | ${confirmedRecord.time}`;
    DOM.receiptMode.textContent = confirmedRecord.mode;
    DOM.receiptLocation.textContent = `${confirmedRecord.doctor.hospital}, ${confirmedRecord.doctor.room}`;

    // Reset button
    DOM.confirmBookingBtn.removeAttribute("disabled");
    DOM.confirmBookingBtn.innerHTML = `<i class="fa-solid fa-check-circle"></i> Confirm Appointment`;

    // Open Modal & Toast
    openModal(DOM.successModal);
    showToast(`Appointment confirmed! ID: ${bookingId}`, "success");
  }, 900);
}

// ==========================================
// 11. LOCAL STORAGE & BOOKINGS MANAGEMENT
// ==========================================
function getStoredBookings() {
  try {
    return JSON.parse(localStorage.getItem("carepulse_bookings")) || [];
  } catch (e) {
    return [];
  }
}

function saveBookingToStorage(record) {
  const list = getStoredBookings();
  list.unshift(record); // newest first
  localStorage.setItem("carepulse_bookings", JSON.stringify(list));
}

function updateBookingsBadge() {
  const list = getStoredBookings().filter(b => b.status === "Confirmed");
  DOM.bookingsBadge.textContent = list.length;
  DOM.modalBookingsCount.textContent = `${list.length} Active Booking${list.length === 1 ? '' : 's'}`;
}

function renderBookingsModalList() {
  const list = getStoredBookings();
  DOM.bookingsListContainer.innerHTML = "";

  if (list.length === 0) {
    DOM.bookingsListContainer.innerHTML = `
      <div class="empty-bookings">
        <i class="fa-regular fa-calendar-xmark"></i>
        <h4>No Appointments Found</h4>
        <p>You haven't scheduled any doctor consultations yet.</p>
      </div>
    `;
    return;
  }

  list.forEach(item => {
    const isCancelled = item.status === "Cancelled";
    const card = document.createElement("div");
    card.className = "booking-item-card";

    card.innerHTML = `
      <div class="booking-item-top">
        <div>
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-right: 0.5rem;">${item.id}</span>
          <span class="${isCancelled ? 'booking-badge-cancelled' : 'booking-badge-confirmed'}">
            ${item.status}
          </span>
        </div>
        ${!isCancelled ? `<button class="cancel-appt-btn" data-cancel-id="${item.id}">Cancel</button>` : ''}
      </div>

      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <img src="${item.doctor.avatar}" alt="${item.doctor.name}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.doctor.name)}&background=0284c7&color=fff&bold=true'">
        <div>
          <strong style="display: block; font-size: 0.95rem; color: var(--text-main);">${item.doctor.name}</strong>
          <span style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">${item.doctor.specialty}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; background: var(--bg-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm);">
        <div><i class="fa-regular fa-calendar"></i> <strong>${item.date}</strong></div>
        <div><i class="fa-regular fa-clock"></i> <strong>${item.time}</strong></div>
        <div><i class="fa-solid fa-hospital-user"></i> <span>${item.patient.fullName}</span></div>
        <div><i class="fa-solid fa-tag"></i> <span>₹${item.totalAmount} (${item.mode})</span></div>
      </div>
    `;

    // Hook Cancel Button
    const cancelBtn = card.querySelector(".cancel-appt-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        cancelAppointment(item.id);
      });
    }

    DOM.bookingsListContainer.appendChild(card);
  });
}

function cancelAppointment(bookingId) {
  if (!confirm(`Are you sure you want to cancel appointment ${bookingId}?`)) return;

  const list = getStoredBookings();
  const index = list.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    list[index].status = "Cancelled";
    localStorage.setItem("carepulse_bookings", JSON.stringify(list));
    renderBookingsModalList();
    updateBookingsBadge();
    showToast(`Appointment ${bookingId} cancelled`, "info");
  }
}

// ==========================================
// 12. MODALS & SLIP ACTIONS
// ==========================================
function initModals() {
  // My Bookings Open
  DOM.myBookingsBtn.addEventListener("click", () => {
    renderBookingsModalList();
    openModal(DOM.myBookingsModal);
  });

  // My Bookings Close
  DOM.closeBookingsModal.addEventListener("click", () => {
    closeModal(DOM.myBookingsModal);
  });

  // Close modals on overlay backdrop click
  [DOM.successModal, DOM.myBookingsModal].forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Success Modal Actions
  DOM.printSlipBtn.addEventListener("click", () => {
    window.print();
  });

  DOM.addToCalBtn.addEventListener("click", handleAddToCalendar);

  DOM.bookAnotherBtn.addEventListener("click", () => {
    closeModal(DOM.successModal);
    resetBookingForm();
    goToStep(1);
    showToast("Ready for your next appointment booking", "info");
  });
}

function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function resetBookingForm() {
  bookingState.selectedDoctor = null;
  bookingState.selectedDate = null;
  bookingState.selectedDateObj = null;
  bookingState.selectedTimeSlot = null;
  DOM.patientForm.reset();

  DOM.step1NextBtn.setAttribute("disabled", "true");
  DOM.doctorPreviewText.innerHTML = `<i class="fa-solid fa-circle-info"></i> Please click on a doctor card to proceed.`;

  renderDoctors(currentFilterSpecialty, currentSearchQuery);
}

function handleAddToCalendar() {
  const b = bookingState.lastConfirmedBooking;
  if (!b) return;

  // Generate .ics calendar file content
  const title = `Doctor Appointment with ${b.doctor.name} (${b.doctor.specialty})`;
  const description = `Appointment Pass: ${b.id}\\nMode: ${b.mode}\\nClinic: ${b.doctor.hospital}, ${b.doctor.room}\\nPatient: ${b.patient.fullName}\\nReason: ${b.patient.symptoms}`;
  const location = `${b.doctor.hospital}, ${b.doctor.room}`;

  // Start date timestamp representation
  const startDate = new Date(b.createdAt);
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CarePulse Health Systems//Appointment Booking//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", `CarePulse-${b.id}.ics`);
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);

  showToast("Calendar event downloaded (.ics)", "success");
}

// ==========================================
// 13. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'}`;

  const iconClass = type === "success"
    ? "fa-circle-check"
    : type === "error"
    ? "fa-circle-exclamation"
    : "fa-circle-info";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
