"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Reply, Archive } from "lucide-react"

// Sample enquiry data
const enquiries = [
  {
    id: "ENQ-001",
    name: "John Smith",
    email: "john@retailstore.com",
    company: "Retail Store Ltd",
    subject: "Custom bag quote request",
    message:
      "Hi, I'm interested in getting a quote for custom printed paper bags for our retail store. We need approximately 5,000 bags with our logo printed on them. Could you please provide pricing and lead times?",
    date: "2025-06-11",
    priority: "High",
    status: "Unread",
    type: "Quote Request",
  },
  {
    id: "ENQ-002",
    name: "Sarah Wilson",
    email: "sarah@foodchain.co.uk",
    company: "Food Chain UK",
    subject: "Bulk pricing inquiry",
    message:
      "We're a food chain looking for bulk pricing on kraft paper bags for our takeaway service. We need different sizes and would like to discuss volume discounts.",
    date: "2025-06-10",
    priority: "Medium",
    status: "Replied",
    type: "Pricing",
  },
  {
    id: "ENQ-003",
    name: "Mike Johnson",
    email: "info@packaging.com",
    company: "Packaging Solutions",
    subject: "Distributor application",
    message:
      "We're interested in becoming a distributor for your eco-friendly paper bags in the North West region. Please send us information about your distributor program.",
    date: "2025-06-09",
    priority: "Low",
    status: "In Progress",
    type: "Partnership",
  },
  {
    id: "ENQ-004",
    name: "Emma Davis",
    email: "emma@boutique.com",
    company: "Fashion Boutique",
    subject: "Luxury bag samples",
    message:
      "Could you please send us samples of your luxury paper bags? We're particularly interested in bags with ribbon handles and custom printing options.",
    date: "2025-06-08",
    priority: "Medium",
    status: "Unread",
    type: "Sample Request",
  },
]

export default function EnquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnquiry, setSelectedEnquiry] = useState<(typeof enquiries)[0] | null>(null)
  const [replyMessage, setReplyMessage] = useState("")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Unread":
        return <Badge className="bg-red-100 text-red-800">Unread</Badge>
      case "Replied":
        return <Badge className="bg-green-100 text-green-800">Replied</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Archive All Read
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">Urgent responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-30min vs last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Enquiries Management */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Enquiries</CardTitle>
          <CardDescription>Manage and respond to customer enquiries and quote requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Enquiries Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id} className={enquiry.status === "Unread" ? "bg-red-50" : ""}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{enquiry.name}</p>
                        <p className="text-sm text-gray-500">{enquiry.email}</p>
                        <p className="text-xs text-gray-400">{enquiry.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{enquiry.subject}</p>
                        <p className="text-sm text-gray-500 truncate">{enquiry.message}</p>
                      </div>
                    </TableCell>
                    <TableCell>{enquiry.type}</TableCell>
                    <TableCell>{new Date(enquiry.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getPriorityBadge(enquiry.priority)}</TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedEnquiry(enquiry)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enquiry Details Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              {selectedEnquiry && `From ${selectedEnquiry.name} - ${selectedEnquiry.company}`}
            </DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Contact</label>
                  <p className="text-sm">{selectedEnquiry.name}</p>
                  <p className="text-sm text-gray-500">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <p className="text-sm">{selectedEnquiry.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="text-sm">{selectedEnquiry.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedEnquiry.priority)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <p className="text-sm mt-1">{selectedEnquiry.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{selectedEnquiry.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Reply</label>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
              Close
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
