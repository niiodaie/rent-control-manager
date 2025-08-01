import React, { useState, useContext } from 'react'
import { LanguageContext } from '../components/SimpleLanguageSelector'
import { t } from '../i18n/simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  ArrowRight,
  Home,
  Users,
  DollarSign,
  Settings,
  Shield,
  Smartphone,
  Globe,
  TrendingUp
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function BlogPage() {
  const { currentLang } = useContext(LanguageContext)
  const [searchTerm, setSearchTerm] = useState('')

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Rent Control Manager',
      excerpt: 'Learn how to set up your property management account and add your first property in just 5 minutes.',
      category: 'Getting Started',
      readTime: '5 min read',
      author: 'Rent Control Team',
      date: '2024-01-15',
      featured: true,
      content: `
        <h2>Welcome to Rent Control Manager</h2>
        <p>Managing rental properties has never been easier. Our comprehensive platform helps landlords and property managers streamline their operations while providing tenants with a seamless experience.</p>
        
        <h3>Step 1: Create Your Account</h3>
        <p>Sign up for your free account and choose whether you're a landlord or tenant. Landlords get access to property management tools, while tenants can track their lease information and submit maintenance requests.</p>
        
        <h3>Step 2: Add Your Properties</h3>
        <p>For landlords, adding properties is simple. Click "Add Property" from your dashboard and fill in the details including address, rent amount, and property features.</p>
        
        <h3>Step 3: Invite Your Tenants</h3>
        <p>Once your properties are added, you can invite tenants via email. They'll receive an invitation to join the platform and access their tenant portal.</p>
        
        <h3>Step 4: Start Managing</h3>
        <p>With properties and tenants set up, you can begin collecting rent, tracking maintenance requests, and monitoring your portfolio performance.</p>
      `
    },
    {
      id: 2,
      title: 'Tenant Guide: Making the Most of Your Portal',
      excerpt: 'Discover all the features available in your tenant portal and how to use them effectively.',
      category: 'Tenant Guide',
      readTime: '6 min read',
      author: 'Tenant Success Team',
      date: '2024-01-10',
      featured: true,
      content: `
        <h2>Your Tenant Portal Overview</h2>
        <p>The tenant portal is your central hub for all rental-related activities. Here's how to make the most of it.</p>
        
        <h3>Viewing Your Lease Information</h3>
        <p>Access your lease details, including rent amount, due dates, and lease terms. You can also download a copy of your signed lease agreement.</p>
        
        <h3>Submitting Maintenance Requests</h3>
        <p>Report maintenance issues directly through the portal. Include photos and detailed descriptions to help property managers address issues quickly.</p>
        
        <h3>Payment History</h3>
        <p>View your complete payment history and download receipts for your records. Set up automatic payments to never miss a due date.</p>
        
        <h3>Communication</h3>
        <p>Stay in touch with your property manager through the built-in messaging system. All communications are logged for reference.</p>
      `
    },
    {
      id: 3,
      title: 'Effective Property Maintenance Management',
      excerpt: 'Learn best practices for handling maintenance requests and keeping your properties in top condition.',
      category: 'Property Management',
      readTime: '7 min read',
      author: 'Property Management Team',
      date: '2024-01-05',
      featured: false,
      content: `
        <h2>Streamlining Maintenance Operations</h2>
        <p>Effective maintenance management is crucial for tenant satisfaction and property value preservation.</p>
        
        <h3>Setting Up Maintenance Categories</h3>
        <p>Organize maintenance requests by category (plumbing, electrical, HVAC, etc.) to streamline assignment to appropriate vendors.</p>
        
        <h3>Vendor Management</h3>
        <p>Maintain a database of trusted vendors with their contact information, specialties, and service rates.</p>
        
        <h3>Priority Levels</h3>
        <p>Establish clear priority levels for different types of maintenance issues. Emergency repairs should be addressed within 24 hours.</p>
        
        <h3>Communication is Key</h3>
        <p>Keep tenants informed about the status of their requests. Use the admin notes feature to provide updates and expected completion times.</p>
      `
    },
    {
      id: 4,
      title: 'Understanding Our Pricing Plans',
      excerpt: 'Choose the right plan for your property portfolio with our comprehensive pricing guide.',
      category: 'Pricing',
      readTime: '4 min read',
      author: 'Billing Team',
      date: '2024-01-01',
      featured: false,
      content: `
        <h2>Choosing the Right Plan</h2>
        <p>Our flexible pricing structure grows with your business needs.</p>
        
        <h3>Free Tier - Perfect for Getting Started</h3>
        <p>Manage up to 1 unit with basic features. Great for individual landlords testing the platform.</p>
        
        <h3>Starter Tier - $49.99/month</h3>
        <p>Up to 5 units with full tenant portal access and maintenance tracking. Ideal for small property managers.</p>
        
        <h3>Professional Tier - $129.99/month</h3>
        <p>Up to 15 units with advanced reporting and rent automation. Perfect for growing property management companies.</p>
        
        <h3>Enterprise Tier - Custom Pricing</h3>
        <p>Unlimited units with API integrations and dedicated support for large-scale operations.</p>
      `
    },
    {
      id: 5,
      title: 'Security Best Practices for Property Managers',
      excerpt: 'Protect your data and your tenants\' information with these essential security practices.',
      category: 'Security',
      readTime: '8 min read',
      author: 'Security Team',
      date: '2023-12-28',
      featured: false,
      content: `
        <h2>Keeping Your Data Safe</h2>
        <p>Security is paramount when managing sensitive tenant and property information.</p>
        
        <h3>Strong Password Policies</h3>
        <p>Use unique, complex passwords for all accounts. Enable two-factor authentication when available.</p>
        
        <h3>Regular Data Backups</h3>
        <p>Our platform automatically backs up your data, but consider keeping local copies of important documents.</p>
        
        <h3>Tenant Privacy</h3>
        <p>Only share tenant information on a need-to-know basis and ensure all communications are secure.</p>
      `
    },
    {
      id: 6,
      title: 'Managing Properties on the Go',
      excerpt: 'Learn how to effectively manage your properties using our mobile-optimized platform.',
      category: 'Mobile',
      readTime: '5 min read',
      author: 'Mobile Team',
      date: '2023-12-20',
      featured: false,
      content: `
        <h2>Property Management Anywhere</h2>
        <p>Our mobile-optimized platform lets you manage properties from anywhere.</p>
        
        <h3>Responsive Design</h3>
        <p>Access all features from your smartphone or tablet with our fully responsive design.</p>
        
        <h3>Quick Actions</h3>
        <p>Approve maintenance requests, communicate with tenants, and view property status on the go.</p>
        
        <h3>Offline Capabilities</h3>
        <p>View cached data even when you're offline, with automatic sync when you reconnect.</p>
      `
    }
  ]

  const categories = ['All', 'Getting Started', 'Tenant Guide', 'Property Management', 'Pricing', 'Security', 'Mobile']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-foreground">
                Help Center & Guides
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about managing properties and using Rent Control Manager effectively.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-primary cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'All' ? 
              'All Articles' : 
              `${selectedCategory} Articles`
            }
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg hover:text-primary cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Property Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to add and configure your properties
                </p>
                <Button variant="outline" size="sm">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Tenant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Invite tenants and manage their accounts
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Payment Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure rent collection and payment methods
                </p>
                <Button variant="outline" size="sm">
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Customize your account and notification preferences
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@rent-control.net">Email Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

