// 弹窗 Modal 处理逻辑
window.openModal = function(e) {
    if (e) e.preventDefault();
    console.log('Opening modal...');
    const modal = document.getElementById('contact-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) {
        console.error('Modal elements not found:', { modal, modalContent });
        return;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // 强制重绘
    modal.offsetHeight; 
    
    // 添加动画类
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
};

window.closeModal = function(e) {
    if (e) e.preventDefault();
    console.log('Closing modal...');
    const modal = document.getElementById('contact-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) return;

    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    // 等待动画结束后隐藏
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // 恢复背景滚动
    }, 300);
};

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

    // 4. 为所有带有特定类名的按钮绑定事件 (双重保险)
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            window.openModal(e);
        });
    });

    // 5. ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('contact-modal');
            if (modal && !modal.classList.contains('hidden')) {
                window.closeModal(e);
            }
        }
    });
});
