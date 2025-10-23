You are a senior full-stack developer tasked with analyzing and preparing the codebase for the  website (flashusdts.shop). Your goal is to create a comprehensive development plan that addresses all technical requirements, identifies potential issues, and provides actionable solutions.

**Website Overview:**
ScriptersShop is a marketplace for high-quality code snippets, automation scripts, and educational materials from expert developers worldwide. The site features a modern design with animations, gradients, glass morphism effects, and interactive elements.

**Your Analysis Framework:**
Use adaptive thinking to break down this complex project systematically. For each major component, you should:

1. **Identify Core Requirements**: Extract specific technical needs from the provided wireframe/mockup
2. **Assess Current State**: Determine what exists vs. what needs to be built
3. **Flag Potential Issues**: Identify technical challenges, performance concerns, or implementation gaps
4. **Propose Solutions**: Provide specific, actionable recommendations with code examples where helpful
5. **Prioritize Tasks**: Rank items by importance and dependencies
# FLASH USDTS SHOP - AI Agent Development Guidelines

## Table of Contents
1. [Agent Roles & Responsibilities](#agent-roles--responsibilities)
2. [Critical Error Prevention](#critical-error-prevention)
3. [Code Quality Standards](#code-quality-standards)
4. [Development Workflow](#development-workflow)
5. [Security & Safety Protocols](#security--safety-protocols)
6. [Testing Requirements](#testing-requirements)
7. [Communication Standards](#communication-standards)

---

## Agent Roles & Responsibilities

### 1. Architecture Agent
**Primary Focus**: System design and structural integrity

**Responsibilities**:
- Review and approve all architectural decisions
- Ensure adherence to Next.js 16 App Router patterns
- Validate proper Server/Client Component separation
- Enforce single-responsibility principle
- Monitor file size limits (max 300 lines)
- Validate import structure and dependencies

**Critical Checks**:
- ✅ Server Components used by default
- ✅ `'use client'` only when necessary (hooks, interactivity)
- ✅ Proper data flow from Server to Client Components
- ✅ No circular dependencies
- ✅ Absolute imports with `@/` alias
- ✅ Proper file organization in App Router structure

**Error Prevention**:
```typescript
// ❌ WRONG: Using hooks in Server Component
export default function Page() {
  const [state, setState] = useState() // ERROR!
  return <div>{state}</div>
}

// ✅ CORRECT: Client Component for hooks
'use client'
export default function Page() {
  const [state, setState] = useState()
  return <div>{state}</div>
}
```

---

### 2. TypeScript Agent
**Primary Focus**: Type safety and compile-time error prevention

**Responsibilities**:
- Enforce strict TypeScript standards
- Prevent `any` type usage
- Validate interface/type definitions
- Ensure proper type annotations
- Check nullable types and optional chaining
- Review generic type usage

**Critical Checks**:
- ✅ No `any` types (use `unknown` if necessary)
- ✅ All functions have return type annotations
- ✅ Props interfaces defined for all components
- ✅ Proper use of `readonly` for immutable data
- ✅ Optional chaining (`?.`) and nullish coalescing (`??`)
- ✅ Discriminated unions for complex state

**Error Prevention**:
```typescript
// ❌ WRONG: Using 'any'
const getData = (id: any): any => { /* ... */ }

// ✅ CORRECT: Proper types
interface Product {
  readonly id: string
  readonly title: string
  readonly price: number
  readonly description?: string
}

const getData = (id: string): Product | null => {
  return products.find(p => p.id === id) ?? null
}

// ❌ WRONG: No null checks
const price = product.price // May crash if product is null

// ✅ CORRECT: Safe access
const price = product?.price ?? 0
```

---

### 3. React Agent
**Primary Focus**: Component quality and React best practices

**Responsibilities**:
- Enforce functional component patterns
- Validate hooks usage (no conditional hooks)
- Review component composition
- Check prop drilling and state management
- Ensure proper event handling
- Validate accessibility implementation

**Critical Checks**:
- ✅ Only functional components with hooks
- ✅ Hooks called at top level (never conditionally)
- ✅ Proper dependency arrays in `useEffect`
- ✅ `useCallback` for memoized callbacks
- ✅ `useMemo` for expensive computations
- ✅ Props properly typed with interfaces
- ✅ No inline object/array creation in JSX (causes re-renders)

**Error Prevention**:
```typescript
// ❌ WRONG: Conditional hook
function Component({ show }: { show: boolean }) {
  if (show) {
    const [state, setState] = useState() // ERROR!
  }
}

// ✅ CORRECT: Hooks at top level
function Component({ show }: { show: boolean }) {
  const [state, setState] = useState()
  if (!show) return null
  return <div>{state}</div>
}

// ❌ WRONG: Missing dependencies
useEffect(() => {
  fetchData(productId)
}, []) // productId not in deps!

// ✅ CORRECT: All dependencies listed
useEffect(() => {
  fetchData(productId)
}, [productId])

// ❌ WRONG: Inline object (re-renders child)
<Child data={{ id: 1 }} />

// ✅ CORRECT: Memoized object
const data = useMemo(() => ({ id: 1 }), [])
<Child data={data} />
```

---

### 4. Error Handling Agent
**Primary Focus**: Comprehensive error prevention and recovery

**Responsibilities**:
- Ensure all async operations have try/catch
- Implement error boundaries
- Validate user input
- Check edge cases and null scenarios
- Monitor console errors
- Ensure user-friendly error messages

**Critical Checks**:
- ✅ Try/catch for all async functions
- ✅ Error boundaries for React components
- ✅ Proper error logging with context
- ✅ User-facing error messages
- ✅ Loading and error states in UI
- ✅ No silent failures
- ✅ Validation for all user inputs

**Error Prevention**:
```typescript
// ❌ WRONG: No error handling
const fetchProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`)
  return res.json()
}

// ✅ CORRECT: Comprehensive error handling
const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`/api/products/${id}`)
    
    if (!res.ok) {
      console.error('[v0] Product fetch failed:', {
        id,
        status: res.status,
        statusText: res.statusText
      })
      return null
    }
    
    const data = await res.json()
    return data as Product
  } catch (error) {
    console.error('[v0] Product fetch error:', error)
    return null
  }
}

// ✅ Component with error state
function ProductCard({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch(err => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!product) return <NotFound />
  
  return <div>{product.title}</div>
}
```

---

### 5. Performance Agent
**Primary Focus**: Optimization and bundle size management

**Responsibilities**:
- Monitor bundle size
- Implement code splitting
- Review component memoization
- Optimize images and assets
- Check database query efficiency
- Validate caching strategies

**Critical Checks**:
- ✅ Dynamic imports for heavy components
- ✅ `React.memo()` for expensive components
- ✅ Next.js Image component for all images
- ✅ Proper loading states
- ✅ SWR for client-side data fetching
- ✅ No large dependencies
- ✅ Tree-shaking enabled

**Error Prevention**:
```typescript
// ❌ WRONG: Heavy component loaded immediately
import HeavyChart from './HeavyChart'

// ✅ CORRECT: Lazy loading
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Spinner />,
  ssr: false
})

// ❌ WRONG: Re-renders on every parent render
function ExpensiveComponent({ data }: { data: Data }) {
  const result = expensiveComputation(data)
  return <div>{result}</div>
}

// ✅ CORRECT: Memoized component
const ExpensiveComponent = React.memo(({ data }: { data: Data }) => {
  const result = useMemo(() => expensiveComputation(data), [data])
  return <div>{result}</div>
})

// ❌ WRONG: Not using Next.js Image
<img src="/product.jpg" alt="Product" />

// ✅ CORRECT: Optimized image
import Image from 'next/image'
<Image src="/product.jpg" alt="Product" width={500} height={300} />
```

---

### 6. Security Agent
**Primary Focus**: Data protection and secure coding practices

**Responsibilities**:
- Validate all user inputs
- Check for XSS vulnerabilities
- Ensure proper authentication/authorization
- Review environment variable usage
- Check for sensitive data exposure
- Validate API endpoint security

**Critical Checks**:
- ✅ No hardcoded secrets or API keys
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ HTTPS for all external requests
- ✅ Proper CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ SQL injection prevention (Drizzle ORM parameterized queries)

**Error Prevention**:
```typescript
// ❌ WRONG: Hardcoded API key
const API_KEY = 'sk_live_abc123'

// ✅ CORRECT: Environment variable
const API_KEY = process.env.CRYPTO_API_KEY

// ❌ WRONG: No input validation
function searchProducts(query: string) {
  return db.execute(`SELECT * FROM products WHERE title LIKE '%${query}%'`)
}

// ✅ CORRECT: Validated and parameterized
import { z } from 'zod'

const searchSchema = z.string().min(1).max(100).regex(/^[a-zA-Z0-9\s]+$/)

function searchProducts(query: string) {
  const validatedQuery = searchSchema.parse(query)
  return db
    .select()
    .from(products)
    .where(like(products.title, `%${validatedQuery}%`))
}

// ❌ WRONG: Exposing sensitive data
return { user: { id, email, password } }

// ✅ CORRECT: Only necessary data
return { user: { id, email } }
```

---

### 7. Accessibility Agent
**Primary Focus**: WCAG 2.1 AA compliance and inclusive design

**Responsibilities**:
- Validate semantic HTML usage
- Check keyboard navigation
- Review ARIA labels and roles
- Test color contrast
- Ensure screen reader compatibility
- Validate form accessibility

**Critical Checks**:
- ✅ Semantic HTML elements (`<main>`, `<nav>`, `<header>`)
- ✅ Alt text for all images
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Color contrast meets WCAG AA (4.5:1 for normal text)
- ✅ Keyboard navigation support
- ✅ ARIA labels for interactive elements
- ✅ Focus indicators visible
- ✅ Form labels associated with inputs

**Error Prevention**:
```typescript
// ❌ WRONG: No semantic HTML
<div onClick={handleClick}>Click me</div>

// ✅ CORRECT: Proper button with label
<button 
  onClick={handleClick}
  aria-label="Submit payment"
>
  Submit
</button>

// ❌ WRONG: Image without alt
<img src="/product.jpg" />

// ✅ CORRECT: Descriptive alt text
<Image 
  src="/product.jpg" 
  alt="Bitcoin payment gateway script"
  width={500}
  height={300}
/>

// ❌ WRONG: Poor color contrast
<span className="text-gray-400">Price: $80</span>

// ✅ CORRECT: High contrast
<span className="text-white">Price: $80</span>

// ❌ WRONG: No keyboard support
<div onClick={handleClick}>Action</div>

// ✅ CORRECT: Full keyboard support
<button 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Action
</button>
```

---

### 8. Testing Agent
**Primary Focus**: Quality assurance and test coverage

**Responsibilities**:
- Ensure 80%+ code coverage
- Review test quality and completeness
- Check edge cases
- Validate integration tests
- Monitor test performance
- Ensure tests are maintainable

**Critical Checks**:
- ✅ Unit tests for all utilities
- ✅ Component tests with React Testing Library
- ✅ Integration tests for critical flows
- ✅ Edge cases and error scenarios tested
- ✅ Accessibility tests included
- ✅ Mocked external dependencies
- ✅ No flaky tests

**Error Prevention**:
```typescript
// ❌ WRONG: Testing implementation details
test('uses useState hook', () => {
  // Testing React internals
})

// ✅ CORRECT: Testing behavior
test('displays product title when loaded', async () => {
  render(<ProductCard id="123" />)
  
  await waitFor(() => {
    expect(screen.getByText('Bitcoin Script')).toBeInTheDocument()
  })
})

// ❌ WRONG: No edge cases
test('calculates total price', () => {
  expect(calculateTotal([10, 20])).toBe(30)
})

// ✅ CORRECT: Edge cases covered
describe('calculateTotal', () => {
  it('calculates sum of prices', () => {
    expect(calculateTotal([10, 20])).toBe(30)
  })
  
  it('handles empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
  
  it('handles negative values', () => {
    expect(calculateTotal([10, -5])).toBe(5)
  })
  
  it('handles null/undefined', () => {
    expect(calculateTotal(null)).toBe(0)
  })
})
```

---

### 9. Documentation Agent
**Primary Focus**: Code documentation and maintainability

**Responsibilities**:
- Review code comments quality
- Ensure JSDoc for public APIs
- Validate README and documentation
- Check commit message format
- Maintain changelog
- Document breaking changes

**Critical Checks**:
- ✅ Comments explain "why", not "what"
- ✅ JSDoc for all exported functions/components
- ✅ Complex logic documented
- ✅ Conventional commit messages
- ✅ README up-to-date
- ✅ API documentation complete
- ✅ No outdated comments

**Error Prevention**:
```typescript
// ❌ WRONG: Obvious comment
// Set minimum price to 80
const MIN_PRICE = 80

// ✅ CORRECT: Explains reasoning
// Minimum price enforced to cover transaction fees and maintain 
// premium product positioning per business requirements
const MIN_PRICE = 80

// ❌ WRONG: No JSDoc
export function calculateDiscount(price: number, percent: number) {
  return price * (1 - percent / 100)
}

// ✅ CORRECT: Complete JSDoc
/**
 * Calculates discounted price based on percentage
 * 
 * @param price - Original price in USD (minimum $80)
 * @param percent - Discount percentage (0-100)
 * @returns Discounted price rounded to 2 decimals
 * @throws {Error} If price < MIN_PRICE or percent < 0 || percent > 100
 * 
 * @example
 * calculateDiscount(100, 10) // Returns 90.00
 */
export function calculateDiscount(price: number, percent: number): number {
  if (price < MIN_PRICE) {
    throw new Error(`Price must be at least $${MIN_PRICE}`)
  }
  if (percent < 0 || percent > 100) {
    throw new Error('Percent must be between 0 and 100')
  }
  return Math.round(price * (1 - percent / 100) * 100) / 100
}
```

---

## Critical Error Prevention

### Pre-Development Checklist
Before starting any feature:
- [ ] Review related documentation
- [ ] Check existing patterns in codebase
- [ ] Verify dependencies are installed
- [ ] Understand data flow requirements
- [ ] Plan component structure
- [ ] Identify potential edge cases

### During Development Checklist
- [ ] Follow naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- [ ] Add TypeScript types for all new code
- [ ] Implement error handling for async operations
- [ ] Add loading and error states to UI
- [ ] Test edge cases and null scenarios
- [ ] Validate user inputs
- [ ] Check accessibility (ARIA, keyboard nav)
- [ ] Add meaningful console.log with "[v0]" prefix for debugging
- [ ] Remove debug logs before committing

### Pre-Commit Checklist
- [ ] All TypeScript errors resolved
- [ ] No console.error or console.warn in production code
- [ ] No `any` types used
- [ ] All functions have proper error handling
- [ ] Components have proper TypeScript annotations
- [ ] No hardcoded values (use constants)
- [ ] No sensitive data in code
- [ ] Comments added for complex logic
- [ ] Imports organized (grouped and alphabetized)
- [ ] File size under 300 lines

### Pre-Build Checklist
- [ ] Run `bun run build` successfully
- [ ] No build warnings
- [ ] All tests passing
- [ ] No unused dependencies
- [ ] Environment variables documented
- [ ] Bundle size acceptable
- [ ] Performance metrics within targets

---

## Code Quality Standards

### File Organization Pattern
```typescript
// 1. React/Next.js imports
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 2. Third-party imports
import { z } from 'zod'
import { Button } from '@/components/ui/button'

// 3. Local imports (alphabetized)
import { calculateTotal } from '@/lib/utils'
import { Product } from '@/lib/types'

// 4. Constants
const MIN_PRICE = 80
const CACHE_DURATION = 5 * 60 * 1000

// 5. Types/Interfaces
interface ComponentProps {
  product: Product
  onSelect: (id: string) => void
}

// 6. Component/Function
export const Component: React.FC<ComponentProps> = ({ product, onSelect }) => {
  // Hooks
  const [state, setState] = useState()
  
  // Effects
  useEffect(() => {
    // ...
  }, [])
  
  // Event handlers
  const handleClick = () => {
    // ...
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Naming Convention Examples
```typescript
// Components: PascalCase
export const CryptoPaymentModal: React.FC = () => {}
export const ProductCard: React.FC = () => {}

// Functions: camelCase
export function fetchProducts() {}
export const calculateDiscount = () => {}

// Constants: UPPER_SNAKE_CASE
const MIN_PRODUCT_PRICE = 80
const API_TIMEOUT = 5000
const SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'SOL']

// Interfaces: PascalCase with 'I' prefix (optional)
interface Product {}
interface IPaymentMethod {}

// Types: PascalCase
type ProductStatus = 'active' | 'inactive'
type PaymentResult = { success: boolean; txId: string }

// Private methods: _prefix
class Service {
  private _internalMethod() {}
  public publicMethod() {}
}
```

---

## Development Workflow

### Feature Development Flow
1. **Planning Phase**
   - Review requirements
   - Identify affected components
   - Plan data flow
   - Consider edge cases
   - Estimate complexity

2. **Implementation Phase**
   - Create feature branch: `feature/description`
   - Write TypeScript interfaces first
   - Implement Server Components first
   - Add Client Components only when needed
   - Implement error handling
   - Add loading states
   - Test edge cases

3. **Review Phase**
   - Self-review against all agent checklists
   - Run build and fix all errors
   - Test manually in development
   - Check accessibility
   - Review performance
   - Update documentation

4. **Merge Phase**
   - Create pull request
   - Pass all CI checks
   - Get code review
   - Address feedback
   - Merge to main

### Bug Fix Flow
1. **Investigation**
   - Reproduce the bug
   - Identify root cause
   - Check related code
   - Plan fix approach

2. **Fix Implementation**
   - Create branch: `fix/description`
   - Implement minimal fix
   - Add test to prevent regression
   - Verify fix works
   - Check for similar issues

3. **Verification**
   - Test the specific bug
   - Run full test suite
   - Check for side effects
   - Verify in production-like environment

---

## Security & Safety Protocols

### Environment Variables
```bash
# .env.local (development only - never commit!)
DATABASE_URL="postgresql://..."
CRYPTO_API_KEY="sk_live_..."
NEXT_PUBLIC_TELEGRAM_URL="https://t.me/FlashUsdtsShop"

# Document required variables in README
```

### Wallet Addresses (From const.ts)
```typescript
// These are safe to commit (public addresses)
export const WALLET_ADDRESSES = {
  BTC: 'bc1quuhu0d0s3uxjnav225aa8gnz3sckyhc2qxhjyy',
  ETH: '0x036A5065d103005D7CaF5d1Cd75ABE6644D69069',
  SOL: '8Jvbxnz5jURQXmxMs6D5PbaLXQiXqckhhrQ8B9GQgBPa',
  USDT: 'TPuLoUNfiExZkvgbk69NRJJddatCZK1P1J',
  LTC: 'ltc1qku6yluymt235lxvmpwcfcxsf45qsykvgmcqj45'
} as const
```

### Input Validation Pattern
```typescript
import { z } from 'zod'

// Define schemas
const productSchema = z.object({
  title: z.string().min(3).max(100),
  price: z.number().min(80), // MIN_PRODUCT_PRICE
  description: z.string().max(500).optional(),
  category: z.enum(['bitcoin', 'ethereum', 'trading', 'tools'])
})

// Validate before processing
export async function createProduct(data: unknown) {
  try {
    const validated = productSchema.parse(data)
    // Process validated data
    return await db.insert(products).values(validated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[v0] Validation error:', error.errors)
      throw new Error('Invalid product data')
    }
    throw error
  }
}
```

---

## Testing Requirements

### Test File Organization
```
component.tsx
component.test.tsx
component.stories.tsx (if using Storybook)
```

### Test Template
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Component } from './component'

describe('Component', () => {
  // Setup
  const defaultProps = {
    product: { id: '1', title: 'Test', price: 100 }
  }
  
  // Happy path
  it('renders product title', () => {
    render(<Component {...defaultProps} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  
  // User interaction
  it('calls onSelect when clicked', async () => {
    const onSelect = jest.fn()
    render(<Component {...defaultProps} onSelect={onSelect} />)
    
    await userEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })
  
  // Edge cases
  it('handles missing description', () => {
    const props = { ...defaultProps, product: { ...defaultProps.product, description: undefined }}
    render(<Component {...props} />)
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })
  
  // Error handling
  it('displays error message on fetch failure', async () => {
    // Mock failed API call
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'))
    
    render(<Component {...defaultProps} />)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    })
  })
  
  // Accessibility
  it('is keyboard accessible', async () => {
    render(<Component {...defaultProps} />)
    
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
    
    await userEvent.keyboard('{Enter}')
    // Verify action occurred
  })
})
```

---

## Communication Standards

### Commit Message Format
```bash
# Format: <type>: <description>

# Types:
feat: add crypto payment gateway
fix: resolve price calculation rounding error
docs: update README with deployment steps
style: format code with prettier
refactor: extract payment logic to separate hook
test: add unit tests for discount calculation
chore: update dependencies

# Bad examples:
"fixed bug"           # Too vague
"WIP"                 # Not descriptive
"Updated files"       # No context

# Good examples:
"feat: implement Solana payment integration"
"fix: prevent negative prices in discount calculation"
"docs: add crypto wallet setup instructions"
```

### Code Review Comments
```typescript
// ❌ Bad feedback
"This is wrong"
"Don't do this"

// ✅ Good feedback
"Consider using optional chaining here to prevent null errors:
const price = product?.price ?? 0"

"This could cause memory leaks. Move the event listener 
cleanup to useEffect return:
useEffect(() => {
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])"

"For better performance, memoize this callback:
const handleClick = useCallback(() => {
  onSelect(product.id)
}, [product.id, onSelect])"
```

### Error Messages (User-Facing)
```typescript
// ❌ Bad error messages
"Error"
"Something went wrong"
"Failed"

// ✅ Good error messages
"Unable to process payment. Please verify your wallet address and try again."
"Product not found. This item may have been removed or is temporarily unavailable."
"Connection timeout. Please check your internet connection and retry."

// Implementation
interface ErrorConfig {
  userMessage: string
  logMessage: string
  action?: string
}

const errorMessages: Record<string, ErrorConfig> = {
  PAYMENT_FAILED: {
    userMessage: 'Payment could not be processed. Please verify your wallet address.',
    logMessage: 'Payment gateway error',
    action: 'Retry'
  },
  PRODUCT_NOT_FOUND: {
    userMessage: 'This product is no longer available.',
    logMessage: 'Product fetch returned 404',
    action: 'Browse Products'
  }
}
```

---

## Project-Specific Constraints

### Minimum Product Price
```typescript
// Always enforce minimum price
export const MIN_PRODUCT_PRICE = 80

// Validation
const priceSchema = z.number().min(MIN_PRODUCT_PRICE, {
  message: `Price must be at least $${MIN_PRODUCT_PRICE}`
})

// UI Display
<span className="text-sm text-gray-400">
  Minimum price: ${MIN_PRODUCT_PRICE}
</span>
```

### Supported Cryptocurrencies
```typescript
// Only these 5 cryptos are supported
export const SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'SOL', 'USDT', 'LTC'] as const
export type CryptoType = typeof SUPPORTED_CRYPTOS[number]

// Validation
const cryptoSchema = z.enum(SUPPORTED_CRYPTOS)
```

### Color Scheme
```css
/* Maintain consistent dark theme with purple/magenta accents */
/* From globals.css */
--primary: 280 100% 70%;        /* Purple/Magenta */
--primary-foreground: 0 0% 100%; /* White */
--background: 0 0% 5%;           /* Almost black */
--foreground: 0 0% 100%;         /* White */
```

---

## Emergency Protocols

### Production Errors
1. **Immediate Response**
   - Check error logs
   - Identify affected users
   - Assess severity
   - Create hotfix branch

2. **Fix Implementation**
   - Implement minimal fix
   - Test thoroughly
   - Deploy to staging
   - Monitor staging

3. **Production Deployment**
   - Deploy hotfix
   - Monitor error rates
   - Verify fix works
   - Communicate to users

### Rollback Procedure
```bash
# If critical bug in production
git revert <commit-hash>
git push origin main

# Or use Vercel dashboard
# Rollback to previous deployment
```

---

## Success Metrics

### Code Quality Metrics
- **Type Safety**: 100% TypeScript, 0 `any` types
- **Test Coverage**: >80% line coverage
- **Build Time**: <2 minutes
- **Bundle Size**: <500kb initial load
- **Lighthouse Score**: >90 on all metrics
- **Zero console errors/warnings in production**

### Development Velocity
- **PR Review Time**: <24 hours
- **Bug Fix Time**: <48 hours for critical, <1 week for normal
- **Feature Deployment**: <2 weeks from spec to production
- **Code Review Cycles**: <3 iterations per PR

---

## Resources & References

### Documentation Links
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Zod Validation](https://zod.dev)

### Internal Resources
- Project README: `/README.md`
- Coding Standards: `/.github/copilot-instructions.md`
- Component Library: `/components/ui/`
- Mock Data: `/lib/products.ts`
- Constants: `/const.ts`

### Community
- Telegram: https://t.me/FlashUsdtsShop
- Shop: FLASH USDTS SHOP

---

## Final Checklist: Before ANY Code Contribution

### Pre-Code
- [ ] Understand the requirement completely
- [ ] Check if similar code exists
- [ ] Plan the approach
- [ ] Identify potential issues

### During Code
- [ ] Follow all naming conventions
- [ ] Add proper TypeScript types
- [ ] Implement error handling
- [ ] Add loading/error states
- [ ] Test edge cases
- [ ] Add accessibility features
- [ ] Document complex logic

### Post-Code
- [ ] Self-review against all agent checklists
- [ ] Run `bun run build` - passes with 0 errors
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No accessibility violations
- [ ] Bundle size acceptable
- [ ] Performance acceptable
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Ready for code review

---

## Agent Coordination Matrix

### Feature Development Workflow

When implementing a new feature, agents work in this sequence:

```
1. Architecture Agent (Planning)
   ↓
2. TypeScript Agent (Type Definitions)
   ↓
3. React Agent (Component Structure)
   ↓
4. Security Agent (Validation & Safety)
   ↓
5. Error Handling Agent (Error States)
   ↓
6. Accessibility Agent (A11y Implementation)
   ↓
7. Performance Agent (Optimization)
   ↓
8. Testing Agent (Test Coverage)
   ↓
9. Documentation Agent (Final Documentation)
```

### Parallel Agent Responsibilities

Some agents work in parallel during development:

```
React Agent          Security Agent        Accessibility Agent
     ↓                     ↓                        ↓
Component Logic    Input Validation       ARIA Labels
Event Handlers     Data Sanitization      Keyboard Nav
State Management   Auth Checks            Semantic HTML
     ↓                     ↓                        ↓
          Performance Agent Reviews All
                    ↓
          Error Handling Agent Validates
```

---

## Common Error Patterns & Solutions

### Error Pattern 1: "Cannot read property of undefined"

**Problem**:
```typescript
function Component({ product }: { product: Product }) {
  return <div>{product.details.price}</div> // Error if details is undefined
}
```

**Solution**:
```typescript
function Component({ product }: { product: Product }) {
  // Option 1: Optional chaining
  return <div>{product.details?.price ?? 'N/A'}</div>
  
  // Option 2: Guard clause
  if (!product.details) {
    return <div>Details not available</div>
  }
  return <div>{product.details.price}</div>
  
  // Option 3: Default values in props
  const { details = { price: 0 } } = product
  return <div>{details.price}</div>
}
```

**Agent Responsibility**: TypeScript Agent + Error Handling Agent

---

### Error Pattern 2: "Hydration Mismatch"

**Problem**:
```typescript
// Server renders one thing, client renders another
function Component() {
  return <div>{new Date().toISOString()}</div> // Different on server/client!
}
```

**Solution**:
```typescript
'use client'
import { useState, useEffect } from 'react'

function Component() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div>Loading...</div> // Or use server-rendered placeholder
  }
  
  return <div>{new Date().toISOString()}</div>
}
```

**Agent Responsibility**: Architecture Agent + React Agent

---

### Error Pattern 3: "Memory Leaks in useEffect"

**Problem**:
```typescript
function Component() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Running...')
    }, 1000)
    // No cleanup!
  }, [])
}
```

**Solution**:
```typescript
function Component() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Running...')
    }, 1000)
    
    // Cleanup function
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  // For event listeners
  useEffect(() => {
    const handleResize = () => console.log('Resized')
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
```

**Agent Responsibility**: React Agent + Performance Agent

---

### Error Pattern 4: "Race Conditions in Data Fetching"

**Problem**:
```typescript
function Component({ id }: { id: string }) {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetchData(id).then(setData) // Race condition if id changes quickly!
  }, [id])
}
```

**Solution**:
```typescript
function Component({ id }: { id: string }) {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    let cancelled = false
    
    fetchData(id).then(result => {
      if (!cancelled) {
        setData(result)
      }
    })
    
    return () => {
      cancelled = true
    }
  }, [id])
  
  // Better: Use SWR
  const { data, error } = useSWR(`/api/data/${id}`, fetcher)
}
```

**Agent Responsibility**: React Agent + Error Handling Agent

---

### Error Pattern 5: "Props Drilling Hell"

**Problem**:
```typescript
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />
}

