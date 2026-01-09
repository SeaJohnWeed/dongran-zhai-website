/* ============================================
   组件加载 JavaScript 文件
   用于动态加载可复用的HTML组件（如footer）
   ============================================ */

/**
 * 加载footer组件
 */
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.warn('Footer container not found');
        return;
    }

    fetch('assets/html/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer');
            }
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
            
            // Footer加载完成后，如果i18n已初始化，需要重新应用国际化
            if (window.i18n && window.i18n.isReady) {
                // 重新应用当前语言
                window.i18n.setLanguage(window.i18n.currentLang);
            } else {
                // 如果i18n还没准备好，等待它准备好后再应用
                const checkI18n = setInterval(() => {
                    if (window.i18n && window.i18n.isReady) {
                        window.i18n.setLanguage(window.i18n.currentLang);
                        clearInterval(checkI18n);
                    }
                }, 100);
                
                // 10秒后停止检查
                setTimeout(() => clearInterval(checkI18n), 10000);
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // 如果加载失败，显示错误信息（可选）
            footerContainer.innerHTML = '<footer class="footer"><div class="container"><p>Footer failed to load</p></div></footer>';
        });
}

// 页面加载完成后加载footer
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});
