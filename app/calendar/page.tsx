'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
  Home,
  FolderKanban,
  CalendarIcon,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { ja } from "date-fns/locale";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isToday } from "date-fns";
import Link from "next/link";

// カレンダーのイベントデータ
const eventData = [
  {
    date: "2025-02-05",
    events: [
      { title: "プロジェクトA キックオフ", time: "10:00", type: "meeting" },
      { title: "予算レビュー", time: "14:00", type: "review" },
    ],
  },
  {
    date: "2025-02-12",
    events: [
      { title: "進捗ミーティング", time: "15:00", type: "meeting" },
    ],
  },
  {
    date: "2025-02-15",
    events: [
      { title: "デザインレビュー", time: "13:00", type: "review" },
      { title: "チームMTG", time: "16:00", type: "meeting" },
    ],
  },
];

export default function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // カレンダー用の日付計算
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const startingDayIndex = getDay(firstDayOfMonth);

  // 前月・次月の移動
  const goToPreviousMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  // 指定した日付のイベントを取得
  const getEventsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return eventData.find(event => event.date === dateString)?.events || [];
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#1E2537] text-white transition-all duration-300 ${
          isSidebarOpen ? "w-[240px]" : "w-[72px]"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-xl font-semibold transition-opacity duration-300 pl-2 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Project Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <PanelLeftClose className="h-6 w-6" /> : <PanelLeftOpen className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="space-y-1 px-3">
          {[
            { label: "ホーム", icon: Home, href: "/" },
            { label: "プロジェクト", icon: FolderKanban, href: "/project/1" },
            { label: "カレンダー", icon: CalendarIcon, href: "/calendar" },
            { label: "レポート", icon: FileBarChart, href: "/report" },
            { label: "設定", icon: Settings, href: "/settings" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center rounded-lg hover:bg-white/10 transition-colors group
                ${isSidebarOpen ? 'px-4 py-3' : 'p-3 justify-center'}`}
            >
              <item.icon className="w-8 h-8 opacity-75 group-hover:opacity-100" />
              {isSidebarOpen && (
                <span className="font-medium ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-[240px]" : "ml-[72px]"} bg-blue-50/40`}
      >
        <div className="container mx-auto p-6 space-y-6">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-slate-800">カレンダー</h1>
          </div>

          {/* カレンダー */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg font-semibold text-slate-800">
                  {format(currentDate, 'yyyy年 M月')}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 曜日ヘッダー */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                  <div
                    key={day}
                    className={`text-center font-medium ${
                      index === 0 ? 'text-red-500' : 
                      index === 6 ? 'text-blue-500' : 
                      'text-slate-600'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* カレンダーグリッド */}
              <div className="grid grid-cols-7 gap-4">
                {/* 前月の空白セル */}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                  <div key={`empty-start-${index}`} className="h-32" />
                ))}

                {/* 日付セル */}
                {daysInMonth.map((date) => {
                  const dayEvents = getEventsForDate(date);
                  const isCurrentMonth = isSameMonth(date, currentDate);
                  const isCurrentDay = isToday(date);
                  const dayOfWeek = getDay(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`h-32 p-2 border rounded-lg transition-colors
                        ${isCurrentMonth ? 'bg-white' : 'bg-slate-50'}
                        ${isCurrentDay ? 'ring-2 ring-blue-500' : ''}
                        hover:bg-blue-50/50`}
                    >
                      <div className={`text-right mb-2 font-medium
                        ${dayOfWeek === 0 ? 'text-red-500' : 
                          dayOfWeek === 6 ? 'text-blue-500' : 
                          'text-slate-600'}`}
                      >
                        {format(date, 'd')}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event, index) => (
                          <div
                            key={index}
                            className={`text-xs p-1 rounded
                              ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                                event.type === 'review' ? 'bg-purple-100 text-purple-800' : 
                                'bg-slate-100 text-slate-800'}`}
                          >
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="truncate">{event.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
