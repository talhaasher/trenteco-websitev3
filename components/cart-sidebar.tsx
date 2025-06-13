"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "./cart-provider"
import Image from "next/image"

export default function CartSidebar() {
  const { state, dispatch } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  // Cart preview for popover (desktop hover)
  const CartPreview = () => (
    <div className="w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Shopping Cart</h3>
        <span className="text-sm text-gray-500">{state.itemCount} items</span>
      </div>

      {state.items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {state.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × £{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xs w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            {state.items.length > 3 && (
              <p className="text-xs text-gray-500 text-center">+{state.items.length - 3} more items</p>
            )}
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Total:</span>
              <span className="font-bold">£{state.total.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 text-sm"
                onClick={() => {
                  setIsPopoverOpen(false)
                  setIsOpen(true)
                }}
              >
                View Cart
              </Button>
              <Button variant="outline" className="w-full text-sm" onClick={() => setIsPopoverOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop: Popover on hover */}
      <div className="hidden md:block">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative border-teal-600 text-teal-600 hover:bg-teal-50"
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {state.itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-4"
            align="end"
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <CartPreview />
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile: Direct sheet trigger */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="relative border-teal-600 text-teal-600 hover:bg-teal-50"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCart className="h-4 w-4" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Full Cart Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              {state.itemCount === 0 ? "Your cart is empty" : `${state.itemCount} items in your cart`}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <ShoppingCart className="h-16 w-16 mb-4" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add some eco-friendly bags to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.sku}</p>
                      <p className="font-medium">£{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-lg font-bold">£{state.total.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
