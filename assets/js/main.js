/* ============================================
   主 JavaScript 文件
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || 'Website Contact';
            const message = document.getElementById('message').value;
            
            // 创建邮件链接
            const mailtoLink = `mailto:dr.jiang.zhai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
            
            // 打开邮件客户端
            window.location.href = mailtoLink;
            
            // 显示成功消息（可选）
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = '正在打开邮件客户端...';
            successMessage.style.cssText = 'background-color: #28a745; color: white; padding: 1rem; border-radius: 4px; margin-top: 1rem; text-align: center;';
            contactForm.appendChild(successMessage);
            
            // 3秒后移除消息
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // 图片加载错误处理（个人照片）
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // 如果图片加载失败，使用占位符或Google Scholar链接
            console.log('Profile image failed to load. Please download from Google Scholar and save to assets/images/profile.jpg');
        });
    }
    
    // 懒加载图片（如果有很多图片）
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 平滑滚动增强
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 添加页面加载动画（可选）
    const fadeInElements = document.querySelectorAll('.publication-card, .area-card, .timeline-item');
    if (fadeInElements.length > 0 && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transition = 'opacity 0.5s ease-in';
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                    }, 100);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeInElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }
    
    // 控制台欢迎信息
    console.log('%c欢迎访问 Dongran Zhai 的个人网站！', 'color:rgb(255, 255, 255); font-size: 16px; font-weight: bold;');
    console.log('%c如有任何问题或建议，请通过网站联系我。', 'color:rgb(255, 255, 255); font-size: 12px;');
});
