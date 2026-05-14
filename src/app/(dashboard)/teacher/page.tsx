"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import TeacherDashboardFull from "@/components/dashboard/TeacherDashboardFull";
import { Loader2 } from "lucide-react";

export default function TeacherPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "teacher") {
        router.push("/student");
      }
    }
  }, [user, loading, router, mounted]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "teacher") {
    return null;
  }

  return <TeacherDashboardFull />;
}
