import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Mail, Database, Zap, Users, Globe, Download, Upload } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic website configuration and company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" defaultValue="TrentEco - UK-Made, Eco-Smart Bags" />
              </div>
              <div>
                <Label htmlFor="site-tagline">Tagline</Label>
                <Input id="site-tagline" defaultValue="Sustainable packaging solutions" />
              </div>
            </div>
            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                defaultValue="UK-based eco paper bag manufacturing company committed to sustainable packaging solutions."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" defaultValue="admin@trenteco.co.uk" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="europe-london">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                    <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    <SelectItem value="america-new-york">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Database className="mr-2 h-4 w-4" />
              Backup Database
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Import Products
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Zap className="mr-2 h-4 w-4" />
              Clear Cache
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>Configure email notifications and SMTP settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" defaultValue="mail.trenteco.co.uk" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
              <div>
                <Label htmlFor="smtp-encryption">Encryption</Label>
                <Select defaultValue="tls">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="order-notifications">Order Notifications</Label>
                <Switch id="order-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enquiry-notifications">Enquiry Notifications</Label>
                <Switch id="enquiry-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
                <Switch id="low-stock-alerts" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage security and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="login-attempts">Limit Login Attempts</Label>
                <Switch id="login-attempts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="force-ssl">Force SSL</Label>
                <Switch id="force-ssl" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hide-wp-version">Hide WordPress Version</Label>
                <Switch id="hide-wp-version" defaultChecked />
              </div>
            </div>
            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div>
              <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
              <Textarea id="allowed-ips" placeholder="Enter IP addresses, one per line" rows={3} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Roles & Permissions
            </CardTitle>
            <CardDescription>Manage user access levels and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Administrator</p>
                  <p className="text-sm text-gray-500">Full access to all features</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Full Access</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Product Manager</p>
                  <p className="text-sm text-gray-500">Products and orders only</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Limited</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Content Editor</p>
                  <p className="text-sm text-gray-500">Blog and pages only</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Content</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Customer Support</p>
                  <p className="text-sm text-gray-500">Enquiries and chat only</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Support</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Permissions
            </Button>
          </CardContent>
        </Card>

        {/* Plugin Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Plugin Management
            </CardTitle>
            <CardDescription>Manage WordPress plugins and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">WooCommerce</p>
                  <p className="text-sm text-gray-500">E-commerce functionality</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Yoast SEO</p>
                  <p className="text-sm text-gray-500">Search engine optimization</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">WPForms</p>
                  <p className="text-sm text-gray-500">Contact form builder</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Update Available</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Wordfence Security</p>
                  <p className="text-sm text-gray-500">Website security</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Update All Plugins
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance & SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Performance & SEO
          </CardTitle>
          <CardDescription>Optimize website performance and search engine visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Performance Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-caching">Enable Caching</Label>
                  <Switch id="enable-caching" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="minify-css">Minify CSS</Label>
                  <Switch id="minify-css" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="minify-js">Minify JavaScript</Label>
                  <Switch id="minify-js" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="optimize-images">Optimize Images</Label>
                  <Switch id="optimize-images" defaultChecked />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">SEO Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="xml-sitemap">XML Sitemap</Label>
                  <Switch id="xml-sitemap" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="breadcrumbs">Breadcrumbs</Label>
                  <Switch id="breadcrumbs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="social-meta">Social Media Meta Tags</Label>
                  <Switch id="social-meta" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="schema-markup">Schema Markup</Label>
                  <Switch id="schema-markup" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
