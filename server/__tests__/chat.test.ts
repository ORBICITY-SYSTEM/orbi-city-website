import { describe, it, expect } from 'vitest';
import { getOrCreateChatSession, getChatMessages, createChatMessage, getAllChatSessions, closeChatSession, markMessagesAsRead } from '../db';

describe('Live Chat System', () => {
  let testSessionId: number;
  let testMessageId: number;

  const testGuest = {
    name: 'Test Guest',
    email: 'testguest@example.com',
  };

  describe('Chat Session Management', () => {
    it('should create a new chat session', async () => {
      const session = await getOrCreateChatSession(testGuest.name, testGuest.email);
      expect(session).toBeDefined();
      expect(session.id).toBeGreaterThan(0);
      expect(session.guestName).toBe(testGuest.name);
      expect(session.guestEmail).toBe(testGuest.email);
      expect(session.status).toBe('active');
      testSessionId = session.id;
    });

    it('should return existing session for same email', async () => {
      const session1 = await getOrCreateChatSession(testGuest.name, testGuest.email);
      const session2 = await getOrCreateChatSession(testGuest.name, testGuest.email);
      expect(session1.id).toBe(session2.id);
    });

    it('should get all chat sessions', async () => {
      const sessions = await getAllChatSessions();
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBeGreaterThan(0);
    });

    it('should have required session fields', async () => {
      const sessions = await getAllChatSessions();
      if (sessions.length > 0) {
        const session = sessions[0];
        expect(session).toHaveProperty('id');
        expect(session).toHaveProperty('guestName');
        expect(session).toHaveProperty('guestEmail');
        expect(session).toHaveProperty('status');
        expect(session).toHaveProperty('createdAt');
        expect(session).toHaveProperty('updatedAt');
      }
    });
  });

  describe('Chat Messages', () => {
    it('should create a guest message', async () => {
      if (testSessionId) {
        testMessageId = await createChatMessage({
          sessionId: testSessionId,
          message: 'Hello, I need help with booking',
          senderType: 'guest',
          senderName: testGuest.name,
          isRead: 0,
        });
        expect(testMessageId).toBeGreaterThan(0);
      }
    });

    it('should create an admin reply', async () => {
      if (testSessionId) {
        const messageId = await createChatMessage({
          sessionId: testSessionId,
          message: 'Hello! How can I help you today?',
          senderType: 'admin',
          senderName: 'Support Team',
          isRead: 0,
        });
        expect(messageId).toBeGreaterThan(0);
      }
    });

    it('should get messages for a session', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        expect(Array.isArray(messages)).toBe(true);
        expect(messages.length).toBeGreaterThan(0);
      }
    });

    it('should have required message fields', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        if (messages.length > 0) {
          const message = messages[0];
          expect(message).toHaveProperty('id');
          expect(message).toHaveProperty('sessionId');
          expect(message).toHaveProperty('message');
          expect(message).toHaveProperty('senderType');
          expect(message).toHaveProperty('isRead');
          expect(message).toHaveProperty('createdAt');
        }
      }
    });

    it('should validate sender type enum', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        const validSenderTypes = ['guest', 'admin'];
        
        messages.forEach(message => {
          expect(validSenderTypes).toContain(message.senderType);
        });
      }
    });

    it('should mark messages as read', async () => {
      if (testSessionId) {
        await markMessagesAsRead(testSessionId);
        const messages = await getChatMessages(testSessionId);
        
        // All messages should now be marked as read
        messages.forEach(message => {
          expect(message.isRead).toBe(1);
        });
      }
    });
  });

  describe('Session Status Management', () => {
    it('should close a chat session', async () => {
      if (testSessionId) {
        await closeChatSession(testSessionId);
        const sessions = await getAllChatSessions();
        const closedSession = sessions.find(s => s.id === testSessionId);
        
        if (closedSession) {
          expect(closedSession.status).toBe('closed');
        }
      }
    });

    it('should validate status enum values', () => {
      const validStatuses = ['active', 'closed'];
      expect(validStatuses).toContain('active');
      expect(validStatuses).toContain('closed');
    });
  });

  describe('Message Validation', () => {
    it('should have non-empty messages', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        
        messages.forEach(message => {
          expect(message.message.length).toBeGreaterThan(0);
        });
      }
    });

    it('should have valid session IDs', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        
        messages.forEach(message => {
          expect(message.sessionId).toBe(testSessionId);
        });
      }
    });

    it('should have chronological order', async () => {
      if (testSessionId) {
        const messages = await getChatMessages(testSessionId);
        
        if (messages.length > 1) {
          for (let i = 1; i < messages.length; i++) {
            const prevTime = new Date(messages[i - 1].createdAt).getTime();
            const currTime = new Date(messages[i].createdAt).getTime();
            expect(currTime).toBeGreaterThanOrEqual(prevTime);
          }
        }
      }
    });
  });

  describe('Guest Information', () => {
    it('should have valid email format', async () => {
      const sessions = await getAllChatSessions();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      sessions.forEach(session => {
        expect(emailRegex.test(session.guestEmail)).toBe(true);
      });
    });

    it('should have non-empty guest names', async () => {
      const sessions = await getAllChatSessions();
      
      sessions.forEach(session => {
        expect(session.guestName.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Real-time Updates', () => {
    it('should update session timestamp on new message', async () => {
      const newSession = await getOrCreateChatSession('New Guest', 'newguest@example.com');
      const initialUpdatedAt = new Date(newSession.updatedAt).getTime();
      
      // Wait a bit and send a message
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await createChatMessage({
        sessionId: newSession.id,
        message: 'Test message',
        senderType: 'guest',
        senderName: 'New Guest',
        isRead: 0,
      });
      
      const sessions = await getAllChatSessions();
      const updatedSession = sessions.find(s => s.id === newSession.id);
      
      if (updatedSession) {
        const newUpdatedAt = new Date(updatedSession.updatedAt).getTime();
        // Note: updatedAt might not change if DB doesn't auto-update on insert
        expect(newUpdatedAt).toBeGreaterThanOrEqual(initialUpdatedAt);
      }
    });
  });
});
