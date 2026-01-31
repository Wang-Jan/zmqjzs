
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomeView from './views/HomeView';
import LiveView from './views/LiveView';
import AIView from './views/AIView';
import RobotView from './views/RobotView';
import { 
  Home, 
  Camera, 
  Sparkles, 
  Bot, 
  Settings,
  Sun,
  Moon
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/live', label: '实时', icon: Camera },
    { path: '/ai', label: '分析', icon: Sparkles },
    { path: '/robot', label: '机器人', icon: Bot },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex justify-around items-center h-20 safe-bottom z-50 transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-all ${
              isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-bold">{item.label}</span>
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
  <header className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-100 dark:border-slate-900 px-4 pt-8 pb-3 flex justify-between items-center transition-colors">
    <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">视净</h1>
    <div className="flex gap-2">
      <button 
        onClick={onToggleTheme}
        className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:rotate-12"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
        <Settings size={20} />
      </button>
    </div>
  </header>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
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