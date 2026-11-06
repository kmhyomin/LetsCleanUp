import { useEffect } from 'react'
import { Spotlight } from '@enact/spotlight'
import styled from 'styled-components'
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../data/category'
import { LEVEL_LABEL, LEVEL_ORDER, ROADMAP } from '../data/roadmap'
import type { Level } from '../types'
import { Badge, Button, Card, KeyHint, Section, SectionDesc, SectionTitle } from './common'
import { SpotlightList, SpottableButton } from './spotlight'

interface Props {
  level: Level
  completed: string[]
  onToggle: (taskId: string) => void
  onRetry: () => void
}

/** 1단계: 매너 및 청결 로드맵 트래킹 */
export function Roadmap({ level, completed, onToggle, onRetry }: Props) {
  // 진단 직후 로드맵이 열리면 첫 미션으로 포커스 이동
  useEffect(() => {
    Spotlight.focus('roadmap-tasks')
  }, [])

  const userLevelIndex = LEVEL_ORDER.indexOf(level)

  return (
    <Section>
      <Head>
        <div>
          <SectionTitle>
            나의 매너 로드맵 <Badge>{LEVEL_LABEL[level]}</Badge>
          </SectionTitle>
          <SectionDesc>단계별 미션을 실천하고 체크해 보세요. 완료할수록 매너 스코어가 올라가요.</SectionDesc>
        </div>
        <Button as={SpottableButton} type="button" $variant="ghost" onClick={onRetry}>
          수준 다시 진단하기
        </Button>
      </Head>

      <Track spotlightId="roadmap-tasks">
        {ROADMAP.map((stage, stageIndex) => {
          const done = stage.tasks.every((t) => completed.includes(t.id))
          const isRecommended = LEVEL_ORDER.indexOf(stage.level) === userLevelIndex
          return (
            <Node key={stage.id}>
              <Dot $done={done} $color={CATEGORY_COLOR[stage.category]}>
                {done ? '✓' : stageIndex + 1}
              </Dot>
              <StageCard $highlight={isRecommended}>
                <StageMeta>
                  <Badge $color={CATEGORY_COLOR[stage.category]}>{CATEGORY_LABEL[stage.category]}</Badge>
                  <span>{LEVEL_LABEL[stage.level]}</span>
                  {isRecommended && <Recommend>추천 단계</Recommend>}
                </StageMeta>
                <h3>{stage.title}</h3>
                <p>{stage.summary}</p>
                <Tasks>
                  {stage.tasks.map((task) => {
                    const checked = completed.includes(task.id)
                    return (
                      <li key={task.id}>
                        <Task
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          $checked={checked}
                          onClick={() => onToggle(task.id)}
                        >
                          <Check $checked={checked}>{checked ? '✓' : ''}</Check>
                          <span>
                            <strong>{task.title}</strong>
                            <small>{task.description}</small>
                          </span>
                        </Task>
                      </li>
                    )
                  })}
                </Tasks>
              </StageCard>
            </Node>
          )
        })}
      </Track>

      <KeyHint>
        <kbd>↑</kbd>
        <kbd>↓</kbd>
        <kbd>←</kbd>
        <kbd>→</kbd> 로 이동, <kbd>Enter</kbd> 로 완료 체크
      </KeyHint>
    </Section>
  )
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

const Track = styled(SpotlightList)`
  position: relative;
  margin: 0;
  padding: 0 0 0 56px;
  list-style: none;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 19px;
    width: 3px;
    background: ${({ theme }) => theme.color.primarySoft};
  }
`

const Node = styled.li`
  position: relative;
  margin-bottom: 20px;
`

const Dot = styled.span<{ $done: boolean; $color: string }>`
  position: absolute;
  top: 18px;
  left: -56px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: 800;
  color: ${({ $done, $color }) => ($done ? '#fff' : $color)};
  background: ${({ $done, theme }) => ($done ? theme.color.primary : theme.color.surface)};
  border: 3px solid ${({ $done, theme, $color }) => ($done ? theme.color.primary : $color)};
`

const StageCard = styled(Card)<{ $highlight: boolean }>`
  border-color: ${({ $highlight, theme }) => ($highlight ? theme.color.primary : theme.color.border)};
  border-width: ${({ $highlight }) => ($highlight ? '2px' : '1px')};

  h3 {
    margin-top: 8px;
    font-size: 18px;
  }

  & > p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.textSub};
  }
`

const StageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSub};
`

const Recommend = styled.span`
  margin-left: auto;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
`

const Tasks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
`

const Task = styled(SpottableButton)<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid transparent;
  background: ${({ theme, $checked }) => ($checked ? theme.color.primarySoft : theme.color.bg)};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.primary};
  }

  span {
    display: flex;
    flex-direction: column;
  }

  strong {
    font-size: 15px;
    text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  }

  small {
    font-size: 13px;
    color: ${({ theme }) => theme.color.textSub};
  }
`

const Check = styled.i<{ $checked: boolean }>`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  font-style: normal;
  font-size: 13px;
  font-weight: 800;
  border-radius: 6px;
  color: #fff;
  border: 2px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme, $checked }) => ($checked ? theme.color.primary : '#fff')};
`
