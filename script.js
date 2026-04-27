document.addEventListener('DOMContentLoaded', () => {
    // 初始化 Lucide 图标
    lucide.createIcons();

    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // 1. 监听滚动以改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('py-6', 'bg-transparent');
        }
    });

    // 2. 移动端菜单切换逻辑
    let isMobileMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            // 切换图标为 X
            menuBtn.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            // 切换图标为 menu
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        }
        
        // 重新运行 lucide 以应用图标更改
        lucide.createIcons();
    });

    // 点击菜单项后自动关闭菜单 (移动端)
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
});