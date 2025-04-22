'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBookById } from '@/actions/books/books'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Order, OrderStatus } from '@/types/order'
import { formatDateTime, formatVND } from '@/utils/format'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Book } from '@/types/book'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { changeStatus } from '@/actions/orders/order'
import { toast } from 'sonner'

interface OrderDetailDialogProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailDialog({ order, isOpen, onClose }: OrderDetailDialogProps) {
  const [orderBooks, setOrderBooks] = useState<Map<string, Book>>(new Map())
  const [isLoadingBooks, setIsLoadingBooks] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Fetch book details when the order changes
  useEffect(() => {
    async function fetchBookDetails() {
      if (!order || !order.orderDetails || order.orderDetails.length === 0) return
      
      setIsLoadingBooks(true)
      const bookMap = new Map<string, Book>()
      
      // Using Promise.all to fetch all books in parallel
      await Promise.all(
        order.orderDetails.map(async (detail) => {
          try {
            const response = await getBookById(detail.bookId)
            if (response.code === 1000 && response.data) {
              bookMap.set(detail.bookId, response.data)
            }
          } catch (error) {
            console.error(`Failed to fetch book ${detail.bookId}:`, error)
          }
        })
      )
      
      setOrderBooks(bookMap)
      setIsLoadingBooks(false)
    }

    if (isOpen && order) {
      fetchBookDetails()
    }
  }, [order, isOpen])

  // Get status badge class based on order status
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-amber-500 text-white hover:bg-amber-600'
      case OrderStatus.CONFIRMED:
        return 'bg-blue-500 text-white hover:bg-blue-600'
      case OrderStatus.DELIVERED:
        return 'bg-emerald-500 text-white hover:bg-emerald-600'
      case OrderStatus.CANCELLED:
        return 'bg-red-500 text-white hover:bg-red-600'
      case OrderStatus.SHIPPING:
        return 'bg-purple-500 text-white hover:bg-purple-600'
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600'
    }
  }

  // Handle order status change
  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return
    
    setIsProcessing(true)
    try {
      const response = await changeStatus(order.id, newStatus)
      if (response.code === 1000) {
        toast.success(`Cập nhật trạng thái đơn hàng thành công: ${newStatus}`)
        // Update the local order state to reflect the change
        order.orderStatus = newStatus
        order.orderStatus = newStatus // For backward compatibility
      } else {
        toast.error(`Không thể cập nhật trạng thái: ${response.message}`)
      }
    } catch (error) {
      toast.error(`Lỗi khi cập nhật trạng thái đơn hàng: ${error}`)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Chi tiết đơn hàng #{order.id.substring(0, 8)}</span>
            <Badge className={getStatusBadgeClass(order.orderStatus || order.orderStatus)}>
              {order.orderStatus || order.orderStatus}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-1">
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Người nhận</Label>
                  <p className="mt-1">{order.receiverName}</p>
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <p className="mt-1">{order.receiverPhone}</p>
                </div>
                <div className="col-span-2">
                  <Label>Địa chỉ</Label>
                  <p className="mt-1">{order.address}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Order Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Thông tin đơn hàng</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Mã đơn hàng</Label>
                  <p className="mt-1 font-mono">{order.id}</p>
                </div>
                <div>
                  <Label>Ngày đặt</Label>
                  <p className="mt-1">{formatDateTime(order.createdAt)}</p>
                </div>
                <div>
                  <Label>Phương thức thanh toán</Label>
                  <p className="mt-1">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Order Items - Simplified */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sản phẩm</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-center">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingBooks ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Đang tải thông tin sản phẩm...
                      </TableCell>
                    </TableRow>
                  ) : (
                    order.orderDetails.map((detail, index) => {
                      const book = orderBooks.get(detail.bookId)
                      return (
                        <TableRow key={detail.bookId}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {book ? book.title : `Sách (ID: ${detail.bookId.substring(0, 8)})`}
                          </TableCell>
                          <TableCell className="text-center">{detail.quantity}</TableCell>
                          <TableCell className="text-right">{formatVND(detail.price)}</TableCell>
                          <TableCell className="text-right">{formatVND(detail.price * detail.quantity)}</TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
              
              <div className="flex justify-end pt-4">
                <div className="w-1/2 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Tạm tính:</span>
                    <span>{formatVND(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phí vận chuyển:</span>
                    <span>{formatVND(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">{formatVND(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <div className="flex gap-2 w-full">
            {order.orderStatus === OrderStatus.PENDING && (
              <>
                <Button 
                  variant="default"
                  className="flex-1"
                  disabled={isProcessing}
                  onClick={() => handleStatusChange(OrderStatus.CONFIRMED)}
                >
                  Xác nhận đơn hàng
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1"
                  disabled={isProcessing}
                  onClick={() => handleStatusChange(OrderStatus.CANCELLED)}
                >
                  Hủy đơn hàng
                </Button>
              </>
            )}
            
            {order.orderStatus === OrderStatus.CONFIRMED && (
              <Button 
                variant="default"
                className="flex-1"
                disabled={isProcessing}
                onClick={() => handleStatusChange(OrderStatus.SHIPPING)}
              >
                Chuyển sang vận chuyển
              </Button>
            )}
            
            {order.orderStatus === OrderStatus.SHIPPING && (
              <Button 
                variant="default"
                className="flex-1"
                disabled={isProcessing}
                onClick={() => handleStatusChange(OrderStatus.DELIVERED)}
              >
                Xác nhận đã giao hàng
              </Button>
            )}
            
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}