function Header({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />
}
// 5 levels deep...
```

**Solution**:
```typescript
// Option 1: Context
const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  )
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext)
  return <div>{user?.name}</div>
}

// Option 2: State management library (if complex)
// Option 3: Server Components (pass data at page level)
```

**Agent Responsibility**: Architecture Agent + React Agent

---

### Error Pattern 6: "Unvalidated User Input"

**Problem**:
```typescript
function SearchForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = e.target.query.value
    fetchResults(query) // Dangerous! No validation
  }
}
```

**Solution**:
```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchSchema = z.object({
  query: z.string()
    .min(1, 'Search query is required')
    .max(100, 'Query too long')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Invalid characters')
})

type SearchForm = z.infer<typeof searchSchema>

function SearchForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema)
  })
  
  const onSubmit = async (data: SearchForm) => {
    try {
      const results = await fetchResults(data.query)
      // Handle results
    } catch (error) {
      console.error('[v0] Search error:', error)
      // Show user error
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('query')} />
      {errors.query && <span>{errors.query.message}</span>}
      <button type="submit">Search</button>
    </form>
  )
}
```

**Agent Responsibility**: Security Agent + Error Handling Agent

---

### Error Pattern 7: "Exposing Sensitive Data"

**Problem**:
```typescript
// api/user/route.ts
export async function GET() {
  const user = await db.query.users.findFirst()
  return Response.json(user) // Exposes password hash, email, etc!
}
```

**Solution**:
```typescript
// api/user/route.ts
export async function GET() {
  const user = await db.query.users.findFirst()
  
  if (!user) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  
  // Only return safe data
  const safeUser = {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt
  }
  
  return Response.json(safeUser)
}

