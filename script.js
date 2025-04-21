// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// 表单提交处理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 这里可以添加表单验证逻辑
    
    // 模拟表单提交
    alert('感谢您的留言！我们会尽快回复您。');
    
    // 清空表单
    this.reset();
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 添加淡入效果
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 使用 Intersection Observer 实现滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));

    // 页面加载完成后立即初始化emoji动画
    setupEmojiAnimation();

    // 头像气泡效果
    const container = document.querySelector('.profile-image-container');
    
    if (container) {
        container.addEventListener('mouseover', function() {
            const createBubble = () => {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                
                // 随机大小 (增加大小范围)
                const size = Math.random() * 20 + 10;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // 随机位置
                const left = Math.random() * 80 + 10;
                bubble.style.left = `${left}%`;
                bubble.style.bottom = '0';
                
                // 添加动画
                bubble.style.animation = `floating-bubble ${Math.random() * 1.5 + 2}s ease-in-out forwards`;
                
                container.appendChild(bubble);
                
                // 动画结束后移除气泡
                bubble.addEventListener('animationend', () => {
                    bubble.remove();
                });
            };
            
            // 增加气泡生成频率
            const bubbleInterval = setInterval(createBubble, 200);
            
            container.addEventListener('mouseout', () => {
                clearInterval(bubbleInterval);
            }, { once: true });
        });
    }
});

// Emoji动画设置
function setupEmojiAnimation() {
    const navIcons = document.querySelectorAll('.nav-icon');
    const emojis = ['❤️', '⭐', '🎉'];
    
    navIcons.forEach(icon => {
        let animationInterval;
        
        icon.addEventListener('mouseenter', () => {
            // 开始emoji动画
            animationInterval = setInterval(() => {
                createEmoji(icon.querySelector('.emoji-container'));
            }, 150); // 加快emoji生成速度
        });
        
        icon.addEventListener('mouseleave', () => {
            // 停止emoji动画
            clearInterval(animationInterval);
        });
    });
    
    function createEmoji(container) {
        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // 随机初始位置和大小
        const randomX = (Math.random() - 0.5) * 30;
        const randomScale = 0.8 + Math.random() * 0.4;
        emoji.style.left = `calc(50% + ${randomX}px)`;
        emoji.style.top = '50%';
        emoji.style.transform = `scale(${randomScale})`;
        
        container.appendChild(emoji);
        
        // 动画结束后移除元素
        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }
} 