# Koreer Frontend Refactoring Instructions

## 1. Component Structure Optimization

### 1.1 Shared Components Consolidation
```typescript
// Move all shared components to a centralized location
src/components/shared/
  ├── layouts/        // All layout components
  ├── cards/          // Card components
  ├── charts/         // Chart components
  ├── forms/          // Form components
  └── ui/            // Basic UI components
```

- Move common form fields from `signup/` into `shared/forms/`
- Consolidate duplicate InfoCard components (currently in both shared/ and shared/cards/)
- Create reusable form field components for common input types

### 1.2 Feature Module Organization
```typescript
src/features/
  ├── auth/          // Authentication related features
  ├── community/     // Community features
  ├── company/       // Company information
  ├── employment/    // Employment related features
  └── visa/         // Visa information
```

## 2. State Management Refactoring

### 2.1 Custom Hooks Consolidation
Create a hooks directory at the root level:
```typescript
src/hooks/
  ├── api/           // API related hooks
  ├── auth/          // Authentication hooks
  ├── form/          // Form handling hooks
  └── ui/           // UI related hooks
```

Move and consolidate similar hooks:
- Combine `useSignInValidator` and `useSignUpValidator` into a single `useAuthValidator`
- Move all API-related hooks from components into `hooks/api/`

### 2.2 Redux Store Optimization
```typescript
src/store/
  ├── auth/          // Authentication state
  ├── community/     // Community state
  ├── company/       // Company information state
  └── shared/       // Shared state slices
```

- Combine related slices (e.g., tips and community)
- Implement proper TypeScript types for all state
- Use Redux Toolkit's createAsyncThunk for API calls

## 3. API Layer Refactoring

### 3.1 API Client Structure
```typescript
src/api/
  ├── client.ts      // Base API client
  ├── endpoints.ts   // API endpoints constants
  ├── types.ts       // API types
  └── services/     // API service modules
```

- Create a base API client with proper error handling
- Implement request/response interceptors
- Add proper TypeScript types for all API responses

### 3.2 API Services
```typescript
// Example service structure
export class AuthService {
  login(credentials: LoginCredentials): Promise<LoginResponse>
  register(userData: RegisterData): Promise<RegisterResponse>
  refreshToken(): Promise<TokenResponse>
}
```

## 4. Style System Refactoring

### 4.1 SCSS Architecture
```scss
src/styles/
  ├── abstracts/    // Variables, mixins, functions
  ├── base/         // Base styles, reset, typography
  ├── components/   // Component styles
  ├── layouts/      // Layout styles
  └── themes/      // Theme configurations
```

### 4.2 Theme Implementation
```typescript
// theme.ts
export const theme = {
  colors: {
    primary: {...},
    secondary: {...},
    text: {...},
    background: {...}
  },
  typography: {...},
  spacing: {...},
  breakpoints: {...}
}
```

## 5. Code Quality Improvements

### 5.1 TypeScript Enhancements
- Add proper TypeScript interfaces for all props
- Use strict type checking
- Implement proper error handling types

Example:
```typescript
interface UserData {
  id: string;
  name: string;
  email: string;
}

interface ApiError {
  code: string;
  message: string;
}

type ApiResponse<T> = {
  data: T;
  error?: ApiError;
}
```

### 5.2 Performance Optimization
- Implement React.memo for pure components
- Use useMemo and useCallback hooks appropriately
- Implement proper code splitting

Example:
```typescript
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => processData(data), [data]);
  return <div>{processedData}</div>;
});
```

## 6. Testing Structure

### 6.1 Test Organization
```typescript
src/
  └── __tests__/
      ├── components/
      ├── hooks/
      ├── services/
      └── utils/
```

### 6.2 Test Implementation
```typescript
// Example test structure
describe('AuthService', () => {
  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      // Test implementation
    });

    it('should handle invalid credentials', async () => {
      // Test implementation
    });
  });
});
```

## Implementation Steps

1. Create new directory structure
2. Move components to their new locations
3. Update imports throughout the application
4. Implement new shared components
5. Refactor state management
6. Update API layer
7. Implement style system
8. Add TypeScript improvements
9. Add tests
10. Update documentation

## Commands for Cursor AI

```bash
# 1. Create new directory structure
mkdir -p src/{features,hooks,store,styles}/{auth,community,company,employment,visa}
mkdir -p src/api/services
mkdir -p src/styles/{abstracts,base,components,layouts,themes}

# 2. Move components to new locations
mv src/components/signup/* src/features/auth/
mv src/components/community/* src/features/community/
# ... continue for other features

# 3. Create shared components structure
mkdir -p src/components/shared/{layouts,cards,charts,forms,ui}

# 4. Set up testing structure
mkdir -p src/__tests__/{components,hooks,services,utils}
```

Remember to:
- Update all import paths after moving files
- Maintain TypeScript type safety throughout the refactoring
- Test each change before moving to the next step
- Update documentation as you refactor