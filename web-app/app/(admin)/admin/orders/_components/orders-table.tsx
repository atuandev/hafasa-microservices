'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageOrdersResponse, OrderStatus, Order } from '@/types/order'
import { formatDateTime, formatVND } from '@/utils/format'
import { OrderDetailDialog } from './order-detail-dialog'

interface OrdersTableProps {
  orders: PageOrdersResponse['data']
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Debug - log the orders prop when component renders
  useEffect(() => {
    console.log('Orders table received data:', orders)
    console.log('Orders items array:', orders?.items)
  }, [orders])

  // Check if orders is defined and has the expected structure
  const hasOrders = orders && Array.isArray(orders.items) && orders.items.length > 0

  // Function to get appropriate badge class based on order status
  const getStatusBadgeClass = (status: OrderStatus) => {
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

  // Function to handle clicking the eye button
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border p-4'>
        {!orders && <div className="p-4 text-amber-500">Loading orders data...</div>}
        {orders && !Array.isArray(orders.items) && (
          <div className="p-4 text-red-500">
            Error: Expected orders.items to be an array but got {typeof orders.items}
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>ID</TableHead>
              <TableHead>Người nhận</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead className='text-center'>Trạng thái</TableHead>
              <TableHead className='text-right'>Tổng tiền</TableHead>
              <TableHead className='w-[80px] text-center'>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasOrders ? (
              orders.items.map(order => (
                <TableRow key={order.id}>
                  <TableCell className='font-medium'>#{order.id.substring(0, 8)}</TableCell>
                  <TableCell>{order.receiverName}</TableCell>
                  <TableCell>{order.receiverPhone}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell className='text-center'>
                    <Badge className={getStatusBadgeClass(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>{formatVND(order.total)}</TableCell>
                  <TableCell className='text-center'>
                    <Button 
                      variant='ghost' 
                      size='icon'
                      onClick={() => handleViewOrderDetails(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center'>
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {orders && (
          <PaginationWithLinks
            page={orders.pageNo}
            pageSize={orders.pageSize}
            totalCount={orders.totalElements}
            pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50] }}
          />
        )}
      </div>

      {/* Order Detail Dialog */}
      <OrderDetailDialog 
        order={selectedOrder} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}