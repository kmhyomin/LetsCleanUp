import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MAX_QUIZ_SCORE, QUIZ_QUESTIONS } from '../data/quiz'
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../data/category'
import { Spotlight } from '@enact/spotlight'
import type { Level } from '../types'
import { Badge, Card, KeyHint, Section, SectionDesc, SectionTitle } from './common'
import { SpotlightContainer, SpottableButton } from './spotlight'

interface Props {
  onComplete: (level: Level) => void
}

const toLevel = (score: number): Level => {
  const ratio = score / MAX_QUIZ_SCORE
  if (ratio < 0.4) return 'beginner'
  if (ratio < 0.8) return 'intermediate'
  return 'advanced'
}

/** 앱 초기 질의응답으로 사용자의 매너 수준을 파악합니다. */
export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)

  const question = QUIZ_QUESTIONS[step]

  const handleSelect = (index: number) => {
    const nextScore = score + question.options[index].score
    if (step === QUIZ_QUESTIONS.length - 1) {
      onComplete(toLevel(nextScore))
      return
    }
    setScore(nextScore)
    setStep(step + 1)
  }

  // 질문이 바뀌면 첫 번째 보기로 포커스 이동 → 바로 방향키 사용 가능
  useEffect(() => {
    Spotlight.focus('[data-spotlight-id="quiz-options"] > :first-child')
  }, [step])

  return (
    <Section>
      <div>
        <SectionTitle>나의 매너 수준 알아보기</SectionTitle>
        <SectionDesc>몇 가지 질문에 답하면 나에게 맞는 매너 로드맵을 만들어 드려요.</SectionDesc>
      </div>

      <Card>
        <Progress>
          <span style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }} />
        </Progress>
        <Meta>
          <Badge $color={CATEGORY_COLOR[question.category]}>
            {CATEGORY_LABEL[question.category]}
          </Badge>
          <span>
            {step + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </Meta>
        <Question>{question.question}</Question>

        <Options spotlightId="quiz-options">
          {/* key 를 index 로 둬서 질문이 바뀌어도 버튼 DOM 이 유지되게 함 (포커스 유실 방지) */}
          {question.options.map((option, i) => (
            <Option key={i} type="button" onClick={() => handleSelect(i)}>
              {option.label}
            </Option>
          ))}
        </Options>
      </Card>

      <KeyHint>
        <kbd>↑</kbd>
        <kbd>↓</kbd> 로 이동, <kbd>Enter</kbd> 로 선택
      </KeyHint>
    </Section>
  )
}

const Progress = styled.div`
  height: 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.primarySoft};
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.color.primary};
    transition: width 0.3s;
  }
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSub};
`

const Question = styled.h3`
  margin: 12px 0 20px;
  font-size: 20px;
`

const Options = styled(SpotlightContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Option = styled(SpottableButton)`
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  font-size: 15px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => theme.color.primarySoft};
  }
`
