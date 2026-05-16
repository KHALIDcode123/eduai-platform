import { Sparkles, Bell, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import type { User } from "@/types";

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
  title: string;
  actions?: React.ReactNode;
}

export default function DashboardHeader({ user, onLogout, title, actions }: DashboardHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // State for unread submissions count
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch ungraded submissions for this teacher
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUnread = async () => {
      try {
        const q = query(
          collection(db, "submissions"),
          where("teacherId", "==", user.uid),
          where("status", "==", "submitted")
        );
        const snapshot = await getDocs(q);
        setUnreadCount(snapshot.size);
      } catch (error) {
        console.error("Failed to fetch unread submissions:", error);
      }
    };

    fetchUnread();
  }, [user]);

  return (
    <header className="glass-overlay border-b border-dark-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white">EduAI</span>
          <span className="text-dark-600">|</span>
          <span className="text-sm text-dark-400">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          
          {/* Notification Bell with badge */}
          <button
            onClick={() => toast.success(`You have ${unreadCount} unread submission${unreadCount !== 1 ? 's' : ''} to review`)}
            className="p-2 rounded-lg text-dark-400 hover:bg-dark-800 hover:text-white relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <div className="w-9 h-9 bg-primary-500/20 border border-primary-500/30 rounded-full flex items-center justify-center text-primary-300 text-sm font-bold">
            {initials}
          </div>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg text-dark-400 hover:bg-dark-800 hover:text-white transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}