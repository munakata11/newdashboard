"use client"

import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  CheckCircle2,
  Clock,
  MessageSquare,
  CalendarIcon,
  Home,
  FolderKanban,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { useState } from "react"
import { ja } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState("2024")

  // 現在の年から前後2年分の年度を生成
  const currentYear = new Date().getFullYear()
  const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2]

  const onlineMembers = [
    { name: "田中", status: "online" },
    { name: "鈴木", status: "online" },
    { name: "佐藤", status: "idle" },
    { name: "山田", status: "online" },
    { name: "中村", status: "offline" },
  ]

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
        {/* Header */}
        <div className="p-6 bg-blue-50/40">
          <div className="container mx-auto max-w-[1900px] transition-all duration-300">
            <div className="h-[350px] relative rounded-lg overflow-hidden bg-[#1E2537]">
              <img
                src="/image/back.png"
                alt="Project Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="container mx-auto max-w-[1900px] transition-all duration-300">
            <div className="flex gap-8">
              {/* Left Column */}
              <div className="flex-1 space-y-10">
                {/* Gantt Chart */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                    <CardTitle className="text-xl font-semibold text-black">ガントチャート</CardTitle>
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
                              {years.map((year) => (
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
                      {[
                        { 
                          name: "○○地区水道施設整備事業", 
                          startMonth: 0, 
                          duration: 3, 
                          color: "bg-blue-500", 
                          year: "2024",
                          progress: 75
                        },
                        {
                          name: "飲食店向け予約管理アプリ開発",
                          startMonth: 2,
                          duration: 4,
                          color: "bg-indigo-500",
                          year: "2024",
                          progress: 45
                        },
                        {
                          name: "ECサイトリニューアル",
                          startMonth: 4,
                          duration: 3,
                          color: "bg-violet-500",
                          year: "2024",
                          progress: 30
                        },
                      ].filter(task => task.year === selectedYear)
                      .map((task) => (
                        <div key={task.name} className="space-y-2 relative z-10">
                          <div className="flex items-center py-1.5">
                            <span className="w-[240px] font-medium text-sm whitespace-nowrap">{task.name}</span>
                            <div className="flex-1 relative">
                              <div
                                className={`absolute h-4 rounded ${task.color}`}
                                style={{
                                  left: `${(task.startMonth / 12) * 100}%`,
                                  width: `${(task.duration / 12) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Task Stats and ToDo */}
                <div className="grid grid-cols-3 gap-6">
                  {/* ToDo + Task */}
                  <div className="col-span-2">
                    <Card className="h-[440px] shadow-sm border-gray-300">
                      <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                        <CardTitle className="text-xl font-semibold text-black">Today's Task</CardTitle>
                        <Clock className="w-5 h-5 text-black/70" />
                      </CardHeader>
                      <CardContent className="pt-6 h-[360px] overflow-auto">
                        <div className="space-y-4">
                          {[
                            { task: "ミーティング準備", priority: "高", color: "bg-red-100 text-red-800 border-red-200" },
                            {
                              task: "レポート作成",
                              priority: "中",
                              color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                            },
                            {
                              task: "デザインレビュー",
                              priority: "低",
                              color: "bg-green-100 text-green-800 border-green-200",
                            },
                          ].map((item) => (
                            <div
                              key={item.task}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox className="rounded-full" />
                                <span className="font-medium">{item.task}</span>
                              </div>
                              <Badge className={`${item.color} border`}>{item.priority}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Calendar */}
                  <div className="col-span-1">
                    <Card className="h-[440px] shadow-sm border-gray-300">
                      <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                        <CardTitle className="text-xl font-semibold text-black">カレンダー</CardTitle>
                        <CalendarIcon className="w-5 h-5 text-black/70" />
                      </CardHeader>
                      <CardContent className="flex items-start justify-center pt-2 px-1 h-[360px]">
                        <Calendar
                          className="rounded-md scale-[0.98]"
                          locale={ja}
                          classNames={{
                            head_row: "flex",
                            head_cell: "flex-1 text-center text-muted-foreground font-medium",
                            row: "flex w-full mt-1",
                            cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-[38px] w-[38px]",
                            day: "h-[38px] w-[38px] p-0 font-normal aria-selected:opacity-100",
                            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                            table: "w-full border-collapse space-y-1",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Project Cards */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                    <CardTitle className="text-xl font-semibold text-black">プロジェクト一覧</CardTitle>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-full px-4 py-2">
                      ＋ 新規プロジェクト
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        {
                          title: "○○地区水道施設整備事業",
                          description:
                            "○○地区における人口増加と社会経済発展に対応するため、新たな水道施設の整備および既存施設の改修を行う。",
                          progress: 75,
                        },
                        {
                          title: "飲食店向け予約管理アプリ開発",
                          description:
                            "小規模の飲食店向けに、予約管理、顧客管理、売上管理を一括で行えるアプリケーションを開発。",
                          progress: 45,
                        },
                        {
                          title: "ECサイトリニューアル",
                          description:
                            "アクセス数の増加に伴い、サイトの表示速度低下とモバイル対応の不備が課題となっているECサイトのリニューアル。",
                          progress: 30,
                        },
                      ].map((project, i) => (
                        <Card key={i} className="hover:shadow-lg transition-all duration-200 group bg-blue-50/80 shadow-sm border-gray-300">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold line-clamp-1">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">進捗</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress 
                                value={project.progress} 
                                className="h-1 [&>div]:bg-blue-700 bg-blue-100" 
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className={`space-y-10 transition-all duration-300 ${
                isSidebarOpen ? "w-[520px]" : "w-[580px]"
              }`}>
                {/* Task Statistics */}
                <Card className="shadow-sm border-gray-300">
                  <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                    <CardTitle className="text-xl font-semibold text-black">2024年プロジェクト情報</CardTitle>
                    <CheckCircle2 className="w-5 h-5 text-black/70" />
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-blue-900 whitespace-nowrap">進行中プロジェクト</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">8</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-green-900">完了プロジェクト</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">15</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-orange-900">今年度の目標</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">25</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Chat */}
                <Card className="shadow-sm border-gray-300">
                  <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-blue-100 rounded-t-lg border-b">
                    <CardTitle className="text-xl font-semibold text-black">チームチャット</CardTitle>
                    <MessageSquare className="w-5 h-5 text-black/70" />
                  </CardHeader>
                  <CardContent>
                    {/* Online Team Members */}
                    <div className="py-3 border-b">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">オンラインメンバー</h3>
                      <div className="flex flex-wrap gap-2">
                        {onlineMembers.map((member) => (
                          <div key={member.name} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                                {member.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{member.name}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' :
                              member.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-300'
                            }`} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Chat Messages */}
                    <ScrollArea className="h-[400px] pr-4 mt-4">
                      <div className="space-y-4">
                        {[
                          { name: "田中", time: "10:00", message: "今日の進捗報告をお願いします", isNew: true },
                          { name: "鈴木", time: "10:05", message: "デザインの修正が完了しました" },
                          { name: "佐藤", time: "10:10", message: "承知しました", isNew: true },
                        ].map((chat, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                {chat.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{chat.name}</span>
                                <span className="text-xs text-muted-foreground">{chat.time}</span>
                                {chat.isNew && (
                                  <Badge variant="secondary" className="text-xs">
                                    新任
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{chat.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

