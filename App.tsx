import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Bot, Camera, Home, Moon, Settings, Sparkles, Sun } from 'lucide-react';
import HomeView from './views/HomeView';
import LiveView from './views/LiveView';
import AIView from './views/AIView';
import RobotView from './views/RobotView';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/live', label: '实时', icon: Camera },
    { path: '/ai', label: '分析', icon: Sparkles },
    { path: '/robot', label: '机器人', icon: Bot },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-slate-200 bg-white/90 backdrop-blur-lg transition-colors dark:border-slate-800 dark:bg-slate-900/90 safe-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex h-full w-full flex-col items-center justify-center transition-all ${
              isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="mt-1 text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme }) => (
  <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white/80 px-4 pb-3 pt-8 backdrop-blur-md transition-colors dark:border-slate-900 dark:bg-slate-950/80">
    <div>
      <h1 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">视净</h1>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">桌面清洁与智能巡检助手</p>
    </div>
    <div className="flex gap-2">
      <button
        type="button"
        aria-label="切换主题"
        onClick={onToggleTheme}
        className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-100 active:rotate-12 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button
        type="button"
        aria-label="设置"
        className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        <Settings size={20} />
      </button>
    </div>
  </header>
);

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    return true;
  }
  if (saved === 'light') {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
        <Header isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />
        <main className="flex-1 overflow-x-hidden pb-24">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/live" element={<LiveView />} />
            <Route path="/ai" element={<AIView />} />
            <Route path="/robot" element={<RobotView />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
