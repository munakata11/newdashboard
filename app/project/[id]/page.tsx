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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              {projectData.name}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                {projectData.status}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle>プロジェクト情報</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">開始日</dt>
                    <dd>{projectData.startDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">終了日</dt>
                    <dd>{projectData.endDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-slate-600">進捗</dt>
                    <dd>{projectData.progress}%</dd>
                  </div>
                  <div className="pt-2">
                    <Progress value={projectData.progress} className="h-2" />
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Gantt Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                <CardTitle className="text-xl font-semibold text-black">プロジェクトチャート</CardTitle>
                <BarChart3 className="w-5 h-5 text-black/70" />
              </CardHeader>
              <CardContent>
                {/* Timeline Header */}
                <div className="mb-1 pt-4">
                  <div className="flex items-center">
                    <div className="w-[240px] pl-2">
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue placeholder="年度を選択" />
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
                    <div className="flex-1 flex relative">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="flex-1 text-center text-sm text-muted-foreground">
                          {`${i + 1}月`}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="w-[240px]"></div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-border"></div>
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
                          className="absolute top-0 bottom-0 w-px bg-border/90"
                          style={{ left: `${(i / 12) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {/* Tasks */}
                  {projectData.ganttData.map((item, index) => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-[240px] pr-4 py-2">
                        <div className="font-medium">{item.task}</div>
                      </div>
                      <div className="flex-1 relative">
                        <div
                          className="absolute h-6 rounded bg-blue-200"
                          style={{
                            left: `${(new Date(item.start).getMonth() / 12) * 100}%`,
                            width: `${((new Date(item.end).getTime() - new Date(item.start).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) * 100}%`,
                          }}
                        >
                          <div
                            className="h-full bg-blue-500 rounded"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <Card>
              <CardHeader>
                <CardTitle>タスク一覧</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">タスク名</th>
                        <th className="text-left p-2">ステータス</th>
                        <th className="text-left p-2">担当者</th>
                        <th className="text-left p-2">期限</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.tasks.map((task) => (
                        <tr key={task.id} className="border-b">
                          <td className="p-2">{task.name}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              task.status === '完了' ? 'bg-green-100 text-green-800' :
                              task.status === '進行中' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-2">{task.assignee}</td>
                          <td className="p-2">{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
