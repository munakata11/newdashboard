'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Home,
  FolderKanban,
  CalendarIcon,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart3,
  DollarSign,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';

// レポート用のモックデータ
const reportData = {
  fiscalYears: ["2023", "2024", "2025"],
  projects: [
    {
      id: 1,
      name: "プロジェクトA",
      budget: 12000000,
      spent: 4200000,
      progress: 35,
      monthlySpending: [
        { month: "4月", amount: 800000 },
        { month: "5月", amount: 1200000 },
        { month: "6月", amount: 2200000 },
      ],
      categories: [
        { name: "人件費", amount: 2500000 },
        { name: "機材費", amount: 1200000 },
        { name: "外注費", amount: 500000 },
      ]
    },
    {
      id: 2,
      name: "プロジェクトB",
      budget: 8000000,
      spent: 5600000,
      progress: 70,
      monthlySpending: [
        { month: "4月", amount: 1800000 },
        { month: "5月", amount: 2200000 },
        { month: "6月", amount: 1600000 },
      ],
      categories: [
        { name: "人件費", amount: 3500000 },
        { name: "機材費", amount: 1500000 },
        { name: "外注費", amount: 600000 },
      ]
    },
  ]
};

export default function ReportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");

  // 金額のフォーマット関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount);
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
            <h1 className="text-2xl font-semibold text-slate-800">財務レポート</h1>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="年度を選択" />
              </SelectTrigger>
              <SelectContent>
                {reportData.fiscalYears.map((year) => (
                  <SelectItem key={year} value={year}>{year}年度</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* サマリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">総予算</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-slate-800">
                  {formatCurrency(reportData.projects.reduce((acc, project) => acc + project.budget, 0))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">総支出</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-slate-800">
                  {formatCurrency(reportData.projects.reduce((acc, project) => acc + project.spent, 0))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">平均進捗率</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-slate-800">
                  {Math.round(reportData.projects.reduce((acc, project) => acc + project.progress, 0) / reportData.projects.length)}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* プロジェクト別レポート */}
          <div className="grid grid-cols-1 gap-6">
            {reportData.projects.map((project) => (
              <Card key={project.id} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg font-semibold text-slate-800">{project.name}</CardTitle>
                  </div>
                  <div className="text-sm text-slate-600">
                    予算消化率: {Math.round((project.spent / project.budget) * 100)}%
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* 予算と支出 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-600">予算</span>
                        <span className="text-slate-800">{formatCurrency(project.budget)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-600">支出</span>
                        <span className="text-slate-800">{formatCurrency(project.spent)}</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                    </div>

                    {/* カテゴリー別支出 */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-3">カテゴリー別支出</h4>
                      <div className="space-y-2">
                        {project.categories.map((category, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-slate-600">{category.name}</span>
                            <span className="text-slate-800">{formatCurrency(category.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 月別支出 */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-3">月別支出</h4>
                      <div className="space-y-2">
                        {project.monthlySpending.map((month, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-slate-600">{month.month}</span>
                            <span className="text-slate-800">{formatCurrency(month.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
