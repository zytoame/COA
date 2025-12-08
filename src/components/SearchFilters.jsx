// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Filter, Search, Loader2, Calendar } from 'lucide-react';

export function SearchFilters({
  searchParams,
  setSearchParams,
  onSearch,
  onReset,
  loading
}) {
  return <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          查询条件
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
            <Input placeholder="请输入工单号" value={searchParams.workOrder} onChange={e => setSearchParams({
            ...searchParams,
            workOrder: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
            <Input placeholder="请输入层析柱序列号" value={searchParams.columnSn} onChange={e => setSearchParams({
            ...searchParams,
            columnSn: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
            <Input placeholder="请输入订单号" value={searchParams.orderNumber} onChange={e => setSearchParams({
            ...searchParams,
            orderNumber: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
            <Input placeholder="请输入仪器序列号" value={searchParams.instrumentSerial} onChange={e => setSearchParams({
            ...searchParams,
            instrumentSerial: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">报告类型</label>
            <Select value={searchParams.reportType} onValueChange={value => setSearchParams({
            ...searchParams,
            reportType: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="选择报告类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="glycation">糖化模式报告</SelectItem>
                <SelectItem value="thalassemia">地贫模式报告</SelectItem>
                <SelectItem value="purity">纯度分析报告</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
            <Select value={searchParams.dateRange} onValueChange={value => setSearchParams({
            ...searchParams,
            dateRange: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部时间</SelectItem>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="custom">自定义时间段</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 自定义时间段选择 */}
        {searchParams.dateRange === 'custom' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                开始日期
              </label>
              <Input type="date" value={searchParams.startDate || ''} onChange={e => setSearchParams({
            ...searchParams,
            startDate: e.target.value
          })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                结束日期
              </label>
              <Input type="date" value={searchParams.endDate || ''} onChange={e => setSearchParams({
            ...searchParams,
            endDate: e.target.value
          })} />
            </div>
          </div>}
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onSearch} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            查询
          </Button>
          <Button variant="outline" onClick={onReset}>
            重置
          </Button>
        </div>
      </CardContent>
    </Card>;
}