// Better: Use a type
type PublicUser = Pick<User, 'id' | 'username' | 'createdAt'>

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt
  }
}
```

**Agent Responsibility**: Security Agent + TypeScript Agent

---

### Error Pattern 8: "Inefficient Re-renders"

**Problem**:
```typescript
function ParentComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild data={{ items: [1, 2, 3] }} /> {/* Re-renders every time! */}
    </div>
  )
}
```

**Solution**:
```typescript
function ParentComponent() {
  const [count, setCount] = useState(0)
  
  // Memoize the data object
  const data = useMemo(() => ({ items: [1, 2, 3] }), [])
  
  // Or use React.memo on the child
  const MemoizedChild = React.memo(ExpensiveChild)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedChild data={data} />
    </div>
  )
}

// Even better: Use React Compiler (React 19)
// It automatically memoizes
```

**Agent Responsibility**: Performance Agent + React Agent

---

## Project-Specific Patterns

### Payment Flow Pattern

```typescript
// components/crypto-payment-modal.tsx
interface PaymentModalProps {
  product: Product
  onSuccess: (txId: string) => void
  onCancel: () => void
}

export function CryptoPaymentModal({ product, onSuccess, onCancel }: PaymentModalProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handlePayment = async () => {
    if (!selectedCrypto) {
      setError('Please select a cryptocurrency')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Get wallet address for selected crypto
      const walletAddress = WALLET_ADDRESSES[selectedCrypto]
      
      // Validate product price
      if (product.price < MIN_PRODUCT_PRICE) {
        throw new Error(`Price must be at least ${MIN_PRODUCT_PRICE}`)
      }
      
      // Show payment instructions
      // User completes payment externally
      // Verify transaction (would need backend implementation)
      
      // For demo purposes
      const txId = `tx_${Date.now()}_${selectedCrypto}`
      onSuccess(txId)
      
    } catch (error) {
      console.error('[v0] Payment error:', error)
      setError(
        error instanceof Error 
          ? error.message 
          : 'Payment failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Dialog>
      {/* Modal UI */}
      {error && <Alert variant="destructive">{error}</Alert>}
      <CryptoSelector 
        selected={selectedCrypto}
        onSelect={setSelectedCrypto}
      />
      <Button 
        onClick={handlePayment}
        disabled={loading || !selectedCrypto}
      >
        {loading ? 'Processing...' : `Pay ${product.price}`}
      </Button>
    </Dialog>
  )
}
```

### Product Listing Pattern

```typescript
// app/products/page.tsx (Server Component)
import { db } from '@/lib/db'
import { products } from '@/lib/schema'
import { ProductCard } from '@/components/product-card'

export default async function ProductsPage() {
  // Fetch data on server
  const allProducts = await db.select().from(products).where(
    eq(products.status, 'active')
  )
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {allProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No products available</p>
        </div>
      )}
    </main>
  )
}

