import { useEffect, useRef, useState } from 'react'
import { ChatBubble } from './components/ChatBubble'
import { useFakeStream } from './hooks/useFakeStream'
import { Send, RefreshCw, LayoutGrid, Settings } from 'lucide-react'

// 模拟的一些对话数据
const MOCK_MESSAGES = [
  { id: '1', role: 'user' as const, content: '你好，你能帮我分析一下最新的短视频检索效率吗？' },
];

const BOT_REPLY = `当然可以！基于最近的 **DFvision v4.0** 核心算法，检索效率有了质的飞跃：

### 🚀 效率提升报告
*   **多维检索**：现在支持通过 \`表情\`、\`场景\` 和 \`台词\` 进行毫秒级联合搜索。
*   **对比数据**：
    1.  手动检索：平均每条视频需要 **5 分钟**。
    2.  AI 检索：平均每条视频仅需 **1.2 秒**。
*   **总结**：效率提升了近 **250倍**！

建议立即启动「黄金案例」自动化标注流程以进一步优化结果。`;

function App() {
  const { displayedText, isStreaming, startStream } = useFakeStream();
  const [messages] = useState(MOCK_MESSAGES);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      startStream(BOT_REPLY, 20); // 稍微加快点速度
    }, 800);
    return () => clearTimeout(timer);
  }, [startStream]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedText, messages]);

  const handleReplay = () => {
    startStream(BOT_REPLY, 20);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fbff] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Premium Header */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
             <LayoutGrid className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Video Agent Hub</h1>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Operational</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReplay}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:shadow-md active:scale-95"
          >
            <RefreshCw size={16} className={isStreaming ? "animate-spin" : ""} />
            Replay
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto pt-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* History */}
          {messages.map(msg => (
             <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {/* Assistant Reply */}
          {(isStreaming || (displayedText && displayedText.length > 0)) && (
             <ChatBubble 
               role="assistant" 
               content={displayedText} 
               isStreaming={isStreaming} 
             />
          )}
          
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* Modern Float Input */}
      <footer className="fixed bottom-8 left-0 right-0 flex justify-center z-10 px-4 pointer-events-none">
        <div className="max-w-3xl w-full flex items-center bg-white/90 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 pointer-events-auto ring-1 ring-slate-200/50">
          <input 
             type="text" 
             placeholder="Discuss the retrieval details..." 
             className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium text-base px-2"
             disabled
          />
          <button className="flex items-center gap-2 py-2 px-5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-bold text-sm active:scale-95">
            Send
            <Send size={16} />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
