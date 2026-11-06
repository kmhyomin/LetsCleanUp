import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'
import { SpotlightRootDecorator } from '@enact/spotlight/SpotlightRootDecorator'
import App from './App.tsx'

// Enact Spotlight: 상하좌우 방향키(5-way) 포커스 이동을 앱 전체에 적용
const SpotlightApp = SpotlightRootDecorator(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SpotlightApp />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
