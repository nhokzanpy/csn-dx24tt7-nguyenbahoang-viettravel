// =========================
// TẢI DỮ LIỆU ĐỊA ĐIỂM
// =========================

fetch("data/location.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Không thể tải location.json");
        }

        return response.json();
    })

    .then(data => {

        // =========================
        // LẤY CÁC PHẦN TỬ HTML
        // =========================

        const locationList =
            document.getElementById("location-list");

        const searchInput =
            document.getElementById("search-input");

        const provinceFilter =
            document.getElementById("province-filter");

        const sortFilter =
            document.getElementById("sort-filter");

        const resetFilter =
            document.getElementById("reset-filter");

        const pagination =
            document.getElementById("pagination");


        // =========================
        // MODAL
        // =========================

        const modal =
            document.getElementById("location-modal");

        const modalImage =
            document.getElementById("modal-image");

        const modalTitle =
            document.getElementById("modal-title");

        const modalProvince =
            document.getElementById("modal-province");

        const modalDescription =
            document.getElementById("modal-description");

        const modalClose =
            document.getElementById("modal-close");


        // =========================
        // PHÂN TRANG
        // =========================

        const itemsPerPage = 6;

        let currentPage = 1;

        let currentLocations = [...data];


        // =========================
        // HÀM BỎ DẤU TIẾNG VIỆT
        // =========================

        function removeVietnameseTones(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        }


        // =========================
        // MỞ MODAL
        // =========================

        function openModal(location) {

            modalImage.src =
                `images/${location.image}`;

            modalImage.alt =
                location.name;

            modalTitle.textContent =
                location.name;

            modalProvince.textContent =
                `📍 ${location.province}`;

            modalDescription.textContent =
                location.description;

            modal.style.display = "flex";
        }


        // =========================
        // ĐÓNG MODAL
        // =========================

        function closeModal() {
            modal.style.display = "none";
        }


        // =========================
        // HIỂN THỊ ĐỊA ĐIỂM
        // =========================

        function displayLocations(locations) {

            locationList.innerHTML = "";


            // Không có kết quả
            if (locations.length === 0) {

                locationList.innerHTML = `
                    <div class="no-result">
                        <div class="no-result-icon">
                            🔍
                        </div>

                        <h3>
                            Không tìm thấy địa điểm
                        </h3>

                        <p>
                            Hãy thử tìm kiếm bằng từ khóa khác.
                        </p>
                    </div>
                `;

                return;
            }


            // =========================
            // CẮT DỮ LIỆU THEO TRANG
            // =========================

            const startIndex =
                (currentPage - 1) * itemsPerPage;

            const endIndex =
                startIndex + itemsPerPage;

            const paginatedLocations =
                locations.slice(
                    startIndex,
                    endIndex
                );


            // =========================
            // TẠO CARD
            // =========================

            paginatedLocations.forEach(
                (location, index) => {

                    const card =
                        document.createElement("div");

                    card.className =
                        "location-card";


                    // Animation xuất hiện
                    card.style.animationDelay =
                        `${index * 0.08}s`;


                    card.innerHTML = `
                        <img
                            src="images/${location.image}"
                            alt="${location.name}"
                        >

                        <div class="location-card-content">

                            <h3>
                                ${location.name}
                            </h3>

                            <p class="province">
                                ${location.province}
                            </p>

                            <p>
                                ${location.description}
                            </p>

                            <button class="detail-button">
                                Xem chi tiết
                            </button>

                        </div>
                    `;


                    const detailButton =
                        card.querySelector(
                            ".detail-button"
                        );


                    detailButton.addEventListener(
                        "click",
                        () => {
                            openModal(location);
                        }
                    );


                    locationList.appendChild(card);

                }
            );
        }


        // =========================
        // HIỂN THỊ PAGINATION
        // =========================

        function displayPagination(locations) {

            pagination.innerHTML = "";


            const totalPages =
                Math.ceil(
                    locations.length /
                    itemsPerPage
                );


            // Nếu chỉ có 0 hoặc 1 trang
            // thì không cần hiện pagination
            if (totalPages <= 1) {
                return;
            }


            // =========================
            // NÚT TRƯỚC
            // =========================

            const prevButton =
                document.createElement("button");

            prevButton.textContent = "‹";

            prevButton.className =
                "pagination-button";

            prevButton.disabled =
                currentPage === 1;


            prevButton.addEventListener(
                "click",
                () => {

                    if (currentPage > 1) {

                        currentPage--;

                        renderCurrentPage();

                    }

                }
            );


            pagination.appendChild(
                prevButton
            );


            // =========================
            // CÁC NÚT SỐ TRANG
            // =========================

            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                const pageButton =
                    document.createElement(
                        "button"
                    );

                pageButton.textContent =
                    page;

                pageButton.className =
                    "pagination-button";


                if (page === currentPage) {

                    pageButton.classList.add(
                        "active"
                    );

                }


                pageButton.addEventListener(
                    "click",
                    () => {

                        currentPage = page;

                        renderCurrentPage();

                    }
                );


                pagination.appendChild(
                    pageButton
                );

            }


            // =========================
            // NÚT SAU
            // =========================

            const nextButton =
                document.createElement("button");

            nextButton.textContent = "›";

            nextButton.className =
                "pagination-button";

            nextButton.disabled =
                currentPage === totalPages;


            nextButton.addEventListener(
                "click",
                () => {

                    if (
                        currentPage <
                        totalPages
                    ) {

                        currentPage++;

                        renderCurrentPage();

                    }

                }
            );


            pagination.appendChild(
                nextButton
            );
        }


        // =========================
        // RENDER TRANG HIỆN TẠI
        // =========================

        function renderCurrentPage() {

            displayLocations(
                currentLocations
            );

            displayPagination(
                currentLocations
            );

        }


        // =========================
        // TẠO DANH SÁCH TỈNH/THÀNH
        // =========================

        const provinces = [
            ...new Set(
                data.map(
                    location =>
                        location.province
                )
            )
        ];


        provinces.forEach(province => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                province;

            option.textContent =
                province;

            provinceFilter.appendChild(
                option
            );

        });


        // =========================
        // SEARCH + FILTER + SORT
        // =========================

        function filterLocations() {

            const keyword =
                removeVietnameseTones(
                    searchInput.value
                )
                    .trim()
                    .toLowerCase();


            const selectedProvince =
                provinceFilter.value;


            const selectedSort =
                sortFilter.value;


            let filteredLocations =
                data.filter(location => {

                    const name =
                        removeVietnameseTones(
                            location.name
                        ).toLowerCase();


                    const province =
                        removeVietnameseTones(
                            location.province
                        ).toLowerCase();


                    const description =
                        removeVietnameseTones(
                            location.description
                        ).toLowerCase();


                    const matchesSearch =
                        name.includes(keyword) ||
                        province.includes(keyword) ||
                        description.includes(keyword);


                    const matchesProvince =
                        selectedProvince === "all" ||
                        location.province ===
                            selectedProvince;


                    return (
                        matchesSearch &&
                        matchesProvince
                    );

                });


            // =========================
            // SORT A → Z
            // =========================

            if (
                selectedSort === "az"
            ) {

                filteredLocations.sort(
                    (a, b) =>
                        a.name.localeCompare(
                            b.name,
                            "vi"
                        )
                );

            }


            // =========================
            // SORT Z → A
            // =========================

            if (
                selectedSort === "za"
            ) {

                filteredLocations.sort(
                    (a, b) =>
                        b.name.localeCompare(
                            a.name,
                            "vi"
                        )
                );

            }


            // Lưu kết quả mới
            currentLocations =
                filteredLocations;


            // Mỗi khi filter/search/sort
            // quay về trang đầu
            currentPage = 1;


            renderCurrentPage();
        }


        // =========================
        // SEARCH
        // =========================

        searchInput.addEventListener(
            "input",
            filterLocations
        );


        // =========================
        // FILTER TỈNH/THÀNH
        // =========================

        provinceFilter.addEventListener(
            "change",
            filterLocations
        );


        // =========================
        // SORT
        // =========================

        sortFilter.addEventListener(
            "change",
            filterLocations
        );


        // =========================
        // RESET FILTER
        // =========================

        resetFilter.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                provinceFilter.value =
                    "all";

                sortFilter.value =
                    "default";

                currentLocations =
                    [...data];

                currentPage = 1;

                renderCurrentPage();

            }
        );


        // =========================
        // ĐÓNG MODAL BẰNG ×
        // =========================

        modalClose.addEventListener(
            "click",
            closeModal
        );


        // =========================
        // CLICK NGOÀI MODAL
        // =========================

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );


        // =========================
        // ESC ĐÓNG MODAL
        // =========================

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal();

                }

            }
        );


        // =========================
        // HIỂN THỊ BAN ĐẦU
        // =========================

        renderCurrentPage();

    })


    // =========================
    // XỬ LÝ LỖI
    // =========================

    .catch(error => {

        console.error(
            "Lỗi khi tải dữ liệu địa điểm:",
            error
        );

    });


// ========================================
// BACK TO TOP
// ========================================

const backToTop =
    document.getElementById(
        "back-to-top"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 300
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ========================================
// DARK MODE
// ========================================

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent =
        "☀️";

} else {

    themeToggle.textContent =
        "🌙";

}


// =========================
// ĐỔI LIGHT / DARK MODE
// =========================

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDarkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        if (
            isDarkMode
        ) {

            themeToggle.textContent =
                "☀️";

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            themeToggle.textContent =
                "🌙";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);