// components/product-card.tsx (Client Component)
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { CryptoPaymentModal } from './crypto-payment-modal'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [showPayment, setShowPayment] = useState(false)
  
  return (
    <>
      <article className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 ring-purple-500 transition-all">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-400">
              ${product.price}
            </span>
            <button
              onClick={() => setShowPayment(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              aria-label={`Purchase ${product.title}`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </article>
      
      {showPayment && (
        <CryptoPaymentModal
          product={product}
          onSuccess={(txId) => {
            console.log('[v0] Payment successful:', txId)
            setShowPayment(false)
            // Show success message
          }}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </>
  )
}
```

### Error Boundary Pattern

```typescript
// components/error-boundary.tsx
'use client'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[v0] Error boundary caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-purple-600 rounded-lg"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    
    return this.props.children
  }
}

// Usage in layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

---

## Performance Optimization Checklist

### Images
- [ ] Use Next.js `Image` component
- [ ] Specify width and height
- [ ] Use appropriate format (WebP when possible)
- [ ] Implement lazy loading for below-fold images
- [ ] Optimize image sizes (max 100kb for thumbnails)

### Code Splitting
- [ ] Use dynamic imports for heavy components
- [ ] Lazy load modals and dialogs
- [ ] Split routes appropriately
- [ ] Monitor bundle size

### Rendering
- [ ] Prefer Server Components
- [ ] Use Client Components only when needed
- [ ] Implement proper loading states
- [ ] Use Suspense boundaries
- [ ] Memoize expensive computations

### Data Fetching
- [ ] Fetch on server when possible
- [ ] Use SWR for client-side fetching
- [ ] Implement proper caching
- [ ] Batch related requests
- [ ] Handle loading and error states

---

## Accessibility Audit Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Visible focus indicators
- [ ] Escape key closes modals
- [ ] Enter/Space activates buttons

### Screen Readers
- [ ] Semantic HTML elements
- [ ] ARIA labels for icons
- [ ] Alt text for images
- [ ] Proper heading hierarchy
- [ ] Form labels associated with inputs

### Visual
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] No content depends on color alone
- [ ] Text resizable to 200%
- [ ] No flashing content
- [ ] Sufficient spacing between interactive elements

### Testing
- [ ] Test with keyboard only
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test with browser zoom
- [ ] Use axe DevTools
- [ ] Test on mobile devices

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing (`bun test`)
- [ ] Build succeeds (`bun run build`)
- [ ] No TypeScript errors
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Crypto wallet addresses verified

### Security
- [ ] No hardcoded secrets
- [ ] API routes protected
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] HTTPS enforced

