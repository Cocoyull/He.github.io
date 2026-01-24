// 交互效果和动效实现

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    initTabNavigation();
    
    // 滑块控制功能
    initSliders();
    
    // 场景选择功能
    initSceneSelection();
    
    // 输入值同步
    initValueSync();
});

// 标签导航初始化
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 这里可以添加切换内容的逻辑
            // 例如显示/隐藏不同的参数组
        });
    });
}

// 滑块控制初始化
function initSliders() {
    const sliders = document.querySelectorAll('.slider-track');
    
    sliders.forEach(slider => {
        const thumb = slider.querySelector('.slider-thumb');
        let isDragging = false;
        
        // 鼠标按下事件
        thumb.addEventListener('mousedown', function(e) {
            isDragging = true;
            document.body.style.userSelect = 'none';
        });
        
        // 鼠标移动事件
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            let offsetX = e.clientX - sliderRect.left;
            
            // 限制滑块范围
            offsetX = Math.max(0, Math.min(offsetX, sliderRect.width));
            
            // 计算百分比
            const percentage = (offsetX / sliderRect.width) * 100;
            
            // 更新滑块位置
            thumb.style.left = `${percentage}%`;
            
            // 这里可以添加更新值的逻辑
            // 例如根据百分比计算具体数值
        });
        
        // 鼠标释放事件
        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.userSelect = '';
        });
        
        // 点击滑块轨道事件
        slider.addEventListener('click', function(e) {
            const sliderRect = slider.getBoundingClientRect();
            let offsetX = e.clientX - sliderRect.left;
            
            // 限制滑块范围
            offsetX = Math.max(0, Math.min(offsetX, sliderRect.width));
            
            // 计算百分比
            const percentage = (offsetX / sliderRect.width) * 100;
            
            // 更新滑块位置
            thumb.style.left = `${percentage}%`;
        });
    });
}

// 场景选择初始化
function initSceneSelection() {
    const sceneItems = document.querySelectorAll('.scene-item');
    
    sceneItems.forEach(item => {
        item.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            
            // 恢复原始状态
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 这里可以添加场景切换的逻辑
            const sceneName = this.querySelector('h4').textContent;
            console.log('切换到场景:', sceneName);
        });
    });
}

// 输入值同步初始化
function initValueSync() {
    const valueInputs = document.querySelectorAll('.value-input');
    
    valueInputs.forEach(input => {
        input.addEventListener('input', function() {
            // 这里可以添加值验证和同步的逻辑
            // 例如验证输入是否为数字，更新滑块位置等
            
            // 简单的数字验证
            if (!/^\d*$/.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
        });
        
        input.addEventListener('blur', function() {
            // 失去焦点时的处理
            if (this.value === '') {
                this.value = '0';
            }
        });
    });
}

// 按钮点击效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            
            // 恢复原始状态
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 平滑滚动效果
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式导航
function initResponsiveNavigation() {
    // 这里可以添加响应式导航的逻辑
    // 例如在移动设备上显示汉堡菜单
}

// 动画效果
function initAnimations() {
    // 元素进入视口时的动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.parameter-group, .scene-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// 初始化所有功能
function initAllFeatures() {
    initTabNavigation();
    initSliders();
    initSceneSelection();
    initValueSync();
    initButtonEffects();
    initSmoothScroll();
    initResponsiveNavigation();
    initAnimations();
}

// 导出初始化函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAllFeatures
    };
}

// 自动初始化所有功能
document.addEventListener('DOMContentLoaded', initAllFeatures);