import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

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

### Key Benefits:
- **Reduced Costs**: Preventive maintenance is significantly cheaper than emergency repairs
- **Improved Tenant Satisfaction**: Fewer unexpected disruptions to tenant comfort
- **Extended Equipment Life**: Regular maintenance extends the lifespan of appliances and systems
- **Better Planning**: Predictable maintenance schedules allow for better budget planning

## Predictive Rental Pricing

Machine learning algorithms analyze market data, seasonal trends, and local economic factors to suggest optimal rental prices. This technology helps property owners maximize revenue while maintaining competitive rates that attract quality tenants.

### How It Works:
1. **Data Collection**: Algorithms gather data from multiple sources including comparable properties, market trends, and economic indicators
2. **Analysis**: Machine learning models identify patterns and correlations in the data
3. **Recommendations**: The system suggests optimal pricing based on current market conditions
4. **Continuous Learning**: The algorithm improves over time as it processes more data

## Automated Tenant Screening

Advanced screening systems can process applications in minutes rather than days, using AI to verify income, check credit scores, and assess rental history. This speeds up the leasing process and helps identify the most qualified tenants quickly.

### Screening Components:
- **Income Verification**: Automated verification of employment and income sources
- **Credit Analysis**: Real-time credit score checking and analysis
- **Rental History**: Verification of previous rental experiences and references
- **Background Checks**: Comprehensive background screening including criminal history

## Smart Building Integration

The Internet of Things (IoT) is enabling smart building features that improve both operational efficiency and tenant experience:

- **Smart Thermostats**: Optimize energy usage and allow remote temperature control
- **Keyless Entry**: Secure, convenient access control with digital keys
- **Water Leak Detection**: Early warning systems prevent costly water damage
- **Energy Monitoring**: Track and optimize energy consumption across properties

## The Bottom Line

Property managers who embrace these technologies are seeing significant improvements in efficiency, profitability, and tenant satisfaction. The future belongs to those who can leverage AI and automation to create better experiences for both property owners and tenants.

### Getting Started:
1. **Assess Your Current Systems**: Identify areas where automation could provide the most benefit
2. **Start Small**: Begin with one or two technologies and expand gradually
3. **Train Your Team**: Ensure staff are comfortable with new technologies
4. **Monitor Results**: Track the impact of new technologies on your operations
5. **Stay Informed**: Keep up with emerging trends and technologies in the industry

The property management industry is evolving rapidly, and those who adapt to these technological changes will be best positioned for long-term success.`,
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

export function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading blog post
    setTimeout(() => {
      const foundPost = samplePosts.find(p => p.slug === slug);
      setPost(foundPost);
      
      if (foundPost) {
        // Get related posts from the same category
        const related = samplePosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 2);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    }, 1000);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image Placeholder */}
            <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
                  p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>
                  ),
                  pre: ({children}) => (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 relative">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <h3 className="text-white text-sm font-semibold text-center px-4">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="secondary">{relatedPost.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Property Management Insights</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest tips, trends, and strategies delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

