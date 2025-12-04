// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { FileText, Plus, Download } from 'lucide-react';

export function ReportStats({
  qualifiedReports,
  todayGenerated,
  downloadedCount
}) {
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">最近报告数</p>
              <p className="text-2xl font-bold">{qualifiedReports.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日生成</p>
              <p className="text-2xl font-bold text-green-600">{todayGenerated}</p>
            </div>
            <Plus className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">已下载</p>
              <p className="text-2xl font-bold text-blue-600">{downloadedCount}</p>
            </div>
            <Download className="w-8 h-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>;
}