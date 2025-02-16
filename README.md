# FactChecker Rendszer Frontend Dokumentáció

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

#### InputComponent
Egyszerű textarea komponens a user input kezelésére. Kezeli mind a Send gombos, mind az Enter billentyűs küldést.

##### Funkcionalitás
- Textarea alapú input mező
- Send gomb (disabled állapottal)
- Enter billentyű support (Shift + Enter új sor)
- Automata input reset küldés után

##### Props
```javascript
// Events
const emit = defineEmits(['send']);
```

##### Event handlers
- `handleSend`: Input validáció és küldés
- `handleKeydown`: Enter billentyű figyelése (Shift + Enter kihagyásával)

Egyszerű komponens a felhasználói input kezelésére, beépített validációval és keyboard shortcut támogatással.


#### ConversationComponent
Chat ablak komponens, amely megjeleníti az üzeneteket és kezeli az input mezőt. Támogatja az AI-, felhasználó- és hibaüzenetek különböző megjelenítését, illetve a felhasznált források megjelenítését.

##### Props
```javascript
const props = defineProps({
  loading: Boolean,      // Loading állapot
  messages: Array,       // Üzenetek listája
  error: Boolean,        // Hibaállapot
});
```

##### Fő funkciók
1. **Üzenetek megjelenítése**
   - AI és user üzenetek különböző stílusban
   - Hibaüzenetek saját stílusa
   - Loading animáció
   - Error state kezelés
   - Forráscikkek megjelenítése és modal kezelés

2. **Scrolling**
   - Automatikus scroll új üzenetnél
   - Scroll to bottom loading után

3. **Input kezelés**
   - Dinamikus placeholder (loading állapot szerint)
   - Input disabled state loading alatt
   - Message validation küldés előtt

##### Watches
- Messages változás figyelése auto-scrollhoz
- Loading state figyelése placeholder frissítéshez

A komponens hatékonyan kezeli a chat folyamatot és jó UX-et biztosít az automatikus scrolling-gal és a források könnyű elérésével.

#### ArticleModal
Modal komponens a forrásként használt cikkek megjelenítéséhez. Tabokkal lehet váltani a cikkek között, és színkódolva mutatja a hasonlósági eredményt.

##### Props
```javascript
const props = defineProps({
  articles: Array,       // Cikkek listája
  isModalOpen: Boolean,  // Modal nyitott/zárt állapota
});
```

##### Főbb funkciók
1. **Tab rendszer**
   - Cikkek közötti váltás
   - Aktív tab követése
   - Tab reset új cikkek esetén

2. **Similarity score megjelenítés**
   - Színkódolás score alapján:
     - Zöld: >= 80%
     - Sárga: >= 60%
     - Piros: < 60%
   - Százalékos megjelenítés

3. **Cikk tartalom**
   - Cím és lead szöveg
   - Teljes cikk szöveg
   - Link az eredeti cikkhez

##### State kezelés
- `activeTab`: Aktív tab követése
- `currentArticle`: Computed property az aktuális cikkhez

A komponens segít a felhasználónak áttekinteni a válasz generálásához használt forrásokat, értékelni azok relevanciáját a hasonlósági eredmény alapján.

### Store-ok

Felelnek a komponensek közötti és projekt szintű változók, értékek térolásáért, globális kezeléséért
A projektben használt store a Pinia

#### ChatStore
A chat session-ök kezelésére szolgáló központi store, ami Pinia-t használ state management-re.

##### State
```javascript
state: () => ({
  sessions: [],          // Session objektumok listája
  currentSession: null,  // Aktív session
})
```

##### Getters
- `getCurrentSession`: Aktuális session lekérése
- `getSessions`: Összes session lekérése

##### Actions
1. **Session management**
   - `initSessions`: Kezdeti session-ök betöltése
   - `setDefault`: Store reset
   - `setCurrentSession`: Aktív session beállítása
   - `setCurrenSessionFromId`: Session beállítása ID alapján

2. **CRUD műveletek**
   - `addSession`: Új session hozzáadása
   - `findSession`: Session keresése ID alapján
   - `removeSession`: Session törlése
   - Auto-reset current session törléskor

A store biztosítja a session-ök konzisztens kezelését az alkalmazás különböző komponensei között, és gondoskodik a Session entitások megfelelő inicializálásáról.

#### UserStore
Az authentikáció és user management központi store-ja. Kezeli a bejelentkezést, token-eket és user adatokat.

##### State
```javascript
state: () => ({
  account: null,         // User account adatok
  token: null,           // Access token
  token_type: null,      // Token típusa
  expires_in: null,      // Token lejárati idő
  userFetched: false,    // User data fetch státusz
})
```

