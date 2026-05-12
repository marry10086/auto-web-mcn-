document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化 Lucide 图标
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Lucide icons initialization failed:', error);
    }

    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Modal elements
    const contactModal = document.getElementById('contact-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Function to open the modal
    const openModal = () => {
        contactModal.classList.remove('hidden');
        // Trigger reflow to ensure transition plays
        void contactModal.offsetWidth;
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); // Re-render icons inside the modal
        }
    };

    // Function to close the modal
    const closeModal = () => {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            contactModal.classList.add('hidden');
        }, 300); // Match the transition duration
    };

    // Event listeners for modal
    if (contactModal && closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) { // Only close if clicking on the overlay, not the modal content
                closeModal();
            }
        });
    }

    // 2. 监听滚动以改变导航栏样式
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('nav-scrolled');
                navbar.classList.remove('py-6', 'bg-transparent');
            } else {
                navbar.classList.remove('nav-scrolled');
                navbar.classList.add('py-6', 'bg-transparent');
            }
        });
    }

    // 3. 移动端菜单切换逻辑
    let isMobileMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;

            if (isMobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                menuBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // 点击菜单项后自动关闭菜单 (移动端)
        const mobileLinks = mobileMenu.querySelectorAll('a, button');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMobileMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    // 4. 平滑滚动增强 (可选，但推荐) - Modified to handle modal triggers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // If the link is specifically for the contact section (now a modal trigger)
            if (href === '#contact-section') {
                e.preventDefault(); // Prevent default link behavior (scrolling)
                openModal();
                // Close mobile menu if it's open
                if (isMobileMenuOpen) {
                    isMobileMenuOpen = false;
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            } else if (href !== '#') { // For other smooth scrolls
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Ensure all Lucide icons are created after DOM is fully loaded and interactive
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Lucide icons re-initialization failed:', error);
    }
});
