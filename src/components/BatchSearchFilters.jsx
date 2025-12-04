// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Filter, Search, Loader2 } from 'lucide-react';

export function BatchSearchFilters({
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
            <label className="block text-sm font-medium text-gray-700 mb-1">检测类型</label>
            <Select value={searchParams.testType} onValueChange={value => setSearchParams({
            ...searchParams,
            testType: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="选择检测类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="纯度检测">纯度检测</SelectItem>
                <SelectItem value="pH值检测">pH值检测</SelectItem>
                <SelectItem value="杂质含量">杂质含量</SelectItem>
                <SelectItem value="溶解度测试">溶解度测试</SelectItem>
                <SelectItem value="稳定性测试">稳定性测试</SelectItem>
                <SelectItem value="回收率测试">回收率测试</SelectItem>
                <SelectItem value="响应时间测试">响应时间测试</SelectItem>
                <SelectItem value="线性范围测试">线性范围测试</SelectItem>
                <SelectItem value="检测限测试">检测限测试</SelectItem>
                <SelectItem value="特异性测试">特异性测试</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
            <Select value={searchParams.priority} onValueChange={value => setSearchParams({
            ...searchParams,
            priority: value
          })}>
              <SelectTrigger>
                <SelectValue placeholder="选择优先级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部优先级</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="low">低优先级</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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