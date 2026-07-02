import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { askLegalQuestion } from "@/lib/mock/services/ai";
import { CitationChip } from "@/components/CitationChip";
import { Sparkles, Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  streaming?: boolean;
}

export default function Consult() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "I am Dharma AI, your legal consultant. I can provide plain-language explanations of Indian law and point you to relevant statutes. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "I bought a defective product online",
    "Someone is sharing my private photos",
    "What happens in a hit and run case?"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check URL params for pre-loaded context (e.g. from TopicReader)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    if (topic && messages.length === 1) {
      setInput(`I have a question regarding ${topic.replace(/-/g, ' ')}...`);
    }
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Check for match wizard trigger
    if (text.toLowerCase().includes("find") && (text.toLowerCase().includes("lawyer") || text.toLowerCase().includes("expert"))) {
       setLocation("/match");
       return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSuggestions([]);
    setIsTyping(true);

    try {
      const response = await askLegalQuestion(text);
      
      // Simulate streaming by creating a placeholder and updating it
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: "ai", content: "", streaming: true }]);
      setIsTyping(false);

      const words = response.text.split(" ");
      let currentText = "";
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(r => setTimeout(r, 50)); // typing speed
        currentText += (i === 0 ? "" : " ") + words[i];
        
        setMessages(prev => prev.map(m => 
          m.id === aiMsgId ? { ...m, content: currentText } : m
        ));
      }

      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { ...m, streaming: false } : m
      ));
      
      setSuggestions(response.suggestedFollowUps);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: "ai", 
        content: "I apologize, but I encountered an error accessing the statutory database. Please try again." 
      }]);
    }
  };

  // Helper to parse citations out of text and render components
  const renderMessageContent = (content: string) => {
    // Regex matches [TAG-123] pattern
    const parts = content.split(/(\[[A-Z]+-\d+[A-Z]?\])/g);
    
    return parts.map((part, index) => {
      if (part.match(/^\[[A-Z]+-\d+[A-Z]?\]$/)) {
        return <CitationChip key={index} tag={part} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col h-[calc(100vh-64px-140px)] md:h-[calc(100vh-64px)] max-w-4xl mx-auto w-full p-4 md:p-6 bg-background">
        
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Dharma AI Consult</h1>
            <p className="font-sans text-xs text-muted-foreground">Legal knowledge grounded in active Indian statutes</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[85%] rounded-sm p-5 font-sans leading-relaxed text-[15px] ${
                msg.role === 'user' 
                  ? 'bg-secondary border border-secondary-border text-foreground rounded-tr-none' 
                  : 'bg-card border border-border text-foreground rounded-tl-none shadow-sm'
              }`}>
                <div className="whitespace-pre-wrap font-serif text-[1.1rem]">
                  {renderMessageContent(msg.content)}
                  {msg.streaming && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle"></span>}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-sm bg-secondary flex items-center justify-center text-foreground shrink-0 mt-1 border border-border">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border border-border p-4 rounded-sm rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="font-sans text-sm text-muted-foreground tracking-wide">Searching gazette records...</span>
              </div>
            </div>
          )}

          {suggestions.length > 0 && !isTyping && (
            <div className="flex gap-4 justify-start fade-up">
              <div className="w-8 shrink-0"></div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="font-sans text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="pt-4 bg-background border-t border-border mt-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="relative flex items-center"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your legal situation or ask a question..."
              className="w-full bg-card border border-border focus:border-primary rounded-sm pl-4 pr-14 py-4 font-sans text-base shadow-sm focus:shadow-md outline-none transition-all resize-none overflow-hidden h-[56px] min-h-[56px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 p-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">
              Dharma AI provides legal information, not formal legal advice. Always consult a verified practitioner.
            </span>
          </div>
        </div>

      </div>
    </Layout>
  );
}