##### Getters
- `theAccount`: User account lekérése
- `theToken`: Token lekérése cookie-ból vagy state-ből
- `isLoggedIn`: Bejelentkezési státusz ellenőrzése
- `isAdmin`: Admin jogosultság ellenőrzése

##### Főbb funkciók

1. **Auth management**
   - `login`: User bejelentkeztetése és token tárolása
   - `logout`: Kijelentkezés és state tisztítás
   - Token tárolás cookie-ban és localStorage-ben
   - Token expiration kezelése

2. **User data kezelés**
   - `fetchMe`: User adatok lekérése API-ról
   - `init`: Store inicializálása localStorage-ből
   - Error handling és auto logout hibák esetén

3. **Storage kezelés**
   - Cookie management (token)
   - localStorage szinkronizáció
   - State és storage tisztítás logout esetén

A store biztosítja az alkalmazás auth rendszerének működését és a user adatok konzisztens kezelését az egész alkalmazásban.


### API Réteg

### UseApiService

Az alkalmazás API kommunikációjáért felelős központi service. Kezeli az authentikációt, hibakezelést és az összes API végpontot.

#### Alapfunkciók

- HTTP kérések kezelése (GET, POST, PUT, DELETE)
- Automatikus token kezelés
- Hibakezelés és toast üzenetek
- Query paraméterek kezelése
- CORS és credentials beállítások

#### Főbb komponensek

##### Request függvény

Központi request handler, ami minden API hívást kezel:

```javascript
const request = (requestPath, method = 'GET', query = undefined, body = null, headers = {}) => {
  // Base URL és default headers beállítása
  // Token hozzáadása ha létezik
  // Query paraméterek URL-be fűzése
  // Fetch kérés végrehajtása
  // Hibakezelés és válasz feldolgozás
}
```

##### API Modulok

###### Auth API (auth.js)

Authentikációs végpontok kezelése:

- `signup({ hash, email, password, username })`: Regisztráció
  - Meghívó kóddal történő regisztráció
  - Automatikus bejelentkezés sikeres regisztráció után
  
- `login(username, password)`: Bejelentkezés
  - Credentials elküldése
  - Token tárolása UserStore-ban
  
- `logout()`: Kijelentkezés
  - Token invalidálása szerveren
  - UserStore tisztítása

###### Chat API (chat.js)

Chat funkcionalitás végpontjai:

- `getSessions()`: Chat session-ök lekérése
  - Sessions betöltése ChatStore-ba
  
- `startSession(prompt)`: Új beszélgetés indítása
  - Kezdő prompt elküldése
  - Session létrehozása
  
- `sendMessage(sessionId, message)`: Üzenet küldése
  - AI válasz fogadása
  - Hibaüzenet kezelése
  - Message entitás létrehozása
  
- `getMessages(sessionId)`: Session üzenetek lekérése
  - Messages betöltése session-be
  - Current session beállítása
  
- `deleteSession(sessionId)`: Session törlése
  - Session eltávolítása store-ból

###### User API (user.js)

Felhasználó kezelés végpontjai:

- `me()`: Bejelentkezett user adatai
  
- `getUsers()`: Felhasználók listázása
  
- `postUser(data)`: Új felhasználó létrehozása
  
- `updateUser(data, id)`: Felhasználó módosítása
  
- `deleteUser(id)`: Felhasználó törlése

#### Hibakezelés

1. **Validációs hibák**
```javascript
const displayValidationErrors = errorPayload => {
  Object.keys(errorPayload).forEach(k => {
    for (const errorItem of errorPayload[k]) {
      toast.warning(errorItem);
    }
  });
};
```

2. **Unauthorized kezelés (401)**
- Automatikus kijelentkeztetés
- Toast üzenet megjelenítése
- Console error log

3. **Általános hibák**
- Console error log
- Error propagálás a hívó komponensnek

#### API Request Helper

Egyszerűsített request metódusok:

```javascript
const apiRequests = {
  get: (requestPath, query = {}, headers = {}) =>
    request(requestPath, 'GET', query, null, headers),
  post: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'POST', query, body, headers),
  put: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'PUT', query, body, headers),
  delete: (requestPath, body = {}, query = {}, headers = {}) =>
    request(requestPath, 'DELETE', query, body, headers),
};
```

#### Export

A service exportálja:
- Auth API végpontok
- User API végpontok
- Chat API végpontok

```javascript
export const apiService = {
  displayValidationErrors,
  auth: apiAuth(apiRequests),
  user: apiUser(apiRequests),
  chat: apiChat(apiRequests),
};
```

### Verziókövetés

- Fejlesztési ág: dev
- Élesítendő ág: main
