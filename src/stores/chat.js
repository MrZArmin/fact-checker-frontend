import { defineStore } from 'pinia';

import Session from '@/entities/Session.js';

export const useChatStore = defineStore('chat', {
  state: () => ({
    sessions: [],
    currentSession: null,
  }),

  getters: {
    getCurrentSession: state => state.currentSession,
    getSessions: state => state.sessions,
  },

  actions: {
    initSessions(sessions) {
      sessions.forEach(session => {
        if(!this.findSession(session.id)) {
          this.sessions.push(new Session(session));
        }
      });
    },

    setDefault() {
      this.currentSession = null;
    },

    setCurrentSession(session) {
      this.currentSession = session;
    },

    setCurrenSessionFromId(id) {
      this.currentSession = this.findSession(id);
    },

    addSession(sessionData) {
      const session = new Session(sessionData);
      this.sessions.push(session);
      return session;
    },

    findSession(sessionId) {
      return this.sessions.find(session => session.id === sessionId);
    },

    removeSession(sessionId) {
      this.sessions = this.sessions.filter(session => session.id !== sessionId);
      if (this.currentSession?.id === sessionId) {
        this.currentSession = null;
      }
    },
  },
});
