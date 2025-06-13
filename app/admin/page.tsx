import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Mail, FileText, TrendingUp, Users, AlertTriangle, Eye } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-teal-600 hover:bg-teal-700">Add Product</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Enquiries</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£24,580</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">#ORD-1234</p>
                  <p className="text-sm text-gray-600">ABC Retail Ltd</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£450.00</p>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">#ORD-1235</p>
                  <p className="text-sm text-gray-600">Green Grocers</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£280.00</p>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">#ORD-1236</p>
                  <p className="text-sm text-gray-600">Fashion Boutique</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£720.00</p>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Recent Enquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>Customer enquiries and quote requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                <div>
                  <p className="font-medium">Custom bag quote</p>
                  <p className="text-sm text-gray-600">john@retailstore.com</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <div>
                  <p className="font-medium">Bulk pricing inquiry</p>
                  <p className="text-sm text-gray-600">sarah@foodchain.co.uk</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Distributor application</p>
                  <p className="text-sm text-gray-600">info@packaging.com</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <Badge variant="outline">Low</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Enquiries
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest published content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">The Future of Eco Packaging</p>
                  <p className="text-xs text-gray-500">Published 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">UK Manufacturing Benefits</p>
                  <p className="text-xs text-gray-500">Published 1 week ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Sustainable Branding Tips</p>
                  <p className="text-xs text-gray-500">Published 2 weeks ago</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Blog
            </Button>
          </CardContent>
        </Card>

        {/* Website Traffic */}
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>This month's overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Page Views</span>
                <span className="font-medium">12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Unique Visitors</span>
                <span className="font-medium">3,280</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bounce Rate</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Session</span>
                <span className="font-medium">3m 24s</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Eye className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Low Stock Alert</p>
                  <p className="text-xs text-gray-600">5 products below minimum stock</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Plugin Update</p>
                  <p className="text-xs text-gray-600">WooCommerce update available</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Backup Complete</p>
                  <p className="text-xs text-gray-600">Daily backup successful</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>New Blog Post</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Mail className="h-6 w-6" />
              <span>Send Newsletter</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
