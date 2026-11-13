import type { ComponentPropsWithRef } from 'react';
import { Spottable } from '@enact/spotlight/Spottable';
import { SpotlightContainerDecorator } from '@enact/spotlight/SpotlightContainerDecorator';

/**
 * Enact Spotlight 기반 공통 요소
 * - SpottableButton: 방향키(5-way)로 포커스를 받을 수 있는 버튼
 * - SpotlightContainer / SpotlightList: 방향키 이동 범위를 묶는 컨테이너
 *   (다른 영역에 갔다가 돌아오면 마지막으로 포커스했던 항목으로 복원)
 *
 * Enact 타입 정의는 문자열 태그를 넘기면 props 타입을 추론하지 못해서
 * 제네릭으로 HTML 요소 props 를 직접 지정합니다.
 */
export const SpottableButton = Spottable<ComponentPropsWithRef<'button'>>('button');

export const SpotlightContainer = SpotlightContainerDecorator<ComponentPropsWithRef<'div'>>(
  { enterTo: 'last-focused' },
  'div',
);

export const SpotlightList = SpotlightContainerDecorator<ComponentPropsWithRef<'ol'>>(
  { enterTo: 'last-focused' },
  'ol',
);
