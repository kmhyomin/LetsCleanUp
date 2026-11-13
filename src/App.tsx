import { useState } from 'react';
import styled from 'styled-components';
import { ChallengeBoard } from './components/ChallengeBoard';
import { CleanMap } from './components/CleanMap';
import { Header } from './components/Header';
import type { TabKey } from './components/Header';
import { MannerScore } from './components/MannerScore';
import { Onboarding } from './components/Onboarding';
import { Roadmap } from './components/Roadmap';
import { CHALLENGES } from './data/challenges';
import { ROADMAP } from './data/roadmap';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Level } from './types';

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  min-height: 100svh;
  margin: 0 auto;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 16px 32px;
  }
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSub};
`;

const TOTAL_TASKS = ROADMAP.reduce((sum, stage) => sum + stage.tasks.length, 0);
const today = () => new Date().toISOString().slice(0, 10);

function App() {
  const [tab, setTab] = useState<TabKey>('roadmap');
  const [level, setLevel] = useLocalStorage<Level | null>('lcu:level', null);
  const [completed, setCompleted] = useLocalStorage<string[]>('lcu:completed', []);
  /** 날짜별 챌린지 인증 기록 { '2026-11-04': ['c1', 'c2'] } */
  const [certifications, setCertifications] = useLocalStorage<Record<string, string[]>>(
    'lcu:certifications',
    {},
  );

  const todayCertified = certifications[today()] ?? [];

  const points = Object.values(certifications)
    .flat()
    .reduce((sum, id) => sum + (CHALLENGES.find((c) => c.id === id)?.point ?? 0), 0);

  const toggleTask = (taskId: string) => {
    setCompleted((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId],
    );
  };

  const toggleCertify = (challengeId: string) => {
    const key = today();
    setCertifications((prev) => {
      const list = prev[key] ?? [];
      const next = list.includes(challengeId)
        ? list.filter((id) => id !== challengeId)
        : [...list, challengeId];
      return { ...prev, [key]: next };
    });
  };

  return (
    <Container>
      <Header current={tab} onChange={setTab} />
      <MannerScore progress={completed.length / TOTAL_TASKS} points={points} />

      <Main>
        {tab === 'roadmap' &&
          (level === null ? (
            <Onboarding onComplete={setLevel} />
          ) : (
            <Roadmap
              level={level}
              completed={completed}
              onToggle={toggleTask}
              onRetry={() => setLevel(null)}
            />
          ))}
        {tab === 'challenge' && (
          <ChallengeBoard certified={todayCertified} onCertify={toggleCertify} />
        )}
        {tab === 'map' && <CleanMap />}
      </Main>

      <Footer>"사람이 먼저 매너 있게, 세상이 더 깨끗해지는 그날까지!"</Footer>
    </Container>
  );
}

export default App;
