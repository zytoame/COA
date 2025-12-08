// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Eye, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function UnqualifiedReportTable({
  reports,
  expandedRows,
  onToggleExpand,
  onPreview
}) {
  return <Table>
      <TableHeader>
        <TableRow>
          <TableHead>层析柱序列号</TableHead>
          <TableHead>工单号</TableHead>
          <TableHead>层析柱名称</TableHead>
          <TableHead>检测模式</TableHead>
          <TableHead>负责人</TableHead>
          <TableHead>提交时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map(report => <React.Fragment key={report.id}>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="font-medium">{report.columnSn}</TableCell>
              <TableCell>{report.workOrder}</TableCell>
              <TableCell>
                <div className="max-w-32">
                  <div className="truncate" title={report.columnName}>
                    {report.columnName}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={report.testType === '糖化模式' ? 'default' : 'secondary'}>
                  {report.testType}
                </Badge>
              </TableCell>
              <TableCell>{report.operator}</TableCell>
              <TableCell>{report.submitTime}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" onClick={() => onToggleExpand(report.id)} className="h-8 w-8 p-0" title="展开详情">
                    {expandedRows.includes(report.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onPreview(report.id)} className="h-8 w-8 p-0" title="预览详情">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            
            {/* 展开的检测数据行 - 删除检测项目显示 */}
            {expandedRows.includes(report.id) && <TableRow>
              <TableCell colSpan={7} className="bg-gray-50 p-4">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">不合格原因</h4>
                    <div className="space-y-2">
                      {report.unqualifiedReasons.map((reason, index) => <div key={index} className="flex items-center gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-gray-700">{reason}</span>
                        </div>)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">操作历史</h4>
                    <div className="space-y-2">
                      {report.operationHistory.map((history, index) => <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">{history.time}</span>
                            <span className="text-gray-900">{history.operator}</span>
                            <span className="text-gray-700">{history.action}</span>
                          </div>
                          <span className="text-gray-500">{history.remark}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>}
          </React.Fragment>)}
      </TableBody>
    </Table>;
}