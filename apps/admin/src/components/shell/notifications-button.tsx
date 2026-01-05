"use client"

import * as React from "react"
import { Bell, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  description?: string
  type: "activity" | "system" | "mention" | "task"
  read: boolean
  createdAt: Date
  link?: string
}

/**
 * Notifications Button with badge count
 * Opens notifications center drawer
 */
export function NotificationsButton() {
  const [open, setOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = React.useState(0)

  // TODO: Get notifications from store/data layer when ready
  React.useEffect(() => {
    // Mock notifications for now
    const mockNotifications: Notification[] = []
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                Activity notifications and system alerts
              </SheetDescription>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="h-8 text-xs"
              >
                <CheckCheck className="mr-2 h-3 w-3" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="flex-1 -mx-6 px-6">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs text-muted-foreground mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent",
                    !notification.read && "bg-accent/50"
                  )}
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    {notification.description && (
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {notification.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <Check className="h-3 w-3" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

