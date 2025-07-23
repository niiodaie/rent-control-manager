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
      title: t('blog.posts.gettingStarted.title', currentLang) || 'Getting Started with Rent Control Manager',
      excerpt: t('blog.posts.gettingStarted.excerpt', currentLang) || 'Learn how to set up your property management account and add your first property in just 5 minutes.',
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
        <p>Use the dashboard to track rent payments, manage maintenance requests, and communicate with tenants all in one place.</p>
      `
    },
    {
      id: 2,
      title: t('blog.posts.tenantPortal.title') || 'How to Use the Tenant Portal',
      excerpt: t('blog.posts.tenantPortal.excerpt') || 'A complete guide for tenants on how to submit maintenance requests, view lease information, and communicate with landlords.',
      category: 'Tenant Guide',
      readTime: '7 min read',
      author: 'Support Team',
      date: '2024-01-10',
      featured: true,
      content: `
        <h2>Your Tenant Portal Guide</h2>
        <p>The tenant portal is designed to make your rental experience smooth and transparent. Here's everything you need to know.</p>
        
        <h3>Dashboard Overview</h3>
        <p>Your dashboard shows key information including your current rent, lease status, and any pending maintenance requests.</p>
        
        <h3>Submitting Maintenance Requests</h3>
        <p>Click "New Request" to submit maintenance issues. Be specific about the problem and include the location within your unit for faster resolution.</p>
        
        <h3>Viewing Lease Information</h3>
        <p>Access your lease details, including start and end dates, rent amount, and security deposit information in the Lease Info tab.</p>
        
        <h3>Payment History</h3>
        <p>Track your rent payment history and upcoming due dates in the Payments section.</p>
      `
    },
    {
      id: 3,
      title: t('blog.posts.maintenanceManagement.title') || 'Efficient Maintenance Request Management',
      excerpt: t('blog.posts.maintenanceManagement.excerpt') || 'Best practices for handling maintenance requests and keeping your properties in top condition.',
      category: 'Property Management',
      readTime: '6 min read',
      author: 'Property Experts',
      date: '2024-01-05',
      featured: false,
      content: `
        <h2>Streamlining Maintenance Operations</h2>
        <p>Effective maintenance management is crucial for tenant satisfaction and property value preservation.</p>
        
        <h3>Setting Up Response Times</h3>
        <p>Establish clear response times for different types of maintenance requests. Emergency issues should be addressed within 24 hours.</p>
        
        <h3>Prioritizing Requests</h3>
        <p>Use the priority system to categorize requests: Urgent (safety issues), High (major inconveniences), Medium (standard repairs), and Low (cosmetic issues).</p>
        
        <h3>Communication is Key</h3>
        <p>Keep tenants informed about the status of their requests. Use the admin notes feature to provide updates and expected completion times.</p>
      `
    },
    {
      id: 4,
      title: t('blog.posts.pricingGuide.title', currentLang) || 'Understanding Our Pricing Plans',
      excerpt: t('blog.posts.pricingGuide.excerpt', currentLang) || 'Choose the right plan for your property portfolio with our comprehensive pricing guide.',
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
      title: t('blog.posts.securityBestPractices.title', currentLang) || 'Security Best Practices for Property Managers',
      excerpt: t('blog.posts.securityBestPractices.excerpt', currentLang) || 'Protect your data and your tenants\' information with these essential security practices.',
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
      title: t('blog.posts.mobileApp.title', currentLang) || 'Managing Properties on the Go',
      excerpt: t('blog.posts.mobileApp.excerpt', currentLang) || 'Learn how to effectively manage your properties using our mobile-optimized platform.',
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
                {t('blog.title', currentLang) || 'Help Center & Guides'}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle', currentLang) || 'Everything you need to know about managing properties and using Rent Control Manager effectively.'}
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
                placeholder={t('blog.searchPlaceholder', currentLang) || 'Search articles...'}
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
                {t(`blog.categories.${category.toLowerCase().replace(' ', '')}`, currentLang) || category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {t('blog.featured', currentLang) || 'Featured Articles'}
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
                        {t('blog.readMore') || 'Read More'}
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
              (t('blog.allArticles') || 'All Articles') : 
              `${selectedCategory} Articles`
            }
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {t('blog.noResults') || 'No articles found'}
              </h3>
              <p className="text-muted-foreground">
                {t('blog.noResultsDesc') || 'Try adjusting your search terms or category filter.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg hover:text-primary cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="sm">
                        {t('blog.readMore') || 'Read More'}
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
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('blog.quickLinks') || 'Quick Links'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Home className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">
                  {t('blog.quickLinks.addProperty') || 'Add Property'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('blog.quickLinks.addPropertyDesc') || 'Learn how to add your first property'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/dashboard">
                    {t('blog.quickLinks.getStarted') || 'Get Started'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">
                  {t('blog.quickLinks.inviteTenants') || 'Invite Tenants'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('blog.quickLinks.inviteTenantsDesc') || 'Connect with your tenants'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/dashboard">
                    {t('blog.quickLinks.learnHow') || 'Learn How'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">
                  {t('blog.quickLinks.pricing') || 'Pricing Plans'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('blog.quickLinks.pricingDesc') || 'Choose the right plan for you'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/#pricing">
                    {t('blog.quickLinks.viewPlans') || 'View Plans'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Settings className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">
                  {t('blog.quickLinks.support') || 'Get Support'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('blog.quickLinks.supportDesc') || 'Contact our support team'}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">
                    {t('blog.quickLinks.contactUs') || 'Contact Us'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

