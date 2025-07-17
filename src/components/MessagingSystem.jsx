import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Image, 
  FileText, 
  Clock,
  CheckCheck,
  User,
  Building2,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const MessagingSystem = ({ propertyId, unitId = null }) => {
  const { user, apiCall } = useAuth();
  
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (propertyId) {
      fetchConversations();
    }
  }, [propertyId, unitId]);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
      // Mark messages as read
      markMessagesAsRead(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const endpoint = unitId 
        ? `/api/messages/conversations?propertyId=${propertyId}&unitId=${unitId}&userId=${user.id}`
        : `/api/messages/conversations?propertyId=${propertyId}&userId=${user.id}`;
      
      const response = await apiCall(endpoint);
      if (response.success) {
        setConversations(response.data);
        if (response.data.length > 0 && !activeConversation) {
          setActiveConversation(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await apiCall(`/api/messages/conversation/${conversationId}?userId=${user.id}`);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const markMessagesAsRead = async (conversationId) => {
    try {
      await apiCall(`/api/messages/conversation/${conversationId}/read`, {
        method: 'POST',
        body: JSON.stringify({ userId: user.id })
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;

    try {
      setSending(true);
      
      const response = await apiCall('/api/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          conversationId: activeConversation.id,
          senderId: user.id,
          content: newMessage.trim(),
          type: 'text'
        })
      });

      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        setNewMessage('');
        
        // Update conversation list with latest message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, last_message: response.data, updated_at: response.data.created_at }
              : conv
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !activeConversation) return;

    try {
      setSending(true);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversationId', activeConversation.id);
      formData.append('senderId', user.id);
      formData.append('type', 'file');

      const response = await apiCall('/api/messages/upload', {
        method: 'POST',
        body: formData
      });

      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        
        // Update conversation list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation.id 
              ? { ...conv, last_message: response.data, updated_at: response.data.created_at }
              : conv
          )
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setSending(false);
      event.target.value = '';
    }
  };

  const startNewConversation = async (recipientId, recipientType) => {
    try {
      const response = await apiCall('/api/messages/conversation/create', {
        method: 'POST',
        body: JSON.stringify({
          propertyId,
          unitId,
          participants: [user.id, recipientId],
          createdBy: user.id
        })
      });

      if (response.success) {
        setConversations(prev => [response.data, ...prev]);
        setActiveConversation(response.data);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      conv.participants?.some(p => 
        p.full_name?.toLowerCase().includes(searchLower) ||
        p.email?.toLowerCase().includes(searchLower)
      ) ||
      conv.last_message?.content?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Messages</h3>
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No conversations yet</p>
              <p className="text-sm">Start messaging with your tenants or property manager</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participants?.find(p => p.id !== user.id);
              const unreadCount = conversation.unread_count || 0;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeConversation?.id === conversation.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherParticipant?.avatar_url} />
                      <AvatarFallback>
                        {otherParticipant?.full_name?.charAt(0) || otherParticipant?.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">
                          {otherParticipant?.full_name || otherParticipant?.email || 'Unknown User'}
                        </p>
                        <div className="flex items-center gap-1">
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {conversation.last_message && formatTime(conversation.last_message.created_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.last_message?.content || 'No messages yet'}
                      </p>
                      {conversation.unit && (
                        <p className="text-xs text-muted-foreground">
                          Unit {conversation.unit.unit_number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConversation.participants?.find(p => p.id !== user.id)?.avatar_url} />
                    <AvatarFallback>
                      {activeConversation.participants?.find(p => p.id !== user.id)?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {activeConversation.participants?.find(p => p.id !== user.id)?.full_name || 'Unknown User'}
                    </p>
                    {activeConversation.unit && (
                      <p className="text-sm text-muted-foreground">
                        Unit {activeConversation.unit.unit_number}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isOwn = message.sender_id === user.id;
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-lg p-3 ${
                          isOwn 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {message.type === 'file' ? (
                          <div className="flex items-center gap-2">
                            {getFileIcon(message.file_name)}
                            <a 
                              href={message.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                            >
                              {message.file_name}
                            </a>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        isOwn ? 'justify-end' : 'justify-start'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(message.created_at)}</span>
                        {isOwn && message.read_at && (
                          <CheckCheck className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
              <form onSubmit={sendMessage} className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[40px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={sending}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={!newMessage.trim() || sending}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingSystem;

