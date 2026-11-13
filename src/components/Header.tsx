import styled from 'styled-components';
import { SpotlightContainer, SpottableButton } from './spotlight';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    font-size: 24px;
    font-weight: 800;
    color: ${({ theme }) => theme.color.primaryDark};
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.color.textSub};
  }
`;

const Logo = styled.span`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  font-size: 26px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.primarySoft};
`;

const Tabs = styled(SpotlightContainer)`
  display: flex;
  gap: 6px;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

const Tab = styled(SpottableButton)<{ $selected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  color: ${({ theme, $selected }) => ($selected ? '#fff' : theme.color.text)};
  background: ${({ theme, $selected }) => ($selected ? theme.color.primary : 'transparent')};

  small {
    font-size: 11px;
    font-weight: 500;
    opacity: 0.8;
  }

  &:focus:not([aria-selected='true']) {
    background: ${({ theme }) => theme.color.primarySoft};
  }
`;

export type TabKey = 'roadmap' | 'challenge' | 'map';

const TABS: { key: TabKey; label: string; step: string }[] = [
  { key: 'roadmap', label: '매너 로드맵', step: '1단계' },
  { key: 'challenge', label: '매너 챌린지', step: '2단계' },
  { key: 'map', label: '클린 스팟 지도', step: '3단계' },
];

interface Props {
  current: TabKey;
  onChange: (tab: TabKey) => void;
}

export function Header({ current, onChange }: Props) {
  return (
    <Wrapper>
      <Brand>
        <Logo aria-hidden>🧼</Logo>
        <div>
          <h1>깨끗해지자</h1>
          <p>사람이 먼저 매너 있고 깨끗해지자!</p>
        </div>
      </Brand>
      <Tabs role="tablist" aria-label="메뉴" spotlightId="header-tabs">
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={current === tab.key}
            $selected={current === tab.key}
            onClick={() => onChange(tab.key)}
          >
            <small>{tab.step}</small>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
}
