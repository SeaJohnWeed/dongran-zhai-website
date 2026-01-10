/* ============================================
   国际化 (i18n) 语言切换功能
   ============================================ */

// 全局变量
let i18n;

// 绑定语言切换按钮事件
function bindLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    console.log('Binding language buttons, found:', buttons.length);
    
    buttons.forEach(btn => {
        // 移除旧的事件监听器（通过克隆节点）
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // 添加新的事件监听器
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            console.log('i18n instance:', i18n);
            console.log('Translations available:', i18n ? Object.keys(i18n.translations || {}) : 'none');
            console.log('Current language:', i18n ? i18n.currentLang : 'unknown');
            
            // 检查i18n实例是否存在
            if (!i18n) {
                console.error('i18n instance not initialized yet');
                return;
            }
            
            // 检查翻译数据是否已加载
            if (!i18n.isReady || !i18n.translations || Object.keys(i18n.translations).length === 0) {
                console.warn('Translations not ready yet, waiting...');
                console.warn('isReady:', i18n.isReady);
                console.warn('translations keys:', Object.keys(i18n.translations || {}));
                
                // 如果数据还没加载，等待更长时间再试
                let retries = 0;
                const maxRetries = 15; // 增加重试次数
                const checkInterval = setInterval(function() {
                    retries++;
                    console.log(`Retry ${retries}/${maxRetries}, checking translations...`);
                    
                    if (i18n && i18n.isReady && i18n.translations && i18n.translations[lang]) {
                        clearInterval(checkInterval);
                        console.log('Translations loaded, switching language now');
                        i18n.switchLanguage(lang);
                    } else if (retries >= maxRetries) {
                        clearInterval(checkInterval);
                        console.error('Failed to switch language after retries:', lang);
                        console.error('isReady:', i18n ? i18n.isReady : 'i18n not initialized');
                        console.error('translations:', i18n ? i18n.translations : 'none');
                        console.error('Current URL:', window.location.href);
                        console.error('Please check if data/i18n.json is accessible');
                        
                        // 检查是否是file://协议
                        if (window.location.protocol === 'file:') {
                            alert('Please use a local web server to view this site.\n\nRun: python3 -m http.server 8000\nThen visit: http://localhost:8000');
                        } else {
                            alert('Language switching failed. Please check the browser console for details.');
                        }
                    }
                }, 300); // 增加检查间隔
                return;
            }
            
            // 检查语言是否存在
            if (!i18n.translations[lang]) {
                console.error('Language not found in translations:', lang);
                console.error('Available languages:', Object.keys(i18n.translations));
                return;
            }
            
            // 切换语言
            i18n.switchLanguage(lang);
        });
    });
}

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.isReady = false; // 添加就绪标志
        this.init();
    }

    async init() {
        try {
            // 尝试不同的路径
            let jsonPath = 'data/i18n.json';
            // 如果当前路径不是根目录，尝试相对路径
            const currentPath = window.location.pathname;
            if (currentPath.includes('/') && currentPath.split('/').length > 2) {
                // 在子目录中，需要回到根目录
                const depth = currentPath.split('/').filter(p => p && !p.endsWith('.html')).length;
                jsonPath = '../'.repeat(depth) + 'data/i18n.json';
            }
            
            console.log('Loading translations from:', jsonPath);
            const response = await fetch(jsonPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.translations = data;
            console.log('Translations loaded successfully:', Object.keys(this.translations));
            console.log('Available languages:', Object.keys(this.translations));
            
            // 验证数据完整性
            if (!this.translations.en || !this.translations.zh) {
                throw new Error('Translation data incomplete');
            }
            
            // 标记为就绪
            this.isReady = true;
            console.log('i18n is ready, translations loaded');
            
            this.setLanguage(this.currentLang);
            this.updateLanguageSelector();
            // 数据加载完成后，绑定按钮事件
            bindLanguageButtons();
        } catch (error) {
            console.error('Error loading translations:', error);
            console.error('Error details:', error.message);
            console.error('Current URL:', window.location.href);
            
            // 如果fetch失败，可能是CORS问题（file://协议）
            // 尝试使用内联数据作为后备
            if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
                console.warn('CORS error detected. If using file:// protocol, please use a local server.');
                console.warn('Run: python3 -m http.server 8000');
            }
            
            // 如果加载失败，使用默认英文
            this.currentLang = 'en';
            // 即使加载失败，也尝试绑定按钮（可能使用缓存的数据）
            bindLanguageButtons();
        }
    }

    setLanguage(lang) {
        if (!this.translations || !this.translations[lang]) {
            console.warn(`Language ${lang} not found, using English`);
            lang = 'en';
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // 更新HTML lang属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('data-i18n-html')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // 更新所有带有 data-i18n-alt 属性的元素（用于img alt属性）
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.setAttribute('alt', translation);
            }
        });
        
        // 更新meta标签
        this.updateMetaTags();
        
        // 更新页面标题
        this.updatePageTitle();
        
        // 触发自定义事件
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    getTranslation(key) {
        if (!this.translations || !this.translations[this.currentLang]) {
            return null;
        }
        
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        // 如果值是字符串，替换其中的常量引用
        if (typeof value === 'string') {
            return this.replaceConstants(value);
        }
        
        return value;
    }

    replaceConstants(text) {
        if (typeof text !== 'string') {
            return text;
        }
        
        // 匹配 @constants.en.xxx 或 @constants.zh.xxx 格式的引用
        const constantPattern = /@constants\.([a-z]{2})\.([a-zA-Z0-9_\.]+)/g;
        
        return text.replace(constantPattern, (match, lang, path) => {
            // 优先使用当前语言，如果不存在则使用指定的语言，最后回退到英文
            let constantValue = this.translations.constants;
            
            if (!constantValue) {
                return match; // 如果 constants 对象不存在，返回原始匹配
            }
            
            // 尝试使用指定语言或当前语言
            const targetLang = constantValue[this.currentLang] ? this.currentLang : 
                              (constantValue[lang] ? lang : 'en');
            
            if (!constantValue[targetLang]) {
                return match; // 如果常量不存在，返回原始匹配
            }
            
            constantValue = constantValue[targetLang];
            
            // 遍历常量键路径
            const pathKeys = path.split('.');
            for (const k of pathKeys) {
                if (constantValue && typeof constantValue === 'object' && constantValue[k]) {
                    constantValue = constantValue[k];
                } else {
                    return match; // 如果常量键不存在，返回原始匹配
                }
            }
            
            // 如果常量值本身还包含常量引用，递归替换
            if (typeof constantValue === 'string' && constantValue.includes('@constants.')) {
                return this.replaceConstants(constantValue);
            }
            
            return constantValue;
        });
    }

    t(key) {
        return this.getTranslation(key) || key;
    }

    updateLanguageSelector() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateMetaTags() {
        const page = this.getCurrentPage();
        const description = this.t(`${page}.description`) || this.t(`${page}.metaDescription`);
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);
    }

    updatePageTitle() {
        const page = this.getCurrentPage();
        const title = this.t(`${page}.title`);
        if (title) {
            document.title = title;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        const pageMap = {
            'index.html': 'home',
            'research.html': 'research',
            'publications.html': 'publications',
            'experience.html': 'experience',
            'awards.html': 'awards',
            'contact.html': 'contact'
        };
        
        return pageMap[filename] || 'home';
    }

    switchLanguage(lang) {
        console.log('Switching language to:', lang);
        console.log('Available translations:', Object.keys(this.translations || {}));
        
        if (this.translations && this.translations[lang]) {
            this.setLanguage(lang);
            this.updateLanguageSelector();
            console.log('Language switched successfully to:', lang);
        } else {
            console.error('Language not found in translations:', lang);
            console.error('Current translations:', this.translations);
        }
    }
}

// 等待DOM加载完成后再初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing i18n...');
    // 初始化i18n实例
    i18n = new I18n();
    
    // 也监听语言切换事件，确保按钮状态更新
    document.addEventListener('languageChanged', function(e) {
        console.log('Language changed event:', e.detail);
        if (i18n) {
            i18n.updateLanguageSelector();
        }
    });
    
    // 导出供其他脚本使用
    window.i18n = i18n;
});
