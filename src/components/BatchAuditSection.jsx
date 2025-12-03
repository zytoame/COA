// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, CheckCircle, Eye, Download, ExternalLink, AlertTriangle, Clock, User, Calendar, ChevronDown, ChevronUp, Thermometer, Gauge, Timer, Activity, Package } from 'lucide-react';

// 引入子组件
import { DetectionDataCard } from '@/components/DetectionDataCard';
import { DetailModal } from '@/components/DetailModal';
export const BatchAuditSection = ({
  auditSearchParams,
  setAuditSearchParams,
  filteredPendingColumns,
  pendingColumns,
  selectedColumns,
  setSelectedColumns,
  expandedColumns,
  setExpandedColumns,
  showDetailModal,
  setShowDetailModal,
  selectedColumn,
  setSelectedColumn,
  onGoToBatchAudit,
  onBatchAudit,
  onAuditSearch,
  onAuditReset,
  onSelectAll,
  onSelectColumn,
  onToggleExpanded,
  onViewDetail,
  onCloseDetailModal
}) => {
  const {
    toast
  } = useToast();

  // 获取优先级标签
  const getPriorityBadge = priority => {
    const priorityConfig = {
      high: {
        label: '高',
        color: 'destructive'
      },
      medium: {
        label: '中',
        color: 'secondary'
      },
      low: {
        label: '低',
        color: 'outline'
      }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };

  // 获取状态标签
  const getStatusBadge = status => {
    const statusConfig = {
      qualified: {
        label: '合格',
        color: 'default'
      },
      unqualified: {
        label: '不合格',
        color: 'destructive'
      }
    };
    const config = statusConfig[status] || statusConfig.unqualified;
    return <Badge variant={config.color}>{config.label}</Badge>;
  };
  return <div>
      {/* 跳转到独立页面的按钮 */}
      <div className="mb-4 flex justify-end">
        <Button variant="outline" onClick={onGoToBatchAudit} className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          跳转到独立批量审核页面
        </Button>
      </div>

      {/* 搜索区域 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            查询条件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
              <Input placeholder="请输入工单号" value={auditSearchParams.workOrder} onChange={e => setAuditSearchParams({
              ...auditSearchParams,
              workOrder: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">层析柱序列号</label>
              <Input placeholder="请输入层析柱序列号" value={auditSearchParams.columnSerial} onChange={e => setAuditSearchParams({
              ...auditSearchParams,
              columnSerial: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">订单号</label>
              <Input placeholder="请输入订单号" value={auditSearchParams.orderNumber} onChange={e => setAuditSearchParams({
              ...auditSearchParams,
              orderNumber: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">仪器序列号</label>
              <Input placeholder="请输入仪器序列号" value={auditSearchParams.instrumentSerial} onChange={e => setAuditSearchParams({
              ...auditSearchParams,
              instrumentSerial: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">检测类型</label>
              <Select value={auditSearchParams.testType} onValueChange={value => setAuditSearchParams({
              ...auditSearchParams,
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
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
              <Select value={auditSearchParams.priority} onValueChange={value => setAuditSearchParams({
              ...auditSearchParams,
              priority: value
            })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部优先级</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onAuditSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              查询
            </Button>
            <Button variant="outline" onClick={onAuditReset}>
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 操作区域 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button onClick={onBatchAudit} disabled={selectedColumns.length === 0} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            批量审核 ({selectedColumns.length})
          </Button>
          <Button variant="outline" onClick={() => setSelectedColumns([])} disabled={selectedColumns.length === 0}>
            清除选择
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          共 {filteredPendingColumns.length} 条待审核记录
        </div>
      </div>

      {/* 待审核列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" checked={selectedColumns.length === filteredPendingColumns.length && filteredPendingColumns.length > 0} onChange={e => onSelectAll(e.target.checked)} className="rounded border-gray-300" />
                </TableHead>
                <TableHead>层析柱序列号</TableHead>
                <TableHead>层析柱名称</TableHead>
                <TableHead>工单号</TableHead>
                <TableHead>检测类型</TableHead>
                <TableHead>检测日期</TableHead>
                <TableHead>操作员</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>检测结果</TableHead>
                <TableHead>提交时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPendingColumns.map(column => <React.Fragment key={column.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" checked={selectedColumns.includes(column.id)} onChange={() => onSelectColumn(column.id)} className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell className="font-medium">{column.columnSerial}</TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <div className="truncate" title={column.columnName}>
                          {column.columnName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{column.workOrder}</TableCell>
                    <TableCell>{column.testType}</TableCell>
                    <TableCell>{column.testDate}</TableCell>
                    <TableCell>{column.operator}</TableCell>
                    <TableCell>{getPriorityBadge(column.priority)}</TableCell>
                    <TableCell>{getStatusBadge(column.finalConclusion)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {column.submitTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => onToggleExpanded(column.id)} className="h-8 w-8 p-0">
                          {expandedColumns.has(column.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onViewDetail(column.id)} className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toast({
                      title: "下载COA报告",
                      description: `正在下载 ${column.columnSerial} 的COA报告`
                    })} className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedColumns.has(column.id) && <TableRow>
                      <TableCell colSpan={11} className="p-0">
                        <div className="p-4 bg-gray-50">
                          <DetectionDataCard detectionData={column.detectionData} finalConclusion={column.finalConclusion} />
                        </div>
                      </TableCell>
                    </TableRow>}
                </React.Fragment>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 详情弹窗 */}
      <DetailModal column={selectedColumn} isOpen={showDetailModal} onClose={onCloseDetailModal} />
    </div>;
};