import styled from 'styled-components'

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
`

export const SectionDesc = styled.p`
  color: ${({ theme }) => theme.color.textSub};
  font-size: 15px;
`

export const Card = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 20px;
`

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 18px;
  font-weight: 600;
  transition: background 0.2s;
  color: ${({ theme, $variant }) => ($variant === 'ghost' ? theme.color.primaryDark : '#fff')};
  background: ${({ theme, $variant }) =>
    $variant === 'ghost' ? theme.color.primarySoft : theme.color.primary};

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'ghost' ? '#bbf7d0' : theme.color.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Badge = styled.span<{ $color?: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: ${({ theme, $color }) => $color ?? theme.color.primary};
`

export const KeyHint = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSub};

  kbd {
    display: inline-block;
    min-width: 22px;
    padding: 0 6px;
    margin: 0 2px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-bottom-width: 2px;
    border-radius: 4px;
    background: #fff;
    font-family: inherit;
    font-size: 12px;
    text-align: center;
  }
`
