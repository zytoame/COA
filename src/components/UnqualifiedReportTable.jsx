// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Eye, Download, Edit, AlertTriangle } from 'lucide-react';

export function UnqualifiedReportTable({
  reports,
  selectedReports,
  onSelectReport,
  onSelectAll,
  onEdit,
  onPreview,
  onDownload,
  getReportTypeBadge
}) {
  return <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" checked={reports.length > 0 && reports.every(report => selectedReports.includes(report.id))} onChange={e => onSelectAll(e.target.checked)} className="rounded border-gray-300" />
          </TableHead>
          <TableHead>报告编号</TableHead>
          <TableHead>报告名称</TableHead>
          <TableHead>工单号</TableHead>
          <TableHead>层析柱序列号</TableHead>
          <TableHead>检测项目</TableHead>
          <TableHead>报告类型</TableHead>
          <TableHead>检测结果</TableHead>
          <TableHead>不合格原因</TableHead>
          <TableHead>负责人</TableHead>
          <TableHead>生成时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map(report => <TableRow key={report.id} className="hover:bg-gray-50">
            <TableCell>
              <input type="checkbox" checked={selectedReports.includes(report.id)} onChange={() => onSelectReport(report.id)} className="rounded border-gray-300" />
            </TableCell>
            <TableCell className="font-medium">{report.id}</TableCell>
            <TableCell>
              <div className="max-w-48">
                <div className="truncate" title={report.reportName}>
                  {report.reportName}
                </div>
              </div>
            </TableCell>
            <TableCell>{report.workOrder}</TableCell>
            <TableCell>{report.columnSn}</TableCell>
            <TableCell>{report.检测项目}</TableCell>
            <TableCell>{getReportTypeBadge(report.reportType)}</TableCell>
            <TableCell>
              <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {report.检测结果}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="max-w-32">
                <div className="truncate text-red-600" title={report.不合格原因}>
                  {report.不合格原因}
                </div>
              </div>
            </TableCell>
            <TableCell>{report.负责人}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                {report.generateTime}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Button size="sm" variant="outline" onClick={() => onEdit(report.id)} className="h-8 w-8 p-0" title="编辑报告">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onPreview(report.id)} className="h-8 w-8 p-0" title="预览报告">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onDownload(report.id)} className="h-8 w-8 p-0" title="下载报告">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
}