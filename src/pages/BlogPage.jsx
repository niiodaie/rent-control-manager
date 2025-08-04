import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight, BookOpen, HelpCircle, FileText, Video, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'property-management', name: 'Property Management', count: 6 },
    { id: 'tenant-relations', name: 'Tenant Relations', count: 5 },
    { id: 'financial-management', name: 'Financial Management', count: 3 },
    { id: 'legal-compliance', name: 'Legal & Compliance', count: 2 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Complete Guide to Setting Up Your First Property',
      excerpt: 'Learn how to add your first property to Rent Control and configure all the essential settings for successful property management.',
      category: 'getting-started',
      readTime: '8 min read',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      featured: true,
      type: 'guide'
    },
    {
      id: 2,
      title: 'How to Invite and Manage Tenants Effectively',
      excerpt: 'Step-by-step instructions on inviting tenants, setting up their profiles, and managing tenant relationships through the platform.',
      category: 'tenant-relations',
      readTime: '6 min read',
      author: 'Michael Chen',
      date: '2024-01-12',
      featured: true,
      type: 'tutorial'
    },
    {
      id: 3,
      title: 'Understanding Global Payment Processing',
      excerpt: 'Everything you need to know about accepting rent payments in multiple currencies and managing international transactions.',
      category: 'financial-management',
      readTime: '10 min read',
      author: 'Emma Rodriguez',
      date: '2024-01-10',
      featured: true,
      type: 'guide'
    }
  ];

  const allArticles = [
    ...featuredArticles,
    {
      id: 4,
      title: 'Setting Up Automated Rent Collection',
      excerpt: 'Configure automatic rent collection to streamline your cash flow and reduce late payments.',
      category: 'financial-management',
      readTime: '5 min read',
      author: 'David Park',
      date: '2024-01-08',
      type: 'tutorial'
    },
    {
      id: 5,
      title: 'Managing Maintenance Requests Efficiently',
      excerpt: 'Best practices for handling tenant maintenance requests and coordinating with service providers.',
      category: 'property-management',
      readTime: '7 min read',
      author: 'Lisa Thompson',
      date: '2024-01-05',
      type: 'guide'
    },
    {
      id: 6,
      title: 'Legal Compliance for Multi-Country Operations',
      excerpt: 'Navigate the legal requirements when managing properties across different countries and jurisdictions.',
      category: 'legal-compliance',
      readTime: '12 min read',
      author: 'Robert Kim',
      date: '2024-01-03',
      type: 'guide'
    },
    {
      id: 7,
      title: 'Optimizing Your Property Listings',
      excerpt: 'Tips and tricks to make your property listings more attractive to potential tenants.',
      category: 'property-management',
      readTime: '4 min read',
      author: 'Anna Wilson',
      date: '2024-01-01',
      type: 'tips'
    },
    {
      id: 8,
      title: 'Using Analytics to Improve Performance',
      excerpt: 'Leverage the built-in analytics dashboard to make data-driven decisions about your properties.',
      category: 'property-management',
      readTime: '9 min read',
      author: 'James Miller',
      date: '2023-12-28',
      type: 'tutorial'
    }
  ];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <Video className="h-4 w-4" />;
      case 'tips': return <HelpCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'tutorial': return 'bg-green-100 text-green-800';
      case 'tips': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Center & Guides
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Everything you need to know about managing properties with Rent Control. 
              From getting started to advanced features.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/contact" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                  <Link to="/signup" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Get Started
                  </Link>
                  <a href="#" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resources
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Articles */}
            {selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArticles.map(article => (
                    <div key={article.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(article.type)}`}>
                            {getTypeIcon(article.type)}
                            {article.type}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'All Articles' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredArticles.length} articles found
                </span>
              </div>

              <div className="space-y-6">
                {filteredArticles.map(article => (
                  <div key={article.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(article.type)}`}>
                            {getTypeIcon(article.type)}
                            {article.type}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-xl mb-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="md:ml-6">
                        <Button variant="outline">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most out of Rent Control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

