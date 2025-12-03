// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button } from '@/components/ui';
// @ts-ignore;
import { Activity, ChevronDown, ChevronUp, Thermometer, Gauge, Timer, Package } from 'lucide-react';

export const DetectionDataCard = ({
  detectionData,
  finalConclusion
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const getConclusionBadge = conclusion => {
    return conclusion === 'pass' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">合格</Badge> : <Badge variant="destructive">不合格</Badge>;
  };
  const getFinalConclusionBadge = conclusion => {
    return conclusion === 'qualified' ? <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">最终合格</Badge> : <Badge variant="destructive">最终不合格</Badge>;
  };
  return <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            检测数据详情
          </CardTitle>
          <div className="flex items-center gap-2">
            {getFinalConclusionBadge(finalConclusion)}
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && <CardContent>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">图标</TableHead>
                  <TableHead>检测项目</TableHead>
                  <TableHead>标准值</TableHead>
                  <TableHead>检测结果</TableHead>
                  <TableHead>结论</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(detectionData).map(([key, data]) => {
              const Icon = data.icon;
              return <TableRow key={key}>
                      <TableCell>
                        <Icon className="w-5 h-5 text-gray-600" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {key === 'moduleTemperature' && '模块温度'}
                        {key === 'systemPressure' && '系统压力'}
                        {key === 'hbA1cAppearanceTime' && 'HbA1c出峰时间'}
                        {key === 'repeatabilityTest' && '重复性测试'}
                        {key === 'appearanceInspection' && '外观检查'}
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{data.standard}</span>
                      </TableCell>
                      <TableCell>
                        <span className={data.conclusion === 'pass' ? 'text-green-600' : 'text-red-600'}>
                          {data.result}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getConclusionBadge(data.conclusion)}
                      </TableCell>
                    </TableRow>;
            })}
              </TableBody>
            </Table>
          </div>
        </CardContent>}
    </Card>;
};