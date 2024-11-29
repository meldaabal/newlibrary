document.addEventListener("DOMContentLoaded", () => {
    // Aktif Menü İtemini Vurgula
    const navLinks = document.querySelectorAll("header nav ul li a");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 60; // Header yüksekliği
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Yumuşak Kaydırma
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Header boşluğu
                behavior: "smooth",
            });
        });
    });

    // Dinamik Kitap Kartları Oluşturma
    const bookData = [
        { title: "Kitap 1", author: "Yazar A", year: 2020, cover: "https://via.placeholder.com/150" },
        { title: "Kitap 2", author: "Yazar B", year: 2021, cover: "https://via.placeholder.com/150" },
        { title: "Kitap 3", author: "Yazar C", year: 2019, cover: "https://via.placeholder.com/150" },
    ];

    const bookList = document.querySelector(".book-list");
    bookData.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <h3>${book.title}</h3>
            <p>Yazar: ${book.author}</p>
            <p>Yıl: ${book.year}</p>
            <button class="btn">Daha Fazla Detay</button>
        `;

        bookList.appendChild(bookCard);
    });

    // Form Doğrulama
    const contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Geçerli bir e-posta adresi giriniz.");
            return;
        }

        alert("Mesajınız başarıyla gönderildi!");
        contactForm.reset();
    });

    // E-posta Doğrulama Fonksiyonu
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
