import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useCleanSpots, useCongestion } from '../hooks/queries'
import type { CleanSpot } from '../types'
import { Badge, Card, KeyHint, Section, SectionDesc, SectionTitle } from './common'
import { SpotlightContainer, SpotlightList, SpottableButton } from './spotlight'

type Filter = 'all' | CleanSpot['type']

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'restroom', label: '화장실' },
  { key: 'station', label: '역사' },
  { key: 'park', label: '공원' },
]

const TYPE_ICON: Record<CleanSpot['type'], string> = {
  restroom: '🚻',
  station: '🚇',
  park: '🌳',
}

const scoreColor = (score: number) =>
  score >= 90 ? '#16a34a' : score >= 75 ? '#0ea5e9' : '#f59e0b'

const CONGESTION_COLOR = { 여유: '#16a34a', 보통: '#f59e0b', 혼잡: '#ef4444' } as const

/**
 * 3단계: 클린 & 매너 스팟 지도
 * 카카오맵/네이버지도 API 키 연동 전까지는 자체 SVG 지도로 노드를 시각화합니다.
 */
export function CleanMap() {
  const { data: spots = [], isPending, isError } = useCleanSpots()
  const { data: congestion = [] } = useCongestion()
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      spots
        .filter((s) => filter === 'all' || s.type === filter)
        .sort((a, b) => b.cleanScore - a.cleanScore),
    [spots, filter],
  )

  // 선택된 스팟이 필터에서 빠지면 1위 스팟을 보여줌
  const selected = filtered.find((s) => s.id === selectedId) ?? filtered[0]

  return (
    <Section>
      <div>
        <SectionTitle>클린 & 매너 스팟 지도</SectionTitle>
        <SectionDesc>관리 상태가 우수한 쾌적 공공장소와 화장실을 확인하세요.</SectionDesc>
      </div>

      <Filters spotlightId="spot-filters">
        {FILTERS.map((f) => (
          <FilterButton
            key={f.key}
            type="button"
            $selected={filter === f.key}
            onClick={() => {
              setFilter(f.key)
              setSelectedId(null)
            }}
          >
            {f.label}
          </FilterButton>
        ))}
      </Filters>

      {isPending && <Card>스팟 정보를 불러오는 중…</Card>}
      {isError && <Card>스팟 정보를 불러오지 못했어요.</Card>}

      {!isPending && !isError && (
        <Layout>
          <MapBox aria-label="클린 스팟 지도">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <path d="M0 62 C 20 55, 35 70, 55 62 S 85 55, 100 66" stroke="#bae6fd" strokeWidth="6" fill="none" />
              <path d="M10 0 L 30 100" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M0 35 L 100 28" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M65 0 L 70 100" stroke="#e5e7eb" strokeWidth="1.5" />
              {/* 로드맵 노드 연결선: 청결 점수 순서대로 */}
              <polyline
                points={filtered.map((s) => `${s.x},${s.y}`).join(' ')}
                stroke="#16a34a"
                strokeWidth="0.6"
                strokeDasharray="2 1.5"
                fill="none"
              />
            </svg>
            {filtered.map((spot) => (
              <Pin
                key={spot.id}
                type="button"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                $color={scoreColor(spot.cleanScore)}
                $active={spot.id === selected?.id}
                onClick={() => setSelectedId(spot.id)}
                tabIndex={-1}
                aria-label={spot.name}
              >
                {TYPE_ICON[spot.type]}
              </Pin>
            ))}
          </MapBox>

          <List spotlightId="spot-list">
            {filtered.map((spot, i) => (
              <li key={spot.id}>
                <SpotItem
                  type="button"
                  aria-current={spot.id === selected?.id}
                  onClick={() => setSelectedId(spot.id)}
                  onFocus={() => setSelectedId(spot.id)}
                >
                  <Rank>{i + 1}</Rank>
                  <SpotText>
                    <strong>
                      {TYPE_ICON[spot.type]} {spot.name}
                    </strong>
                    <small>{spot.address}</small>
                  </SpotText>
                  <Badge $color={scoreColor(spot.cleanScore)}>{spot.cleanScore}점</Badge>
                </SpotItem>
              </li>
            ))}
          </List>
        </Layout>
      )}

      {selected && (
        <Detail>
          <h3>{selected.name}</h3>
          <dl>
            <div>
              <dt>청결 점수</dt>
              <dd>{selected.cleanScore}점</dd>
            </div>
            <div>
              <dt>개방 시간</dt>
              <dd>{selected.openHours}</dd>
            </div>
            <div>
              <dt>남녀공용</dt>
              <dd>{selected.unisex ? '공용' : '분리'}</dd>
            </div>
          </dl>
        </Detail>
      )}

      <Card>
        <h3>🚇 혼잡도 기반 탑승 매너 가이드</h3>
        <Congestions>
          {congestion.map((c) => (
            <li key={`${c.line}-${c.station}`}>
              <Badge $color={CONGESTION_COLOR[c.level]}>{c.level}</Badge>
              <span>
                {c.line} {c.station}역
              </span>
              <small>{c.level === '혼잡' ? '백팩은 앞으로! ' : ''}{c.recommendTime}</small>
            </li>
          ))}
        </Congestions>
      </Card>

      <KeyHint>
        목록에서 <kbd>↑</kbd>
        <kbd>↓</kbd> 로 스팟 이동
      </KeyHint>
    </Section>
  )
}

const Filters = styled(SpotlightContainer)`
  display: flex;
  gap: 8px;
`

const FilterButton = styled(SpottableButton)<{ $selected: boolean }>`
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.color.primary : theme.color.border)};
  color: ${({ theme, $selected }) => ($selected ? '#fff' : theme.color.text)};
  background: ${({ theme, $selected }) => ($selected ? theme.color.primary : theme.color.surface)};
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`

const MapBox = styled.div`
  position: relative;
  min-height: 360px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: #f8fafc;
  overflow: hidden;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
`

const Pin = styled.button<{ $color: string; $active: boolean }>`
  position: absolute;
  display: grid;
  place-items: center;
  width: ${({ $active }) => ($active ? '44px' : '34px')};
  height: ${({ $active }) => ($active ? '44px' : '34px')};
  padding: 0;
  font-size: ${({ $active }) => ($active ? '20px' : '16px')};
  border-radius: 50%;
  border: 3px solid ${({ $color }) => $color};
  background: #fff;
  transform: translate(-50%, -50%);
  box-shadow: ${({ $active, $color }) => ($active ? `0 0 0 6px ${$color}33` : 'none')};
  transition: all 0.2s;
  z-index: ${({ $active }) => ($active ? 2 : 1)};
`

const List = styled(SpotlightList)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`

const SpotItem = styled(SpottableButton)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  text-align: left;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};

  &:hover,
  &:focus,
  &[aria-current='true'] {
    border-color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => theme.color.primarySoft};
  }


  small {
    font-size: 12px;
    color: ${({ theme }) => theme.color.textSub};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const SpotText = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    font-size: 15px;
  }
`

const Rank = styled.i`
  font-style: normal;
  font-weight: 800;
  color: ${({ theme }) => theme.color.primary};
`

const Detail = styled(Card)`
  h3 {
    font-size: 17px;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 12px 0 0;
  }

  dt {
    font-size: 12px;
    color: ${({ theme }) => theme.color.textSub};
  }

  dd {
    margin: 2px 0 0;
    font-weight: 700;
  }
`

const Congestions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  small {
    margin-left: auto;
    color: ${({ theme }) => theme.color.textSub};
  }
`
