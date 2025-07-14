import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// Sample blog posts data - in production this would come from a CMS or API
const samplePosts = [
  {
    id: 1,
    title: "The Future of Property Management: AI and Automation Trends for 2024",
    slug: "future-property-management-ai-automation-2024",
    excerpt: "Discover how artificial intelligence and automation are revolutionizing property management, from smart maintenance scheduling to predictive analytics for rental pricing.",
    content: `# The Future of Property Management: AI and Automation Trends for 2024

Property management is undergoing a digital transformation that's reshaping how landlords and property managers operate. As we move through 2024, artificial intelligence and automation are becoming essential tools for staying competitive in the rental market.

## Smart Maintenance Scheduling

AI-powered maintenance systems can predict when appliances and systems are likely to fail, allowing property managers to schedule preventive maintenance before costly breakdowns occur. This proactive approach reduces emergency repair costs by up to 40% and improves tenant satisfaction.

## Predictive Rental Pricing

Machine learning algorithms analyze market data, seasonal trends, and local economic factors to suggest optimal rental prices. This technology helps property owners maximize revenue while maintaining competitive rates that attract quality tenants.

## Automated Tenant Screening

Advanced screening systems can process applications in minutes rather than days, using AI to verify income, check credit scores, and assess rental history. This speeds up the leasing process and helps identify the most qualified tenants quickly.

## The Bottom Line

Property managers who embrace these technologies are seeing significant improvements in efficiency, profitability, and tenant satisfaction. The future belongs to those who can leverage AI and automation to create better experiences for both property owners and tenants.`,
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    image: "/api/placeholder/600/300"
  },
  {
    id: 2,
    title: "Tenant Retention Strategies That Actually Work in 2024",
    slug: "tenant-retention-strategies-2024",
    excerpt: "Learn proven strategies to keep your best tenants happy and reduce costly turnover. From communication improvements to value-added services.",
    content: `# Tenant Retention Strategies That Actually Work in 2024

Tenant turnover is one of the biggest expenses property managers face. Between marketing costs, vacancy periods, and preparation expenses, losing a tenant can cost thousands of dollars. Here are proven strategies to keep your best tenants happy.

## Proactive Communication

Regular check-ins with tenants show that you care about their experience. A simple quarterly email asking about any concerns can prevent small issues from becoming big problems that lead to move-outs.

## Quick Response Times

When tenants report maintenance issues, responding quickly shows respect for their time and comfort. Aim to acknowledge requests within 24 hours and complete non-emergency repairs within 72 hours.

## Value-Added Services

Consider offering services that improve tenant quality of life, such as:
- Package receiving services
- Regular cleaning of common areas
- Seasonal maintenance reminders
- Referral programs for local services

## Fair and Transparent Policies

Clear lease terms and consistent policy enforcement build trust. When tenants understand what's expected and see that rules apply fairly to everyone, they're more likely to stay long-term.

## Conclusion

Investing in tenant retention pays dividends through reduced vacancy rates, lower marketing costs, and more stable rental income. Happy tenants are also more likely to refer friends and family, providing a valuable source of new residents.`,
    author: "Michael Chen",
    publishedAt: "2024-01-10",
    readTime: "4 min read",
    category: "Management",
    image: "/api/placeholder/600/300"
  },
  {
    id: 3,
    title: "Understanding Rental Market Trends: What Property Owners Need to Know",
    slug: "rental-market-trends-property-owners-2024",
    excerpt: "Stay ahead of the curve with insights into current rental market trends, pricing strategies, and what tenants are looking for in today's market.",
    content: `# Understanding Rental Market Trends: What Property Owners Need to Know

The rental market is constantly evolving, influenced by economic factors, demographic shifts, and changing tenant preferences. Here's what property owners need to know about current trends.

## Remote Work Impact

The shift to remote and hybrid work has changed what tenants prioritize. Home offices, reliable internet, and quiet spaces for video calls are now essential features that can command premium rents.

## Sustainability Matters

Eco-friendly features like energy-efficient appliances, LED lighting, and smart thermostats appeal to environmentally conscious tenants and can reduce operating costs.

## Technology Integration

Tenants expect modern conveniences like:
- Smart locks and keyless entry
- Online rent payment systems
- Digital maintenance request portals
- High-speed internet infrastructure

## Flexible Lease Terms

Some markets are seeing demand for shorter-term leases or month-to-month options, especially in areas with high job mobility or seasonal populations.

## Pricing Strategies

Dynamic pricing based on market conditions, seasonality, and demand patterns can optimize rental income. Regular market analysis helps ensure competitive positioning.

## Looking Ahead

Property owners who stay informed about market trends and adapt their offerings accordingly will be best positioned for success in the evolving rental landscape.`,
    author: "Emily Rodriguez",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    category: "Market Analysis",
    image: "/api/placeholder/600/300"
  }
];

export function BlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate loading blog posts
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['All', 'Technology', 'Management', 'Market Analysis', 'Legal', 'Finance'];
  
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Management Insights
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Stay informed with the latest trends, strategies, and best practices in property management
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <h3 className="text-white text-lg font-semibold text-center px-4">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <Calendar className="w-4 h-4 ml-2" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try selecting a different category or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest property management insights, tips, and industry news delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

