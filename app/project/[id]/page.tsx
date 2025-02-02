'use client';

import { useParams } from 'next/navigation';
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
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const projectData = {
  id: '1',
  name: 'プロジェクトA',
  status: '進行中',
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  progress: 35,
  tasks: [
    { id: 1, name: 'タスク1', status: '完了', assignee: '山田太郎', dueDate: '2025-02-15' },
    { id: 2, name: 'タスク2', status: '進行中', assignee: '鈴木花子', dueDate: '2025-03-01' },
    { id: 3, name: 'タスク3', status: '未着手', assignee: '佐藤次郎', dueDate: '2025-03-15' },
  ],
  ganttData: [
    { id: 1, task: 'フェーズ1', start: '2025-01-01', end: '2025-03-31', progress: 100 },
    { id: 2, task: 'フェーズ2', start: '2025-04-01', end: '2025-06-30', progress: 50 },
    { id: 3, task: 'フェーズ3', start: '2025-07-01', end: '2025-12-31', progress: 0 },
  ]
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");

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
            { label: "ホーム", icon: Home },
            { label: "プロジェクト", icon: FolderKanban },
            { label: "カレンダー", icon: CalendarIcon },
            { label: "レポート", icon: FileBarChart },
            { label: "設定", icon: Settings },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center rounded-lg hover:bg-white/10 transition-colors group
                ${isSidebarOpen ? 'px-4 py-3' : 'p-3 justify-center'}`}
            >
              <item.icon className="w-8 h-8 opacity-75 group-hover:opacity-100" />
              {isSidebarOpen && (
                <span className="font-medium ml-3">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-[240px]" : "ml-[72px]"} bg-blue-50/40`}
      >
        <div className="container mx-auto p-6 space-y-6">
          {/* プロジェクトタイトル */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-slate-800">
                {projectData.name}
              </h1>
              <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {projectData.status}
              </span>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="年を選択" />
              </SelectTrigger>
              <SelectContent>
                {[2023, 2024, 2025, 2026].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}年度
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* プロジェクト概要 */}
            <Card className="col-span-4 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <FileBarChart className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">プロジェクト概要</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <dl className="space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-slate-600">開始日</dt>
                    <dd className="text-sm text-slate-800">{projectData.startDate}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-slate-600">終了日</dt>
                    <dd className="text-sm text-slate-800">{projectData.endDate}</dd>
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <dt className="text-sm font-medium text-slate-600">進捗状況</dt>
                      <dd className="text-sm text-slate-800">{projectData.progress}%</dd>
                    </div>
                    <Progress value={projectData.progress} className="h-2" />
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* プロジェクトチャート */}
            <Card className="col-span-8 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">プロジェクトチャート</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline Header */}
                <div className="mb-1 pt-4">
                  <div className="flex items-center">
                    <div className="w-[240px]"></div>
                    <div className="flex-1 flex relative">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="flex-1 text-center text-sm text-slate-600">
                          {`${i + 1}月`}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center mt-1">
                    <div className="w-[240px]"></div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 right-0 h-[1px] bg-slate-200"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 relative pt-2">
                  {/* Vertical grid lines */}
                  <div className="absolute inset-0 flex" style={{ height: "100%" }}>
                    <div className="w-[240px]"></div>
                    <div className="flex-1 relative">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px bg-slate-200"
                          style={{ left: `${(i / 12) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {/* Tasks */}
                  {projectData.ganttData.map((item) => (
                    <div key={item.id} className="flex items-center group">
                      <div className="w-[240px] pr-4 py-2">
                        <div className="font-medium text-sm text-slate-700">{item.task}</div>
                      </div>
                      <div className="flex-1 relative">
                        <div
                          className="absolute h-6 rounded bg-blue-100 group-hover:bg-blue-200 transition-colors"
                          style={{
                            left: `${(new Date(item.start).getMonth() / 12) * 100}%`,
                            width: `${((new Date(item.end).getTime() - new Date(item.start).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) * 100}%`,
                          }}
                        >
                          <div
                            className="h-full bg-blue-500 rounded transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* タスク一覧 */}
            <Card className="col-span-12 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-blue-100/50">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">タスク一覧</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-200">
                  <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50/50 text-sm font-medium text-slate-600">
                    <div>タスク名</div>
                    <div>ステータス</div>
                    <div>担当者</div>
                    <div>期限</div>
                  </div>
                  {projectData.tasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-50 transition-colors">
                      <div className="font-medium text-slate-800">{task.name}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${task.status === '完了' ? 'bg-green-100 text-green-800' :
                            task.status === '進行中' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-800'}`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="text-slate-600">{task.assignee}</div>
                      <div className="text-slate-600">{task.dueDate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
