 //JS for navigation  
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rchForm");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const sections = document.querySelectorAll("form section");
  let currentSection = 0;

  // Show section
  function showSection(index) {
    sections.forEach((sec, i) => {
      sec.style.display = i === index ? "block" : "none";
    });
    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.textContent = index === sections.length - 1 ? "Submit" : "Next";
  }
  showSection(currentSection);

  // Validate required fields in current section
  function validateSection(index) {
    const fields = sections[index].querySelectorAll("[required]");
    for (let field of fields) {
      if (!field.value.trim()) {
        field.focus();
        showMessage("⚠️ Please fill all required fields.", true);
        return false;
      }
    }
    return true;
  }

  // Navigation
  nextBtn.addEventListener("click", () => {
    if (currentSection < sections.length - 1) {
      if (!validateSection(currentSection)) return;
      currentSection++;
      showSection(currentSection);
    } else {
      if (!validateSection(currentSection)) return;
      submitForm();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSection > 0) {
      currentSection--;
      showSection(currentSection);
    }
  });

  // Auto calculate ANC total
  const anc1 = document.getElementById("anc1");
  const fanc = document.getElementById("fanc");
  const anc_total = document.getElementById("anc_total");
  [anc1, fanc].forEach(inp => {
    inp.addEventListener("input", () => {
      anc_total.value = (parseInt(anc1.value) || 0) + (parseInt(fanc.value) || 0);
    });
  });

  

  // Submit function (instant success alert)
  function submitForm() {
    const scriptURL = "https://script.google.com/macros/s/AKfycby5aa5Ho8diAQHVrXKErIjACtMBOCzvUvU5rdTaSNVnW-aJioU3RNnJ63SsNuXJtwwt/exec";
    const formData = new FormData(form);

    // show success instantly
    showMessage("✅ Data submitted successfully!");
    form.reset();
    currentSection = 0;
    showSection(currentSection);

    // send data to Google Sheets in background
    fetch(scriptURL, { method: "POST", body: formData })
      .catch(() => {
        showMessage("❌ Error submitting data. Try again.", true);
      });
  }

  // Success / Error alert
  function showMessage(msg, isError = false) {
    let box = document.createElement("div");
    box.textContent = msg;
    box.style.position = "fixed";
    box.style.top = "20px";
    box.style.right = "20px";
    box.style.background = isError ? "#f44336" : "#4CAF50";
    box.style.color = "#fff";
    box.style.padding = "10px 20px";
    box.style.borderRadius = "6px";
    box.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    box.style.zIndex = "9999";
    document.body.appendChild(box);

    setTimeout(() => box.remove(), 10000); // auto remove
  }
});

    //Total ANC calculation
  const x = document.getElementById("anc1");
  const y = document.getElementById("fanc");
  const z = document.getElementById("anc_total");
  function cal(){
    const anc1 = parseFloat(x.value)||0;
    const fanc =parseFloat(y.value)||0;
    z.value = anc1 + fanc;
  }
  x.addEventListener("input",cal);
  y.addEventListener("input",cal);

  //total children vaccinated calculation

  const a = document.getElementById("male_vac");
  const b = document.getElementById("female_vac");
  const c = document.getElementById("total_child");

function child(){
    const male = parseFloat(a.value)||0;
    const female = parseFloat(b.value)||0;
    c.value = male + female;
}  
a.addEventListener("input",child);
b.addEventListener("input",child);

const data= {
        "Budhakhali": ["Budhakhali", "Rajnagar Srinathgram I", "Rajnagar Srinathgram II", "Fatikpur", "Bishalaxmipur"],
          "Narayanpur": ["Nandabhanga", "Ganeshnagar East", "Ganeshnagar West", "Narayanpur Part", "Iswaripur", "Narayanpur PHC SC"],
          "Namkhana": ["Namkhana I", "Namkhana II", "Shibnagar Abad I", "Shibnagar Abad II", "Debnagar", "Dwariknagar"],
          "Haripur": ["Uttar Chandanpiri", "Dakshin Chandanpiri", "Dakshin Chandranagar", "Haripur", "Maharajganj"],
          "Shibrampur": ["Rajnagar", "Radhanagar", "Dakshin Shibrampur", "Uttar Shibrampur", "Patibunia", "Dakshin Durgapur"],
          "Freserganj": ["Bijoybati", "Shibpur", "Debnibas", "Amarabati"],
          "Moushuni": ["Moushuni 1st Gheri", "Kusumtala", "Baliara Old", "Baliara New", "Bagdanga"]
      };
   
          
const gpSelect = document.getElementById("gp");
const facilitySelect = document.getElementById("ru");

    // Populate GP dropdown on page load
    window.onload = function () {
      for (let gp in data) {
        let option = document.createElement("option");
        option.value = gp;
        option.textContent = gp;
        gpSelect.appendChild(option);
      }
    };

    // When GP changes, update facilities
    gpSelect.addEventListener("change", function () {
      const selectedGP = this.value;

      // Reset facilities
      facilitySelect.innerHTML = '<option value="">-- Select Reporting Unit --</option>';

      if (selectedGP && data[selectedGP]) {
        data[selectedGP].forEach(function (facility) {
          let option = document.createElement("option");
          option.value = facility;
          option.textContent = facility;
          facilitySelect.appendChild(option);
        });
      }
    });

    
