---
title: 학습 순서 / Learning Path
description: A prerequisite-driven route through every Terraform Associate 004 domain.
---

공식 학습 경로는 난이도 순서를 권장합니다. 이 사이트는 그 순서를 **왜 다음 개념이 필요한지**가 보이도록 연결합니다.

The official path recommends studying in increasing order of complexity. This route makes each prerequisite explicit.

## Phase 1. 선언과 실행 모델 / Declaration and execution model

1. [IaC와 Terraform / IaC and Terraform](/domains/01-iac/): 선언적 목표 상태, 변경 이력, 반복 가능성을 이해합니다.
2. [Terraform 기초 / Fundamentals](/domains/02-fundamentals/): provider가 구성과 API 사이를 연결하고 state가 객체를 추적하는 이유를 이해합니다.
3. [핵심 워크플로우 / Core workflow](/domains/03-workflow/): `write → init → plan → apply`에서 각 단계가 앞 단계의 산출물을 어떻게 소비하는지 확인합니다.

**Checkpoint:** 빈 디렉터리에서 provider를 고정하고, plan을 설명한 뒤, apply와 destroy를 안전하게 수행할 수 있어야 합니다.

## Phase 2. 구성 언어와 재사용 / Language and reuse

4. [Terraform 구성 / Configuration](/domains/04-configuration/): block, expression, type, dependency, validation, sensitive data를 하나의 데이터 흐름으로 읽습니다.
5. [모듈 / Modules](/domains/05-modules/): root/child module 경계, input/output 계약, source/version 제약을 적용합니다.

**Checkpoint:** 반복 가능한 child module을 만들고 호출자가 provider configuration을 전달하도록 설계할 수 있어야 합니다.

## Phase 3. 지속적인 운영 / Ongoing operation

6. [상태 관리 / State management](/domains/06-state/): backend, locking, drift, refresh-only, `moved`, `removed`를 구성과 실제 객체의 정합성 문제로 이해합니다.
7. [인프라 유지보수 / Maintain infrastructure](/domains/07-maintain/): import, state inspection, verbose logging으로 기존 환경과 장애를 다룹니다.
8. [HCP Terraform](/domains/08-hcp-terraform/): 로컬 워크플로우를 원격 실행, 협업, 거버넌스, workspace/project 구조로 확장합니다.

**Checkpoint:** state를 직접 편집하지 않고 리팩터링, import, drift 처리, 원격 실행을 설명할 수 있어야 합니다.

## 반복 루프 / Study loop

1. **개념 / Learn:** 각 도메인 핵심 페이지를 읽습니다.
2. **공식 확인 / Verify:** 페이지 하단의 versioned 1.12 링크를 엽니다.
3. **실습 / Practice:** 연결된 Lab을 실행하고 plan/state 변화를 기록합니다.
4. **회상 / Recall:** 문서를 닫고 목표 문장을 자신의 말로 설명합니다.
5. **문제 / Test:** 도메인 문제를 풀고 오답의 공식 근거를 찾습니다.

Do not use a mock score as proof of mastery. Explain the behavior, reproduce it in a disposable lab, and identify the official source that defines it.
