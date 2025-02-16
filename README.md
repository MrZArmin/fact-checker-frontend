# Tényellenőrző Rendszer Frontend Dokumentáció

## Bevezetés

Ez a dokumentáció a FactChecker frontendjét mutatja be, amely egy Vue 3-alapú webalkalmazás.
Az felület segítségével a felhasználók természetes nyelven tudnak kommunikálni egy AI-alapú tényellenőrző rendszerrel, amely különböző intelligens technológiát (RAG, Knowledge graphs, NLP, ...) használ a válaszok generálásához.

## Telepítési útmutató

### Telepítés lépései

1. Projekt klónozása:

```bash
git clone https://github.com/MrZArmin/fact-checker-frontend.git
cd fact-checker-frontend
```

2. Függőségek telepítése:

```bash
npm install
```

3. Környezeti változók beállítása

```bash
cp .env.example .env
```

Ezt követően feltölteni a titkosított fájlban található értékekkel.

4. Fejlesztői szerver indítása:

```bash
npm run dev
```

5. Deployment éles szerverre

```bash
bash .deploy
```

## Architektúra áttekintés

### Technológiai stack

- **Framework**: Vue 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Components**: Egyedi komponensek
- **HTTP Client**: Axios (apiService-en keresztül)
- **Értesítések**: vue3-toastify

### Főbb komponensek

#### AppView

Az alkalmazás root komponense, ami inicializálja az alkalmazást és kezeli a routing-ot.

```vue
// App.vue
<template>
  <div class="main-content">
    <RouterView />
  </div>
</template>
```

##### Funkcionalitás

- User autentikáció ellenőrzés
- Session management inicializálása
- Route handling
- User data fetch és store inicializálás

##### Főbb működés

1. Komponens létrejöttekor:
   - Ellenőrzi a user login státuszát
   - Ha be van jelentkezve:
     - Lekéri az aktív session-öket
     - Ha van route param ID, beállítja az aktuális session-t
     - Lekéri a user adatait és inicializálja a store-t

#### HomeView

Az alkalmazás fő komponense, ami a chat felületet és az oldalsávot tartalmazza.

##### Komponensek

- `Sidebar`: Beszélgetések listázása és kezelése
- `Conversation`: Chat megjelenítése
- `Input`: Üzenetküldő komponens

##### Főbb funkciók

1. **Beszélgetés kezelés**

   - Új beszélgetés létrehozása
   - Beszélgetés betöltése
   - Beszélgetés törlése
   - Váltás beszélgetések között

2. **Üzenetküldés**

   - User input validálása
   - Message descriptor entity létrehozása
   - API kommunikáció
   - Error handling és user feedback

3. **Route kezelés**
   - ID alapú session betöltés
   - Router navigáció
   - Session státusz szinkronizálás

##### Lifecycle & Watch

- `watchEffect` figyeli a route változásokat
- Automatikus beszélgetés betöltés ID alapján
- Store szinkronizáció a session változásoknál

#### SidebarComponent

A sidebar komponens felelős a chat history megjelenítéséért és kezeléséért. A beszélgetéseket időrend szerint csoportosítva jeleníti meg.

##### Props & Events

- `items`: Array - beszélgetések listája
- Events: add-new-conversation, open-conversation, delete-conversation

##### Főbb funkciók

1. **Beszélgetések csoportosítása**

   - Mai beszélgetések
   - Elmúlt 7 nap chat-jei
   - 30 napnál régebbi beszélgetések
   - Időrend szerinti rendezés (updated_at alapján)

2. **User műveletek**

   - Logout
   - Új beszélgetés indítása
   - Beszélgetés megnyitása
   - Beszélgetés törlése (confirmation ablakkal)

3. **UI elements**
   - Alkalmazás logo és név
   - History szekciók accordionban
   - Active state az aktuális beszélgetésen
   - Törlés és navigációs ikonok

##### State management

- `currentConversationId`: Aktuális beszélgetés követése (route params alapján)
- `canOpenNewConversation`: Új beszélgetés gomb megjelenítésének logikája
- Router integráció a navigációhoz
- UserStore a logout kezeléséhez

A komponens egyszerű navigációt biztosít a beszélgetések között és közben kezeli a felhasználói műveleteket és a route változásokat.

## Biztonsági megfontolások

- Minden API hívás authentikációt igényel
- Hibakezelés implementálva van minden kritikus műveletnél
- Felhasználói input validáció
- Állapotkezelés biztonságos tárolása

### Verziókövetés

- Fejlesztési ág: dev
- Élesítendő ág: main