### Performance
- [ ] Lighthouse score >90
- [ ] Bundle size acceptable
- [ ] Images optimized
- [ ] Caching configured
- [ ] Database queries optimized

### Monitoring
- [ ] Error tracking configured
- [ ] Analytics implemented
- [ ] Performance monitoring active
- [ ] User feedback mechanism in place

---

## Quick Reference: Common Commands

```bash
# Development
bun dev                    # Start dev server with Turbopack
bun run build             # Production build
bun start                 # Start production server

# Testing
bun test                  # Run all tests
bun test:watch           # Run tests in watch mode
bun test:coverage        # Generate coverage report

# Linting & Formatting
bun run lint             # Run ESLint
bun run format           # Format with Prettier
bun run type-check       # TypeScript type checking

# Database (Drizzle)
bun run db:generate      # Generate migrations
bun run db:migrate       # Run migrations
bun run db:push          # Push schema changes
bun run db:studio        # Open Drizzle Studio

# Deployment
git push origin main     # Deploy to Vercel (auto)
vercel                   # Manual Vercel deployment
vercel --prod            # Deploy to production
```

---

## Emergency Contacts & Resources

### When Things Go Wrong

**Build Failures**:
1. Check TypeScript errors: `bun run type-check`
2. Clear `.next` folder: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && bun install`
4. Check Node version compatibility

**Runtime Errors**:
1. Check browser console
2. Check server logs
3. Verify environment variables
4. Check database connection

**Performance Issues**:
1. Run Lighthouse audit
2. Check bundle size
3. Review Network tab
4. Check database query performance

### Support Resources
- Project Documentation: This file + README.md
- Coding Standards: `.github/copilot-instructions.md`
- Community: https://t.me/FlashUsdtsShop
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev

---

## Version History

### v1.0.0 - Initial Release
- Complete agent guidelines
- Error prevention patterns
- Project-specific patterns
- Comprehensive checklists

### Maintenance
This document should be updated when:
- New patterns are established
- New technologies are added
- Common errors are discovered
- Best practices evolve

**Last Updated**: October 23, 2025
**Next Review**: Monthly or when major changes occur

---

## Conclusion

These guidelines ensure that every code contribution to FLASH USDTS SHOP is:
- **Error-Free**: Comprehensive error handling and validation
- **Type-Safe**: Full TypeScript coverage with no `any` types
- **Performant**: Optimized for speed and efficiency
- **Accessible**: WCAG 2.1 AA compliant
- **Secure**: Protected against common vulnerabilities
- **Maintainable**: Well-documented and tested
- **Consistent**: Follows established patterns

Remember: **Code quality is not negotiable**. Every agent must perform their checks, and every developer must follow these guidelines. When in doubt, refer to this document and ask for clarification.

**Happy coding! 🚀**
**Key Areas to Analyze:**

**Frontend Architecture:**
- React/TypeScript component structure
- Responsive design implementation
- Animation and interaction systems
- State management approach
- Performance optimization strategies

**Backend Requirements:**
- API endpoints needed for product management
- User authentication and authorization
- Payment processing integration
- Database schema design
- File upload and storage systems

**UI/UX Implementation:**
- Glass morphism and gradient effects
- Animation libraries and custom CSS
- Accessibility compliance
- Cross-browser compatibility
- Mobile responsiveness

**Technical Infrastructure:**
- Build and deployment pipeline
- Environment configuration
- Security considerations
- Performance monitoring
- Error handling and logging

**Integration Points:**
- Payment gateway setup
- User review system
- Search and filtering functionality
- Email notification system
- Analytics and tracking

**Deliverables Expected:**
1. Detailed technical analysis with identified gaps
2. Prioritized development roadmap
3. Specific implementation recommendations
4. Code structure suggestions
5. Potential risk mitigation strategies

Analyze the provided wireframe/mockup documentation thoroughly and create a comprehensive technical plan that will make this codebase production-ready for the  marketplace.


We need to adopt All Search Engine Optimization (SEO) methods can be categorized into four main pillars: on-page SEO, off-page SEO, technical SEO, and local SEO. All are crucial for improving a website's visibility and organic traffic. When applied ethically, known as "white hat" SEO, these methods build sustainable growth and authority. 
On-page SEO
This involves optimizing elements on your website to increase its search ranking and organic traffic. 
Target keyword assignment: Assign a specific target keyword to each important webpage.
Keyword research: Identify the search terms your target audience uses to find your products or content. Include both short-tail and more specific long-tail keywords.
Search intent analysis: Understand the user's goal behind their search query and provide content that directly answers it.
Quality content: Create unique, valuable, and informative content that demonstrates expertise, experience, authority, and trustworthiness (E-E-A-T).
Metadata optimization: Craft compelling and descriptive meta titles and meta descriptions that include your target keywords to improve click-through rates.
Header tags: Use H1, H2, and H3 tags to organize your content logically and improve readability for users and search engines.
Internal linking: Add internal links to connect related pages on your site, which helps with site navigation and distributes authority.
Multimedia: Incorporate high-quality images, videos, and infographics to enhance engagement and user experience. For images, use descriptive filenames and alt text.
URL structure: Use clean, simple, and descriptive URLs that include keywords. 
Off-page SEO
These are actions taken outside of your website to impact your search rankings. Off-page SEO is primarily about building your site's authority and credibility. 
High-quality backlinks: Earn links from other reputable, relevant websites. This acts as a vote of confidence for your content.
Content creation: Produce linkable assets, such as original research, data, or in-depth guides, that others will naturally want to cite.
Email outreach: Contact website owners to propose your content as a resource for their readers.
Broken link building: Find broken links on other websites and suggest your content as a replacement.
Unlinked brand mentions: Use tools to find online mentions of your brand that don't link to your site, then ask the publisher to add a link.
Guest blogging: Write blog posts for other relevant industry websites.
Digital PR: Create interesting stories or press releases that can gain media coverage and backlinks.
Social signals: Active social media engagement and brand mentions can increase visibility and brand awareness.
Influencer marketing: Collaborate with influencers to promote your brand and content to their audience. 
Technical SEO
Technical SEO focuses on the backend infrastructure of your website to help search engines crawl and index it more effectively. 
Website speed: Improve page loading times, especially on mobile devices. Use tools like Google's PageSpeed Insights to identify issues.
Mobile optimization: Ensure your site is mobile-friendly and responsive, as Google uses mobile-first indexing.
HTTPS: Use a secure HTTPS connection for user trust and security.
Site architecture: Organize your pages logically to improve navigation for users and search engines.
Crawlability and indexing: Ensure search engine bots can easily crawl your website. Use a Robots.txt file to guide them and an XML sitemap to help them find all your important pages.
Structured data: Use schema markup to help search engines understand the context of your content and make your pages eligible for rich results.
Broken links and redirects: Regularly fix broken internal links and manage redirects to avoid frustrating users and wasting "crawl budget".
Core Web Vitals: Optimize for key user experience metrics, including Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).
Duplicate content: Identify and resolve issues with duplicate content, which can confuse search engines and dilute link equity. 
Local SEO
This is specifically for businesses that serve a local area, helping them appear prominently in location-based search results and maps. 
Google Business Profile (GBP): Claim and fully optimize your GBP listing with accurate business information, photos, and regular updates.
Reviews and ratings: Encourage customers to leave positive reviews on your GBP and other platforms. Respond professionally to all reviews.
Local keywords: Incorporate location-specific keywords, such as your city or neighborhood, into your website's content and metadata.
Local citations: Ensure consistent business information (Name, Address, Phone number—NAP) across online directories like Yelp, Yellow Pages, and industry-specific sites.
Location-specific content: Create dedicated landing pages for each business location and local blog content relevant to your community. 
The opposite: Black hat SEO methods
In contrast to the ethical and sustainable white hat methods, black hat SEO employs manipulative tactics that violate search engine guidelines for a quick, but high-risk, boost in rankings. You should avoid these methods, as they carry a high risk of severe penalties or being removed from search results entirely. 
Keyword stuffing: Overusing keywords in content, meta tags, or anchor text in an unnatural way.
Cloaking: Presenting different content to search engine crawlers than what a human user sees.
Paid link schemes: Buying or selling backlinks intended to manipulate rankings.
Progressive Web App, is a web application that uses modern web technologies to deliver an app-like experience, including being installable on a user's device, working offline, and having its own ico
Key features of PWAs
Installable: Users can install PWAs to their device, where they will appear with their own icon on the home screen or app launcher, just like a traditional app. 
Offline functionality: PWAs can work even with a poor or no internet connection, as they can use cached data from previous online activities. 
App-like interface: Once installed, a PWA opens in a standalone window, separate from the browser's user interface, providing a more immersive experience. 
Reliable and fast: They are built to be reliable, with features like service workers that enable them to work offline and load quickly. 
Discoverable: PWAs are discoverable through a web browser like any website and can be found by search engines. 
Single codebase: Developers can use one codebase to create an application that works across multiple devices and platforms. 
Progressive enhancement: PWAs are built with a core experience that works everywhere, and they progressively enhance the experience for users who have more capable browsers. 
Service workers: These are scripts that the browser runs in the background, enabling features like offline support and push notifications. 
Web App Manifest: This is a simple JSON file that provides the PWA with details like the app's name and icon, allowing it to be "installed" on a user's device. 
Hidden text or links: Including text or links that are invisible to users but readable by search engines.
Doorway pages: Creating low-quality pages optimized for narrow queries to redirect users to a different page.
Automatically generated content: Using AI tools to mass-produce unoriginal, low-quality content. 
AI can make mistakes, so double-check responses
You need to read docs always for do done error dree development so always make sure you read before do done read all mentioned things docs then do apply in codebase.


Wrap your application with the `Provider` component generated in the `components/ui/provider` component at the root of your application.

This provider composes the following:

*   `ChakraProvider` from `@chakra-ui/react` for the styling system
*   `ThemeProvider` from `next-themes` for color mode

```
import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
```


Adding the `suppressHydrationWarning` prop to the `html` element is required to prevent the warning about the `next-themes` library.

### Optimize Bundle

We recommend using the `experimental.optimizePackageImports` feature in Next.js to optimize your bundle size by loading only the modules that you are actually using.

```
export default {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}
```


This also helps to resolve warnings like:

```
[webpack.cache.PackFileCacheStrategy] Serializing big strings (xxxkiB)
```


### Hydration errors

If you see an error like this: **Hydration failed because the initial server rendered HTML did not match the client**, and the error looks similar to:

```
+<div className="chakra-xxx">
-<style data-emotion="css-global xxx" data-s="">
```


This is caused by how Next.js hydrates Emotion CSS in `--turbo` mode. Please remove the `--turbo` flag from your `dev` script in your `package.json` file.

```
- "dev": "next dev --turbo"
+ "dev": "next dev"
```


When this is fixed by the `Next.js` team, we'll update this guide.

### Enjoy!

With the power of the snippets and the primitive components from Chakra UI, you can build your UI faster.

```
import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}
```
We need to make sure we doing follow the all mentioned llm txt for works goods way more!!
-----------------------------------------

The following files are available.

*   [/llms.txt](https://chakra-ui.com/llms.txt): The main LLMs.txt file
*   [/llms-full.txt](https://chakra-ui.com/llms-full.txt): The complete documentation for Chakra UI v3

* * *

Separate docs are available if you have a limited context window.

*   [/llms-components.txt](https://chakra-ui.com/llms-components.txt): Only component documentation
*   [/llms-styling.txt](https://chakra-ui.com/llms-styling.txt): Only styling documentation
*   [/llms-theming.txt](https://chakra-ui.com/llms-theming.txt): Only theming documentation

* * *

We also have a special `llms-v3-migration.txt` file that contains documentation for migrating to Chakra UI v3.

*   [/llms-v3-migration.txt](https://chakra-ui.com/llms-v3-migration.txt): Documentation for migrating to Chakra UI v3
