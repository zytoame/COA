// @ts-ignore;
import React, { useRef, useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { X, PenTool, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const SignaturePad = ({
  showSignaturePad,
  setShowSignaturePad,
  signing,
  setSigning,
  auditComment,
  setAuditComment,
  auditAction,
  setAuditAction,
  onConfirmAudit,
  selectedColumns
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 签名板功能
  const startDrawing = e => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const draw = e => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 检查画布是否为空
  const isCanvasEmpty = canvas => {
    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] !== 0) return false;
    }
    return true;
  };

  // 确认审核
  const handleConfirmAudit = async () => {
    const canvas = canvasRef.current;
    if (isCanvasEmpty(canvas)) {
      return {
        success: false,
        message: "请在签名板上签名确认"
      };
    }
    setSigning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSignaturePad(false);
      clearSignature();
      setAuditComment('');
      onConfirmAudit();
      return {
        success: true,
        message: `已${auditAction === 'approve' ? '通过' : '拒绝'} ${selectedColumns.length} 个层析柱的审核`
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    } finally {
      setSigning(false);
    }
  };
  if (!showSignaturePad) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">批量审核签名确认</h2>
            <Button variant="outline" size="sm" onClick={() => setShowSignaturePad(false)} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 审核信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">审核信息</h3>
            <div className="text-sm text-blue-800">
              <p>待审核项目数量：{selectedColumns.length} 个</p>
              <p>审核操作：{auditAction === 'approve' ? '通过' : '拒绝'}</p>
            </div>
          </div>

          {/* 审核操作选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">审核操作</label>
            <Select value={auditAction} onValueChange={setAuditAction}>
              <SelectTrigger>
                <SelectValue placeholder="选择审核操作" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    通过审核
                  </div>
                </SelectItem>
                <SelectItem value="reject">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    拒绝审核
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 审核意见 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">审核意见（可选）</label>
            <textarea value={auditComment} onChange={e => setAuditComment(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入审核意见..." />
          </div>

          {/* 签名板 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PenTool className="w-4 h-4 inline mr-1" />
              电子签名
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <canvas ref={canvasRef} width={600} height={200} className="border border-gray-300 rounded cursor-crosshair bg-white w-full" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
              <div className="mt-2 flex justify-between">
                <span className="text-sm text-gray-500">请在上方区域签名</span>
                <Button variant="outline" size="sm" onClick={clearSignature}>
                  清除签名
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSignaturePad(false)} disabled={signing}>
              取消
            </Button>
            <Button onClick={handleConfirmAudit} disabled={signing} className={auditAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
              {signing ? <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </> : auditAction === 'approve' ? <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  确认通过
                </> : <>
                  <XCircle className="w-4 h-4 mr-2" />
                  确认拒绝
                </>}
            </Button>
          </div>
        </div>
      </div>
    </div>;
};