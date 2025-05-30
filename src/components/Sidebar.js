import React from 'react';
import { MODELS } from '../config';
import '../styles/Sidebar.css';
import { DEFAULT_PERSONA_ID } from '../config/defaultPersona';
import UserButton from './auth/UserButton';

const Sidebar = ({ 
  personas,
  selectedPersonaId,
  setSelectedPersonaId,
  createNewPersona,
  setCurrentChat, 
  chatHistory,
  selectedChatId,
  setSelectedChatId,
  createNewChat,
  onEditPersona,
  onDeletePersona
}) => {
  const getChatTitle = (chat) => {
    const firstMessage = chat.messages[0]?.content;
    return firstMessage ? firstMessage.slice(0, 30) + '...' : 'New Chat';
  };

  const handleChatSelect = (chat) => {
    setSelectedChatId(chat.id);
    setCurrentChat(chat.messages);
  };

  return (
    <div className="sidebar">
      <UserButton />
      
      <button 
        className="new-chat-btn"
        onClick={createNewChat}
      >
        + New Chat
      </button>

      <div className="persona-section">
        <div className="section-header">
          <h3>Personas</h3>
          <button
            className="new-persona-btn"
            onClick={() => {
              setSelectedPersonaId(null);
              createNewPersona();
            }}
          >
            + New
          </button>
        </div>
        <div className="persona-list">
          {personas
            .sort((a, b) => {
              if (a.id === DEFAULT_PERSONA_ID) return -1;
              if (b.id === DEFAULT_PERSONA_ID) return 1;
              return 0;
            })
            .map(persona => (
              <div 
                key={persona.id}
                className={`persona-item ${selectedPersonaId === persona.id ? 'selected' : ''} ${persona.id === DEFAULT_PERSONA_ID ? 'gaia-persona' : ''}`}
                onClick={() => onEditPersona(persona)}
              >
                <img 
                  src={persona.image || '/default-avatar.png'} 
                  alt={persona.name}
                  className="persona-avatar"
                />
                <div className="persona-info">
                  <div className="persona-title">{persona.name}</div>
                  <div className="persona-prompt">
                    {persona.systemPrompt.substring(0, 30)}...
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="chat-history">
        {chatHistory.map(chat => (
          <div 
            key={chat.id}
            className={`chat-item ${selectedChatId === chat.id ? 'selected' : ''}`}
            onClick={() => handleChatSelect(chat)}
          >
            <div className="chat-title">{getChatTitle(chat)}</div>
            <div className="chat-timestamp">
              {new Date(chat.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

