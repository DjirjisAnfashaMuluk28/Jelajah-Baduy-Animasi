
// ============================================
// FORM KONTAK & RENCANA KUNJUNGAN JELAJAH BADUY
// Pengiriman otomatis menggunakan Formspree
// ============================================

const FORM_CONFIG = {
    endpoint: "https://formspree.io/f/xyewbpwp",
    email: "anfasha6@gmail.com"
};

(function () {
    "use strict";

    const form = document.getElementById("contactForm");

    if (!form) return;

    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("formSubmit");
    const message = form.elements.pesan;
    const counter = document.getElementById("pesanCount");
    const dateInput = form.elements.tanggal;
    const destSelect = form.elements.destinasi;

    const SUBMIT_TIMEOUT_MS = 15000;

    // ============================================
    // 1. MENGISI PILIHAN DESTINASI
    // ============================================

    if (typeof DESTINATIONS !== "undefined" && destSelect) {
        DESTINATIONS.forEach(destination => {
            destSelect.add(
                new Option(destination.name, destination.name)
            );
        });
    }

    if (destSelect) {
        destSelect.add(
            new Option(
                "Lainnya / belum menentukan",
                "Lainnya / belum menentukan"
            )
        );
    }

    // ============================================
    // 2. MENGATUR TANGGAL KUNJUNGAN
    // ============================================

    const now = new Date();

    const pad = number => String(number).padStart(2, "0");

    if (dateInput) {
        dateInput.min =
            `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    }

    // ============================================
    // 3. VALIDASI FORM
    // ============================================

    const rules = {
        nama: value =>
            value.trim().length < 3
                ? "Tulis nama lengkap Anda, minimal 3 huruf."
                : "",

        email: value =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
                ? "Tulis alamat email yang valid."
                : "",

        whatsapp: value =>
            value.trim() &&
            !/^(?:\+62|62|0)8[0-9]{7,12}$/.test(
                value.replace(/[\s-]/g, "")
            )
                ? "Nomor tidak dikenali. Contoh: 081234567890."
                : "",

        tanggal: value =>
            value && dateInput && value < dateInput.min
                ? "Pilih tanggal hari ini atau sesudahnya."
                : "",

        jumlah: value =>
            value && (
                !/^\d+$/.test(value) ||
                Number(value) < 1 ||
                Number(value) > 50
            )
                ? "Jumlah pengunjung antara 1 dan 50 orang."
                : "",

        pesan: value =>
            value.trim().length < 10
                ? "Tulis pesan Anda, minimal 10 karakter."
                : ""
    };

    // ============================================
    // 4. MENAMPILKAN PESAN ERROR
    // ============================================

    function setError(name, text) {
        const field = form.elements[name];
        const output = document.getElementById("err-" + name);

        if (!field) return;

        field.setAttribute("aria-invalid", text ? "true" : "false");

        if (output) {
            output.textContent = text;
        }
    }

    function validateField(name) {
        const field = form.elements[name];

        if (!field) return true;

        const error = rules[name](field.value);

        setError(name, error);

        return !error;
    }

    function setStatus(text, kind) {
        if (!status) return;

        status.textContent = text;
        status.className =
            "form-status" + (kind ? " is-" + kind : "");
    }

    // ============================================
    // 5. EVENT VALIDASI INPUT
    // ============================================

    Object.keys(rules).forEach(name => {
        const element = form.elements[name];

        if (!element) return;

        element.addEventListener("blur", () => {
            validateField(name);
        });

        element.addEventListener("input", () => {
            if (element.getAttribute("aria-invalid") === "true") {
                validateField(name);
            }
        });
    });

    // ============================================
    // 6. HITUNG KARAKTER PESAN
    // ============================================

    if (message && counter) {
        message.addEventListener("input", () => {
            counter.textContent =
                `${message.value.length}/${message.maxLength}`;
        });
    }

    // ============================================
    // 7. MENGAMBIL DATA FORM
    // ============================================

    function collect() {
        const fields = form.elements;

        return {
            nama: fields.nama.value.trim(),
            email: fields.email.value.trim(),
            whatsapp: fields.whatsapp.value.trim(),
            destinasi: fields.destinasi.value,
            tanggal: fields.tanggal.value,
            jumlah: fields.jumlah.value,
            pesan: fields.pesan.value.trim()
        };
    }

    // ============================================
    // 8. RESET FORM SETELAH BERHASIL
    // ============================================

    function finish(text) {
        form.reset();

        if (counter && message) {
            counter.textContent = `0/${message.maxLength}`;
        }

        form.querySelectorAll("[aria-invalid]").forEach(element => {
            element.setAttribute("aria-invalid", "false");
        });

        setStatus(text, "success");
    }

    // ============================================
    // 9. MENGIRIM DATA KE FORMSPREE
    // ============================================

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        setStatus("", "");

        // Proteksi sederhana dari bot
        if (form.elements.website && form.elements.website.value) {
            finish("Terima kasih. Pesan Anda sudah kami terima.");
            return;
        }

        // Validasi seluruh kolom
        const failed = Object.keys(rules).filter(name => {
            return !validateField(name);
        });

        if (failed.length > 0) {
            setStatus(
                `Periksa ${failed.length} kolom yang ditandai.`,
                "error"
            );

            form.elements[failed[0]].focus();
            return;
        }

        const data = collect();

        // Pastikan endpoint sudah diatur
        if (!FORM_CONFIG.endpoint) {
            setStatus(
                "Endpoint pengiriman email belum diatur.",
                "error"
            );
            return;
        }

        // Mencegah pengiriman berulang
        submitBtn.disabled = true;

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Mengirim...";

        const controller = new AbortController();

        const timer = setTimeout(() => {
            controller.abort();
        }, SUBMIT_TIMEOUT_MS);

        try {
            const response = await fetch(FORM_CONFIG.endpoint, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(data),

                signal: controller.signal
            });

            if (!response.ok) {
                let errorMessage = "";

                try {
                    const result = await response.json();

                    errorMessage = result.errors
                        ? result.errors.map(error => error.message).join(", ")
                        : "";
                } catch (_) {}

                throw new Error(
                    errorMessage || `HTTP ${response.status}`
                );
            }

            // Berhasil dikirim
            finish(
                "Terima kasih! Pesan Anda berhasil dikirim. Kami akan menghubungi Anda melalui email."
            );

        } catch (error) {
            console.error("Formspree error:", error);

            if (error.name === "AbortError") {
                setStatus(
                    "Pengiriman terlalu lama. Periksa koneksi internet dan coba kembali.",
                    "error"
                );
            } else {
                setStatus(
                    "Pesan gagal dikirim. " +
                    (error.message || "Silakan coba kembali."),
                    "error"
                );
            }

        } finally {
            clearTimeout(timer);

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

})();
