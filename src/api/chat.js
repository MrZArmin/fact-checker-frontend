import Message from '../entities/Message';
import { useChatStore } from '@/stores/chat';

const namespace = 'chat';

export default $request => ({
  getSessions() {
    return $request.get(`${namespace}/sessions/`).then(resp=>{
      const chatStore = useChatStore();
      chatStore.initSessions(resp.payload.sessions);
      return resp;
    });
  },

  startSession(prompt) {
    return $request.post(`${namespace}/start/`, { prompt }).then(resp => resp.payload.session);
  },

  sendMessage(sessionId, message) {
    return $request.post(`${namespace}/${sessionId}/send/`, { message })
      .then(resp => {
        const chatStore = useChatStore();
        const currentSession = chatStore.getCurrentSession;

        if (resp.payload.error) {
          currentSession.addMessage(new Message({ sender: 'ai', message:'Hiba történt a válasz generálása közben.', isErrorMessage: true }));
          return resp.payload;
        }

        currentSession.addMessage(new Message(resp.payload.ai_message));

        return resp.payload;
      });
  },

  getMessages(sessionId) {
    return $request.get(`${namespace}/${sessionId}/messages/`).then(resp => {
      const chatStore = useChatStore();
      chatStore.setCurrenSessionFromId(sessionId);
      const currentSession = chatStore.getCurrentSession;
      currentSession.setMessages(resp.messages);
      return resp;
    });
  },

  deleteSession(sessionId) {
    return $request.delete(`${namespace}/${sessionId}/`).then(resp => {
      const chatStore = useChatStore();
      chatStore.removeSession(sessionId);
      return resp;
    });
  },
});
