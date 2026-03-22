# SystemCraft AI 🚀

AI-powered software architecture and planning assistant.

## 🏗️ Architecture
- **Frontend**: React 18, Zustand (State Management), Monaco Editor (Code Preview), Vanilla CSS (Glassmorphism).
- **Backend**: Spring Boot 3.5.12, Spring Security (JWT), Spring Data JPA, WebClient (AI Integration).
- **Database**: PostgreSQL.
- **AI**: Integration with Google Gemini / OpenAI (configurable).

## 🚀 Getting Started

### Backend Setup
1. Navigate to `/server`.
2. Ensure you have Java 17 and Maven installed.
3. Configure `src/main/resources/application.properties`:
   - Set PostgreSQL credentials.
   - Add your `GOOGLE_AI_API_KEY`.
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to `/client`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:3000`.

### Database Setup
- Execute the SQL script located in `/database/schema.sql` on your PostgreSQL instance.

## ⚙️ Core Features
1. **AI Requirement Analysis**: Generates features, entities, and constraints from simple text.
2. **Architecture Generation**: Suggests tech stack and architecture type (Monolith/Microservices).
3. **Database Schema**: Generates table structures and relationships.
4. **API Generator**: Provides REST endpoint definitions.
5. **Interactive Chat**: Refine your requirements with an AI context-aware assistant.

---
Built with Clean Architecture and SOLID principles.
