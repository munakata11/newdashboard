'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Home,
  FolderKanban,
  CalendarIcon,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Mail,
  Shield,
  Palette,
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

// 設定用のモックデータ
const settingsData = {
  notifications: {
    email: true,
    desktop: true,
    projectUpdates: true,
    taskAssignments: true,
  },
  appearance: {
    theme: "light",
    language: "ja",
    timezone: "Asia/Tokyo",
  },
  security: {
    twoFactor: false,
    sessionTimeout: "30",
  }
};

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [settings, setSettings] = useState(settingsData);

  const handleNotificationChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
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
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-semibold text-slate-800">設定</h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* 通知設定 */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">通知設定</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">メール通知</Label>
                      <p className="text-sm text-slate-500">プロジェクトの更新をメールで受け取る</p>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">デスクトップ通知</Label>
                      <p className="text-sm text-slate-500">ブラウザの通知を使用する</p>
                    </div>
                    <Switch
                      checked={settings.notifications.desktop}
                      onCheckedChange={() => handleNotificationChange('desktop')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 表示設定 */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">表示設定</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>テーマ</Label>
                    <Select defaultValue={settings.appearance.theme}>
                      <SelectTrigger>
                        <SelectValue placeholder="テーマを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">ライト</SelectItem>
                        <SelectItem value="dark">ダーク</SelectItem>
                        <SelectItem value="system">システム設定に従う</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>言語</Label>
                    <Select defaultValue={settings.appearance.language}>
                      <SelectTrigger>
                        <SelectValue placeholder="言語を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>タイムゾーン</Label>
                    <Select defaultValue={settings.appearance.timezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="タイムゾーンを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* セキュリティ設定 */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-slate-800">セキュリティ設定</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">二要素認証</Label>
                      <p className="text-sm text-slate-500">アカウントのセキュリティを強化する</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactor}
                      onCheckedChange={() => {
                        setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, twoFactor: !prev.security.twoFactor }
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>セッションタイムアウト</Label>
                    <Select defaultValue={settings.security.sessionTimeout}>
                      <SelectTrigger>
                        <SelectValue placeholder="タイムアウト時間を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15分</SelectItem>
                        <SelectItem value="30">30分</SelectItem>
                        <SelectItem value="60">1時間</SelectItem>
                        <SelectItem value="120">2時間</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
