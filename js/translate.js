// Translate.js
// This script handles the language translation for the web application.
const translations = {
    en: {}, // سيتم تحميل الترجمة الإنجليزية من ملف en.json
    ar: {}  // سيتم تحميل الترجمة العربية من ملف ar.json
};

// تحميل ملفات الترجمة
function loadTranslations() {
    fetch('lang/en.json')
        .then(response => response.json())
        .then(data => translations.en = data);

    fetch('lang/ar.json')
        .then(response => response.json())
        .then(data => translations.ar = data);
}

// تغيير اللغة
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // تحديث النص الحالي للزر
    const currentLanguage = lang === 'en' ? 'En' : 'Ar';
    document.querySelector('#languageDropdown span').textContent = currentLanguage;
    document.documentElement.setAttribute('lang', lang); // تحديث السمة lang في HTML
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'; // تغيير اتجاه النص
    document.body.classList.toggle('rtl', lang === 'ar'); // إضافة كلاس RTL إذا كانت اللغة عربية
    localStorage.setItem('language', lang); // حفظ اللغة المختارة في LocalStorage
    document.cookie = `language=${lang}; path=/`; // حفظ اللغة في الكوكيز
}

// جلب اللغة من الكوكيز
function getLanguageFromCookies() {
    const cookies = document.cookie.split('; ');
    const languageCookie = cookies.find(cookie => cookie.startsWith('language='));
    return languageCookie ? languageCookie.split('=')[1] : null;
}

// تحميل اللغة المحفوظة أو الافتراضية
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    setTimeout(() => {
        const savedLanguage = getLanguageFromCookies() || localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
    }, 500); // تأخير بسيط لضمان تحميل ملفات الترجمة
});