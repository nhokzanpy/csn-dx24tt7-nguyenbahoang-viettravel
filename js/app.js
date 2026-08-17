// ========================================
// VIETTRAVEL - APP.JS
// ========================================



// ========================================
// SCROLL REVEAL
// ========================================

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");

                        revealObserver
                            .unobserve(
                                entry.target
                            );
                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );



function observeRevealElements() {

    document
        .querySelectorAll(
            ".reveal:not(.show)"
        )
        .forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

}



observeRevealElements();



// ========================================
// LOAD LOCATION DATA
// ========================================

fetch("data/location.json")

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Không thể tải location.json"
            );

        }

        return response.json();

    })


    .then(data => {


        // ========================================
        // FAVORITES
        // ========================================

        let favorites =
            JSON.parse(
                localStorage.getItem(
                    "favorites"
                )
            ) || [];


        let favoriteFilterActive =
            false;



        // ========================================
        // HTML ELEMENTS
        // ========================================

        const locationList =
            document.getElementById(
                "location-list"
            );


        const searchInput =
            document.getElementById(
                "search-input"
            );


        const provinceFilter =
            document.getElementById(
                "province-filter"
            );


        const sortFilter =
            document.getElementById(
                "sort-filter"
            );


        const resetFilter =
            document.getElementById(
                "reset-filter"
            );


        const pagination =
            document.getElementById(
                "pagination"
            );


        const showAllButton =
            document.getElementById(
                "show-all"
            );


        const showFavoritesButton =
            document.getElementById(
                "show-favorites"
            );


        const randomLocationButton =
            document.getElementById(
                "random-location"
            );



        // ========================================
        // MODAL
        // ========================================

        const modal =
            document.getElementById(
                "location-modal"
            );


        const modalImage =
            document.getElementById(
                "modal-image"
            );


        const modalTitle =
            document.getElementById(
                "modal-title"
            );


        const modalProvince =
            document.getElementById(
                "modal-province"
            );


        const modalDescription =
            document.getElementById(
                "modal-description"
            );


        const modalStats =
            document.getElementById(
                "modal-stats"
            );


        const modalMapLink =
            document.getElementById(
                "modal-map-link"
            );


        const modalClose =
            document.getElementById(
                "modal-close"
            );



        // ========================================
        // PAGINATION
        // ========================================

        const itemsPerPage = 6;

        let currentPage = 1;

        let currentLocations =
            [...data];



        // ========================================
        // REMOVE VIETNAMESE TONES
        // ========================================

        function removeVietnameseTones(
            str
        ) {

            return str

                .normalize("NFD")

                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )

                .replace(
                    /đ/g,
                    "d"
                )

                .replace(
                    /Đ/g,
                    "D"
                );

        }



        // ========================================
        // OPEN MODAL
        // ========================================

        function openModal(
            location
        ) {

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



            modalStats.innerHTML = `

                <span>
                    ⭐ ${
                        location.rating
                        ?? "4.8"
                    }
                </span>

                <span>
                    ❤️ ${
                        location.likes
                        ?? 0
                    }
                </span>

            `;



            // ====================================
            // GOOGLE MAP SEARCH
            // ====================================

            const mapQuery =
                encodeURIComponent(

                    `${location.name}, ${location.province}, Việt Nam`

                );


            modalMapLink.href =
                `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;



            modal.style.display =
                "flex";


            document.body.style.overflow =
                "hidden";

        }



        // ========================================
        // CLOSE MODAL
        // ========================================

        function closeModal() {

            modal.style.display =
                "none";


            document.body.style.overflow =
                "";

        }



        // ========================================
        // DISPLAY LOCATIONS
        // ========================================

        function displayLocations(
            locations
        ) {

            locationList.innerHTML =
                "";



            // ====================================
            // NO RESULT
            // ====================================

            if (
                locations.length === 0
            ) {

                locationList.innerHTML = `

                    <div class="no-result reveal">

                        <div class="no-result-icon">
                            🔍
                        </div>

                        <h3>

                            ${
                                favoriteFilterActive

                                    ? "Chưa có địa điểm yêu thích"

                                    : "Không tìm thấy địa điểm"
                            }

                        </h3>

                        <p>

                            ${
                                favoriteFilterActive

                                    ? "Hãy thả tim một địa điểm bạn yêu thích."

                                    : "Hãy thử tìm kiếm bằng từ khóa khác."
                            }

                        </p>

                    </div>

                `;


                observeRevealElements();

                return;

            }



            // ====================================
            // PAGINATION SLICE
            // ====================================

            const startIndex =
                (
                    currentPage - 1
                ) * itemsPerPage;


            const endIndex =
                startIndex +
                itemsPerPage;


            const paginatedLocations =
                locations.slice(
                    startIndex,
                    endIndex
                );



            // ====================================
            // CARDS
            // ====================================

            paginatedLocations.forEach(
                (
                    location,
                    index
                ) => {


                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "location-card reveal";


                    card.style.transitionDelay =
                        `${index * 0.06}s`;



                    const isFavorite =
                        favorites.includes(
                            location.name
                        );



                    card.innerHTML = `

                        <div class="location-image-wrapper">

                            <img
                                src="images/${location.image}"
                                alt="${location.name}"
                                loading="lazy"
                            >


                            <button
                                class="favorite-btn ${
                                    isFavorite
                                        ? "active"
                                        : ""
                                }"
                                type="button"
                                aria-label="Yêu thích ${location.name}"
                            >

                                ${
                                    isFavorite
                                        ? "♥"
                                        : "♡"
                                }

                            </button>

                        </div>



                        <div class="location-card-content">


                            <h3>
                                ${location.name}
                            </h3>


                            <p class="province">
                                ${location.province}
                            </p>



                            <div class="location-stats">

                                <span class="rating">

                                    ⭐ ${
                                        location.rating
                                        ?? "4.8"
                                    }

                                </span>


                                <span class="likes">

                                    ❤️ ${
                                        location.likes
                                        ?? 0
                                    }

                                </span>

                            </div>



                            <p class="location-description">

                                ${location.description}

                            </p>



                            <button
                                class="detail-button"
                                type="button"
                            >
                                Xem chi tiết
                            </button>

                        </div>

                    `;



                    // ====================================
                    // DETAIL BUTTON
                    // ====================================

                    const detailButton =
                        card.querySelector(
                            ".detail-button"
                        );


                    detailButton.addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            openModal(
                                location
                            );

                        }
                    );



                    // ====================================
                    // CARD CLICK
                    // ====================================

                    card.addEventListener(
                        "click",
                        () => {

                            openModal(
                                location
                            );

                        }
                    );



                    // ====================================
                    // FAVORITE
                    // ====================================

                    const favoriteButton =
                        card.querySelector(
                            ".favorite-btn"
                        );


                    favoriteButton.addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();



                            if (
                                favorites.includes(
                                    location.name
                                )
                            ) {

                                favorites =
                                    favorites.filter(
                                        item =>
                                            item !==
                                            location.name
                                    );


                                favoriteButton
                                    .classList
                                    .remove(
                                        "active"
                                    );


                                favoriteButton
                                    .textContent =
                                    "♡";

                            }

                            else {

                                favorites.push(
                                    location.name
                                );


                                favoriteButton
                                    .classList
                                    .add(
                                        "active"
                                    );


                                favoriteButton
                                    .textContent =
                                    "♥";

                            }



                            localStorage.setItem(

                                "favorites",

                                JSON.stringify(
                                    favorites
                                )

                            );



                            if (
                                favoriteFilterActive
                            ) {

                                filterLocations();

                            }

                        }
                    );



                    locationList.appendChild(
                        card
                    );

                }
            );



            // Observe cards vừa tạo
            observeRevealElements();

        }



        // ========================================
        // PAGINATION
        // ========================================

        function displayPagination(
            locations
        ) {

            pagination.innerHTML =
                "";


            const totalPages =
                Math.ceil(

                    locations.length /
                    itemsPerPage

                );



            if (
                totalPages <= 1
            ) {

                return;

            }



            // ====================================
            // PREVIOUS
            // ====================================

            const prevButton =
                document.createElement(
                    "button"
                );


            prevButton.textContent =
                "‹";


            prevButton.className =
                "pagination-button";


            prevButton.disabled =
                currentPage === 1;



            prevButton.addEventListener(
                "click",
                () => {

                    if (
                        currentPage > 1
                    ) {

                        currentPage--;

                        renderCurrentPage();

                        scrollToLocations();

                    }

                }
            );


            pagination.appendChild(
                prevButton
            );



            // ====================================
            // PAGE BUTTONS
            // ====================================

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


                if (
                    page === currentPage
                ) {

                    pageButton
                        .classList
                        .add(
                            "active"
                        );

                }



                pageButton.addEventListener(
                    "click",
                    () => {

                        currentPage =
                            page;


                        renderCurrentPage();


                        scrollToLocations();

                    }
                );


                pagination.appendChild(
                    pageButton
                );

            }



            // ====================================
            // NEXT
            // ====================================

            const nextButton =
                document.createElement(
                    "button"
                );


            nextButton.textContent =
                "›";


            nextButton.className =
                "pagination-button";


            nextButton.disabled =
                currentPage ===
                totalPages;



            nextButton.addEventListener(
                "click",
                () => {

                    if (
                        currentPage <
                        totalPages
                    ) {

                        currentPage++;

                        renderCurrentPage();

                        scrollToLocations();

                    }

                }
            );


            pagination.appendChild(
                nextButton
            );

        }



        // ========================================
        // SCROLL TO LOCATIONS
        // ========================================

        function scrollToLocations() {

            const locationsSection =
                document.getElementById(
                    "locations"
                );


            locationsSection
                ?.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

        }



        // ========================================
        // RENDER
        // ========================================

        function renderCurrentPage() {

            displayLocations(
                currentLocations
            );


            displayPagination(
                currentLocations
            );

        }



        // ========================================
        // PROVINCES
        // ========================================

        const provinces = [

            ...new Set(

                data.map(
                    location =>
                        location.province
                )

            )

        ];



        provinces.sort(
            (
                a,
                b
            ) =>

                a.localeCompare(
                    b,
                    "vi"
                )
        );



        provinces.forEach(
            province => {

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

            }
        );



        // ========================================
        // FILTER
        // ========================================

        function filterLocations() {

            const keyword =
                removeVietnameseTones(
                    searchInput.value
                )

                    .trim()

                    .toLowerCase();



            const keywords =
                keyword

                    .split(/\s+/)

                    .filter(Boolean);



            const selectedProvince =
                provinceFilter.value;


            const selectedSort =
                sortFilter.value;



            let filteredLocations =
                data.filter(
                    location => {


                        const searchableText =
                            removeVietnameseTones(

                                `${location.name}
                                 ${location.province}
                                 ${location.description}`

                            )

                                .toLowerCase();



                        const matchesSearch =

                            keywords.length === 0 ||

                            keywords.every(
                                word =>

                                    searchableText
                                        .includes(
                                            word
                                        )
                            );



                        const matchesProvince =

                            selectedProvince ===
                                "all" ||

                            location.province ===
                                selectedProvince;



                        const matchesFavorite =

                            !favoriteFilterActive ||

                            favorites.includes(
                                location.name
                            );



                        return (

                            matchesSearch &&

                            matchesProvince &&

                            matchesFavorite

                        );

                    }
                );



            // A → Z

            if (
                selectedSort ===
                "az"
            ) {

                filteredLocations.sort(
                    (
                        a,
                        b
                    ) =>

                        a.name.localeCompare(
                            b.name,
                            "vi"
                        )
                );

            }



            // Z → A

            if (
                selectedSort ===
                "za"
            ) {

                filteredLocations.sort(
                    (
                        a,
                        b
                    ) =>

                        b.name.localeCompare(
                            a.name,
                            "vi"
                        )
                );

            }



            currentLocations =
                filteredLocations;


            currentPage =
                1;


            renderCurrentPage();

        }



        // ========================================
        // SEARCH
        // ========================================

        searchInput.addEventListener(
            "input",
            filterLocations
        );



        // ========================================
        // PROVINCE
        // ========================================

        provinceFilter.addEventListener(
            "change",
            filterLocations
        );



        // ========================================
        // SORT
        // ========================================

        sortFilter.addEventListener(
            "change",
            filterLocations
        );



        // ========================================
        // SHOW ALL
        // ========================================

        showAllButton.addEventListener(
            "click",
            () => {

                favoriteFilterActive =
                    false;


                showAllButton
                    .classList
                    .add(
                        "active"
                    );


                showFavoritesButton
                    .classList
                    .remove(
                        "active"
                    );


                filterLocations();

            }
        );



        // ========================================
        // SHOW FAVORITES
        // ========================================

        showFavoritesButton.addEventListener(
            "click",
            () => {

                favoriteFilterActive =
                    true;


                showFavoritesButton
                    .classList
                    .add(
                        "active"
                    );


                showAllButton
                    .classList
                    .remove(
                        "active"
                    );


                filterLocations();

            }
        );



        // ========================================
        // RANDOM LOCATION 🎲
        // ========================================

        randomLocationButton.addEventListener(
            "click",
            () => {


                const randomIndex =
                    Math.floor(

                        Math.random() *
                        data.length

                    );


                const randomLocation =
                    data[
                        randomIndex
                    ];


                openModal(
                    randomLocation
                );

            }
        );



        // ========================================
        // RESET
        // ========================================

        resetFilter.addEventListener(
            "click",
            () => {

                searchInput.value =
                    "";


                provinceFilter.value =
                    "all";


                sortFilter.value =
                    "default";


                favoriteFilterActive =
                    false;


                showAllButton
                    .classList
                    .add(
                        "active"
                    );


                showFavoritesButton
                    .classList
                    .remove(
                        "active"
                    );


                currentLocations =
                    [...data];


                currentPage =
                    1;


                renderCurrentPage();

            }
        );



        // ========================================
        // MODAL CLOSE
        // ========================================

        modalClose.addEventListener(
            "click",
            closeModal
        );



        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    closeModal();

                }

            }
        );



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



        // ========================================
        // INITIAL RENDER
        // ========================================

        renderCurrentPage();

    })


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


if (
    backToTop
) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY >
                300
            ) {

                backToTop
                    .classList
                    .add(
                        "show"
                    );

            }

            else {

                backToTop
                    .classList
                    .remove(
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

                behavior:
                    "smooth"

            });

        }
    );

}



// ========================================
// DARK MODE
// ========================================

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


if (
    themeToggle
) {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (
        savedTheme ===
        "dark"
    ) {

        document.body
            .classList
            .add(
                "dark-mode"
            );


        themeToggle.textContent =
            "☀️";

    }

    else {

        themeToggle.textContent =
            "🌙";

    }



    themeToggle.addEventListener(
        "click",
        () => {

            document.body
                .classList
                .toggle(
                    "dark-mode"
                );


            const isDarkMode =
                document.body
                    .classList
                    .contains(
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

            }

            else {

                themeToggle.textContent =
                    "🌙";


                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}