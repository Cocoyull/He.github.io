// 导航菜单交互
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // 仅当 href 为 # 或空时阻止默认跳转，其他情况直接跳转页面
            if (!href || href === '#' || href.startsWith('#')) {
                e.preventDefault();

                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                // 添加当前活动状态
                this.classList.add('active');

                // 模拟页面导航
                const target = this.textContent.trim();
                console.log(`导航到: ${target}`);
            }
        });
    });
}

// 侧边栏菜单交互 (支持展开折叠)
function initSidebarMenu() {
    const sidebar = document.querySelector('.menu-list');
    if (!sidebar) return;

    // 展开折叠
    sidebar.addEventListener('click', e => {
        const primary = e.target.closest('.primary-link');
        if (primary) {
            e.preventDefault();
            const item = primary.parentElement;
            const text = primary.textContent.trim();

            if (item.classList.contains('has-sub')) {
                // 展开折叠子菜单
                item.classList.toggle('expanded');
            } else {
                // 无子菜单：高亮并更新内容，不跳转页面
                const items = sidebar.querySelectorAll('.menu-item');
                items.forEach(it => it.classList.remove('active'));
                item.classList.add('active');
                updateContent(text);
            }
        }
    });
    const menuContainer = document.querySelector('.menu-list');
    if (!menuContainer) return;

    menuContainer.addEventListener('click', function (e) {
        const link = e.target.closest('.menu-link');
        if (!link) return;
        e.preventDefault();

        const items = menuContainer.querySelectorAll('.menu-item');
        items.forEach(item => item.classList.remove('active'));
        link.parentElement.classList.add('active');

        updateContent(link.textContent.trim());
    });
}

// 根据按钮切换侧边栏数据
function initHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const menuTitle = document.querySelector('.menu-title');
    const menuList = document.querySelector('.menu-list');

    if (!heroButtons.length || !menuList) return;

    const menus = {
        scene: {
            title: '实验环境',
            items: ['气流影响测试', '空气质量影响测试', '智能驾驶感知', 'CMF实验', '数据采集']
        },
        resource: {
            title: '', // 设计稿无二级标题，仅折叠项
            items: ['工具教程', '实验指导', '案例库']
        }
    };

    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isResource = btn.textContent.includes('配套教学资源');
            const key = isResource ? 'resource' : 'scene';
            const { title, items } = menus[key];

            // 切换按钮颜色（主次样式互换）
            heroButtons.forEach(b => {
                if (b === btn) {
                    b.classList.add('btn-primary');
                    b.classList.remove('btn-secondary');
                } else {
                    b.classList.add('btn-secondary');
                    b.classList.remove('btn-primary');
                }
            });

            // 更新侧边栏标题
            if (menuTitle) {
                menuTitle.textContent = title || '';
                menuTitle.style.display = title ? 'block' : 'none';
            }

            // 构建列表
            menuList.innerHTML = items
                .map((txt, idx) => `<li class="menu-item${idx === 0 ? ' active' : ''}"><a href="#" class="menu-link">${txt}</a></li>`) // 默认第一个active
                .join('');

            // 默认内容区
            updateContent(items[0]);
        });
    });
}

// 更新内容区域
function updateContent(title) {
    const sectionTitle = document.querySelector('.section-title');
    const sectionText = document.querySelector('.section-text');
    if (sectionTitle && sectionText) {
        sectionTitle.textContent = title;
        sectionText.textContent = `Body text for whatever you'd like to add more to the subheading.`;
    }
}

// 搜索功能保持不变
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchInput || !searchBtn) return;

    function perform() {
        const q = searchInput.value.trim();
        alert(q ? `搜索结果: ${q}` : '请输入搜索关键词');
    }
    searchBtn.onclick = perform;
    searchInput.onkeypress = e => e.key === 'Enter' && perform();
}

// 其余函数保持不变 ... (为了简短未重写，假设在同文件后方依旧存在)

// ---------- 页面初始化 ----------
function init() {
    initNavigation();
    initSidebarMenu();
    initSearch();
    initHeroButtons();
}

document.addEventListener('DOMContentLoaded', init);
