import styled from 'styled-components'
import { useAirQuality } from '../hooks/queries'
import { Card } from './common'

interface Props {
  /** 로드맵 진행률 (0 ~ 1) */
  progress: number
  /** 챌린지 누적 포인트 */
  points: number
}

/**
 * 메인 화면 '쾌적 매너 스코어'
 * 로드맵 진행률 60% + 챌린지 포인트 20% + 대기 쾌적도 20%
 */
export function MannerScore({ progress, points }: Props) {
  const { data: air, isPending, isError } = useAirQuality()

  const airScore = air ? Math.max(0, 100 - air.pm10) : 50
  const pointScore = Math.min(points, 100)
  const total = Math.round(progress * 100 * 0.6 + pointScore * 0.2 + airScore * 0.2)

  return (
    <Wrapper>
      <ScoreCircle $score={total}>
        <strong>{total}</strong>
        <span>매너 스코어</span>
      </ScoreCircle>
      <Stats>
        <Stat>
          <dt>로드맵 진행률</dt>
          <dd>{Math.round(progress * 100)}%</dd>
        </Stat>
        <Stat>
          <dt>챌린지 포인트</dt>
          <dd>{points}P</dd>
        </Stat>
        <Stat>
          <dt>오늘의 쾌적도 (AirKorea)</dt>
          <dd>
            {isPending && '불러오는 중…'}
            {isError && '정보 없음'}
            {air && `${air.grade} · PM10 ${air.pm10}㎍/㎥`}
          </dd>
        </Stat>
      </Stats>
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  display: flex;
  align-items: center;
  gap: 28px;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

const ScoreCircle = styled.div<{ $score: number }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, #fff 78%, transparent 80% 100%),
    conic-gradient(
      ${({ theme }) => theme.color.primary} ${({ $score }) => $score}%,
      ${({ theme }) => theme.color.primarySoft} 0
    );

  strong {
    font-size: 36px;
    line-height: 1;
    color: ${({ theme }) => theme.color.primaryDark};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.color.textSub};
  }
`

const Stats = styled.dl`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`

const Stat = styled.div`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.bg};

  dt {
    font-size: 12px;
    color: ${({ theme }) => theme.color.textSub};
  }

  dd {
    margin: 4px 0 0;
    font-size: 17px;
    font-weight: 700;
  }
`
