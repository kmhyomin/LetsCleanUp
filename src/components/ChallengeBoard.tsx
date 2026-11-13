import { useState } from 'react';
import styled from 'styled-components';
import { CATEGORY_COLOR, CATEGORY_LABEL } from '../data/category';
import { CHALLENGES, FUN_FACTS } from '../data/challenges';
import { Badge, Button, Card, KeyHint, Section, SectionDesc, SectionTitle } from './common';
import { SpotlightContainer, SpottableButton } from './spotlight';

const COLUMNS = 2;

const FactCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #ecfeff, #f0fdf4);

  p {
    flex: 1;
    font-size: 15px;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FactLabel = styled.span`
  flex-shrink: 0;
  font-weight: 800;
  font-size: 13px;
  color: ${({ theme }) => theme.color.accent};
`;

const Grid = styled(SpotlightContainer)`
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  gap: 14px;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Item = styled(SpottableButton)<{ $done: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  text-align: left;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ theme, $done }) => ($done ? theme.color.primary : theme.color.border)};
  background: ${({ theme, $done }) => ($done ? theme.color.primarySoft : theme.color.surface)};
  transition:
    transform 0.15s,
    border-color 0.15s;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.color.primary};
  }

  strong {
    font-size: 16px;
  }

  small {
    font-size: 13px;
    color: ${({ theme }) => theme.color.textSub};
  }
`;

const ItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Point = styled.span`
  font-weight: 800;
  color: ${({ theme }) => theme.color.warning};
`;

const Status = styled.span<{ $done: boolean }>`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme, $done }) => ($done ? theme.color.primaryDark : theme.color.accent)};
`;

interface Props {
  /** 오늘 인증한 챌린지 id 목록 */
  certified: string[];
  onCertify: (challengeId: string) => void;
}

/** 2단계: 시민 매너 챌린지 및 FUN FACT */
export function ChallengeBoard({ certified, onCertify }: Props) {
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * FUN_FACTS.length));

  const todayPoint = CHALLENGES.filter((c) => certified.includes(c.id)).reduce(
    (sum, c) => sum + c.point,
    0,
  );

  return (
    <Section>
      <div>
        <SectionTitle>오늘의 매너 챌린지</SectionTitle>
        <SectionDesc>
          일상 속 매너를 실천하고 인증해 보세요. 오늘 {certified.length}개 인증 · +{todayPoint}P
        </SectionDesc>
      </div>

      <FactCard>
        <FactLabel>💡 FUN FACT</FactLabel>
        <p>{FUN_FACTS[factIndex].text}</p>
        <Button
          as={SpottableButton}
          type="button"
          $variant="ghost"
          onClick={() => setFactIndex((factIndex + 1) % FUN_FACTS.length)}
        >
          다른 사실 보기
        </Button>
      </FactCard>

      <Grid spotlightId="challenge-grid">
        {CHALLENGES.map((challenge) => {
          const done = certified.includes(challenge.id);
          return (
            <Item
              key={challenge.id}
              type="button"
              $done={done}
              aria-pressed={done}
              onClick={() => onCertify(challenge.id)}
            >
              <ItemTop>
                <Badge $color={CATEGORY_COLOR[challenge.category]}>
                  {CATEGORY_LABEL[challenge.category]}
                </Badge>
                <Point>+{challenge.point}P</Point>
              </ItemTop>
              <strong>{challenge.title}</strong>
              <small>{challenge.description}</small>
              <Status $done={done}>{done ? '✓ 인증 완료' : '인증하기'}</Status>
            </Item>
          );
        })}
      </Grid>

      <KeyHint>
        <kbd>↑</kbd>
        <kbd>↓</kbd>
        <kbd>←</kbd>
        <kbd>→</kbd> 로 이동, <kbd>Enter</kbd> 로 인증 / 취소
      </KeyHint>
    </Section>
  );
}
