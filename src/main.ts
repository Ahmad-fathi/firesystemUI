import './index.css';
import { createIcons, LayoutDashboard, Video, History, Thermometer, Wind, Flame, HelpCircle, Terminal, VideoOff, ArrowRight } from 'lucide';

// State
let activeView: 'dashboard' | 'cameras' | 'history' = 'dashboard';
let isSidebarOpen = false;

// Elements
const contentArea = document.getElementById('content-area');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const homeBtn = document.getElementById('home-btn');
const navButtons = document.querySelectorAll('.nav-btn');

// Templates
const sensorCardTemplate = (title: string, value: string | number, unit: string, icon: string, status: string, statusColor: string) => `
  <div class="bg-surface-high p-6 rounded-xl border border-outline-variant/5 shadow-xl relative overflow-hidden group opacity-0 translate-y-4 transition-all duration-500 ease-out" data-animate="true">
    <div class="absolute top-0 left-0 p-4">
      <i data-lucide="${icon}" class="w-8 h-8 ${statusColor}"></i>
    </div>
    <h3 class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">${title}</h3>
    <div class="flex items-baseline gap-2">
      <span class="text-5xl font-bold font-headline text-white">${value}</span>
      ${unit ? `<span class="text-xl font-light text-slate-400">${unit}</span>` : ''}
    </div>
    <div class="mt-6 flex items-center gap-2">
      <span class="px-2 py-0.5 rounded ${statusColor.replace('text-', 'bg-')}/20 ${statusColor} text-[10px] font-bold uppercase tracking-widest">
        ${status}
      </span>
    </div>
  </div>
`;

const dashboardView = () => `
  <div class="space-y-8">
    <section class="bg-surface-low rounded-xl p-8 border border-outline-variant/10 shadow-2xl">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="space-y-2 text-center md:text-right">
          <h2 class="text-2xl font-bold font-headline text-white flex items-center justify-center md:justify-start gap-3">
            <i data-lucide="video" class="w-6 h-6 text-primary"></i>
            الوصول السريع للكاميرات
          </h2>
          <p class="text-slate-400">يمكنك مراقبة جميع الزوايا والقطاعات من خلال البث المباشر المشفر.</p>
        </div>
        <button id="open-cameras-btn" class="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-container/20">
          <i data-lucide="video" class="w-5 h-5"></i>
          فتح بث الكاميرات
        </button>
      </div>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${sensorCardTemplate('مستشعر الحرارة', 24, '°م', 'thermometer', 'نطاق طبيعي', 'text-secondary')}
      ${sensorCardTemplate('مستشعر الغاز', 12, '%', 'wind', 'حالة آمنة', 'text-secondary')}
      ${sensorCardTemplate('مستشعر اللهب', 'لم يتم رصد لهب', '', 'flame', 'قيد المراقبة', 'text-secondary')}
    </section>
  </div>
`;

const camerasView = () => `
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <button id="back-to-dashboard" class="p-2 bg-surface-high rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-2">
        <i data-lucide="arrow-right" class="w-6 h-6"></i>
        <span class="text-sm font-bold">رجوع</span>
      </button>
      <h1 class="text-4xl font-bold font-headline tracking-tight text-white">بث الكاميرات المباشر</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${[1, 2, 3, 4].map(id => `
        <div class="relative aspect-video bg-surface-lowest rounded-2xl border border-outline-variant/10 overflow-hidden group shadow-2xl">
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/40 z-10">
            <div class="w-16 h-16 rounded-full bg-surface-highest/50 border border-outline-variant/20 flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <i data-lucide="video-off" class="w-8 h-8 text-slate-500"></i>
            </div>
            <p class="text-slate-500 font-mono tracking-[0.5em] text-xs uppercase">كاميرا ${id} • مشفر</p>
          </div>
          <div class="absolute top-4 right-4 flex items-center gap-2 z-20">
            <div class="w-2 h-2 rounded-full bg-error animate-pulse"></div>
            <span class="text-[10px] font-mono font-bold text-white/50 tracking-widest">CAM_0${id}</span>
          </div>
          <div class="absolute inset-0 grayscale opacity-20 group-hover:opacity-40 transition-opacity">
            <img src="https://picsum.photos/seed/cam${id}/800/450" alt="Camera ${id}" class="w-full h-full object-cover" referrerPolicy="no-referrer">
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`;

// Functions
function render() {
  if (!contentArea) return;

  if (activeView === 'dashboard') {
    contentArea.innerHTML = dashboardView();
    homeBtn?.classList.add('hidden');
    document.getElementById('open-cameras-btn')?.addEventListener('click', () => setView('cameras'));
  } else if (activeView === 'cameras') {
    contentArea.innerHTML = camerasView();
    homeBtn?.classList.remove('hidden');
    document.getElementById('back-to-dashboard')?.addEventListener('click', () => setView('dashboard'));
  } else {
    contentArea.innerHTML = '<div class="text-white">قريباً...</div>';
    homeBtn?.classList.remove('hidden');
  }

  // Update Nav Buttons
  navButtons.forEach(btn => {
    const view = btn.getAttribute('data-view');
    if (view === activeView) {
      btn.classList.add('text-primary-container', 'bg-surface-high', 'border-l-4', 'border-primary-container');
      btn.classList.remove('text-slate-500');
    } else {
      btn.classList.remove('text-primary-container', 'bg-surface-high', 'border-l-4', 'border-primary-container');
      btn.classList.add('text-slate-500');
    }
  });

  // Re-initialize icons
  createIcons({
    icons: {
      LayoutDashboard,
      Video,
      History,
      Thermometer,
      Wind,
      Flame,
      HelpCircle,
      Terminal,
      VideoOff,
      ArrowRight
    }
  });

  // Simple animations
  setTimeout(() => {
    document.querySelectorAll('[data-animate="true"]').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-4');
    });
  }, 50);
}

function setView(view: typeof activeView) {
  activeView = view;
  render();
  if (window.innerWidth < 768) {
    toggleSidebar(false);
  }
}

function toggleSidebar(open: boolean) {
  isSidebarOpen = open;
  if (isSidebarOpen) {
    sidebar?.classList.remove('translate-x-full');
    sidebarOverlay?.classList.remove('hidden');
  } else {
    sidebar?.classList.add('translate-x-full');
    sidebarOverlay?.classList.add('hidden');
  }
}

// Listeners
mobileMenuBtn?.addEventListener('click', () => toggleSidebar(!isSidebarOpen));
sidebarOverlay?.addEventListener('click', () => toggleSidebar(false));
homeBtn?.addEventListener('click', () => setView('dashboard'));
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view') as any;
    setView(view);
  });
});

// Initial Render
render();
