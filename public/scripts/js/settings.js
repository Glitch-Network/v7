document.addEventListener("DOMContentLoaded", function() {
    const engine = document.getElementById("engine");
    const secondProxy = document.getElementById("proxy-settings");
    const premium = localStorage.getItem("premium") === "true";

    if (premium) {
        engine.innerHTML += `
            <option value="Torry">Torry</option>
            <option value="Startpage">Startpage</option>
            <option value="Qwant">Qwant</option>
            <option value="Brave">Brave Search</option>
            <option value="Google Scholar">Google Scholar</option>
            <option value="SearXNG">SearXNG</option>
        `;
        secondProxy.style.display = "block";
    }

    if (localStorage.getItem("themes") != null) {
        document.getElementById("theme").value = localStorage.getItem("themes");
    }
    if (localStorage.getItem("search_engine") != null) {
        document.getElementById("engine").value = localStorage.getItem("search_engine");
    }

    setInterval(function() {
        let env = document.getElementById("engine").value;
        localStorage.setItem("search_engine", env);
    }, 10000);

    if (localStorage.getItem("themes") === "true") {
        document.getElementById("theme").style.display = "block";
        document.getElementById("theme_div").style.display = "block";
    }
    if (localStorage.getItem("ai_teacher_detection") === "true") {
        document.getElementById("ai").style.display = "block";
        document.getElementById("ai_div").style.display = "block";
    }

    createCountryDropdown();

    updateTheme();
    const engineSelect = document.getElementById("engine");
    const proxySelect = document.getElementById("proxy");
    const aiToggle = document.getElementById("ai");

    if (localStorage.getItem("search_engine")) {
        engineSelect.value = localStorage.getItem("search_engine");
    }
    if (localStorage.getItem("proxy")) {
        proxySelect.value = localStorage.getItem("proxy");
    }

    engineSelect.addEventListener("change", function() {
        localStorage.setItem("search_engine", this.value);
    });
    proxySelect.addEventListener("change", function() {
        localStorage.setItem("proxy", this.value);
    });

    updateProxy();
});

function createCountryDropdown() {
    const select = document.getElementById("proxy");

    fetch("plist")
        .then(response => response.json())
        .then(data => {
            const countryAvailable = data.map(entry => entry.country);
            for (const key in country_codes) {
                if (!countryAvailable.includes(key)) {
                    country_codes[key] = "";
                }
            }
            for (const [code, name] of Object.entries(country_codes)) {
                if (name) {
                    const option = document.createElement('option');
                    option.value = code;
                    option.textContent = name;
                    select.appendChild(option);
                }
            }
        })
        .catch(error => {
            console.warn("Unable to fetch proxies:", error);
        });
}

function updateProxy() {
    const currentProxy = localStorage.getItem("proxy");
    if (currentProxy) {
        document.getElementById("proxy").value = currentProxy;
    }
}

function save() {
    let data = "";
    for (const [key, value] of Object.entries(localStorage)) {
        if (key.includes("data")) {
            data += `${key}=${value}\n`;
        }
    }
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        data += `cookie:${cookie}\n`;
    }
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.glitch";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function load() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".glitch";

    input.addEventListener("change", function () {
        const file = input.files[0];
        if (!file) return;
        if (file.name.split('.').pop() !== 'glitch') {
            alert("Please upload a valid .glitch file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const lines = event.target.result.split("\n");
            lines.forEach(line => {
                if (!line.trim()) return;
                if (line.startsWith("cookie:")) {
                    const cookieData = line.substring(7);
                    document.cookie = cookieData;
                } else {
                    const [key, value] = line.split("=");
                    if (key && value) {
                        localStorage.setItem(key, value);
                    }
                }
            });
            alert("Data loaded successfully!");
        };
        reader.readAsText(file);
    });
    input.click();
}

function toggle(target) {
    const current = localStorage.getItem(target) === "true";
    localStorage.setItem(target, current ? "false" : "true");
}

function updateTheme() {
    let savedTheme = localStorage.getItem("themes");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
}

function toggle_autohide() {
    const autohide = localStorage.getItem("autohide") === "1";
    localStorage.setItem("autohide", autohide ? "0" : "1");
    alert("Set!");
}

console.log("Loaded settings.js!");