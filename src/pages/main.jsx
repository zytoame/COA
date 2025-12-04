// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { FileText, Search, CheckCircle, AlertTriangle, Shield, ArrowRight, Edit, Download, Eye, Filter, RefreshCw, User, Calendar, Clock, Package, Settings, BarChart3, FileCheck, ClipboardList } from 'lucide-react';

// 当前用户信息
const currentUser = {
  name: '管理员',
  type: 'admin'
};

// 功能模块配置
const functionModules = [{
  id: 'unqualified-reports',
  title: '不合格报告管理',
  description: '管理和编辑不合格的层析柱检测报告',
  icon: AlertTriangle,
  color: 'red',
  stats: {
    total: 12,
    pending: 5,
    urgent: 2
  },
  pageId: 'unqualified-reports'
}, {
  id: 'query-reports',
  title: '查询报告',
  description: '查询和生成各类检测报告',
  icon: Search,
  color: 'blue',
  stats: {
    total: 156,
    today: 8,
    thisWeek: 23
  },
  pageId: 'query-reports'
}, {
  id: 'batch-audit',
  title: '批量审核签字',
  description: '批量审核待审核的层析柱',
  icon: CheckCircle,
  color: 'green',
  stats: {
    total: 28,
    pending: 15,
    completed: 13
  },
  pageId: 'batch-audit'
}];
export default function MainPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 页面跳转处理
  const handleNavigateToPage = (pageId, moduleName) => {
    try {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {
          from: 'main'
        }
      });
      // 移除跳转成功提示，让用户体验更流畅
    } catch (error) {
      toast({
        title: "跳转失败",
        description: `无法跳转到${moduleName}页面，请稍后重试`,
        variant: "destructive"
      });
    }
  };

  // 获取状态颜色
  const getStatusColor = color => {
    const colorMap = {
      red: 'bg-red-50 border-red-200 text-red-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  // 获取图标背景色
  const getIconBgColor = color => {
    const colorMap = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  // 计算待处理总数：不合格报告管理中的待审核数量 + 批量审核签字中的待处理数量
  const totalPending = functionModules.find(m => m.id === 'unqualified-reports')?.stats.pending + functionModules.find(m => m.id === 'batch-audit')?.stats.pending;

  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">报告管理系统</h1>
              <p className="text-sm text-gray-500">欢迎回来，{currentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              管理员
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 系统概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">总报告数</p>
                  <p className="text-3xl font-bold">196</p>
                  <p className="text-blue-100 text-sm">本月新增 45</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">已完成审核</p>
                  <p className="text-3xl font-bold">168</p>
                  <p className="text-green-100 text-sm">完成率 85.7%</p>
                </div>
                <FileCheck className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">待处理</p>
                  <p className="text-3xl font-bold">{totalPending}</p>
                  <p className="text-orange-100 text-sm">紧急处理 {functionModules.find(m => m.id === 'unqualified-reports')?.stats.urgent}</p>
                </div>
                <ClipboardList className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 功能模块 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">功能模块</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {functionModules.map(module => {
            const Icon = module.icon;
            return <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 hover:border-blue-300" onClick={() => handleNavigateToPage(module.pageId, module.title)}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${getIconBgColor(module.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{module.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* 统计信息 */}
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(module.stats).map(([key, value]) => <div key={key} className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-500">
                          {key === 'total' && '总计'}
                          {key === 'pending' && '待处理'}
                          {key === 'urgent' && '紧急'}
                          {key === 'today' && '今日'}
                          {key === 'thisWeek' && '本周'}
                          {key === 'completed' && '已完成'}
                        </p>
                      </div>)}
                  </div>
                </CardContent>
              </Card>;
          })}
          </div>
        </div>

        {/* 快速操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              快速操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => handleNavigateToPage('unqualified-reports', '不合格报告管理')}>
                <Edit className="w-6 h-6" />
                <span>编辑报告</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => handleNavigateToPage('query-reports', '查询报告')}>
                <Eye className="w-6 h-6" />
                <span>预览报告</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => handleNavigateToPage('query-reports', '查询报告')}>
                <Download className="w-6 h-6" />
                <span>下载报告</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => handleNavigateToPage('batch-audit', '批量审核签字')}>
                <CheckCircle className="w-6 h-6" />
                <span>批量审核</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">张三 完成了批量审核</p>
                  <p className="text-xs text-gray-500">审核了 5 个层析柱，通过 3 个，拒绝 2 个</p>
                </div>
                <span className="text-xs text-gray-500">10分钟前</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">李四 生成了新的检测报告</p>
                  <p className="text-xs text-gray-500">工单号：WO202501020，层析柱：COL-2025-020</p>
                </div>
                <span className="text-xs text-gray-500">25分钟前</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">王五 修改了检测数据</p>
                  <p className="text-xs text-gray-500">重新计算CV值后，报告状态更新为合格</p>
                </div>
                <span className="text-xs text-gray-500">1小时前</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}