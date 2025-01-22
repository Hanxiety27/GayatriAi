import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { requestToGroqAI } from "./assets/utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import WelcomePage from "./WelcomePage"; // Import komponen WelcomePage
import BiodataPage from "./BiodataPage";
import "./App.css";

// Import icons
import PrintIcon from './assets/icons/print-icon.png';
import CopyIcon from './assets/icons/copy-icon.png';


function ChatMessage({ role, content }) {
  const messageRef = useRef(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false); // State untuk alert

  const exportMessageToPDF = () => {
    if (messageRef.current) {
      html2canvas(messageRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.setFontSize(18);
        pdf.setTextColor(50, 50, 50);
        pdf.text("Gayatri AI Response", 10, 10);

        pdf.addImage(imgData, 'PNG', 10, 20, pdf.internal.pageSize.getWidth() - 20, 0);
        pdf.save('chat-ai-response.pdf');
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setShowCopyAlert(true); // Tampilkan alert setelah menyalin
      setTimeout(() => setShowCopyAlert(false), 2000); // Sembunyikan setelah 2 detik
    }).catch((error) => {
      console.error('Gagal menyalin konten:', error);
    });
  };

  return (
    <div className={`flex w-full mb-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        ref={role === 'ai' ? messageRef : null}
        className={`max-w-[80%] rounded-lg p-4 
          ${role === 'user'
            ? 'bg-gray-700 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'}`}
      >
        {role === 'ai' && (
          <div className="font-bold mb-2">
            Gayatri AI
          </div>
        )}

        {role === 'ai' ? (
          <div className="text-black text-left">
            <SyntaxHighlight language="swift" style={atomOneDark} wrapLongLines={true}>
              {content}
            </SyntaxHighlight>
          </div>
        ) : (
          <div>{content}</div>
        )}

        {/* Tombol dengan ikon hanya muncul pada pesan dari AI */}
        {role === 'ai' && (
          <div className="flex gap-2 mt-2">
            <button onClick={exportMessageToPDF} className="hover:opacity-75">
              <img src={PrintIcon} alt="Cetak PDF" className="w-5 h-5 white-icon" />
            </button>

            <button onClick={copyToClipboard} className="hover:opacity-75">
              <img src={CopyIcon} alt="Salin" className="w-5 h-5 white-icon" />
            </button>
          </div>
        )}

        {/* Alert kecil di tengah layar */}
        {showCopyAlert && (
          <div className="copy-alert">
            Konten berhasil disalin!
          </div>
        )}
      </div>
    </div>
  );
}

// Import ikon kirim
import SendIcon from './assets/icons/send-icon.png';

function MainApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async () => {
    if (contentRef.current && contentRef.current.value.trim()) {
      const userMessage = contentRef.current.value;

      setChatHistory(prev => [...prev, {
        role: 'user',
        content: userMessage
      }]);

      contentRef.current.value = '';
      setIsLoading(true);

      try {
        const aiResponse = await requestToGroqAI(userMessage);

        setChatHistory(prev => [...prev, {
          role: 'ai',
          content: aiResponse
        }]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setChatHistory(prev => [...prev, {
          role: 'ai',
          content: 'Sorry, there was an error processing your request.'
        }]);
      } finally {
        setIsLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 shadow-sm p-4">
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          <div className="judul">
            <h1 className="text-4xl font-bold">
              <span className="gaya">Gayatri </span>
              <span className="ai">AI.</span>
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 max-w-5xl mx-auto w-full"
      >
        {chatHistory.length === 0 ? (
          <div className="centered-message">
            <h3 className="text-4xl">
              <span className="hr">Hallo Rek, </span>
            </h3>
            <h3 className="text-3xl">
              <span className="bantu">Ada yang bisa saya bantu?</span>
            </h3>
          </div>
        ) : (
          chatHistory.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0">
        <div className="max-w-5xl mx-auto p-4">
          <form className="flex gap-2 w-full">
            <input
              placeholder="masukan perintah di sini..."
              className="flex-1 py-2 px-4 text-md rounded-xl border focus:outline-none focus:ring-2 focus:ring-slate-600"
              type="text"
              ref={contentRef}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-gradient-to-r from-purple-700 to-pink-500 font-bold py-2 px-4 text-white rounded-xl hover:bg-slate-700 disabled:opacity-50"
              disabled={isLoading}
            >
              <img src={SendIcon} alt="Kirim" className="w-5 h-5 white-icon" />
            </button>
          </form>
        <footer className="text-center text-white mt-8 text-sm opacity-75">
          &copy; 2024 Putra Mandala Team
        </footer>
        </div>
      </div>
    </main>
  );
}

// Root App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chat" element={<MainApp />} />
        <Route path="/biodata" element={<BiodataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;