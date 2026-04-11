/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Video, 
  History, 
  Bell, 
  UserCircle, 
  Thermometer, 
  Wind, 
  Flame, 
  HelpCircle, 
  Terminal, 
  CheckCircle2,
  User,
  VideoOff,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const SensorCard = ({ title, value, unit, icon: Icon, status, statusColor }: { 
  title: string; 
  value: string | number; 
  unit?: string; 
  icon: any; 
  status: string;
  statusColor: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface-high p-6 rounded-xl border border-outline-variant/5 shadow-xl relative overflow-hidden group"
  >
    <div className="absolute top-0 left-0 p-4">
      <Icon className={`w-8 h-8 ${statusColor}`} />
    </div>
    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-5xl font-bold font-headline text-slate-900">{value}</span>
      {unit && <span className="text-xl font-light text-slate-500">{unit}</span>}
    </div>
    <div className="mt-6 flex items-center gap-2">
      <span className={`px-2 py-0.5 rounded ${statusColor.replace('text-', 'bg-')}/20 ${statusColor} text-[10px] font-bold uppercase tracking-widest`}>
        {status}
      </span>
    </div>
  </motion.div>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'cameras' | 'history'>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Sensors Grid */}

                        {/* Simplified Camera Access Section */}
            <section className="bg-surface-low rounded-xl p-8 border border-outline-variant/10 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-center md:text-right">
                  <h2 className="text-2xl font-bold font-headline text-slate-900 flex items-center justify-center md:justify-start gap-3">
                    <Video className="w-6 h-6 text-primary" />
                    الوصول السريع للكاميرات
                  </h2>
                  <p className="text-slate-500">يمكنك مراقبة جميع الزوايا والقطاعات من خلال البث المباشر المشفر.</p>
                </div>
                <button 
                  onClick={() => setActiveView('cameras')}
                  className="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-container/20"
                >
                  <Video className="w-5 h-5" />
                  فتح بث الكاميرات
                </button>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SensorCard 
                title="مستشعر الحرارة" 
                value={24} 
                unit="°م" 
                icon={Thermometer} 
                status="نطاق طبيعي" 
                statusColor="text-secondary"
              />
              <SensorCard 
                title="مستشعر الغاز" 
                value={12} 
                unit="%" 
                icon={Wind} 
                status="حالة آمنة" 
                statusColor="text-secondary"
              />
              <SensorCard 
                title="مستشعر اللهب" 
                value="لم يتم رصد لهب" 
                icon={Flame} 
                status="قيد المراقبة" 
                statusColor="text-secondary"
              />
            </section>


          </div>
        );
      case 'cameras':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveView('dashboard')}
                className="p-2 bg-surface-high rounded-lg text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-6 h-6" />
                <span className="text-sm font-bold">رجوع</span>
              </button>
              <h1 className="text-4xl font-bold font-headline tracking-tight text-slate-900">بث الكاميرات المباشر</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="relative aspect-video bg-surface-lowest rounded-2xl border border-outline-variant/10 overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/20 z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-slate-100/50 border border-outline-variant/20 flex items-center justify-center mb-4"
                    >
                      <VideoOff className="w-8 h-8 text-slate-400" />
                    </motion.div>
                    <p className="text-slate-400 font-mono tracking-[0.5em] text-xs uppercase">كاميرا {id} • مشفر</p>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold text-white/50 tracking-widest">CAM_0{id}</span>
                  </div>
                  <div className="absolute inset-0 grayscale opacity-20 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={`https://picsum.photos/seed/cam${id}/800/450`} 
                      alt={`Camera ${id}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

    }
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface border-b border-outline-variant/15">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <LayoutDashboard className="w-6 h-6" />
          </button>
          {activeView !== 'dashboard' && (
            <button 
              onClick={() => setActiveView('dashboard')}
              className="hidden md:flex p-2 text-slate-500 hover:text-slate-900 transition-colors items-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">الرئيسية</span>
            </button>
          )}
          <span className="text-xl font-bold tracking-tighter text-primary font-headline">مراقبة النظام</span>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">النظام: مستقر</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="hidden md:block text-slate-500 font-medium hover:text-slate-900 transition-colors text-sm uppercase tracking-widest">
            تجاوز الطوارئ
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`
          fixed right-0 top-0 h-full flex flex-col pt-20 pb-8 bg-surface-low w-64 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.1)] z-40
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <div className="px-6 mb-8">
            <h2 className="text-lg font-black text-slate-900 font-headline uppercase tracking-tighter">التحكم في النظام</h2>
          </div>
          
          <nav className="flex-1">
            <button 
              onClick={() => { setActiveView('dashboard'); setIsSidebarOpen(false); }}
              className={`${activeView === 'dashboard' ? 'bg-surface-high text-primary border-l-4 border-primary' : 'text-slate-500'} w-full flex items-center px-6 py-4 transition-all duration-300 ease-out group`}
            >
              <LayoutDashboard className="w-5 h-5 ml-4" />
              <span className="text-sm uppercase tracking-widest">لوحة التحكم</span>
            </button>
            <button 
              onClick={() => { setActiveView('cameras'); setIsSidebarOpen(false); }}
              className={`${activeView === 'cameras' ? 'bg-surface-high text-primary border-l-4 border-primary' : 'text-slate-500'} w-full flex items-center px-6 py-4 transition-all duration-300 ease-out group`}
            >
              <Video className="w-5 h-5 ml-4" />
              <span className="text-sm uppercase tracking-widest">بث الكاميرات</span>
            </button>
            <button 
              onClick={() => { setActiveView('history'); setIsSidebarOpen(false); }}
              className={`${activeView === 'history' ? 'bg-surface-high text-primary border-l-4 border-primary' : 'text-slate-500'} w-full flex items-center px-6 py-4 transition-all duration-300 ease-out group`}
            >
              <History className="w-5 h-5 ml-4" />
              <span className="text-sm uppercase tracking-widest">السجل</span>
            </button>
          </nav>

          <div className="mt-auto px-6 space-y-4">
            <div className="pt-4 border-t border-outline-variant/10 flex justify-around">
              <button className="text-slate-500 hover:text-slate-900 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="text-slate-500 hover:text-slate-900 transition-colors">
                <Terminal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 md:mr-64 p-4 md:p-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
